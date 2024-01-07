"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
// import "@uploadthing/react/styles.css"

import { UploadButton } from "@/src/utils/uploadthing";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
  type: string;
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
  label,
  error,
  type,
}: ImageUploadProps) {
  const [currentValue, setCurrentValue] = useState<string[]>([]);

  const onUpload = (result: any) => {
    // console.log(JSON.parse(result));
    const parsedResult = JSON.parse(result);

    const url = parsedResult[0].url;
    if (type === "billboard") {
      onChange(url);
    }

    const urls = parsedResult.map((item: any) => item.url);
    if (type === "product") {
      onChange(urls);
    }
  };

  return (
    <>
      <div className="flex flex-col ml-6 items-start justify-start">
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button({ ready, isUploading }) {
              return `text-sm text-white bg-zinc-900 ${
                ready
                  ? "bg-zinc-800 mr-16 rounded-none px-4"
                  : "bg-zinc-900 text-black cursor-not-allowed"
              } ${isUploading ? "bg-zinc-900" : ""}`;
            },
            container: "rounded-none pr-2 custom-container",
            allowedContent: "hidden",
          }}
          onClientUploadComplete={(res) => {
            if (res) {
              const json = JSON.stringify(res);
              onUpload(json);
            }
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
        <div className="">
          <Carousel
            className={`border border-secondary
            ${type === "product" ? "h-[200px] lg:h-[420px]" : "h-[420px]"}
          }`}
          >
            <CarouselContent className="m-2">
              {value.length === 0 && (
                <CarouselItem className="p-2">
                  <Card className="rounded-lg">
                    <CardContent
                      className={`relative bg-secondary flex items-center justify-center rounded-lg
                  ${
                    type === "product" ? "h-[165px] lg:h-[380px]" : "h-[420px]"
                  }`}
                    >
                      <p className="absolute max-w-md text-md text-center break-words">
                        {type === "product" && error && (
                          <span className="text-red-700">
                            Product Image is required
                          </span>
                        )}
                        {type === "product" && !error && (
                          <span className="text-muted-foreground">
                            Product Image
                          </span>
                        )}
                        {type === "billboard" && error && (
                          <span className="text-red-700">
                            Billboard Image is required
                          </span>
                        )}
                        {type === "billboard" && !error && (
                          <span className="text-muted-foreground">
                            Billboard Image
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              {value.map((url) => (
                <CarouselItem key={url} className="p-2">
                  <Card className="rounded-lg">
                    <CardContent
                      className={`relative bg-secondary flex items-center justify-center rounded-lg
                    ${
                      type === "product"
                        ? "h-[165px] lg:h-[380px]"
                        : "h-[420px]"
                    }`}
                    >
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
            <CarouselPrevious
              className={`${value.length <= 1 ? "hidden" : ""}`}
            />
            <CarouselNext className={`${value.length <= 1 ? "hidden" : ""}`} />
          </Carousel>
        </div>
      </div>
    </>
  );
}
