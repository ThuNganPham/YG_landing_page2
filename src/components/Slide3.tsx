"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const VideoBackgroundSection: React.FC = () => {
  const t = useTranslations("Page");

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;

    if (!imageContainer || !image) return;

    // Thiết lập ban đầu
    image.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    image.style.transformOrigin = "center";
    image.style.willChange = "transform";

    const handleMouseMove = (event: MouseEvent) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - y) / centerY) * 15; // Góc nghiêng tối đa là ±15 độ
      const rotateY = ((x - centerX) / centerX) * 15;

      image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      image.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };

    imageContainer.addEventListener("mousemove", handleMouseMove);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainer.removeEventListener("mousemove", handleMouseMove);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/media/black-silk.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>
      <div className="fade-in-section">
        <div className="fade-in-section relative z-10 w-full h-full flex mt-[2em] mobile-ui:flex-col footerIpad:flex-col mobile-ui:items-center footerIpad:items-center mobile-ui:mt-[0px] footerIpad:mt-[0px] mobile-ui:gap-[20px] footerIpad:gap-[40px] mobile-ui:pt-[60.17px]">
          {/* Phần bên trái - Hình ảnh */}
          <div
            ref={imageContainerRef}
            className="relative w-[350px] h-[500px] mobile-ui:w-[200px] mobile-ui:h-[260px] flex items-center justify-center slide3-gap:h-[450px] footerIpad:h-[450px] footerIpad:w-[330px] slide3-gap:w-[330px]"
          >
            <Image
              ref={imageRef}
              src="/media/banner-turning.webp"
              alt="Banner"
              className="absolute top-0 transform -translate-x-1/2 w-full h-full rounded-lg shadow-custom-orange transition-transform duration-200 ease-out"
              fill
            />
          </div>

          {/* Phần bên phải - Văn bản */}
          <div className="fade-in-section flex flex-col justify-center items-start text-white w-fit h-auto p-3 mr-[-5em] desktop-lg:ml-[2em] smallerX-desktop:mb-[-0.7em] desktop-lg:mb-[6.3em] desktop-xl:ml-[6em] 2xl:mb-[8.2em] 2xl:ml-[6em] slide3-gap:mb-[4.3em] mobile-ui:mr-[0px] iPad:w-[74%] footerIpad:m-0">
            <h1 className="text-[#ec6629] text-[24px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[60px] 2xl:text-[76px] font-bold mb-4 whitespace-nowrap NestHub:text-[43px]">
              Young Generation Agency
            </h1>
            <p className="text-sm sm:text-base text-custom md:text-lg lg:text-xl xl:text-2xl NestHub:w-[34em] lg:w-[36.5em] xl:w-[47.5em] 2xl:w-[60em] text-justify mb-3">
              {t("text")}
            </p>
            <p className="text-sm sm:text-base text-custom md:text-lg lg:text-xl xl:text-2xl NestHub:w-[34em] lg:w-[36.5em] xl:w-[47.5em] 2xl:w-[60em] text-justify">
              {t("textP")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBackgroundSection;
// 2xl:text-3xl
