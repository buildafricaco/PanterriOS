"use client";

import { Header } from "@/components/home/header";
import HomeHero from "@/components/home/homeHero";
export default function HomePage() {
  const date = new Date().getFullYear();

  return (
    <div className=" h-screen white w-full relative">
      <Header />
      <HomeHero />
      <div className="  items-center pt-8 text-sm sm:text-base md:flex-row text-center text-gray-300 w-full   -translate-x-1/2 left-1/2 bottom-5 absolute ">
        <p>&copy; {date} Panterrium. Secure admin infrastructure.</p>
      </div>
    </div>
  );
}
