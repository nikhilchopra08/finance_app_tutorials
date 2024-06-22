import { Loader2 } from "lucide-react";
import { SignIn , ClerkLoading , ClerkLoaded} from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full lg:flex flex-col justify-center items-center px-4"> 
            <div className="text-center space-y-4 pt-16">
                <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back</h1>
                <p className="text-base text-[#7E8CA0]">Login or Create Account to get back to your dashboard</p>
            </div>
            <div className="flex items-center justify-center mt-8">
                <ClerkLoaded>
                    <SignIn />
                </ClerkLoaded>
                <ClerkLoading>
                    <Loader2 className="animated-spin text-muted-foreground"/>
                </ClerkLoading>
            </div>
        </div>
        <div className="h-full hidden lg:flex bg-blue-300 items-center justify-center">
            <Image src="/next.svg" height={100} width={100} alt="logo"/>
        </div>
    </div>
  );
}