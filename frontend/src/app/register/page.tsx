"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema, RegisterUserForm } from "../lib/userSchema";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
    const searchParams = useSearchParams();
    const emailFromQuery = searchParams.get("email") || "";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterUserForm>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: { email: emailFromQuery}
    });

    const onSubmit = (data: RegisterUserForm) => {
        console.log("Register Data:", data);

    }
    
    return (
        <section className="flex py-24 px-20 items-center justify-center">
            <div className="max-w-md mx-auto mt-10 p-8 rounded-md shadow-md shadow-zinc-800 bg-transparent border border-zinc-700">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        {...register("name")}
                        placeholder="Name"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-sm"
                        type="name"
                    />
                    {errors.name && <p className="text-red-500 mb-4">{errors.name.message}</p>}
                    <input 
                        {...register("email")}
                        placeholder="Email"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-sm"
                        type="email"
                    />
                    {errors.email && <p className="text-red-500 mb-4">{errors.email.message}</p>}
                    <input 
                        {...register("password")}
                        placeholder="Password"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-sm"
                        type="password" />
                    {errors.password && <p className="text-red-500 mb-4">{errors.password.message}</p>}
                    <input 
                        {...register("confirmPassword")}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-sm"
                        type="confirmPassword" />
                    {errors.confirmPassword && <p className="text-red-500 mb-4">{errors.confirmPassword.message}</p>}
                    <button
                        type="submit"
                        className="border border-gray-300 px-4 py-2 rounded-xs">Register</button>
                </form>
            </div>
        </section>
    )
}