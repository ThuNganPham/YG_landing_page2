"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import Image from "next/image";

const backgroundImages = [
  "/media/slide2.1.webp",
  "/media/slide2.2.webp",
  "/media/slide2.3.webp",
  "/media/slide2.4.webp",
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true); // Điều khiển hiệu ứng chuyển động

  const t = useTranslations("Page");

  // IntersectionObserver setup
  useEffect(() => {
    const fadeInSections = document.querySelectorAll(
      ".fade-in-section"
    ) as NodeListOf<HTMLElement>;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeInSections.forEach((section) => observer.observe(section));

    return () => {
      fadeInSections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const totalImages = backgroundImages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= totalImages) {
      // Dừng hiệu ứng, đặt currentIndex về 0 sau 50ms
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => setIsTransitioning(true), 50); // Kích hoạt lại hiệu ứng
      }, 50);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden background-slider">
      <div
        className={`flex h-full ${
          isTransitioning ? "transition-transform duration-[2000ms]" : ""
        } ease-in-out`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Chỉ dịch chuyển từng ảnh
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {backgroundImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
              fill
            />
          </div>
        ))}
        {/* Clone ảnh đầu tiên để tạo hiệu ứng vòng lặp */}
        <div className="flex-shrink-0 min-w-full w-full h-full relative">
          <Image
            src={backgroundImages[0]}
            alt="Background duplicate"
            className="w-full h-full object-cover"
            fill
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0"></div>

      <div className="absolute left-4 sm:left-32 top-1/2 transform -translate-y-1/2 z-10 text-white">
        <div className="fade-in-section flex flex-col image-banner:space-y-12 custom-size:space-y-16 sm:space-y-12 slide2-gap:space-y-4">
          <h1 className="text-[42px] sm:text-[36px] md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[96px] font-bold">
            <a
              href="#slide3"
              className="text-white transition-transform transform scale-100"
            >
              {t("ABOUT")}
            </a>{" "}
            <a
              href="#slide3"
              className="text-[#ec6629] transition-transform transform scale-110"
            >
              {t("US")}
            </a>
          </h1>

          <div className="flex items-center gap-[10px]">
            <Image
              src="/media/icon1.webp"
              alt="service icon"
              className="inline-block mr-2 max-w-full h-auto"
              width={35}
              height={35}
            />
            <a
              href="#slide4"
              className="text-[26px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[32px] 2xl:text-[54px] transition-transform transform scale-100 hover:scale-110 hover:text-[#ec6629]"
            >
              {t("SERVICES")}
            </a>
          </div>

          <div className="flex items-center gap-[10px]">
            <Image
              src="/media/icon2.webp"
              alt="projects icon"
              className="inline-block mr-2 max-w-full h-auto"
              width={35}
              height={35}
            />
            <a
              href="#slide5"
              className="text-[26px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[32px] 2xl:text-[54px] transition-transform transform scale-100 hover:scale-110 hover:text-[#ec6629]"
            >
              {t("PROJECTS")}
            </a>
          </div>

          <div className="flex items-center gap-[13px]">
            <Image
              src="/media/icon3.webp"
              alt="clients icon"
              className="inline-block mr-2 max-w-full h-auto"
              width={33}
              height={33}
            />
            <a
              href="#slide6"
              className="text-[26px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[32px] 2xl:text-[54px] transition-transform transform scale-100 hover:scale-110 hover:text-[#ec6629]"
            >
              {t("CLIENTS")}
            </a>
          </div>

          <div className="flex items-center gap-[16px]">
            <Image
              src="/media/icon4.webp"
              alt="contact icon"
              className="inline-block mr-2 max-w-full h-auto"
              width={30}
              height={30}
            />
            <a
              href="#slide7"
              className="text-[26px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[32px] 2xl:text-[54px] transition-transform transform scale-100 hover:scale-110 hover:text-[#ec6629]"
            >
              {t("CONTACT")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
