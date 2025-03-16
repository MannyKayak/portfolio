"use client";
import React from "react";
import Link from "next/link";

import { handleReturnHome } from "../utils/Functions";

const Page = () => {
  return (
    <div>
      Education Page
      <div onClick={() => handleReturnHome("education")}>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default Page;
