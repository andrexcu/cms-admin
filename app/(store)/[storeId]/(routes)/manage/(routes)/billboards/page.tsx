"use client";

import React from "react";

import Heading from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import BillboardClient from "./components/Client";

const BillboardsPage = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={[]} />
        </div>
      </div>
    </>
  );
};

export default BillboardsPage;
