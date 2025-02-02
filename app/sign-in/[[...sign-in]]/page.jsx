import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return <div className="grid grid-cols-1 md:grid-cols-2">
    <div className="">
      <Image className="w-fill object-contain" src="/login.jpg" alt="login" width={650} height={600}/>
    </div>
    <div className="flex justify-center h-screen items-center">
      <SignIn />
    </div>
  </div>
}
