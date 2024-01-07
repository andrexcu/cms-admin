"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "green",
  admin: "destructive",
};

export const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard.");
  };

  return (
    <Alert className="h-auto break-all">
      <AlertTitle className="flex justify-between items-center gap-x-2">
        <div className="flex items-center gap-2">
          <Server size={20} />
          {title}
        </div>
        <div className="flex flex-row gap-2">
          <Copy
            size={16}
            onClick={onCopy}
            className="block md:hidden cursor-pointer"
          />
          <Badge variant={variantMap[variant]} className="cursor-default">
            {textMap[variant]}
          </Badge>
        </div>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between gap-x-4">
        <code
          className="px-[0.3rem] py-[0.2rem] font-mono border border-input bg-background hover:bg-accent hover:text-accent-foreground
        inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        "
        >
          {description}
        </code>
        {/* <Button variant="outline" size="icon" onClick={onCopy}> */}
        <Copy
          size={16}
          onClick={onCopy}
          className="hidden md:block cursor-pointer"
        />
        {/* </Button> */}
      </AlertDescription>
    </Alert>
  );
};
