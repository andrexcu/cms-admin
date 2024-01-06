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
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import ImageUpload from "@/components/ui/image-upload";
import { Check, Plus, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorSchema, TColorSchema } from "@/lib/Validation/ColorsValidation";

const ColorForm = () => {
  const title = "Create Color";
  const description = "Create Color";
  const toastMessage = "Color created.";
  const action = "Create";

  const form = useForm<TColorSchema>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      name: "",
      value: "",
    },
  });

  const {
    formState: { errors },
    reset,
    watch,
  } = form;
  const name = watch("name");
  const billboardId = watch("value");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onSubmit = async (data: TColorSchema) => {
    try {
      setIsLoading(true);

      await axios.post(`/api/stores/${params.storeId}/colors/`, data);

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
                    onClick={() => reset({ name: "", value: "" })}
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
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 p-10">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <div className="flex flex-row items-center">
                        <FormLabel>Name {errors.name?.message}</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Color Name"
                          {...field}
                          disabled={isLoading}
                          className="hover:bg-slate-300/20 bg-slate-500/10 w-[300px] md:w-[400px]"
                          maxLength={51}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className=" ">
                      <div className="flex flex-row items-center">
                        <FormLabel>Value {errors.value?.message}</FormLabel>
                      </div>
                      <FormControl>
                        <div className="flex flex-row items-center gap-x-4">
                          <Input
                            placeholder="Color value (hex)"
                            {...field}
                            disabled={isLoading}
                            className="hover:bg-slate-300/20 bg-slate-500/10 w-[200px] md:w-[300px]"
                            maxLength={51}
                          />
                          <div
                            className="border p-4 rounded-full"
                            style={{ backgroundColor: field.value }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* to`p-`12 */}
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

export default ColorForm;
