"use client";
import Link from "next/link";
import { handleReturnHome } from "../utils/Functions";
const KayakGamePage = () => {
  return (
    <div>
      <div onClick={() => handleReturnHome("kayakGame")}>
        <Link href={"/"}>Return home</Link>
      </div>
    </div>
  );
};

export default KayakGamePage;
