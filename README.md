# TripSphere — Full-Stack Travel Booking Platform

TripSphere is a comprehensive, full-stack travel booking application built around the exact, authoritative TripSphere UI design reference. The application features curated flight searches, boutique hotel stays, bespoke holiday packages, secure booking workflows with server-side price recalculation, Stripe test-mode payment processing, user travel management ("My Trips"), and a full administrator console.

---

## 1. Authoritative Design System Preservation

The platform preserves 100% of the visual identity, tokens, and components defined in the original UI reference:

- **Primary Brand Colors**:
  - `light-primary`: `#0040D5` (Deep royal blue anchor)
  - `light-primary-container`: `#2E5BF2` (Action buttons & active tab highlights)
  - `light-secondary-container`: `#EFEFFF` (Badge & filter pill container)
  - `light-on-secondary-container`: `#1A2B6A` (Badge typography)
  - `light-surface`: `#FFFFFF`
  - `light-surface-container-low`: `#F8FAFC`
  - `light-outline-variant`: `#E2E8F0`
- **Accent Badges**:
  - `amber-star`: `#F59E0B` (5-star rating highlights)
  - `sky-badge`: `#0EA5E9` ("Plan a Trip" card icon)
  - `coral-badge`: `#F97316` ("Explore and Save" card icon)
  - `emerald-badge`: `#16A34A` ("Enjoy Your Trip" card icon)
  - `light-tertiary-container`: `#FFEDE7` (Discount badges, e.g. "Save 18%")
- **Typography**:
  - Headlines & Displays: **Red Hat Display** (700, 600)
  - Body, Titles & Labels: **Commissioner** (400, 500, 600)
  - Monospace (Airport & Promo Codes): **Spline Sans Mono** (500)
- **Icons**:
  - Google Material Symbols Outlined (uniform icon family throughout).

---

## 2. Full Application Pages & Routes

| Route | Page | Key Features |
| :--- | :--- | :--- |
| `/` | **Homepage** | Exact visual match of the original reference: Hero kayak image with dark scrim, glass sticky navbar, tabbed flight/hotel/holiday search card, city swap button, Why Choose TripSphere, Popular Destinations with interactive country filters, Trending Flight Deals, Recommended Hotels, Swiss Alps featured holiday package with promo codes, traveler testimonials, newsletter subscription, and professional 4-column footer. |
| `/flights` | **Flight Search Results** | Search query bar, interactive filter sidebar (Stops, Airlines, Max Price slider), sorting (Price low-to-high, high-to-low, duration), timeline flight cards with non-stop badges, baggage allowances, and "Select Flight" action. |
| `/flights/:id` | **Flight Details** | Detailed route itinerary (terminals, gates, on-time percentage), baggage allowances, fare cancellation rules, and transparent price breakdown. |
| `/hotels` | **Hotel Search** | Destination search, guest rating filter (4.8+, 4.5+, 4.0+), nightly price slider, hotel cards with ratings, addresses, amenities, and "View Details" button. |
| `/hotels/:id` | **Hotel Details** | Resort photo gallery, amenities checklist, interactive room selection with pricing, and reservation action. |
| `/holidays` | **Holiday Packages** | Curated multi-day package cards (Swiss Alps Rail Tour, Santorini Dream, Kyoto Heritage), inclusions breakdown, day-by-day itineraries, and promo codes. |
| `/login` | **Authentication - Login** | Secure JWT authentication, password visibility toggle, error notifications, and one-click demo credentials autofill. |
| `/register` | **Authentication - Register** | User registration with input validation, password matching, and automatic JWT session establishment. |
| `/forgot-password`| **Forgot Password** | Password reset simulation with immediate visual confirmation. |
| `/checkout` | **Booking Checkout** | Unified checkout for flights, hotels, or packages. Server-side price recalculation, traveler contact details, passport number input, and transparent fees breakdown. |
| `/payment` | **Payment Processing** | Stripe test mode integration. Pre-filled sandbox card (`4242 4242 4242 4242`), CVV and expiration handling, payment state transitions, and animated confirmation. |
| `/my-trips` | **My Trips** | Traveler dashboard categorized into All, Upcoming, Completed, and Cancelled. Displays booking references (`TS-FL-XXXXX`, `TS-HT-XXXXX`), travel dates, e-ticket viewer, and instant cancellation with refund processing. |
| `/profile` | **User Profile** | Personal information editing (Full Name, Phone) and password change security form. |
| `/admin` | **Admin Dashboard** | Operational KPI metrics (Gross Revenue, Total Bookings, Registered Members, Inventory count), bookings data table with status updater, users table, and "Add New Flight" modal. |

