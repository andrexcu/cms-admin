"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
// import "@uploadthing/react/styles.css"

import { UploadButton } from "@/src/utils/uploadthing";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FormLabel } from "./form";
import { FieldError } from "react-hook-form";
import { Button } from "./button";
import { X } from "lucide-react";

interface ImageProps {
  name: string;
  size: number;
  key: string;
  serverData: {
    uploadedBy: string;
  };
  url: string;
}
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  label?: string;
  error: string | undefined;
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
  label,
  error,
}: ImageUploadProps) {
  const [currentValue, setCurrentValue] = useState<string[]>([]);

  const onUpload = (result: any) => {
    const parsedResult = JSON.parse(result);

    const url = parsedResult[0]?.url;

    if (url) {
      onChange(url);
    }
  };

  return (
    <>
      <div className="flex flex-col ml-6 items-start justify-start">
        {/* <FormLabel className="cursor-default text-muted-foreground">
          Upload an image
        </FormLabel> */}
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button({ ready, isUploading }) {
              return `text-sm text-white bg-zinc-900 ${
                ready
                  ? "bg-zinc-800 mr-16 rounded-none px-6"
                  : "bg-zinc-900 text-black cursor-not-allowed"
              } ${isUploading ? "bg-zinc-900" : ""}`;
            },
            container: "rounded-none pr-2 custom-container",
            allowedContent: "hidden",
          }}
          onClientUploadComplete={(res) => {
            if (res) {
              // setImages(res);

              const json = JSON.stringify(res);
              onUpload(json);
              // console.log(json);
              // console.log(value);
            }
            //alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      {/* bg-black transition duration-300 ease-in-out transform hover:scale-105 */}
      {/* rounded-lg flex items-center justify-center p-6  */}
      <div className="flex flex-col gap-y-2 w-full p-6">
        {!label && error && (
          <span className="text-red-700">Product Image is required</span>
        )}
        {!label && !error && <span>Product Image</span>}
        <div className="overflow-hidden">
          <Carousel
            className={`h-[420px] border border-secondary
          }`}
            orientation={`${value.length > 1 ? "horizontal" : "vertical"}`}
          >
            <CarouselContent className="m-2">
              {value.map((url) => (
                <CarouselItem key={url} className="p-2">
                  <Card className="rounded-lg">
                    <CardContent className="relative h-[380px] bg-secondary flex items-center justify-center rounded-lg">
                      <Image
                        src={url}
                        alt="image"
                        fill
                        sizes="100vh"
                        className={`object-cover h-[400px] ${
                          label && value.length <= 1
                            ? "transition duration-300 ease-in-out transform hover:scale-110 opacity-70"
                            : ""
                        }`}
                        priority
                      />
                      <p className="absolute top-0 right-0">
                        <X
                          size={30}
                          className="text-primary"
                          onClick={() => onRemove(url)}
                        />
                      </p>

                      {label && (
                        <p className="absolute top-30 p-4 max-w-md text-2xl text-bold text-center text-primary break-words">
                          {label}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}
