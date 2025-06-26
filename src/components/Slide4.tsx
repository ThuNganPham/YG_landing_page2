"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const backgroundImages = [
  "/media/slide4.1.webp",
  "/media/slide4.2.webp",
  "/media/slide4.3.webp",
  "/media/slide4.4.webp",
  "/media/slide4.5.webp",
  "/media/slide4.6.jpeg",
  "/media/slide4.7.jpg",
  "/media/slide4.8.jpg",
  "/media/slide4.9.png",
  "/media/slide4.10.jpg",
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexService, setCurrentIndexService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const t = useTranslations("Page");

  const services = [
    {
      icon: "/media/iconBox1.svg",
      title: "DECORATION",
      description: t("boxOne"),
      width: 40,
      height: 40,
    },
    {
      icon: "/media/iconBox2.svg",
      title: "EVENT MANAGEMENT",
      description: t("boxTwo"),
      width: 35,
      height: 35,
    },
    {
      icon: "/media/iconBox3.svg",
      title: "BRAND ACTIVATION",
      description: t("boxThree"),
      width: 50,
      height: 50,
    },
    {
      icon: "/media/iconBox4.svg",
      title: "DESIGN",
      description: t("boxFour"),
      width: 30,
      height: 30,
    },
  ];

  const totalImages = backgroundImages.length;

  // Chuyển dịch vụ mỗi 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexService((prevIndex) => (prevIndex + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [services.length]);

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
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`flex h-full ${
          isTransitioning
            ? "transition-transform duration-[2000ms] ease-in-out"
            : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
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

      {/* Overlay che nền để dễ đọc chữ */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-0"></div>

      <div className="absolute image-banner:hidden fade-in-section top-0 left-1/2 transform -translate-x-1/2 text-center text-white z-10 desktop-ui:w-[100%] footerIpad:w-[100%] flex flex-col justify-evenly desktop-md:justify-center desktop-md:gap-[10%] slide2-gap:gap-[4%] h-full lg:pt-[52px] xl:pt-[60px] 2xl:pt-[78px] 3xl:pt-[104px] IpadMini&IpadAir:p-12">
        {/* Phần 1 */}
        <div className="mobile-ui:text-justify footerIpad:text-center">
          <p className="text-base sm:text-lg md:text-xl 2xl:text-3xl fade-in-section">
            {t("slide4P1")}
          </p>
          <h3 className="fade-in-section text-lg sm:text-xl md:text-2xl font-bold uppercase text-[#ec6629] 2xl:text-3xl">
            CUSTOMER SOLUTION - CUSTOMER COST - CONVENIENCE - COMMUNICATION
          </h3>
          <p className="fade-in-section text-base sm:text-lg md:text-xl 2xl:text-3xl">
            {t("slide4P2")}
          </p>
        </div>

        {/* Phần 2 - Dịch vụ */}
        <div className="fade-in-section max-w-[1700px] w-full mx-auto text-center grid grid-cols-1 custom-size:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 custom-size:gap-[5.5em] p-6 ">
          {services.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 bg-[rgba(34,34,34,0.6)] backdrop-blur-md rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition w-full"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={item.width}
                height={item.height}
              />
              <h3 className="text-lg xl:text-[30px] xl:leading-[36px] 2xl:text-[46px] 2xl:leading-[50px] font-bold mt-3 text-start text-[#ec6629]">
                {item.title}
              </h3>
              <p className="text-sm text-start md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl flex-grow">
                {item.description}
              </p>
            </div>
          ))}
        </div>
{/* check */}
        {/* Phần 3 */}
        <div className="fade-in-section iPad:w-[100%] w-[90%] desktop-ui:w-[100%] text-center iPad:text-center sm+:text-justify">
          <p className="text-base sm:text-lg md:text-xl 2xl:text-3xl">
            {t("slide4P3")}
          </p>
          <p className="text-base sm:text-lg md:text-xl 2xl:text-3xl">
            {t("slide4P4")}
          </p>
        </div>
      </div>

      <div className="absolute hidden image-banner:flex fade-in-section w-full top-0 left-1/2 transform -translate-x-1/2 text-center text-white z-10 flex-col heightSE:mt-[0%] heightS8:mt-[13%] Pixel7:mt-[24%] Pixel7:gap-[8%] Pixel7:h-[84%] mobile-ui:pt-[60.17px] iphoneSE:pt-[0px]">
        {/* Phần tiêu đề */}
        <div className="w-[100%] p-4">
          <p className="text-base sm:text-lg md:text-xl text-start fade-in-section">
            {t("slide4P1")}
          </p>
          <h3 className="fade-in-section text-lg sm:text-xl md:text-2xl font-bold uppercase text-[#ec6629] mb-[3%]">
            <ul className="text-left list-none">
              <li>• CUSTOMER SOLUTION</li>
              <li>• CUSTOMER COST</li>
              <li>• CONVENIENCE</li>
              <li>• COMMUNICATION</li>
            </ul>
          </h3>
          <p className="fade-in-section text-base sm:text-lg md:text-xl text-start">
            {t("slide4P2")}
          </p>
        </div>

        {/* Phần dịch vụ */}
        <div className="max-w-[1700px] w-full h-[100%] flex flex-col items-center gap-6 mt-8">
          <div className="flex flex-col w-[80%] p-[10%] bg-[rgba(34,34,34,0.4)] backdrop-blur-md rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition heightSE:h-[13em] Pixel7:h-[12em]">
            <Image
              src={services[currentIndexService].icon}
              alt={services[currentIndexService].title}
              width={services[currentIndexService].width}
              height={services[currentIndexService].height}
            />
            <h3 className="text-lg 2xl:text-3xl font-bold mt-3 text-justify text-[#ec6629]">
              {services[currentIndexService].title}
            </h3>
            <p className="text-sm text-start mt-1 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              {services[currentIndexService].description}
            </p>
          </div>
        </div>

        {/* Phần văn bản cuối */}
        <div className="w-[100%] p-4">
          <p className="text-base sm:text-lg md:text-xl text-start">
            {t("slide4P3")} {t("slide4P4")}
          </p>
        </div>
      </div>
    </div>
  );
}
