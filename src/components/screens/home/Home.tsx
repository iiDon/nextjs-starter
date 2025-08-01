"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogInIcon } from "lucide-react";

const Home = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        size="lg"
        onClick={async () => {
          const res = await signIn("credentials", {
            email: "admin@admin.com",
            password: "123456",
            redirect: false,
            callbackUrl: "/dashboard",
          });
          if (res.error) {
            toast.error(res.code);
          } else {
            router.push("/dashboard");
          }
        }}
      >
        <LogInIcon className="w-4 h-4" />
        <span>تسجيل الدخول</span>
      </Button>
    </div>
  );
};

export default Home;
