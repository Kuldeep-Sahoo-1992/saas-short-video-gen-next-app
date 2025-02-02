"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import EmptyState from './_component/EmptyState'
import { useState } from 'react'
import Link from 'next/link'
import VideoList from './_component/VideoList'
import { VideoData } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { db } from '@/configs/db'

function page() {
    const [videoList, setVideoList] = useState([])
    const {user}=useUser()
    const GetVideoList = async () => {
        const result=await db.select().from(VideoData).where(eq(VideoData.createdBy,user?.primaryEmailAddress?.emailAddress))
        console.log(result);
        setVideoList(result)
    }
    useEffect(() => {
      user && GetVideoList()
    }, [user])
    
    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl text-primary'>Dashboard</h2>
                <Link href={"/dashboard/create-new"}>
                    <Button>+ Create new</Button>
                </Link>
            </div>
            <div>
                {
                    videoList?.length == 0 && <EmptyState />
                }
            </div>
            <VideoList videoList={videoList} />
        </div>
    )
}

export default page