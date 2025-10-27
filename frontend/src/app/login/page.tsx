"use client";
import { useForm } from "react-hook-form";
import { UserForm, userSchema } from "../lib/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function LoginPage() {
    const { 
        register, 
        handleSubmit,
        formState: { errors }, 
    } = useForm<UserForm>({
            resolver: zodResolver(userSchema),
        });
    
    const onSubmit = (data: UserForm) => {
        console.log("Login Data:", data);

    }

    return (
        <section className="flex py-24 px-20 items-center justify-center">
            <div className="max-w-md mx-auto mt-10 p-8 rounded-md shadow-md shadow-zinc-800 bg-transparent border border-zinc-700">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        {...register("email")}
                        placeholder="Email"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-sm"
                        type="email"
                    />
                    {errors.email && <p className="text-red-500 mb-4">{errors.email.message}</p>}
                    <input 
                        {...register("password")}
                        placeholder="password"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-sm"
                        type="password" />
                    {errors.password && <p className="text-red-500 mb-4">{errors.password.message}</p>}
                    <button
                        type="submit"
                        className="border border-gray-300 px-4 py-2 rounded-xs">Login</button>
                </form>
            </div>
        </section>
    )
}