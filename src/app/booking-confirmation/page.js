// app/booking-confirmation/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format, parseISO } from 'date-fns'

export default function BookingConfirmationPage() {
	const router = useRouter()
	const [booking, setBooking] = useState(null)
	const [countdown, setCountdown] = useState(5)

	useEffect(() => {
		// Get the most recent booking from localStorage
		const bookings = JSON.parse(localStorage.getItem('spaceBookings') || '[]')
		if (bookings.length > 0) {
			// Sort bookings by ID (timestamp) in descending order and get the most recent
			const sortedBookings = [...bookings].sort((a, b) => b.id - a.id)
			setBooking(sortedBookings[0])
		}

		// Auto-redirect to dashboard after 5 seconds
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer)
					router.push('/dashboard')
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [router])

	if (!booking) {
		return (
			<div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
				<div className="text-center p-8">
					<div className="text-4xl mb-4">🔍</div>
					<h1 className="text-2xl font-bold mb-4">No booking found</h1>
					<p className="text-gray-400 mb-6">
						We couldn't find your booking information.
					</p>
					<Link
						href="/booking"
						className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg"
					>
						Make a New Booking
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-gray-900 text-white min-h-screen py-12">
			<div className="max-w-4xl mx-auto px-4">
				<div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
					{/* Success Banner */}
					<div className="bg-gradient-to-r from-green-500 to-emerald-700 py-8 px-6 text-center">
						<div className="text-5xl mb-4">🚀</div>
						<h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
						<p className="text-xl">
							Your space adventure is officially on the calendar.
						</p>
					</div>

					{/* Booking Details */}
					<div className="p-8">
						<div className="mb-8 text-center">
							<p className="text-xl text-gray-300">
								Thank you for booking with Dubai Space. Your booking
								confirmation has been sent to your email.
							</p>
						</div>

						<div className="bg-gray-700 rounded-lg p-6 mb-8">
							<h2 className="text-2xl font-bold mb-4">Booking Information</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<p className="text-gray-400 mb-1">Booking Reference</p>
									<p className="text-xl font-medium">
										DST-{booking.id.toString().substring(5)}
									</p>
								</div>
								<div>
									<p className="text-gray-400 mb-1">Booking Date</p>
									<p className="font-medium">
										{format(parseISO(booking.bookingDate), 'MMMM dd, yyyy')}
									</p>
								</div>
								<div>
									<p className="text-gray-400 mb-1">Destination</p>
									<p className="font-medium">
										{booking.mode === 'custom'
											? booking.destinationName
											: booking.packageName}
									</p>
								</div>
								<div>
									<p className="text-gray-400 mb-1">Travel Date</p>
									<p className="font-medium">
										{format(parseISO(booking.departureDate), 'MMMM dd, yyyy')}
									</p>
								</div>
								<div>
									<p className="text-gray-400 mb-1">Passengers</p>
									<p className="font-medium">
										{booking.passengers}{' '}
										{booking.passengers === 1 ? 'person' : 'people'}
									</p>
								</div>
								<div>
									<p className="text-gray-400 mb-1">Total Cost</p>
									<p className="font-medium text-green-400">
										${booking.totalCost.toLocaleString()}
									</p>
								</div>
							</div>
						</div>

						{/* Next Steps */}
						<div className="mb-8">
							<h2 className="text-2xl font-bold mb-4">Next Steps</h2>
							<ol className="space-y-3">
								<li className="flex items-start">
									<div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
										1
									</div>
									<div className="ml-3">
										<p className="font-medium">
											Check your email for detailed itinerary and preparation
											guidelines.
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
										2
									</div>
									<div className="ml-3">
										<p className="font-medium">
											Complete your space traveler profile and medical
											assessment.
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
										3
									</div>
									<div className="ml-3">
										<p className="font-medium">
											Schedule your pre-flight training session (required for
											first-time travelers).
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
										4
									</div>
									<div className="ml-3">
										<p className="font-medium">
											Pack according to space travel guidelines provided in your
											email.
										</p>
									</div>
								</li>
							</ol>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							<Link
								href="/dashboard"
								className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-lg font-bold text-center"
							>
								Go to My Dashboard
							</Link>
							<Link
								href="/"
								className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-8 rounded-lg text-center"
							>
								Return to Home
							</Link>
						</div>

						<div className="text-center mt-8 text-gray-400">
							Auto-redirecting to dashboard in {countdown} seconds...
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
