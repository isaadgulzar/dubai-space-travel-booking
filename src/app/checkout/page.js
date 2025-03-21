// app/checkout/page.js
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingData = searchParams.get('bookingData');
  
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookingData) {
      try {
        const parsedBooking = JSON.parse(decodeURIComponent(bookingData));
        setBooking(parsedBooking);
      } catch (e) {
        console.error('Error parsing booking data:', e);
      }
    }
  }, [bookingData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!cardNumber.trim() || !/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter the cardholder name';
    }
    
    if (!expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!cvv.trim() || !/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = 'Please enter a valid CVV code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Store booking in localStorage for the dashboard
      const existingBookings = JSON.parse(localStorage.getItem('spaceBookings') || '[]');
      
      const newBooking = {
        id: Date.now(),
        ...booking,
        status: 'Confirmed',
        bookingDate: new Date().toISOString(),
      };
      
      localStorage.setItem('spaceBookings', JSON.stringify([...existingBookings, newBooking]));
      
      // Redirect to confirmation page
      router.push('/booking-confirmation');
    }, 2000);
  };

  if (!booking) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold mb-4">No booking data found</h1>
          <p className="text-gray-400 mb-6">Please start the booking process again.</p>
          <Link
            href="/booking"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg"
          >
            Return to Booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Complete Your Booking</h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-center text-gray-300">
            Secure payment for your space adventure
          </p>
        </div>
      </div>
      
      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-gray-300 mb-2 font-medium">Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-indigo-500 bg-indigo-900/30' 
                          : 'border-gray-700 hover:border-indigo-400'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">💳</div>
                        <div className="text-sm font-medium">Credit Card</div>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                        paymentMethod === 'crypto' 
                          ? 'border-indigo-500 bg-indigo-900/30' 
                          : 'border-gray-700 hover:border-indigo-400'
                      }`}
                      onClick={() => setPaymentMethod('crypto')}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🪙</div>
                        <div className="text-sm font-medium">Crypto</div>
                      </div>
                    </div>
                    <div
                      className={`border rounded-lg p-4 flex items-center justify-center cursor-pointer transition-colors ${
                        paymentMethod === 'bank' 
                          ? 'border-indigo-500 bg-indigo-900/30' 
                          : 'border-gray-700 hover:border-indigo-400'
                      }`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">🏦</div>
                        <div className="text-sm font-medium">Bank Transfer</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Credit Card Details */}
                {paymentMethod === 'card' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2 font-medium">Card Number</label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2 font-medium">Cardholder Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                      {errors.cardName && (
                        <p className="text-red-400 text-sm mt-1">{errors.cardName}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2 font-medium">CVV</label>
                        <input
                          type="text"
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                        {errors.cvv && (
                          <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                
                {/* Crypto Payment */}
                {paymentMethod === 'crypto' && (
                  <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Crypto Payment</h3>
                    <p className="text-gray-300 mb-3">
                      Send the exact amount to the following wallet address:
                    </p>
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-600 mb-3 font-mono text-sm">
                      0x8F32b1b8Aa4BF893F1396256d225C5F6b5b5c341
                    </div>
                    <p className="text-yellow-400 text-sm">
                      Important: Only send the exact amount. After sending, click &quot;Complete Payment&quot;.
                    </p>
                  </div>
                )}
                
                {/* Bank Transfer */}
                {paymentMethod === 'bank' && (
                  <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Bank Transfer Details</h3>
                    <p className="text-gray-300 mb-3">
                      Please transfer the exact amount to the following bank account:
                    </p>
                    <div className="space-y-2 mb-3">
                      <p><span className="text-gray-400">Bank:</span> Intergalactic Bank of Dubai</p>
                      <p><span className="text-gray-400">Account Name:</span> Dubai Space Travel LLC</p>
                      <p><span className="text-gray-400">Account Number:</span> 8374629501</p>
                      <p><span className="text-gray-400">IBAN:</span> AE123456789012345678901</p>
                      <p><span className="text-gray-400">Reference:</span> DST-{Date.now().toString().substring(5)}</p>
                    </div>
                    <p className="text-yellow-400 text-sm">
                      Important: Include the reference number in your transfer. After sending, click &quot;Complete Payment&quot;.
                    </p>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                      I agree to the <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">Terms and Conditions</Link> and <Link href="/policies" className="text-indigo-400 hover:text-indigo-300">Space Travel Policies</Link>
                    </label>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <Link
                    href="/booking"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg text-center"
                  >
                    Back to Booking
                  </Link>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-bold flex items-center justify-center"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Complete Payment ($${booking.totalCost.toLocaleString()})`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                {booking.mode === 'custom' ? (
                  <>
                    <div>
                      <p className="text-gray-400 text-sm">Destination</p>
                      <p className="text-lg font-medium">{booking.destinationName}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Travel Class</p>
                      <p className="font-medium capitalize">{booking.seatClass}</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-gray-400 text-sm">Package</p>
                    <p className="text-lg font-medium">{booking.packageName}</p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Departure</p>
                    <p className="font-medium">{format(parseISO(booking.departureDate), 'MMM dd, yyyy')}</p>
                  </div>
                  
                  {booking.returnDate && (
                    <div>
                      <p className="text-gray-400 text-sm">Return</p>
                      <p className="font-medium">{format(parseISO(booking.returnDate), 'MMM dd, yyyy')}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Passengers</p>
                  <p className="font-medium">{booking.passengers} {booking.passengers === 1 ? 'passenger' : 'passengers'}</p>
                </div>
                
                {booking.accommodationName && (
                  <div>
                    <p className="text-gray-400 text-sm">Accommodation</p>
                    <p className="font-medium">{booking.accommodationName}</p>
                    <p className="text-sm text-gray-400">{booking.accommodationNights} nights</p>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-4 mt-4">
                  {booking.mode === 'custom' && (
                    <>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Travel Cost:</span>
                        <span className="text-white">${booking.travelCost.toLocaleString()}</span>
                      </div>
                      
                      {booking.accommodationCost > 0 && (
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Accommodation:</span>
                          <span className="text-white">${booking.accommodationCost.toLocaleString()}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Space Tax:</span>
                    <span className="text-white">${Math.round(booking.totalCost * 0.05).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Booking Fee:</span>
                    <span className="text-white">${(1500).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-700">
                    <span className="text-white">Total:</span>
                    <span className="text-indigo-400">${booking.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-700 p-4 rounded-lg text-sm">
                <h3 className="font-medium mb-2">Important Information</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>• Pre-flight training is mandatory for first-time travelers</li>
                  <li>• Medical clearance required 30 days before departure</li>
                  <li>• Cancellation policies apply as per terms</li>
                  <li>• Luggage limits: 20kg per passenger</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}