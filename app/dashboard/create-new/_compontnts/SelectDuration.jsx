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
import { useState } from 'react'

const SelectDuration = ({ onUserSelect }) => {
    return (
        <div className='mt-7'>
            <h2 className=' font-bold text-2xl text-primary'>Duration</h2>
            <p className='text-gray-500'>Select the duratioj of your video</p>

            <Select onValueChange={(val) => {
                onUserSelect("duration", val)
            }}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={"30 Seconds"} >30 Seconds</SelectItem>
                    <SelectItem value={"60 Seconds"} >60 Seconds</SelectItem>
                    <SelectItem value={"2 minutes"} >2 minutes</SelectItem>
                    <SelectItem value={"3 minutes"} >3 minutes</SelectItem>
                    <SelectItem value={"6 minutes"} >6 minutes</SelectItem>
                    <SelectItem value={"10 minutes"} >10 minutes</SelectItem>

                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDuration