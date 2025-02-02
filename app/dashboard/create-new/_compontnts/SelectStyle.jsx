"use client"
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

const SelectStyle = ({ onUserSelect }) => {
    const styleOption = [
        {
            name: "Realistic",
            image: "https://cdn.lucidpic.com/cdn-cgi/image/w=600,format=auto,metadata=none/66e2e5fbe0cca.png"
        },
        {
            name: "Cartoon",
            image: "https://images.media.io/2024-blog/text-to-video/ai-cartoon-video-generator-0.jpg"
        },
        {
            name: "Futuristic",
            image: "https://img.freepik.com/premium-photo/futuristic-image-depicting-ai-as-career-counselor-offering-guidance-young-professional_856795-104242.jpg"
        },
        {
            name: "Minimalist",
            image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://api.easy-peasy.ai/storage/v1/object/public/images/572a1faf-7dd5-4395-b870-31dab9c554c1/4dc92a90-74fa-4896-a2ef-e94d0760e880.png"
        }
    ]
    const [selectedOption, setSelectedOption] = useState()
    return (
        <div className='mt-7'>
            <h2 className=' font-bold text-2xl text-primary'>Style</h2>
            <p className='text-gray-500'>Select your video style</p>
            <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-2
                `}

               
            >
                {
                    styleOption.map((item, idx) => (
                        <div key={idx} className={`relative hover:scale-105 transition-all cursor-pointer ${selectedOption === item.name && "border-4 border-primary rounded-xl"}`}
                            onClick={() => {
                                setSelectedOption(item.name)
                                onUserSelect("imageStyle", item.name)
                            }}>
                            <Image className='h-48 object-cover rounded-lg w-full' src={item.image} alt={item.name} width={100} height={100} />
                            <h2 className='text-center text-white absolute p-1 bg-black bottom-0 w-full rounded-b-lg '>{item.name}</h2>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default SelectStyle