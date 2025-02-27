"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";

const Form = () => {
    const { conversationId } = useConversation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", { shouldValidate: true });
        axios.post("/api/messages", {
            ...data,
            conversationId,
        })
    }

    const handleUpload = (result: any) => {
        console.log('Upload result:', result);
    
        const secureUrl = result?.info?.secure_url;
    
        if (!secureUrl) {
            console.error('Failed to retrieve secure URL from upload result');
            return;
        }
    
        axios.post("/api/messages", {
            image: secureUrl,
            conversationId,
        })
        .then(() => {
            console.log('Image successfully sent to the server');
        })
        .catch((error) => {
            console.error('Error while sending image to the server:', error);
        });
    };
    

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{
                    maxFiles: 1,
                }}
                onSuccess={(result) => {
                    console.log('Upload Button Triggered');
                    handleUpload(result);
                }}
                uploadPreset="pnhbtfs3"
            >
                <HiPhoto size={30} className="text-sky-500" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
                <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div>
    )
}

export default Form;