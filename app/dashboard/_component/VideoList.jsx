"use client"
import React, { useState } from 'react'
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

const VideoList = ({ videoList }) => {
    const [openPlayDialog, setOpenPlayDialog] = useState(false);
    const [videoId, setVideoId] = useState(null);

    return (
        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {videoList?.map((video) => (
                <div
                    key={video.id}
                    className='cursor-pointer hover:scale-105 transition-all'
                    onClick={() => {
                        setVideoId(video.id);
                        setOpenPlayDialog(true);
                    }}
                >
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={200}
                        compositionHeight={350}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{ borderRadius: 15 }}
                        inputProps={{
                            ...video,
                            setDurationInFrame: (v) => console.log(v),
                        }}
                    />
                </div>
            ))}
            {openPlayDialog && (
                <PlayerDialog
                    playVideo={openPlayDialog}
                    setPlayVideo={setOpenPlayDialog}
                    videoId={videoId}
                />
            )}
        </div>
    );
}

export default VideoList;
