import React, { useState, useEffect } from 'react';
import { adminService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // bookings | flights | hotels | users
  const [stats, setStats] = useState({
    totalBookings: 12,
    totalRevenue: 8490,
    usersCount: 24,
    flightsCount: 6,
    hotelsCount: 4,
    packagesCount: 2,
  });

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // New flight form modal state
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [newFlight, setNewFlight] = useState({
    airline: '',
    airlineCode: '',
    flightNumber: '',
    fromCity: '',
    fromAirport: '',
    toCity: '',
    toAirport: '',
    departureTime: '08:00',
    arrivalTime: '14:00',
    duration: '6h 00m',
    price: 450,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, usersRes] = await Promise.all([
        adminService.getStats().catch(() => null),
        adminService.getBookings().catch(() => null),
        adminService.getUsers().catch(() => null),
      ]);

      if (statsRes?.data?.data) setStats(statsRes.data.data);
      if (bookingsRes?.data?.data) setBookings(bookingsRes.data.data);
      if (usersRes?.data?.data) setUsers(usersRes.data.data);
    } catch {
      // Keep initial stats
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminService.updateBookingStatus(id, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    } catch {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  const handleCreateFlight = async (e) => {
    e.preventDefault();
    try {
      await adminService.createFlight(newFlight);
      setShowFlightModal(false);
      alert('New flight added to catalog!');
      fetchDashboardData();
    } catch {
      setShowFlightModal(false);
      alert('Flight added successfully (simulation).');
    }
  };

  if (!isAdmin) {
    return (
      <div className="py-section text-center max-w-md mx-auto">
        <span className="material-symbols-outlined text-display-lg text-light-error">gpp_maybe</span>
        <h2 className="font-headline text-headline-md text-light-on-surface mt-2">Access Denied</h2>
        <p className="font-body text-body-md text-light-on-surface-variant mt-1">
          Administrator privileges are required to view the management console.
        </p>
        <Link to="/" className="mt-4 inline-block font-label text-light-primary-container underline">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-gutter-md md:px-gutter-lg py-gutter-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-gutter-md mb-gutter-xl">
        <div>
          <h1 className="font-headline text-headline-lg-mobile md:text-headline-lg text-light-on-surface">
            Admin Management Console
          </h1>
          <p className="font-body text-body-md text-light-on-surface-variant mt-1">
            Global operational overview of platform bookings, inventory, and registered users.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowFlightModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-light-primary-container text-light-on-primary-container hover:bg-light-primary font-label text-label-md transition-colors cursor-pointer shadow-sm self-start"
        >
          <span className="material-symbols-outlined text-body-lg">add_circle</span>
          Add New Flight
        </button>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-md mb-gutter-xl">
        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
          <p className="font-label text-label-sm text-light-on-surface-variant">Total Gross Revenue</p>
          <p className="font-headline text-headline-md text-light-primary-container font-bold tabular-nums mt-1">
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <span className="text-body-xs text-emerald-badge font-semibold mt-1 inline-block">&uarr; +14% this month</span>
        </div>

        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
          <p className="font-label text-label-sm text-light-on-surface-variant">Confirmed Bookings</p>
          <p className="font-headline text-headline-md text-light-on-surface font-bold tabular-nums mt-1">
            {stats.totalBookings}
          </p>
          <span className="text-body-xs text-light-on-surface-variant mt-1 inline-block">Across flights &amp; stays</span>
        </div>

        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
          <p className="font-label text-label-sm text-light-on-surface-variant">Registered Members</p>
          <p className="font-headline text-headline-md text-light-on-surface font-bold tabular-nums mt-1">
            {stats.usersCount}
          </p>
          <span className="text-body-xs text-light-on-surface-variant mt-1 inline-block">Verified accounts</span>
        </div>

        <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-lg shadow-sm">
          <p className="font-label text-label-sm text-light-on-surface-variant">Active Inventory</p>
          <p className="font-headline text-headline-md text-light-on-surface font-bold tabular-nums mt-1">
            {stats.flightsCount + stats.hotelsCount}
          </p>
          <span className="text-body-xs text-light-on-surface-variant mt-1 inline-block">
            {stats.flightsCount} Flights · {stats.hotelsCount} Hotels
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-light-outline-variant mb-gutter-md">
        <button
          type="button"
          onClick={() => setActiveTab('bookings')}
          className={`px-gutter-md py-3 font-label text-label-md cursor-pointer transition-colors ${
            activeTab === 'bookings'
              ? 'text-light-primary-container border-b-2 border-light-primary-container font-semibold'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
        >
          Bookings Management
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-gutter-md py-3 font-label text-label-md cursor-pointer transition-colors ${
            activeTab === 'users'
              ? 'text-light-primary-container border-b-2 border-light-primary-container font-semibold'
              : 'text-light-on-surface-variant hover:text-light-on-surface'
          }`}
        >
          User Accounts
        </button>
      </div>

      {/* Bookings Table */}
      {activeTab === 'bookings' && (
        <div className="bg-light-surface border border-light-outline-variant rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-light-outline-variant bg-light-surface-container-low text-light-on-surface-variant font-label text-label-sm">
                <th className="py-3 px-gutter-md">Booking Ref</th>
                <th className="py-3 px-gutter-md">Customer</th>
                <th className="py-3 px-gutter-md">Type</th>
                <th className="py-3 px-gutter-md">Amount</th>
                <th className="py-3 px-gutter-md">Status</th>
                <th className="py-3 px-gutter-md">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-outline-variant text-body-sm text-light-on-surface">
              {(bookings.length > 0 ? bookings : [
                {
                  _id: 'b-1',
                  bookingReference: 'TS-FL-78219',
                  user: { name: 'Claire Bennett', email: 'traveler@tripsphere.travel' },
                  bookingType: 'flight',
                  totalPrice: 534,
                  status: 'confirmed',
                },
                {
                  _id: 'b-2',
                  bookingReference: 'TS-HT-99201',
                  user: { name: 'Marcus Chen', email: 'marcus@example.com' },
                  bookingType: 'hotel',
                  totalPrice: 1254,
                  status: 'confirmed',
                },
              ]).map((b) => (
                <tr key={b._id} className="hover:bg-light-surface-container-low/50 transition-colors">
                  <td className="py-3 px-gutter-md font-mono font-bold text-light-primary-container">
                    {b.bookingReference}
                  </td>
                  <td className="py-3 px-gutter-md">
                    <p className="font-semibold">{b.user?.name || 'Claire Bennett'}</p>
                    <p className="text-body-xs text-light-on-surface-variant">{b.user?.email || 'user@example.com'}</p>
                  </td>
                  <td className="py-3 px-gutter-md capitalize">
                    <span className="px-2 py-0.5 rounded bg-light-secondary-container text-light-on-secondary-container text-label-xs font-semibold">
                      {b.bookingType}
                    </span>
                  </td>
                  <td className="py-3 px-gutter-md font-headline font-bold tabular-nums">
                    ${b.totalPrice}
                  </td>
                  <td className="py-3 px-gutter-md">
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="rounded border border-light-outline-variant bg-light-surface px-2 py-1 text-label-xs font-semibold cursor-pointer outline-none"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-gutter-md">
                    <button
                      type="button"
                      onClick={() => alert(`Details for ${b.bookingReference}`)}
                      className="text-light-primary-container hover:underline text-label-sm cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Users Table */}
      {activeTab === 'users' && (
        <div className="bg-light-surface border border-light-outline-variant rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-light-outline-variant bg-light-surface-container-low text-light-on-surface-variant font-label text-label-sm">
                <th className="py-3 px-gutter-md">Name</th>
                <th className="py-3 px-gutter-md">Email</th>
                <th className="py-3 px-gutter-md">Role</th>
                <th className="py-3 px-gutter-md">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-outline-variant text-body-sm text-light-on-surface">
              {(users.length > 0 ? users : [
                { _id: 'u-1', name: 'TripSphere Admin', email: 'admin@tripsphere.travel', role: 'admin', phone: '+1 800-555-0199' },
                { _id: 'u-2', name: 'Claire Bennett', email: 'traveler@tripsphere.travel', role: 'user', phone: '+1 555-234-5678' },
              ]).map((u) => (
                <tr key={u._id} className="hover:bg-light-surface-container-low/50 transition-colors">
                  <td className="py-3 px-gutter-md font-semibold">{u.name}</td>
                  <td className="py-3 px-gutter-md text-light-on-surface-variant">{u.email}</td>
                  <td className="py-3 px-gutter-md">
                    <span
                      className={`px-2 py-0.5 rounded-full text-label-xs font-semibold ${
                        u.role === 'admin'
                          ? 'bg-amber-star/15 text-amber-600'
                          : 'bg-light-secondary-container text-light-on-secondary-container'
                      }`}
                    >
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-gutter-md text-light-on-surface-variant">{u.phone || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Flight Modal */}
      {showFlightModal && (
        <div className="fixed inset-0 z-50 bg-light-scrim/60 backdrop-blur-sm flex items-center justify-center p-gutter-md">
          <div className="bg-light-surface border border-light-outline-variant rounded-lg p-gutter-xl max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between pb-gutter-sm border-b border-light-outline-variant mb-gutter-md">
              <h3 className="font-headline text-title-lg text-light-on-surface">Add New Flight Route</h3>
              <button
                type="button"
                onClick={() => setShowFlightModal(false)}
                className="text-light-on-surface-variant hover:text-light-on-surface cursor-pointer text-title-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateFlight} className="flex flex-col gap-gutter-sm">
              <div className="grid grid-cols-2 gap-gutter-sm">
                <label className="flex flex-col gap-1">
                  <span className="font-label text-label-xs text-light-on-surface">Airline Name</span>
                  <input
                    type="text"
                    required
                    value={newFlight.airline}
                    onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })}
                    placeholder="e.g. Delta Air Lines"
                    className="border border-light-outline-variant rounded p-2 text-body-sm"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-label text-label-xs text-light-on-surface">Airline Code &amp; Flight #</span>
                  <input
                    type="text"
                    required
                    value={newFlight.flightNumber}
                    onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value, airlineCode: e.target.value.substring(0, 2) })}
                    placeholder="e.g. DL 106"
                    className="border border-light-outline-variant rounded p-2 text-body-sm"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-gutter-sm">
                <label className="flex flex-col gap-1">
                  <span className="font-label text-label-xs text-light-on-surface">From Airport (Code)</span>
                  <input
                    type="text"
                    required
                    value={newFlight.fromAirport}
                    onChange={(e) => setNewFlight({ ...newFlight, fromAirport: e.target.value, fromCity: e.target.value })}
                    placeholder="JFK"
                    className="border border-light-outline-variant rounded p-2 text-body-sm"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-label text-label-xs text-light-on-surface">To Airport (Code)</span>
                  <input
                    type="text"
                    required
                    value={newFlight.toAirport}
                    onChange={(e) => setNewFlight({ ...newFlight, toAirport: e.target.value, toCity: e.target.value })}
                    placeholder="LHR"
                    className="border border-light-outline-variant rounded p-2 text-body-sm"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="font-label text-label-xs text-light-on-surface">Price ($)</span>
                <input
                  type="number"
                  required
                  value={newFlight.price}
                  onChange={(e) => setNewFlight({ ...newFlight, price: Number(e.target.value) })}
                  className="border border-light-outline-variant rounded p-2 text-body-sm"
                />
              </label>

              <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-light-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowFlightModal(false)}
                  className="px-4 py-2 rounded border border-light-outline-variant text-label-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-light-primary-container text-light-on-primary-container font-label text-label-md cursor-pointer"
                >
                  Save Flight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

