import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="relative h-screen">
        <Image
          fill
          src="/images/croissant.jpg"
          alt="logo"
          className="object-cover"
        />
        <div className="absolute flex justify-center w-full items-center h-full">
          <h3 className="text-white text-[70px] font-semibold shadow-md">
            bread
          </h3>
        </div>
      </div>
    </>
  );
}
