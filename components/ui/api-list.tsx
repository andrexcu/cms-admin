"use client";

import { useOrigin } from "@/app/hooks/useOrigin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";
import { ChevronsUpDown, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = `${origin}/api/stores/${params.storeId}`;
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4">
          <h4 className="text-sm font-semibold">NEXT API ENDPOINTS</h4>
          <div>
            {!isOpen ? (
              <span className="bg-muted rounded-full px-2 text-sm">
                Expand to view private routes
              </span>
            ) : (
              <span className="bg-muted rounded-full px-2 text-sm text-red-500">
                Private routes being shown
              </span>
            )}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown
                  className={cn(
                    "h-4 w-4 ",
                    isOpen
                      ? "transform rotate-90 transition duration-300"
                      : "transform rotate-180 transition duration-300"
                  )}
                />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        <ApiAlert
          title="GET"
          variant="public"
          description={`${baseUrl}/${entityName}`}
        />
        <ApiAlert
          title="GET"
          variant="public"
          description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        />
        <CollapsibleContent className="space-y-2">
          <ApiAlert
            title="POST"
            variant="admin"
            description={`${baseUrl}/${entityName}`}
          />
          <ApiAlert
            title="PATCH"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          />
          <ApiAlert
            title="DELETE"
            variant="admin"
            description={`${baseUrl}/${entityName}/{${entityIdName}}`}
          />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default ApiList;
