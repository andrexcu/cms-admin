"use client";

import { useStoreModal } from "@/app/hooks/useStoreModal";
import { Modal } from "@/components/ui/Modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Hydrate } from "@/components/Hydrate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "Cannot be empty" }),
  type: z.string().min(1, { message: "Cannot be empty" }),
});

type TformSchema = z.infer<typeof formSchema>;

export const StoreModal = () => {
  const types = ["Personal", "Organization"];

  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TformSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });

  // let { isLoading } = form.formState;
  const router = useRouter();

  const onSubmit = async (values: TformSchema) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      form.reset({
        name: "",
        type: "",
      });
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Hydrate>
      <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <div className="flex flex-col space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="py-2" />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
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
                            placeholder="Select a type"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  type="button"
                  disabled={isLoading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </Hydrate>
  );
};
