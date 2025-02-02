import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='p-3 px-3 flex items-center justify-between shadow-md'>
            <div className='flex gap-3 items-center '>
                <Image src={"/logo3.webp"} width={30} height={30} alt='ai' />
                <h2 className='font-bold'>AI Short Vid</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <Button>DashBoard</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header