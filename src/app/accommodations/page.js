// app/accommodations/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { accommodations } from '../../data/accommodations';
import { destinations, getDestination } from '../../data/destinations';

export default function AccommodationsPage() {
  const searchParams = useSearchParams();
  const destinationId = searchParams.get('destination');
  
  const [selectedDestination, setSelectedDestination] = useState(destinationId ? parseInt(destinationId) : null);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedRating, setSelectedRating] = useState(0);

  // Initialize and filter accommodations
  useEffect(() => {
    let filtered = [...accommodations];
    
    if (selectedDestination) {
      filtered = filtered.filter(acc => acc.destinationId === selectedDestination);
    }
    
    filtered = filtered.filter(acc => 
      acc.pricePerNight >= priceRange[0] && 
      acc.pricePerNight <= priceRange[1]
    );
    
    if (selectedRating > 0) {
      filtered = filtered.filter(acc => acc.rating >= selectedRating);
    }
    
    setFilteredAccommodations(filtered);
  }, [selectedDestination, priceRange, selectedRating]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 bg-black">
        <div className="absolute inset-0 bg-[url('/images/space-hotel.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Space Accommodations</h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
              Discover luxury hotels and resorts across space destinations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              
              {/* Destination Filter */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Destination</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedDestination || ''}
                  onChange={(e) => setSelectedDestination(e.target.value ? parseInt(e.target.value) : null)}
                >
                  <option value="">All Destinations</option>
                  {destinations.map(dest => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Price Range (per night)</label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">${priceRange[0].toLocaleString()}</span>
                  <span className="text-gray-400">${priceRange[1].toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  step="10000"
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-gray-300 mb-2 font-medium">Minimum Rating</label>
                <div className="flex space-x-2">
                  {[0, 4, 4.5, 4.8].map((rating) => (
                    <button
                      key={rating}
                      className={`px-3 py-1 rounded ${
                        selectedRating === rating 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-700 text-gray-300'
                      }`}
                      onClick={() => setSelectedRating(rating)}
                    >
                      {rating === 0 ? 'All' : rating+'+'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Reset Filters */}
              <button
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={() => {
                  setSelectedDestination(null);
                  setPriceRange([0, 200000]);
                  setSelectedRating(0);
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
          
          {/* Accommodations Grid */}
          <div className="w-full lg:w-3/4">
            {filteredAccommodations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAccommodations.map((accommodation) => {
                  const destination = getDestination(accommodation.destinationId);
                  
                  return (
                    <div key={accommodation.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
                      <div className="relative h-48 bg-gray-700">
                        <div className="absolute bottom-0 left-0 p-4">
                          <h2 className="text-xl font-bold text-white">{accommodation.name}</h2>
                          <p className="text-indigo-300">
                            {accommodation.location} • {destination?.name}
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span className="text-white font-medium">{accommodation.rating}</span>
                          </div>
                          <span className="text-indigo-400 font-bold">
                            ${accommodation.pricePerNight.toLocaleString()} <span className="text-gray-400 font-normal text-sm">per night</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{accommodation.description}</p>
                        
                        {/* Room Types */}
                        <div className="mb-4">
                          <h3 className="text-lg font-medium mb-2">Room Types</h3>
                          <div className="flex flex-wrap gap-2">
                            {accommodation.rooms.map((room, index) => (
                              <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                                {room}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Amenities */}
                        <div className="mb-6">
                          <h3 className="text-lg font-medium mb-2">Amenities</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                              <div key={index} className="text-gray-400 flex items-center">
                                <span className="text-indigo-400 mr-2">✓</span> {amenity}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                          <Link 
                            href={`/destinations/${accommodation.destinationId}`}
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            View Destination
                          </Link>
                          <Link
                            href={`/booking?destination=${accommodation.destinationId}&accommodation=${accommodation.id}`}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">No accommodations found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your filters to see more options.</p>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  onClick={() => {
                    setSelectedDestination(null);
                    setPriceRange([0, 200000]);
                    setSelectedRating(0);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}