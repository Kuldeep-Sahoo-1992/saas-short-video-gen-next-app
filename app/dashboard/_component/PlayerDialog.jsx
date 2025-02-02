"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Player } from '@remotion/player';
import RemotionVideo from './RemotionVideo'
import { db } from '@/configs/db'
import { VideoData } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

const PlayerDialog = ({ playVideo, setPlayVideo, videoId }) => {
    const router = useRouter();
    const [videoData, setVideoData] = useState(null);
    const [durationInFrame, setDurationInFrame] = useState(100);

    useEffect(() => {
        if (playVideo && videoId) {
            GetVideoData();
        }
    }, [playVideo, videoId]);

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
        setVideoData(result[0]);
    }

    return (
        <Dialog open={playVideo} onOpenChange={setPlayVideo}>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5">Video is Ready 🎉🎊</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            inputProps={{
                                ...videoData,
                                setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                            }}
                            controls={true}
                        />
                        <div className='flex gap-10 mt-6 items-center justify-center'>
                            <Button className="ghost" onClick={() => {
                                router.replace("/dashboard");
                                setPlayVideo(false);
                            }}>Cancel</Button>
                            <Button>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default PlayerDialog;
