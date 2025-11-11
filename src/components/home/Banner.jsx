import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    image: "https://static.vecteezy.com/system/resources/previews/057/163/041/non_2x/luxurious-eco-friendly-apartment-building-at-night-with-city-views-and-lush-greenery-on-balconies-free-photo.jpeg",
    title: "Find Your Dream Home",
    subtitle: "Explore premium listings across your city.",
  },
  {
    id: 2,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2577fb45296361.582bf4a2c13fc.jpg",
    title: "Verified Agents You Can Trust",
    subtitle: "Professional realtors to guide you at every step.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Buy. Sell. Rent. All in One Place.",
    subtitle: "HomeNest makes real estate simple and secure.",
  },
];

export default function Banner() {
  return (
    <div className="w-full h-[500px] lg:h-[600px]"> 
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="h-full">
            <div
              className="h-full bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="bg-black/40 p-6 rounded-xl text-center max-w-lg">
                <h2 className="text-4xl font-bold mb-2 ">{slide.title}</h2>
                <p className="text-lg ">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
