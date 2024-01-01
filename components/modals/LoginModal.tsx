"use client";

import { signIn } from "next-auth/react";

import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Input from "@/components/AuthInput";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const handleSignIn = async (name: string) => {
    setIsLoading(true);
    try {
      await signIn(`${name}`, { callbackUrl: "/" });

      toast.success("Login successful!");

      // Display success toast
    } catch (error) {
      // Handle login error
      toast.error("Login failed. Please try again.");
    }
  };

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      {/* <button
        className="text-white"
        onClick={() => setIsLoading((state) => !state)}
      >
        TEST
      </button> */}
      <hr />
      <Button
        variant="outline"
        className="bg-slate-950 text-white"
        onClick={() => handleSignIn("google")}
        disabled={isLoading}
      >
        Continue with Google
      </Button>
      <Button
        className="bg-slate-950 text-white"
        variant="outline"
        disabled={isLoading}
        onClick={() => handleSignIn("github")}
      >
        Continue with Github
      </Button>
      <div
        className="
          
          text-center
          mt-4
          

        "
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="text-white">No Account Yet?</div>
          <button
            onClick={toggle}
            disabled={isLoading}
            className={`
              text-neutral-400
              cursor-pointer
              hover:underline
            `}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
