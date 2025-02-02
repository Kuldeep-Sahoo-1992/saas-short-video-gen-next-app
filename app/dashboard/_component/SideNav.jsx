"use client"
import React from 'react'
import { CircleUser, FileVideo, PanelsTopLeft, ShieldIcon, UserCircle } from "lucide-react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const SideNav = () => {
    const MenuOption = [
        {
            id: 1,
            name: "Dashboard",
            path: "/dashboard/dashboard",
            icon: PanelsTopLeft
        },
        {
            id: 2,
            name: "Create New",
            path: "/dashboard/create-new",
            icon: FileVideo
        },
        {
            id: 3,
            name: "Upgrade",
            path: "/dashboard/upgrade",
            icon: ShieldIcon
        },
        {
            id: 4,
            name: "Account",
            path: "/dashboard/account",
            icon: CircleUser
        },
    ]
    const path = usePathname()
    console.log(path);
    
    return (
        <div className='w-64 h-screen shadow-md p-4  '>
            <div className='grid gap-2'>
                {
                    MenuOption.map((item) => (
                        <Link href={item.path} key={item.id}>
                            <div  className={`flex items-center gap-3 p-2 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${path===item.path ? "bg-primary":""}`}>
                                <item.icon />
                                <h2>{item.name}</h2>
                                <div />
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default SideNav