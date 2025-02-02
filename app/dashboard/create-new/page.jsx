

"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_compontnts/SelectTopic'
import SelectStyle from './_compontnts/SelectStyle'
import SelectDuration from './_compontnts/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from '@/components/CustomLoading'
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext'
import { db } from '@/configs/db'
import { useUser } from '@clerk/nextjs'
import { VideoData } from '@/configs/schema'
import PlayerDialog from '../_component/PlayerDialog'

const page = () => {
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    const [videoScript, setVideoScript] = useState([])
    const [audioFileUrl, setAudioFileUrl] = useState("")
    const [captions, setCaptions] = useState("")
    const [imageList, setImageList] = useState([])
    const { user } = useUser()
    const [playVideo, setPlayVideo] = useState()
    const [videoId, setVideoId] = useState()
    const { videoData, setVideoData } = useContext(VideoDataContext)

    const onHandleInputChange = (fieldName, fieldVal) => {
        setFormData(prev => ({
            ...prev, [fieldName]: fieldVal
        }))
    }

    const GetVideoScript = async () => {
        if (!formData.topic || !formData.duration || !formData.imageStyle) {
            console.error("Missing required fields!");
            return;
        }

        const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text.Imp--->>> the size should be atleast 30 imagePrompt means i want so many images please understand <<-----`

        setLoading(true)
        try {
            const response = await axios.post("/api/get-video-script", { prompt });
            const scriptScenes = response.data.result.scenes;

            setVideoScript(scriptScenes);

            const images = await GenerateImage(scriptScenes);
            const audioUrl = await GenerateAudioFile(scriptScenes);
            const captionsData = await GenerateAudioCaption(audioUrl);

            setVideoData({
                videoScript: scriptScenes,
                audioFileUrl: audioUrl,
                captions: captionsData,
                imageList: images
            });

        } catch (error) {
            console.error("Error fetching video script", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        console.log("context-->>", { videoData });
        if (Object.keys(videoData).length === 4) {
            saveVideodata(videoData)
        }
    }, [videoData])

    const GenerateImage = async (videoscriptt) => {
        let images = [];
        try {
            const imagePromises = videoscriptt.map(async (element) => {
                const response = await axios.post("/api/generate-image", {
                    prompt: element?.imagePrompt
                });
                return response.data.url;
            });

            images = await Promise.all(imagePromises);
            setImageList(images);
            return images;
        } catch (error) {
            console.error("Error generating images", error);
            return [];
        }
    };

    const GenerateAudioFile = async (scriptScenes) => {
        const id = uuidv4();
        const fullScript = scriptScenes.map(scene => scene.contentText).join(" ");

        try {
            const response = await axios.post("/api/generate-audio", { text: fullScript, id });
            const audioUrl = response.data.url;
            setAudioFileUrl(audioUrl);
            return audioUrl;
        } catch (error) {
            console.error("Error generating audio file:", error);
            return "";
        }
    }

    const GenerateAudioCaption = async (fileUrl) => {
        try {
            const response = await axios.post("/api/generate-caption", { audioFileUrl: fileUrl });
            setCaptions(response.data.result);
            return response.data.result;
        } catch (error) {
            console.error("Error generating captions:", error);
            return "";
        }
    }

    const handleClick = () => {
        GetVideoScript();
    }

    const saveVideodata = async (videoData) => {
        setLoading(true)
        try {
            const result = await db.insert(VideoData).values({
                script: videoData.videoScript,
                audioFileUrl: videoData.audioFileUrl,
                captions: videoData.captions,
                imageList: videoData.imageList,
                createdBy: user?.primaryEmailAddress?.emailAddress
            }).returning({ id: VideoData.id })
            setVideoId(result[0].id)
            setPlayVideo(true)
            console.log(result);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    return (
        <div className='md:px-20'>
            <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

            <div className=' mt-10 shadow-md p-10'>
                <SelectTopic onUsetSelect={onHandleInputChange} />
                <SelectStyle onUserSelect={onHandleInputChange} />
                <SelectDuration onUserSelect={onHandleInputChange} />
                <Button className="mt-10 w-full" onClick={handleClick}>
                    Create Short Video
                </Button>
            </div>
            <CustomLoading loading={loading} />
            <PlayerDialog playVideo={playVideo} videoId={videoId} />
        </div>
    )
}

export default page
