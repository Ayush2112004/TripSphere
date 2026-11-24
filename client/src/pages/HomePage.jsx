import React from 'react';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PopularDestinations from '../components/home/PopularDestinations';
import FlightDeals from '../components/home/FlightDeals';
import RecommendedHotels from '../components/home/RecommendedHotels';
import HolidayOffers from '../components/home/HolidayOffers';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-light-surface">
      {/* Hero section with integrated glass navigation & search */}
      <HeroSection />

      {/* Main Content Sections */}
      <main className="flex-1">
        <WhyChooseUs />
        <PopularDestinations />
        <FlightDeals />
        <RecommendedHotels />
        <HolidayOffers />
        <Testimonials />
        <Newsletter />
      </main>
    </div>
  );
}

