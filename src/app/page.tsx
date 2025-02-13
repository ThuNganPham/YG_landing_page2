"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Slide2 from "../components/Slide2";
import { LanguageProvider } from "../context/LanguageContext";
import Slide3 from "../components/Slide3";
import Slide4 from "../components/Slide4";
import Slide7 from "../components/Slide7";
import Slide6 from "../components/Slide6";
import MobileNav from "../components/MobileNavBar";
import Slide5 from "@/components/Slide5";

export default function LandingPage() {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    const disableScroll = (e: Event) => e.preventDefault();

    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", disableScroll, { passive: false });
    window.addEventListener("touchmove", disableScroll, { passive: false });
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(e.code)) {
        e.preventDefault();
      }
    });

    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("touchmove", disableScroll);
      window.removeEventListener("keydown", disableScroll);
      document.getElementById("slide2")?.scrollIntoView({ behavior: "smooth" });
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", disableScroll);
      window.removeEventListener("touchmove", disableScroll);
      window.removeEventListener("keydown", disableScroll);
    };
  }, []);




  return (
    <LanguageProvider>
      <div
        id="container"
        className="w-full h-screen flex flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth"

      >
        <Navbar />
        <MobileNav />

        <section
          id="slide1"
          className="w-full bg-black flex justify-center items-center snap-start min-h-screen mobile-ui:min-h-[600px] z-[1000]"
          style={{ height: imageHeight ? `${imageHeight}px` : "100vh" }}
        >
          <div className="relative w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute w-full h-full max-h-full max-w-full object-cover hidden sm:block"
            >
              <source src="/media/logo-fix-5.mp4" type="video/mp4" />
            </video>

            <Image
              src="/media/banner-mobile.svg"
              alt="Background"
              layout="intrinsic"
              width={1000}
              height={600}
              className="absolute top-0 left-0 w-full object-cover hidden image-banner:block"
              priority
              onLoad={(e) => setImageHeight(e.currentTarget.height)}
            />
          </div>
        </section>

        <section
          id="slide2"
          className="w-full bg-black flex justify-center items-center snap-start"
        >
          <Slide2 />
        </section>

        <section
          id="slide3"
          className="w-full h-[100vh] bg-white flex justify-center items-center snap-start"
        >
          <Slide3 />
        </section>

        <section
          id="slide4"
          className="w-full h-[100vh] bg-blue-500 text-white flex justify-center items-center snap-start"
        >
          <Slide4 />
        </section>

        <section
          id="slide5"
          className="w-full h-[100vh] bg-black text-white flex flex-col justify-around items-center relative overflow-hidden snap-start"
        >
          <Slide5 />
        </section>

        <section
          id="slide6"
          className="w-full h-[100vh] bg-gray-900 text-white flex justify-center items-center snap-start"
        >
          <Slide6 />
        </section>

        <section
          id="slide7"
          className="w-full h-[100vh] iPhoneSE:min-h-screen iPhoneSE:overflow-y-auto bg-gray-900 text-white flex justify-center items-center snap-start"
        >
          <Slide7 />
        </section>
      </div>
    </LanguageProvider>
  );
}