import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'  // Import VisuallyHidden component

import React from 'react'

const CustomLoading = ({ loading }) => {
    return (
        <AlertDialog open={loading} >
            <AlertDialogContent className="border-4 border-primary rounded-xl w-full">
                {/* VisuallyHidden for accessibility */}
                <VisuallyHidden>
                    <AlertDialogTitle>Loading</AlertDialogTitle>
                </VisuallyHidden>

                <div className="flex justify-center items-center my-10 flex-col">
                    <Image src={"/progress.gif"} width={300} height={300} alt="Loading..." />
                    <h4 className="text-4xl">Generating Your Video...Do not Refresh</h4>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default CustomLoading
