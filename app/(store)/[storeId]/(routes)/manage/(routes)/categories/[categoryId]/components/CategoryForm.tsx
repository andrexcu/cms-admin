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
import {
  CategorySchema,
  TCategorySchema,
} from "@/lib/Validation/CategoriesValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";

import axios from "axios";
import { LogOut, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CategoryFormProps {
  billboards: Billboard[];
  initialData: Category | null;
}

const CategoryForm = ({ initialData, billboards }: CategoryFormProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!initialData) {
      router.push(`/${params.storeId}/manage/categories
      `);
    }
  });

  if (!initialData) {
    return null;
  }

  const title = initialData ? "Edit Category" : "Create Category";
  const description = initialData ? "Edit a Category" : "Add a new Category";
  const toastMessage = initialData ? "Category Updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const {
    formState: { errors },
  } = form;
  const onSubmit = async (data: TCategorySchema) => {
    try {
      setIsLoading(true);

      await axios.patch(
        `/api/stores/${params.storeId}/categories/${initialData?.id}`,
        data
      );

      router.push(`/${params.storeId}/manage/categories`);
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
        `/api/stores/${params.storeId}/categories/${initialData?.id}`
      );
      router.push(`/${params.storeId}/manage/categories`);
      router.refresh();
      toast.success("Category deleted.");
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this Category first."
      );
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
        <Link href={`/${params.storeId}/manage/categories`}>
          <LogOut className="transform hover:translate-x-2 transition duration-300" />
        </Link>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col md:flex-row gap-8 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="md:w-[520px]">
                  <FormLabel>Name {errors.name?.message}</FormLabel>
                  <FormControl>
                    <>
                      <Input
                        placeholder="Category Name"
                        {...field}
                        disabled={isLoading || billboards.length < 1}
                        className="hover:bg-slate-300/20 bg-slate-500/10  "
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem className="md:w-[520px]">
                  <FormLabel>Billboard {errors.billboardId?.message}</FormLabel>
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
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.length > 0 ? (
                        billboards.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No billboards found.
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
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
                Delete Billboard
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

export default CategoryForm;
