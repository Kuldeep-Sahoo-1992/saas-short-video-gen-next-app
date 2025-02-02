"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';


const SelectTopic = ({onUsetSelect}) => {
   const options = [
    "Custom Prompt", "Random AI Story", "Scary Story", 
    "Travel Vlog", "Cooking Tutorial", "Tech Review", 
    "Fitness Routine", "DIY Craft", "Fashion Lookbook"
    ];
    const [selectOption, setSelectOption] = useState()
    return (
        <div>
            <h2 className=' font-bold text-2xl text-primary'>Content</h2>
            <p className='text-gray-500'>What is the toppic of your video</p>
            <Select onValueChange={(val) => {
                setSelectOption(val)
                val != "Custom Prompt" && onUsetSelect("topic", val)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item, idx) => (
                        <SelectItem key={idx} value={item} >{item}</SelectItem>
                    ))}

                </SelectContent>
            </Select>

            {selectOption == "Custom Prompt" &&
                <Textarea className="mt-3 " placeholder="Write prompt on Which you want to genereate video"
                onChange={(e)=>onUsetSelect("topic",e.target.value)}
            />
            }

        </div>
    )
}

export default SelectTopic