---

## 3. Technology Stack & Directory Structure

### Frontend (`client/`)
- **React 18** with **Vite**
- **Tailwind CSS** with custom theme tokens & typography configuration
- **React Router v6**
- **Axios** with Bearer token request interceptor & 401 response handling
- **Context API** (`AuthContext` & `BookingContext`)
- **Google Material Symbols Outlined**

### Backend (`server/`)
- **Node.js** & **Express.js** (ES Modules)
- **MongoDB** & **Mongoose** ORM
- **JWT Authentication** (`jsonwebtoken`) & **Bcrypt** (`bcryptjs`)
- **Cookie-Parser** & **CORS**
- **Stripe SDK** (with test-mode intent handler and mock fallback)

```
TripSphere/
  client/
    public/
    src/
      assets/
      components/
        common/       # Navbar.jsx, Footer.jsx
        home/         # HeroSection, SearchTabs, FlightDeals, etc.
      context/        # AuthContext.jsx, BookingContext.jsx
      layouts/        # MainLayout.jsx
      pages/          # 14 complete application pages
      services/       # api.js (centralized Axios service layer)
      App.jsx
      main.jsx
      index.css
    index.html
    vite.config.js
    tailwind.config.js
    postcss.config.js
    .env.example

  server/
    config/           # db.js
    controllers/      # auth, flight, hotel, holiday, booking, payment, admin, newsletter
    middleware/       # auth.js (protect, adminOnly), errorHandler.js
    models/           # User, Flight, Hotel, Room, HolidayPackage, Booking, Payment, Review, NewsletterSubscriber
    routes/           # auth, flight, hotel, holiday, booking, payment, admin, newsletter
    scripts/          # seed.js (realistic inventory seeder)
    tests/            # api.test.js (unit & integrity verification)
    utils/            # generateToken.js
    server.js
    .env.example

  README.md
```

---

## 4. Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher recommended; developed and verified on v24.4.1)
- **npm** (v10 or higher)
- **MongoDB** (optional local instance or MongoDB Atlas URI)

### Backend Setup
1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   A default `.env` is already created from `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://127.0.0.1:27017/tripsphere
   JWT_SECRET=tripsphere_secure_jwt_dev_token_2027
   CLIENT_URL=http://localhost:5173
   STRIPE_SECRET_KEY=sk_test_placeholder_key_for_testing
   ```
4. (Optional) Populate MongoDB with realistic seed data:
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm start
   # Or for hot reload:
   npm run dev
   ```
   The backend API will be running at `http://localhost:5000`.

### Frontend Setup
1. Open a new terminal and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 5. Pre-Configured Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@tripsphere.travel` | `adminpassword123` |
| **Traveler Member** | `traveler@tripsphere.travel` | `travelerpassword123` |

*Note: On the `/login` page, convenient "Demo Traveler" and "Demo Admin" quick-fill buttons are provided for instant testing.*

---

## 6. Testing & Build Verification

### Backend Tests
Execute the built-in Node test suite:
```bash
cd server
npm test
```
Verifies health check, token generation/validation, server-side price recalculation integrity, multi-night hotel totals, and booking reference formatting.

### Frontend Production Build
Verify the client build:
```bash
cd client
npm run build
```
Vite compiles and optimizes all assets into `client/dist/` with 0 errors.

---

## 7. Strict DevOps Scope Compliance

Per project instructions, this repository contains clean, modular application code only. **No Dockerfiles, docker-compose, Kubernetes manifests, Nginx configurations, or CI/CD pipelines** have been generated, keeping the infrastructure clean for your independent DevOps implementation.

