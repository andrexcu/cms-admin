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
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BillboardSchema,
  TBillboardSchema,
} from "@/lib/Validation/BillboardsValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { LogOut, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!initialData) {
      router.push(`/${params.storeId}/manage/billboards`);
    }
  });

  if (!initialData) {
    return null;
  }

  const title = "Update billboard";
  const description = "Edit this billboard";
  const toastMessage = initialData
    ? "Billboard Updated."
    : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<TBillboardSchema>({
    resolver: zodResolver(BillboardSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: TBillboardSchema) => {
    try {
      setIsLoading(true);

      await axios.patch(
        `/api/stores/${params.storeId}/billboards/${initialData?.id}`,
        data
      );

      router.push(`/${params.storeId}/manage/billboards`);
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
        `/api/stores/${params.storeId}/billboards/${initialData?.id}`
      );
      router.push(`/${params.storeId}/manage/billboards`);
      router.refresh();
      toast.success("Billboard deleted.");
    } catch (error) {
      toast.error(
        "Make sure you remove categories using this billboard first."
      );
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };
  const {
    formState: { errors },
    reset,
    watch,
  } = form;
  const label = watch("label");
  const imageUrl = watch("imageUrl");
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
        <Link href={`/${params.storeId}/manage/billboards`}>
          <LogOut className="transform hover:translate-x-2 transition duration-300" />
        </Link>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-x-1">
                  <FormLabel>Background image</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    label={label}
                    error={errors.label?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 md:flex-row justify-between items-center ">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem className="ml-6 relative">
                  <FormLabel className="absolute bottom-12">Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Billboard label"
                      {...field}
                      disabled={isLoading}
                      className="hover:bg-slate-300/20 bg-slate-500/10 "
                      maxLength={151}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-x-2">
              <Button
                type="button"
                onClick={() => setOpen(true)}
                variant="destructive"
                disabled={isLoading}
                className=""
                size="md"
              >
                Delete Billboard
              </Button>
              <Button variant="outline" disabled={isLoading} className="">
                {action}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
