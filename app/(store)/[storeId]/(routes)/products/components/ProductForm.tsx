"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import ImageUpload from "@/components/ui/image-upload";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductSchema,
  TProductSchema,
} from "@/lib/Validation/ProductsValidation";
import { Check, RotateCcw } from "lucide-react";

interface ProductFormProps {
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
}

const ProductForm = ({
  categories,
  sizes,
  colors,
  initialData,
}: ProductFormProps) => {
  const title = "Create Product";
  const description = "New product for your store";
  const toastMessage = "Product created";
  const action = "Create";

  const form = useForm<TProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      images: [],
      isFeatured: false,
      isArchived: false,
      categoryId: "",
      sizeId: "",
      colorId: "",
    },
  });

  const {
    formState: { errors },
    reset,
    watch,
  } = form;
  const name = watch("name");
  const price = watch("price");
  const images = watch("images");
  const isFeatured = watch("isFeatured");
  const isArchived = watch("isArchived");
  const categoryId = watch("categoryId");
  const sizeId = watch("sizeId");
  const colorId = watch("colorId");

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onSubmit = async (data: TProductSchema) => {
    try {
      setIsLoading(true);

      await axios.post(`/api/stores/${params.storeId}/products/`, data);

      location.reload();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DrawerContent className="h-[80%] ">
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle className="flex flex-row justify-between">
            <div className="hidden sm:flex">
              <Heading title={title} description={description} />
            </div>
            <div className="flex sm:hidden"></div>
            <div className="flex gap-4 items-center">
              <div className="group">
                <Button
                  disabled={isLoading}
                  variant="default"
                  className="overflow-hidden rounded-full"
                  size="md"
                >
                  <RotateCcw className="h-4 w-4" />
                  <p onClick={() => reset()} className="text-md px-2">
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

        <div className=" h-[600px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-between">
                <div className="">
                  <div className="flex flex-row p-4 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Name {errors.name?.message}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Product name"
                              {...field}
                              disabled={isLoading}
                              className="hover:bg-slate-300/20 bg-slate-500/10"
                              maxLength={151}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Price {errors.name?.message}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Price"
                              {...field}
                              disabled={isLoading}
                              className="hover:bg-slate-300/20 bg-slate-500/10"
                              maxLength={151}
                              type="number"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>
                            Category {errors.categoryId?.message}
                          </FormLabel>
                          <Select
                            disabled={isLoading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a category"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.length > 0 ? (
                                categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none" disabled>
                                  No categories found.
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex flex-row mt-2 gap-x-4 p-4 ">
                      <FormField
                        control={form.control}
                        name="sizeId"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Size {errors.sizeId?.message}</FormLabel>
                            <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select a size"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizes.length > 0 ? (
                                  sizes.map((size) => (
                                    <SelectItem key={size.id} value={size.id}>
                                      {size.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="none" disabled>
                                    No sizes found.
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="colorId"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>
                              Color {errors.colorId?.message}
                            </FormLabel>
                            <Select
                              disabled={isLoading}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select a color"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {colors.length > 0 ? (
                                  colors.map((color) => (
                                    <SelectItem key={color.id} value={color.id}>
                                      {color.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="none" disabled>
                                    No colors found.
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex lg:block ">
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 randed-md  p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Featured</FormLabel>
                              <FormDescription className="">
                                This product will appear on the home page
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isArchived"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 randed-md  p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Archived</FormLabel>
                              <FormDescription className="">
                                This product will not appear anywhere in the
                                store.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem className="text-outline overflow-hidden">
                        <FormControl className="overflow-hidden">
                          <div className="overflow-hidden">
                            <ImageUpload
                              value={field.value.map((image) => image.url)}
                              disabled={isLoading}
                              onChange={(urls: any) => {
                                const updatedValue = [
                                  ...field.value,
                                  ...urls.map((url: any) => ({ url })),
                                ];
                                field.onChange(updatedValue);
                              }}
                              onRemove={(url) =>
                                field.onChange([
                                  ...field.value.filter(
                                    (current) => current.url !== url
                                  ),
                                ])
                              }
                              error={errors.images?.message}
                              type="product"
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="group">
                <div className="flex flex-row items-center">
                  <p className="absolute bottom-4 right-6 text-muted-foreground text-md opacity-0 pr-12 group-hover:opacity-100 transition-opacity duration-250">
                    {action}
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

export default ProductForm;
