"use client";
import Authform from "@/app/components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
   <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8 bg-gray-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md ">
      <Image src="/images/logo.png" alt="logo" height={40} width={66} className="mx-auto w-auto"/>
      <h2 className="mt-1 text-center text-3xl font-bold tracking-tight text-gray-900"> 
        Sign in to your account
      </h2>
    </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-md mt-1 w-full">
    <Authform/>
    </div>
   </div>
  );
}
