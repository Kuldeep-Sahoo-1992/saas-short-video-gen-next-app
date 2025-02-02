import React from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

const RemotionVideo = ({ script, imageList, audioFileUrl, captions, setDurationInFrame }) => {
  const { fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const getDurationFrame = () => {
    setDurationInFrame(captions[captions?.length - 1]?.end / 1000 * fps)
    return captions[captions?.length - 1]?.end / 1000 * fps
  }
  const getCurrentCaptions = () => {
    const currentTime = frame / 30 * 1000 // for 30fps
    const currentCaption = captions.find((word) =>
      currentTime >= word.start && currentTime <= word.end)
    return currentCaption ? currentCaption?.text : ""
  }
  return (
    <AbsoluteFill className='bg-black'>
      {imageList?.map((item, idx) => {
        const startTime = idx * getDurationFrame() / imageList?.length
        const duration = getDurationFrame()
        const scale = (idx) => interpolate(
          frame,
          [startTime, startTime + duration / 2, startTime + duration],
          idx % 2 === 0
            ?
            [1, 1.8, 1]
            :
            [1.8, 1, 1.8],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }

        )
        return (
          <>
            <Sequence key={idx} from={(startTime)} durationInFrames={getDurationFrame()}>
              <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>

                <Img
                  src={item}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale(idx)})`
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 5,
                    height: 150,
                    textAlign: "center",
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    
                  }}>
                  <span className='text-2xl bg-black bg-transparent rounded-lg p-1 text-white' >
                    {getCurrentCaptions()}
                  </span>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
            <Audio src={audioFileUrl} />
          </>
        )
      })}
    </AbsoluteFill>
  )
}

export default RemotionVideo