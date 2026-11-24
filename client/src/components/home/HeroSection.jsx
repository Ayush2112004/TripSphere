import React from 'react';
import Navbar from '../common/Navbar';
import SearchTabs from './SearchTabs';

export default function HeroSection() {
  return (
    <section className="relative w-full bg-light-inverse-surface pb-gutter-xl md:pb-section">
      {/* Background Hero Image & Scrim */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida/ALJJyrC-oh215iFsPP8yNnromflbQj7x_pQtHKgvQmsBEmYkjRGNAjLzzuIfIxprgs0unX0vQZUzhNtv6Z2ctuJPrmhpmSQDenm6HJNbU7e3UK-Jh3dXA8DaqkqVHW3sOMfm9YHJKO5JXUMcxfvEcAA4uYBRvDf_a2U7I4wGuvKEivzVjrY0AJ3iBg5x3caXnPfmDcgfmKe5U8VwROmYapRkiZg1ZL1RGDL0azs_hfjaw5yn_e7jloyt5zha1jPUbkQ"
          alt="Traveler kayaking across turquoise coastal waters beside sunlit cliffs"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-light-scrim/65"></div>
      </div>

      {/* Sticky Top Navigation Bar */}
      <Navbar />

      {/* Hero Copy & Search Panel Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-gutter-md md:px-gutter-lg pt-gutter-xl md:pt-section">
        <div className="max-w-2xl flex flex-col gap-gutter-md mb-gutter-xl">
          <h1
            className="font-display text-display-lg-mobile md:text-display-lg text-light-on-primary text-balance"
            data-design-text-token="display-lg"
          >
            Your Journey Begins Here.
          </h1>
          <p
            className="font-body text-body-lg text-light-on-primary text-pretty max-w-xl"
            data-design-text-token="body-lg"
          >
            Discover amazing destinations and book your next adventure. Compare curated flights, boutique stays, and effortless holiday packages in one place.
          </p>
        </div>

        {/* Tabbed Search Panel */}
        <SearchTabs />
      </div>
    </section>
  );
}

