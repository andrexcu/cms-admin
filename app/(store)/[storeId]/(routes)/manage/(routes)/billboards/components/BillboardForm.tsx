"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import ImageUpload from "@/components/ui/image-upload";
import {
  BillboardSchema,
  TBillboardSchema,
} from "@/lib/Validation/BillboardsValidation";
import { Check, Plus, RotateCcw } from "lucide-react";

const BillboardForm = () => {
  const title = "Create billboard";
  const description = "New billboard for your store";
  const toastMessage = "Billboard created";

  const form = useForm<TBillboardSchema>({
    resolver: zodResolver(BillboardSchema),
    defaultValues: {
      label: "",
      imageUrl: "",
    },
  });

  const {
    formState: { errors },
    reset,
    watch,
  } = form;
  const label = watch("label");
  const imageUrl = watch("imageUrl");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onSubmit = async (data: TBillboardSchema) => {
    try {
      setIsLoading(true);

      await axios.post(`/api/stores/${params.storeId}/billboards/`, data);

      location.reload();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(hasError);

  return (
    <DrawerContent className="h-[80%] ">
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle className="flex flex-row justify-between">
            <div className="hidden sm:flex">
              <Heading title={title} description={description} />
            </div>
            <div className=""></div>
            <div className="flex gap-4 items-center">
              <div className="group">
                <Button
                  disabled={isLoading}
                  variant="default"
                  className="overflow-hidden rounded-full"
                  size="md"
                >
                  <RotateCcw className="h-4 w-4" />
                  <p
                    onClick={() => reset({ label: "" })}
                    className="text-md px-2"
                  >
                    Reset field
                  </p>
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <Separator />
        <div className="">
          {/* <div className=""> */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="grid grid-cols-3 gap-8 mt-2">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="ml-6 ">
                      <FormLabel>Label {errors.label?.message}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Billboard label"
                          {...field}
                          disabled={isLoading}
                          className="hover:bg-slate-300/20 bg-slate-500/10"
                          maxLength={151}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <>
                    <FormItem className="text-outline ">
                      <div>
                        <FormControl className="">
                          <ImageUpload
                            value={field.value ? [field.value] : []}
                            disabled={isLoading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                            label={label}
                            error={errors.imageUrl?.message}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  </>
                )}
              />
              {/* top-12 */}
              <div className="group">
                <div className="flex flex-row items-center">
                  <p className="absolute bottom-4 right-6 text-muted-foreground text-md opacity-0 pr-12 group-hover:opacity-100 transition-opacity duration-250">
                    {description}
                  </p>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    className="absolute bottom-2 right-2 overflow-hidden group-hover:rounded-full group-hover:bg-accent transition-all duration-250 p-3 group-hover:p-2"
                    size="lg"
                  >
                    <Check size={28} />
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DrawerContent>
  );
};

export default BillboardForm;
