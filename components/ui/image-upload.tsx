"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
// import "@uploadthing/react/styles.css"

import { UploadButton } from "@/src/utils/uploadthing";

import { useState } from "react";
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
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  // const [images, setImages] = useState<ImageUploadProps[]>();

  const onUpload = (result: any) => {
    const parsedResult = JSON.parse(result);
    const url = parsedResult[0]?.url;
    if (url) {
      onChange(url); // Update with the URL value
    }
  };

  // console.log(value);

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
      <div className="w-full p-6">
        <Carousel
          className={`h-[420px] border border-secondary overflow-hidden
          `}
        >
          <CarouselContent className="m-2">
            <CarouselItem className="p-2">
              <Card className="rounded-lg ">
                {value.length >= 1 ? (
                  value?.map((url) => (
                    <CardContent
                      key={url}
                      className="relative h-[380px] bg-secondary flex items-center justify-center rounded-lg opacity-60"
                    >
                      <Image
                        src={url}
                        alt="image"
                        fill
                        sizes="100vh"
                        className="object-cover h-[400px] transition duration-300 ease-in-out transform hover:scale-110"
                      />

                      <p className="absolute top-0 right-0">
                        <X
                          size={30}
                          className="text-primary"
                          onClick={() => onRemove(url)}
                        />
                      </p>
                    </CardContent>
                  ))
                ) : (
                  <CardContent className="relative h-[380px] bg-secondary flex items-center justify-center rounded-lg opacity-60">
                    <p className="text-muted-foreground">
                      No Image uploaded yet.
                    </p>
                  </CardContent>
                )}
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
