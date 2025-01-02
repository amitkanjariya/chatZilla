"use client"

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./ui/inputs/Input";
import Button from "./ui/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.status==="authenticated"){
            router.push('/users');
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant==='LOGIN'){
            setVariant('REGISTER');
        } else{
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        if(variant==='REGISTER'){
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error("Something went wrong!!"))
            .finally(() => setIsLoading(false))
        }
        if(variant==='LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error){
                    toast.error("Invalid Credentials");
                }
                if(callback?.ok && !callback?.error){
                    toast.success("Logged in successfully");
                    router.push("/users");
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        signIn(action, {redirect: false})
        .then((callback) => {
            if(callback?.error){
                toast.error("Invalid Credentials");
            }
            if(callback?.ok && !callback?.error){
                toast.success("Logged in Successfully");
            }
        })
        .finally(() => setIsLoading(false));
    }
    return(
        <div className="mt-8 sm:max-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    { variant==='REGISTER' && (
                        <Input 
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}  
                            disabled={isLoading}  
                        />
                    )}
                    <Input 
                        id="email"
                        label="Email address"
                        type="email"
                        register={register}
                        errors={errors}    
                        disabled={isLoading}  
                    />
                    <Input 
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}    
                        disabled={isLoading}  
                    />
                    <div>
                        <Button 
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                        >
                            {variant==='LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or Continue With
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton 
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton 
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant==='LOGIN' ? "New to ChatZilla?" : "Already have an account"}
                    </div>
                    <div onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant==='LOGIN' ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default AuthForm;