import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Sample advertising slides - replace with your actual promotional content
const advertisingSlides = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 70% Off",
    description: "Don't miss our biggest sale of the season",
    backgroundColor: "from-orange-400 via-red-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop",
    buttonText: "Shop Now",
    buttonColor: "bg-white text-red-600 hover:bg-gray-100",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh & Trending",
    description: "Discover the latest products just for you",
    backgroundColor: "from-blue-500 via-indigo-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=500&fit=crop",
    buttonText: "Explore",
    buttonColor: "bg-white text-indigo-600 hover:bg-gray-100",
  },
  {
    id: 3,
    title: "Premium Collection",
    subtitle: "Luxury Redefined",
    description: "Experience elegance with our exclusive range",
    backgroundColor: "from-emerald-400 via-teal-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=500&fit=crop",
    buttonText: "View Collection",
    buttonColor: "bg-white text-teal-600 hover:bg-gray-100",
  },
  {
    id: 4,
    title: "Tech Deals",
    subtitle: "Smart Savings",
    description: "Latest gadgets at unbeatable prices",
    backgroundColor: "from-violet-500 via-purple-500 to-fuchsia-500",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=500&fit=crop",
    buttonText: "Get Deals",
    buttonColor: "bg-white text-purple-600 hover:bg-gray-100",
  },
];

export default function AdvertisingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState("next");

  const totalSlides = advertisingSlides.length;

  const nextSlide = useCallback(() => {
    setSlideDirection("next");
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index) => {
    setSlideDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  }, [currentSlide]);

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered && !isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, isPaused, nextSlide]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-900 rounded-2xl shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Container */}
      <div className="relative h-40 sm:h-80 md:h-64 lg:h-[24rem]">
        {advertisingSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPrev = index === (currentSlide - 1 + totalSlides) % totalSlides;
          const isNext = index === (currentSlide + 1) % totalSlides;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 translate-x-0 z-20"
                  : isPrev
                  ? "opacity-0 -translate-x-full z-10"
                  : isNext
                  ? "opacity-0 translate-x-full z-10"
                  : "opacity-0 translate-x-full z-0"
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.backgroundColor} opacity-90`}
              ></div>

              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center h-full max-w-2xl">
                  {/* Animated Content */}
                  <div
                    className={`transform transition-all duration-1000 delay-200 ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-white/90 uppercase tracking-wider mb-2 sm:mb-3">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-2xl">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 font-medium max-w-xl">
                      {slide.description}
                    </p>
                    <button
                      className={`${slide.buttonColor} px-4 sm:px-8 md:px-10 py-2 mb-1 sm:py-3 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center gap-2 group/btn`}
                    >
                      {slide.buttonText}
                      <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-32 translate-y-32"></div>
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-48 -translate-y-48"></div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 sm:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {advertisingSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group/dot transition-all duration-300 focus:outline-none ${
              index === currentSlide ? "w-8 sm:w-10" : "w-2 sm:w-2.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-2 sm:h-2.5 rounded-full sm:rounded-md transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white shadow-lg shadow-white/50"
                  : "bg-white/40 hover:bg-white/70 group-hover/dot:scale-110"
              }`}
            ></div>
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          className={`h-full bg-white transition-all duration-300 ${
            isHovered || isPaused ? "opacity-0" : "opacity-100"
          }`}
          style={{
            width: `${((currentSlide + 1) / totalSlides) * 100}%`,
            transition: "width 5s linear, opacity 0.3s",
          }}
        ></div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}