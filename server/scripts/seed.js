import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Flight from '../models/Flight.js';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import HolidayPackage from '../models/HolidayPackage.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripsphere';

export const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[Seed] Connected to MongoDB. Clearing existing collections...');

    await Promise.all([
      User.deleteMany({}),
      Flight.deleteMany({}),
      Hotel.deleteMany({}),
      Room.deleteMany({}),
      HolidayPackage.deleteMany({}),
      Booking.deleteMany({}),
      Payment.deleteMany({}),
      Review.deleteMany({}),
      NewsletterSubscriber.deleteMany({}),
    ]);

    console.log('[Seed] Seeding Users...');
    const adminUser = await User.create({
      name: 'TripSphere Admin',
      email: 'admin@tripsphere.travel',
      password: 'adminpassword123',
      phone: '+1 (800) 555-0199',
      role: 'admin',
    });

    const demoUser = await User.create({
      name: 'Claire Bennett',
      email: 'traveler@tripsphere.travel',
      password: 'travelerpassword123',
      phone: '+1 (555) 234-5678',
      role: 'user',
    });

    console.log('[Seed] Seeding Flights...');
    const flights = await Flight.insertMany([
      {
        airline: 'Delta Air Lines',
        airlineCode: 'DL',
        flightNumber: 'DL 106',
        fromCity: 'New York (JFK)',
        fromAirport: 'JFK',
        toCity: 'London (LHR)',
        toAirport: 'LHR',
        departureTime: '19:30',
        arrivalTime: '07:35',
        departureDate: '2027-05-14',
        returnDate: '2027-05-21',
        duration: '7h 05m',
        stops: 0,
        stopsDetails: 'Non-stop',
        price: 489,
        travelClass: 'Economy',
        baggageAllowance: '1 Personal Item + 1 Carry-on (23kg)',
        availableSeats: 38,
        isFeatured: true,
      },
      {
        airline: 'ANA All Nippon',
        airlineCode: 'NH',
        flightNumber: 'NH 107',
        fromCity: 'San Francisco (SFO)',
        fromAirport: 'SFO',
        toCity: 'Tokyo (HND)',
        toAirport: 'HND',
        departureTime: '11:15',
        arrivalTime: '15:30',
        departureDate: '2027-06-03',
        returnDate: '2027-06-12',
        duration: '11h 15m',
        stops: 0,
        stopsDetails: 'Non-stop',
        price: 742,
        travelClass: 'Economy',
        baggageAllowance: '2 Checked Bags (23kg each)',
        availableSeats: 26,
        isFeatured: true,
      },
      {
        airline: 'Air France',
        airlineCode: 'AF',
        flightNumber: 'AF 333',
        fromCity: 'Boston (BOS)',
        fromAirport: 'BOS',
        toCity: 'Rome (FCO)',
        toAirport: 'FCO',
        departureTime: '17:45',
        arrivalTime: '08:25',
        departureDate: '2027-07-09',
        returnDate: '2027-07-17',
        duration: '9h 40m',
        stops: 1,
        stopsDetails: '1 Stop via CDG Paris',
        price: 568,
        travelClass: 'Economy',
        baggageAllowance: '1 Checked Bag (23kg)',
        availableSeats: 42,
        isFeatured: true,
      },
      {
        airline: 'Delta Air Lines',
        airlineCode: 'DL',
        flightNumber: 'DL 242',
        fromCity: 'New York (JFK)',
        fromAirport: 'JFK',
        toCity: 'Santorini (JTR)',
        toAirport: 'JTR',
        departureTime: '21:00',
        arrivalTime: '14:20',
        departureDate: '2027-05-14',
        returnDate: '2027-05-21',
        duration: '10h 20m',
        stops: 1,
        stopsDetails: '1 Stop via ATH Athens',
        price: 545,
        travelClass: 'Economy',
        baggageAllowance: '1 Carry-on + 1 Checked Bag',
        availableSeats: 19,
        isFeatured: true,
      },
      {
        airline: 'Emirates',
        airlineCode: 'EK',
        flightNumber: 'EK 202',
        fromCity: 'New York (JFK)',
        fromAirport: 'JFK',
        toCity: 'Dubai (DXB)',
        toAirport: 'DXB',
        departureTime: '23:00',
        arrivalTime: '19:45',
        departureDate: '2027-08-10',
        returnDate: '2027-08-20',
        duration: '12h 45m',
        stops: 0,
        stopsDetails: 'Non-stop',
        price: 895,
        travelClass: 'Business',
        baggageAllowance: '2 Checked Bags (32kg each)',
        availableSeats: 12,
        isFeatured: false,
      },
      {
        airline: 'British Airways',
        airlineCode: 'BA',
        flightNumber: 'BA 112',
        fromCity: 'Miami (MIA)',
        fromAirport: 'MIA',
        toCity: 'London (LHR)',
        toAirport: 'LHR',
        departureTime: '18:15',
        arrivalTime: '07:45',
        departureDate: '2027-06-15',
        returnDate: '2027-06-25',
        duration: '8h 30m',
        stops: 0,
        stopsDetails: 'Non-stop',
        price: 610,
        travelClass: 'Economy',
        baggageAllowance: '1 Checked Bag',
        availableSeats: 30,
        isFeatured: false,
      },
    ]);

    console.log('[Seed] Seeding Hotels & Rooms...');
    const hotel1 = await Hotel.create({
      name: 'Alila Cliffside Resort',
      city: 'Uluwatu',
      country: 'Bali',
      address: 'Jl. Belimbing Sari, Tambiyak, Pecatu, South Kuta, Badung, Bali 80364',
      description:
        'Perched on stunning limestone cliffs 100 meters above the Indian Ocean, Alila Villas Uluwatu delivers awe-inspiring panoramic seascapes, an iconic infinity cantilever pool, and open-plan luxury villas crafted from local materials.',
      rating: 4.9,
      reviewCount: 142,
      pricePerNight: 285,
      images: [
        '/images/hotel-bali.jpg',
      ],
      amenities: [
        'Oceanfront Infinity Pool & Spa',
        'Private Sunset Cabanas',
        'Holistic Wellness Retreat',
        '24/7 Butler Service',
        'Complimentary High-speed Wi-Fi',
      ],
      isFeatured: true,
    });

    await Room.insertMany([
      {
        hotel: hotel1._id,
        name: 'One-Bedroom Ocean Pool Villa',
        type: 'Pool Villa',
        capacity: 2,
        pricePerNight: 285,
        bedType: '1 King Bed',
        amenities: ['Private Plunge Pool', 'Outdoor Rain Shower', 'Ocean View Terrace', 'Espresso Machine'],
        availableCount: 5,
      },
      {
        hotel: hotel1._id,
        name: 'Cliff Edge Sunset Sanctuary',
        type: 'Luxury Suite',
        capacity: 3,
        pricePerNight: 430,
        bedType: '1 King Bed + Daybed',
        amenities: ['Panoramic Cliff Views', 'Deep Soaking Marble Tub', 'Dedicated Butler', 'Complimentary Champagne'],
        availableCount: 3,
      },
    ]);

    const hotel2 = await Hotel.create({
      name: 'The Omnia Alpine Lodge',
      city: 'Zermatt',
      country: 'Switzerland',
      address: 'Auf dem Fels, 3920 Zermatt, Switzerland',
      description:
        'A contemporary interpretation of the classic alpine chalet, suspended 45 meters above Zermatt with unobstructed views of the iconic Matterhorn. Features indoor/outdoor wellness facilities and Michelin-recognized seasonal dining.',
      rating: 4.8,
      reviewCount: 118,
      pricePerNight: 360,
      images: [
        '/images/hotel-zermatt.jpg',
      ],
      amenities: [
        'Matterhorn Mountain Views',
        'Gourmet Breakfast Included',
        'Indoor/Outdoor Heated Pool',
        'Finnish Sauna & Turkish Bath',
        'Ski-in/Ski-out Access',
      ],
      isFeatured: true,
    });

    await Room.insertMany([
      {
        hotel: hotel2._id,
        name: 'Matterhorn Deluxe Suite',
        type: 'Deluxe Suite',
        capacity: 2,
        pricePerNight: 360,
        bedType: '1 King Bed',
        amenities: ['Matterhorn Balcony', 'Open Fireplace', 'Freestanding Bathtub', 'Daily Alpine Breakfast'],
        availableCount: 4,
      },
      {
        hotel: hotel2._id,
        name: 'The Omnia Penthouse Suite',
        type: 'Penthouse',
        capacity: 4,
        pricePerNight: 590,
        bedType: '2 King Beds',
        amenities: ['Private Rooftop Terrace', 'Private Sauna', 'Wood-burning Fireplace', 'Wine Cellar Bar'],
        availableCount: 2,
      },
    ]);

    const hotel3 = await Hotel.create({
      name: 'Soneva Lagoon Villas',
      city: 'Baa Atoll',
      country: 'Maldives',
      address: 'Kunfunadhoo Island, Eydhafushi, Baa Atoll, Maldives',
      description:
        'Intimate overwater luxury nestled within a UNESCO World Biosphere Reserve. Featuring retractable roofs for stargazing straight from master bedrooms and direct private slides plunging into crystal-clear turquoise lagoons.',
      rating: 5.0,
      reviewCount: 88,
      pricePerNight: 640,
      images: [
        '/images/hotel-maldives.jpg',
      ],
      amenities: [
        'Private Lagoon Deck with Water Slide',
        'Retractable Stargazing Roof',
        'Overwater Dining Pavilions',
        'Full Board Dine-around Options',
        'Private Speedboat Transfers',
      ],
      isFeatured: true,
    });

    await Room.insertMany([
      {
        hotel: hotel3._id,
        name: 'Overwater Villa with Water Slide',
        type: 'Overwater Villa',
        capacity: 2,
        pricePerNight: 640,
        bedType: '1 King Bed',
        amenities: ['Direct Lagoon Slide', 'Sunken Outdoor Lounge', 'Glass Flooring Panels', 'Personal Barefoot Butler'],
        availableCount: 3,
      },
    ]);

    const hotel4 = await Hotel.create({
      name: 'Canaves Oia Suites',
      city: 'Santorini',
      country: 'Greece',
      address: 'Main Street, Oia 847 02, Greece',
      description:
        'Carved gracefully into the volcanic cliffside of Oia, Canaves Oia Suites pairs iconic Cycladic architecture and glistening infinity pools with world-class Greek hospitality.',
      rating: 4.9,
      reviewCount: 97,
      pricePerNight: 510,
      images: [
        '/images/santorini.jpg',
      ],
      amenities: [
        'Caldera View Infinity Pool',
        'Private Wine Cellar & Tastings',
        'Gourmet Aegean Restaurant',
        'Luxury Yacht Excursions',
      ],
      isFeatured: true,
    });

    await Room.insertMany([
      {
        hotel: hotel4._id,
        name: 'Caldera Cliff Cave Suite',
        type: 'Cave Suite',
        capacity: 2,
        pricePerNight: 510,
        bedType: '1 King Bed',
        amenities: ['Caldera Sunset Balcony', 'Outdoor Hot Tub', 'Complimentary Greek Breakfast'],
        availableCount: 4,
      },
    ]);

    console.log('[Seed] Seeding Holiday Packages...');
    const package1 = await HolidayPackage.create({
      title: 'Swiss Alps Rail Tour',
      destination: 'Swiss Alps & Zurich',
      country: 'Switzerland',
      durationDays: 7,
      durationNights: 6,
      pricePerPerson: 1490,
      image: '/images/swiss-alps.jpg',
      overview:
        'Experience the pinnacle of European rail romance with 6 nights traversing Zurich, Lucerne, Interlaken, and Zermatt. Glide through breathtaking glaciers aboard the famous Glacier Express with first-class tickets and handpicked stays.',
      inclusions: [
        'First-class Glacier Express panoramic rail pass',
        '6 nights 4-star boutique hotel accommodations',
        'Daily breakfast & fondue dinner tasting experience',
        'Private airport transfers in Zurich & Geneva',
        'Guided excursion to the Matterhorn Glacier Paradise',
      ],
      itinerary: [
        { day: 1, title: 'Arrival in Zurich', description: 'Private transfer to luxury hotel, evening historic old town stroll.' },
        { day: 2, title: 'Lucerne & Mount Pilatus', description: 'Scenic boat cruise and cogwheel railway ascent.' },
        { day: 3, title: 'Glacier Express to Zermatt', description: 'Full day aboard the premier panorama train through Swiss valleys.' },
        { day: 4, title: 'Matterhorn Wonders', description: 'Cable car ride to highest alpine station in Europe.' },
        { day: 5, title: 'Interlaken Lakes', description: 'Leisurely exploration of Lake Thun and Lake Brienz.' },
        { day: 6, title: 'Zurich Gala Evening', description: 'Farewell Swiss culinary dinner experience.' },
        { day: 7, title: 'Departure', description: 'Private transfer to Zurich International Airport.' },
      ],
      departureDates: ['July 2027', 'August 2027', 'September 2027'],
      promoCode: 'SUMMER18',
      isFeatured: true,
    });

    await HolidayPackage.create({
      title: 'Santorini & Cyclades Island Escape',
      destination: 'Santorini & Mykonos',
      country: 'Greece',
      durationDays: 6,
      durationNights: 5,
      pricePerPerson: 1250,
      image: '/images/santorini.jpg',
      overview:
        'Unwind along the sun-bleached cliffs of Oia and the golden shores of the Aegean with luxury caldera stays, sunset catamaran cruises, and authentic Greek gastronomy.',
      inclusions: [
        '5 nights cliffside cave suite accommodations',
        'Daily breakfast overlooking the Caldera',
        'Sunset Catamaran cruise with BBQ and Greek wine',
        'High-speed ferry transfer between islands',
      ],
      itinerary: [
        { day: 1, title: 'Welcome to Santorini', description: 'Private transfer to Oia boutique suite.' },
        { day: 2, title: 'Caldera Hiking & Wine Tour', description: 'Walk from Fira to Oia, afternoon volcanic vineyard tasting.' },
        { day: 3, title: 'Catamaran Sunset Cruise', description: 'Sail past Red Beach and hot springs with catered sunset dinner.' },
        { day: 4, title: 'Island Culture', description: 'Explore Akrotiri prehistoric ruins and black sand beaches.' },
        { day: 5, title: 'Leisure & Spa', description: 'Day at cliffside infinity pool and farewell dinner in Oia.' },
        { day: 6, title: 'Departure', description: 'Airport transfer for return flight.' },
      ],
      departureDates: ['May 2027', 'June 2027', 'September 2027'],
      promoCode: 'SUMMER18',
      isFeatured: false,
    });

    console.log('[Seed] Seeding Sample Bookings...');
    const sampleFlight = flights[0];
    const booking1 = await Booking.create({
      bookingReference: 'TS-FL-78219',
      user: demoUser._id,
      bookingType: 'flight',
      flight: sampleFlight._id,
      detailsSnapshot: {
        airline: sampleFlight.airline,
        flightNumber: sampleFlight.flightNumber,
        fromCity: sampleFlight.fromCity,
        fromAirport: sampleFlight.fromAirport,
        toCity: sampleFlight.toCity,
        toAirport: sampleFlight.toAirport,
        duration: sampleFlight.duration,
        departureTime: sampleFlight.departureTime,
        arrivalTime: sampleFlight.arrivalTime,
        travelClass: 'Economy',
      },
      travelerDetails: [
        {
          fullName: 'Claire Bennett',
          email: 'traveler@tripsphere.travel',
          phone: '+1 (555) 234-5678',
          passportNumber: 'U9812401',
          specialRequests: 'Window seat preferred',
        },
      ],
      bookingDates: {
        departureDate: '2027-05-14',
        returnDate: '2027-05-21',
      },
      basePrice: 489,
      taxesAndFees: 45,
      totalPrice: 534,
      status: 'confirmed',
      paymentStatus: 'paid',
    });

    await Payment.create({
      booking: booking1._id,
      user: demoUser._id,
      amount: 534,
      currency: 'usd',
      paymentMethod: 'card',
      stripePaymentIntentId: 'pi_test_3N82jd71638219',
      status: 'succeeded',
      cardBrand: 'Visa',
      cardLast4: '4242',
    });

    const booking2 = await Booking.create({
      bookingReference: 'TS-HT-99201',
      user: demoUser._id,
      bookingType: 'hotel',
      hotel: hotel1._id,
      detailsSnapshot: {
        hotelName: hotel1.name,
        city: hotel1.city,
        country: hotel1.country,
        roomName: 'One-Bedroom Ocean Pool Villa',
        nights: 4,
      },
      travelerDetails: [
        {
          fullName: 'Claire Bennett',
          email: 'traveler@tripsphere.travel',
          phone: '+1 (555) 234-5678',
        },
      ],
      bookingDates: {
        checkIn: '2027-06-08',
        checkOut: '2027-06-12',
      },
      basePrice: 1140,
      taxesAndFees: 114,
      totalPrice: 1254,
      status: 'confirmed',
      paymentStatus: 'paid',
    });

    await Payment.create({
      booking: booking2._id,
      user: demoUser._id,
      amount: 1254,
      currency: 'usd',
      paymentMethod: 'card',
      stripePaymentIntentId: 'pi_test_9H71kl8902114',
      status: 'succeeded',
      cardBrand: 'Mastercard',
      cardLast4: '8812',
    });

    console.log('[Seed] Seeding Newsletter Subscribers...');
    await NewsletterSubscriber.create({
      email: 'claire.bennett@example.com',
    });

    console.log('[Seed] Database seeding completed successfully!');
    console.log('--------------------------------------------------');
    console.log('Default Credentials:');
    console.log('Admin:   admin@tripsphere.travel / adminpassword123');
    console.log('User:    traveler@tripsphere.travel / travelerpassword123');
    console.log('--------------------------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

if (process.argv[1]?.endsWith('seed.js')) {
  seedData();
}

