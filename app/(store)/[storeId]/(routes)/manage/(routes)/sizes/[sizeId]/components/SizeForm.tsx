"use client";

import { AlertModal } from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SizeSchema, TSizeSchema } from "@/lib/Validation/SizesValidation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Size } from "@prisma/client";

import axios from "axios";
import { LogOut, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface SizeFormProps {
  initialData: Size | null;
}

const SizeForm = ({ initialData }: SizeFormProps) => {
  const form = useForm<TSizeSchema>({
    resolver: zodResolver(SizeSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const {
    formState: { errors },
  } = form;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!initialData) {
      router.push(`/${params.storeId}/manage/sizes
      `);
    }
  });

  if (!initialData) {
    return null;
  }

  const title = initialData ? "Edit Size" : "Create Size";
  const description = initialData ? "Edit a Size" : "Add a new Size";
  const toastMessage = initialData ? "Size Updated." : "Size created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit = async (data: TSizeSchema) => {
    try {
      setIsLoading(true);

      await axios.patch(
        `/api/stores/${params.storeId}/sizes/${initialData?.id}`,
        data
      );

      router.push(`/${params.storeId}/manage/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${initialData?.id}`
      );
      router.push(`/${params.storeId}/manage/sizes`);
      router.refresh();
      toast.success("Size deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <Link href={`/${params.storeId}/manage/sizes`}>
          <LogOut className="transform hover:translate-x-2 transition duration-300" />
        </Link>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full "
        >
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-[300px] md:w-[520px]">
                  <FormLabel>Name {errors.name?.message}</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Size Name"
                        {...field}
                        disabled={isLoading}
                        className="hover:bg-slate-300/20 bg-slate-500/10  "
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="md:w-[520px]">
                  <div className="">
                    <FormLabel>Value {errors.value?.message}</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Size value"
                      {...field}
                      disabled={isLoading}
                      className="hover:bg-slate-300/20 bg-slate-500/10 w-[200px] md:w-[300px]"
                      maxLength={51}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row gap-2 justify-center md:justify-start">
            <div>
              <Button
                type="button"
                onClick={() => setOpen(true)}
                variant="destructive"
                disabled={isLoading}
                className=""
                size="md"
              >
                Delete Size
              </Button>
            </div>
            <div>
              <Button disabled={isLoading} className="ml-auto">
                {action}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SizeForm;
