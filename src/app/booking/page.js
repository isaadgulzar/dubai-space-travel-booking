// app/booking/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths, format } from 'date-fns';

import { destinations, getDestination } from '../../data/destinations';
import { accommodations, getAccommodationsByDestination } from '../../data/accommodations';
import { packages, getPackage } from '../../data/packages';

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialDestinationId = searchParams.get('destination');
  const initialAccommodationId = searchParams.get('accommodation');
  const initialPackageId = searchParams.get('package');
  
  // Form state
  const [selectedDestination, setSelectedDestination] = useState(initialDestinationId ? parseInt(initialDestinationId) : null);
  const [selectedPackage, setSelectedPackage] = useState(initialPackageId ? parseInt(initialPackageId) : null);
  const [selectedSeatClass, setSelectedSeatClass] = useState('economy');
  const [passengers, setPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState(addMonths(new Date(), 3));
  const [returnDate, setReturnDate] = useState(addMonths(new Date(), 3 + 1));
  const [selectedAccommodation, setSelectedAccommodation] = useState(initialAccommodationId ? parseInt(initialAccommodationId) : null);
  const [accommodationNights, setAccommodationNights] = useState(7);
  
  // Derived state
  const [availableAccommodations, setAvailableAccommodations] = useState([]);
  const [currentDestinationData, setCurrentDestinationData] = useState(null);
  const [currentPackageData, setCurrentPackageData] = useState(null);
  const [currentAccommodationData, setCurrentAccommodationData] = useState(null);
  const [bookingMode, setBookingMode] = useState('custom'); // 'custom' or 'package'
  
  // Totals
  const [travelCost, setTravelCost] = useState(0);
  const [accommodationCost, setAccommodationCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // Load destination and package data
  useEffect(() => {
    if (selectedDestination) {
      const destData = getDestination(selectedDestination);
      setCurrentDestinationData(destData);
      
      const accomms = getAccommodationsByDestination(selectedDestination);
      setAvailableAccommodations(accomms);
      
      // Auto-select first accommodation if none is selected
      if (accomms.length > 0 && !selectedAccommodation) {
        setSelectedAccommodation(accomms[0].id);
      }
    } else {
      setCurrentDestinationData(null);
      setAvailableAccommodations([]);
    }
    
    if (initialPackageId) {
      setBookingMode('package');
    }
    
    if (selectedPackage) {
      const packageData = getPackage(selectedPackage);
      setCurrentPackageData(packageData);
      
      // Auto-select the destination associated with the package
      if (packageData && (!selectedDestination || selectedDestination !== packageData.destinationId)) {
        setSelectedDestination(packageData.destinationId);
      }
    } else {
      setCurrentPackageData(null);
    }
  }, [selectedDestination, selectedPackage, initialPackageId, initialDestinationId, selectedAccommodation]);
  
  // Update accommodation data when selected
  useEffect(() => {
    if (selectedAccommodation) {
      const accommData = accommodations.find(a => a.id === selectedAccommodation);
      setCurrentAccommodationData(accommData);
    } else {
      setCurrentAccommodationData(null);
    }
  }, [selectedAccommodation]);
  
  // Calculate costs
  useEffect(() => {
    if (bookingMode === 'package' && currentPackageData) {
      setTravelCost(currentPackageData.price * passengers);
      setAccommodationCost(0); // Included in package
      setTotalCost(currentPackageData.price * passengers);
    } else if (currentDestinationData && selectedSeatClass) {
      // Calculate travel cost
      const baseTravelCost = currentDestinationData.price[selectedSeatClass] || 0;
      const newTravelCost = baseTravelCost * passengers;
      setTravelCost(newTravelCost);
      
      // Calculate accommodation cost
      if (currentAccommodationData) {
        const newAccommodationCost = currentAccommodationData.pricePerNight * accommodationNights * Math.ceil(passengers / 2);
        setAccommodationCost(newAccommodationCost);
        setTotalCost(newTravelCost + newAccommodationCost);
      } else {
        setAccommodationCost(0);
        setTotalCost(newTravelCost);
      }
    }
  }, [
    bookingMode, 
    currentPackageData, 
    currentDestinationData, 
    currentAccommodationData, 
    selectedSeatClass, 
    passengers, 
    accommodationNights
  ]);
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingData = {
      mode: bookingMode,
      passengers,
      departureDate: format(departureDate, 'yyyy-MM-dd'),
      returnDate: format(returnDate, 'yyyy-MM-dd'),
      totalCost,
    };
    
    if (bookingMode === 'package') {
      bookingData.packageId = selectedPackage;
      bookingData.packageName = currentPackageData?.name;
      bookingData.packagePrice = currentPackageData?.price;
    } else {
      bookingData.destinationId = selectedDestination;
      bookingData.destinationName = currentDestinationData?.name;
      bookingData.seatClass = selectedSeatClass;
      bookingData.travelCost = travelCost;
      
      if (selectedAccommodation) {
        bookingData.accommodationId = selectedAccommodation;
        bookingData.accommodationName = currentAccommodationData?.name;
        bookingData.accommodationNights = accommodationNights;
        bookingData.accommodationCost = accommodationCost;
      }
    }
    
    // In a real application, we would send this data to an API
    console.log("Booking data:", bookingData);
    
    // Store booking in localStorage for the dashboard
    const existingBookings = JSON.parse(localStorage.getItem('spaceBookings') || '[]');
    const newBooking = {
      id: Date.now(),
      ...bookingData,
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
    };
    
    localStorage.setItem('spaceBookings', JSON.stringify([...existingBookings, newBooking]));
    
    // Redirect to dashboard
    router.push('/dashboard');
  };
  
  // Toggle between custom booking and package booking
  const toggleBookingMode = (mode) => {
    setBookingMode(mode);
    if (mode === 'package') {
      setSelectedPackage(packages[0].id);
    } else {
      setSelectedPackage(null);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Book Your Space Journey</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-center text-gray-300">
            Select your destination, travel class, and accommodations
          </p>
        </div>
      </div>
      
      {/* Booking Options */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="flex border-b border-gray-700">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                bookingMode === 'custom' 
                  ? 'bg-indigo-700 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => toggleBookingMode('custom')}
            >
              Custom Trip
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium ${
                bookingMode === 'package' 
                  ? 'bg-indigo-700 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => toggleBookingMode('package')}
            >
              Travel Package
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {bookingMode === 'custom' ? (
              <>
                {/* Destination Selection */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-medium">Select Destination</label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedDestination || ''}
                    onChange={(e) => setSelectedDestination(e.target.value ? parseInt(e.target.value) : null)}
                    required
                  >
                    <option value="">Select a destination</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name} - {dest.distance} from Earth
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Travel Class Selection */}
                {currentDestinationData && (
                  <div className="mb-6">
                    <label className="block text-gray-300 mb-2 font-medium">Select Travel Class</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(currentDestinationData.price).map(([className, price]) => {
                        if (!price) return null;
                        return (
                          <div
                            key={className}
                            className={`border rounded-lg overflow-hidden ${
                              selectedSeatClass === className
                                ? 'border-indigo-500 bg-indigo-900/30'
                                : 'border-gray-700 bg-gray-800/50'
                            } cursor-pointer hover:border-indigo-400 transition-colors`}
                            onClick={() => setSelectedSeatClass(className)}
                          >
                            <div className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium capitalize">{className}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  selectedSeatClass === className ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'
                                }`}>
                                  {selectedSeatClass === className ? 'Selected' : 'Select'}
                                </span>
                              </div>
                              <p className="text-indigo-300 font-bold text-xl mb-2">${price.toLocaleString()}</p>
                              <div className="text-gray-400 text-sm">
                                {className === 'economy' && (
                                  <p>Standard space travel experience with essential amenities.</p>
                                )}
                                {className === 'business' && (
                                  <p>Enhanced comfort with premium food and larger personal space.</p>
                                )}
                                {className === 'luxury' && (
                                  <p>Ultimate space travel with private cabins and personalized service.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Dates Selection */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Departure Date</label>
                    <ReactDatePicker
                      selected={departureDate}
                      onChange={date => setDepartureDate(date)}
                      minDate={addMonths(new Date(), 1)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Return Date</label>
                    <ReactDatePicker
                      selected={returnDate}
                      onChange={date => setReturnDate(date)}
                      minDate={departureDate}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                {/* Number of Passengers */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-medium">Number of Passengers</label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'passenger' : 'passengers'}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Accommodation Selection */}
                {selectedDestination && availableAccommodations.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-gray-300 font-medium">Select Accommodation</label>
                      <div className="flex items-center">
                        <label className="block text-gray-300 mr-2">Nights:</label>
                        <select
                          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={accommodationNights}
                          onChange={(e) => setAccommodationNights(parseInt(e.target.value))}
                        >
                          {[3, 5, 7, 10, 14, 21, 30].map(nights => (
                            <option key={nights} value={nights}>
                              {nights} nights
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableAccommodations.map((accomm) => (
                        <div
                          key={accomm.id}
                          className={`border rounded-lg overflow-hidden ${
                            selectedAccommodation === accomm.id
                              ? 'border-indigo-500 bg-indigo-900/30'
                              : 'border-gray-700 bg-gray-800/50'
                          } cursor-pointer hover:border-indigo-400 transition-colors`}
                          onClick={() => setSelectedAccommodation(accomm.id)}
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-lg font-medium">{accomm.name}</h3>
                              <div className="flex items-center">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span>{accomm.rating}</span>
                              </div>
                            </div>
                            <p className="text-indigo-300 font-bold mb-2">${accomm.pricePerNight.toLocaleString()} <span className="text-gray-400 font-normal text-sm">per night</span></p>
                            <p className="text-gray-400 text-sm mb-2">{accomm.location}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {accomm.amenities.slice(0, 2).map((amenity, index) => (
                                <span key={index} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
                                  {amenity}
                                </span>
                              ))}
                              {accomm.amenities.length > 2 && (
                                <span className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded-full">
                                  +{accomm.amenities.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Package Selection */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-medium">Select Package</label>
                  <select
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={selectedPackage || ''}
                    onChange={(e) => setSelectedPackage(e.target.value ? parseInt(e.target.value) : null)}
                    required
                  >
                    <option value="">Select a package</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} - ${pkg.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            {/* Total Cost */}
            <div className="mt-8 p-6 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Total Cost</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Travel Cost</span>
                  <span>${travelCost.toLocaleString()}</span>
                </div>
                {bookingMode === 'custom' && (
                  <div className="flex justify-between">
                    <span>Accommodation Cost</span>
                    <span>${accommodationCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}