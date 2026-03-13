'use client';

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { AuthForm } from "@/features/auth";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Tabs 
        defaultValue="login" 
        onValueChange={(v) => setActiveTab(v as "login" | "register")} 
        className="w-full max-w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <AuthForm type="login" />
        </TabsContent>

        <TabsContent value="register">
          <AuthForm type="register" />
        </TabsContent>
      </Tabs>
    </div>
  );
}