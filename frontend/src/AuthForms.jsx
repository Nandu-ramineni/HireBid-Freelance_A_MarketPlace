'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsFillGearFill, BsFacebook, BsMicrosoft } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const AuthForms = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && <BsFillGearFill className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </div>
                </form>
                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase my-2 ">
                        <span className="bg-background px-2 text-muted-foreground my-2">Or continue with</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-full">
                        <FcGoogle className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        <BsMicrosoft className="mr-2 h-4 w-4" />
                        Microsoft
                    </Button>
                    <Button variant="outline" className="w-full">
                        <BsFacebook className="mr-2 h-4 w-4" />
                        Facebook
                    </Button>
                </div>
            </TabsContent>
            <TabsContent value="register">
                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="new-password"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && <BsFillGearFill className="mr-2 h-4 w-4 animate-spin" />}
                            Sign Up
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase my-2">
                        <span className="bg-background px-2 text-muted-foreground my-2">Or continue with</span>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="w-full">
                        <FcGoogle className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        <BsMicrosoft className="mr-2 h-4 w-4" />
                        Microsoft
                    </Button>
                    <Button variant="outline" className="w-full">
                        <BsFacebook className="mr-2 h-4 w-4" />
                        Facebook
                    </Button>
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default AuthForms;
