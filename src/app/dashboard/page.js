// app/dashboard/page.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDistanceToNow, parseISO, format } from 'date-fns'

export default function DashboardPage() {
	const [bookings, setBookings] = useState([])
	const [activeTab, setActiveTab] = useState('upcoming')
	const [userProfile, setUserProfile] = useState({
		name: 'Space Traveler',
		email: 'traveler@example.com',
		profileImage: '/images/astronaut-profile.jpg',
		memberSince: '2025-01-15',
		loyaltyPoints: 7500,
		traveledDistance: 784800, // km
		completedTrips: 2,
	})

	// Travel tips to show in the dashboard
	const travelTips = [
		'Pack lightweight clothing that can be layered for the temperature-controlled environment.',
		'Bring medication for space sickness - it affects about 45% of first-time travelers.',
		'Remember to stay hydrated before, during, and after your space journey.',
		"Space food is specially prepared - do not expect to bring your own snacks!",
		'Zero-G training is recommended before your first space trip.',
		'Digital entertainment is provided, but download some content in case of connection issues.',
		'Communication delays increase with distance from Earth - plan your calls accordingly.',
		'Space radiation exposure is minimized but bring high-SPF sunscreen for your visit.',
		"Your body will temporarily grow taller in zero-G - do not be surprised!",
		'Sleeping in space takes practice - use the provided restraints to avoid floating.',
	]

	useEffect(() => {
		// Load bookings from localStorage in a real app, this would come from an API
		const savedBookings = JSON.parse(
			localStorage.getItem('spaceBookings') || '[]'
		)
		setBookings(savedBookings)
	}, [])

	// Filter bookings based on active tab
	const filteredBookings = bookings.filter((booking) => {
		const departureDate = parseISO(booking.departureDate)
		const now = new Date()

		if (activeTab === 'upcoming') {
			return departureDate > now
		} else {
			return departureDate <= now
		}
	})

	// Calculate countdown for upcoming trips
	const getCountdown = (dateString) => {
		const departureDate = parseISO(dateString)
		const now = new Date()

		if (departureDate <= now) {
			return 'Departed'
		}

		return formatDistanceToNow(departureDate, { addSuffix: true })
	}

	// Random tip selector
	const getRandomTip = () => {
		const randomIndex = Math.floor(Math.random() * travelTips.length)
		return travelTips[randomIndex]
	}

	return (
		<div className="bg-gray-900 text-white min-h-screen">
			{/* Dashboard Header */}
			<div className="bg-black py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-bold">My Space Dashboard</h1>
					<p className="mt-2 text-xl text-gray-300">
						Manage your space travel bookings and journey details
					</p>
				</div>
			</div>

			{/* Dashboard Content */}
			<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - User Profile */}
					<div className="lg:col-span-1">
						<div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
							<div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6">
								<div className="flex items-center">
									<div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-white"></div>
									<div className="ml-4">
										<h2 className="text-2xl font-bold">{userProfile.name}</h2>
										<p className="text-indigo-200">{userProfile.email}</p>
									</div>
								</div>
							</div>

							<div className="p-6">
								<div className="mb-6">
									<h3 className="text-lg font-medium mb-2">Traveler Stats</h3>
									<div className="grid grid-cols-2 gap-4">
										<div className="bg-gray-700 p-3 rounded-lg">
											<div className="text-indigo-400 text-2xl font-bold">
												{userProfile.completedTrips}
											</div>
											<div className="text-gray-400 text-sm">
												Completed Trips
											</div>
										</div>
										<div className="bg-gray-700 p-3 rounded-lg">
											<div className="text-indigo-400 text-2xl font-bold">
												{userProfile.loyaltyPoints.toLocaleString()}
											</div>
											<div className="text-gray-400 text-sm">
												Loyalty Points
											</div>
										</div>
										<div className="bg-gray-700 p-3 rounded-lg">
											<div className="text-indigo-400 text-2xl font-bold">
												{(userProfile.traveledDistance / 1000).toLocaleString()}
											</div>
											<div className="text-gray-400 text-sm">
												Thousand Kilometers
											</div>
										</div>
										<div className="bg-gray-700 p-3 rounded-lg">
											<div className="text-indigo-400 text-2xl font-bold">
												{format(parseISO(userProfile.memberSince), 'MMM yyyy')}
											</div>
											<div className="text-gray-400 text-sm">Member Since</div>
										</div>
									</div>
								</div>

								<div className="mb-6">
									<h3 className="text-lg font-medium mb-2">AI Travel Tip</h3>
									<div className="bg-gray-700 p-4 rounded-lg">
										<p className="text-gray-300">{getRandomTip()}</p>
									</div>
								</div>

								<div>
									<h3 className="text-lg font-medium mb-2">Quick Links</h3>
									<ul className="space-y-2">
										<li>
											<Link
												href="/booking"
												className="text-indigo-400 hover:text-indigo-300 flex items-center"
											>
												<span className="mr-2">🚀</span> Book a New Trip
											</Link>
										</li>
										<li>
											<Link
												href="/safety"
												className="text-indigo-400 hover:text-indigo-300 flex items-center"
											>
												<span className="mr-2">🛡️</span> Space Safety Guide
											</Link>
										</li>
										<li>
											<Link
												href="/profile/settings"
												className="text-indigo-400 hover:text-indigo-300 flex items-center"
											>
												<span className="mr-2">⚙️</span> Account Settings
											</Link>
										</li>
										<li>
											<Link
												href="/help"
												className="text-indigo-400 hover:text-indigo-300 flex items-center"
											>
												<span className="mr-2">❓</span> Help Center
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Bookings */}
					<div className="lg:col-span-2">
						<div className="bg-gray-800 rounded-lg shadow-lg">
							<div className="border-b border-gray-700">
								<div className="flex">
									<button
										className={`py-4 px-6 text-center font-medium ${
											activeTab === 'upcoming'
												? 'border-b-2 border-indigo-500 text-indigo-400'
												: 'text-gray-400 hover:text-white'
										}`}
										onClick={() => setActiveTab('upcoming')}
									>
										Upcoming Trips
									</button>
									<button
										className={`py-4 px-6 text-center font-medium ${
											activeTab === 'past'
												? 'border-b-2 border-indigo-500 text-indigo-400'
												: 'text-gray-400 hover:text-white'
										}`}
										onClick={() => setActiveTab('past')}
									>
										Past Trips
									</button>
								</div>
							</div>

							<div className="p-6">
								{filteredBookings.length > 0 ? (
									<div className="space-y-6">
										{filteredBookings.map((booking) => (
											<div
												key={booking.id}
												className="bg-gray-700 rounded-lg p-6 shadow hover:shadow-indigo-500/20 transition-shadow"
											>
												<div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
													<div>
														<h3 className="text-xl font-bold">
															{booking.mode === 'package'
																? booking.packageName
																: booking.destinationName}
														</h3>
														<p className="text-gray-400">
															{booking.mode === 'package'
																? `Travel Package (${booking.passengers} travelers)`
																: `Custom Trip • ${booking.seatClass} Class • ${booking.passengers} travelers`}
														</p>
													</div>
													<div className="mt-2 md:mt-0">
														<span
															className={`inline-block px-3 py-1 rounded-full text-sm ${
																booking.status === 'Confirmed'
																	? 'bg-green-900 text-green-300'
																	: 'bg-amber-900 text-amber-300'
															}`}
														>
															{booking.status}
														</span>
													</div>
												</div>

												<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
													<div>
														<div className="text-gray-400 text-sm">
															Departure
														</div>
														<div className="text-white">
															{format(
																parseISO(booking.departureDate),
																'MMM dd, yyyy'
															)}
														</div>
													</div>

													{booking.returnDate && (
														<div>
															<div className="text-gray-400 text-sm">
																Return
															</div>
															<div className="text-white">
																{format(
																	parseISO(booking.returnDate),
																	'MMM dd, yyyy'
																)}
															</div>
														</div>
													)}

													<div>
														<div className="text-gray-400 text-sm">
															Total Cost
														</div>
														<div className="text-white">
															${booking.totalCost.toLocaleString()}
														</div>
													</div>
												</div>

												{activeTab === 'upcoming' && (
													<div className="bg-indigo-900/30 border border-indigo-800 rounded-lg p-4 mb-4">
														<div className="flex items-center">
															<div className="text-2xl mr-3">🕒</div>
															<div>
																<div className="text-sm text-indigo-300">
																	Countdown to Launch
																</div>
																<div className="text-xl font-bold text-white">
																	{getCountdown(booking.departureDate)}
																</div>
															</div>
														</div>
													</div>
												)}

												{booking.accommodationName && (
													<div className="mb-4">
														<div className="text-gray-400 text-sm">
															Accommodation
														</div>
														<div className="text-white">
															{booking.accommodationName} •{' '}
															{booking.accommodationNights} nights
														</div>
													</div>
												)}

												<div className="flex flex-wrap gap-3 mt-4">
													<Link
														href={`/booking-details/${booking.id}`}
														className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm"
													>
														View Details
													</Link>

													{activeTab === 'upcoming' && (
														<>
															<button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg text-sm">
																Modify Booking
															</button>
															<button className="bg-red-900/60 hover:bg-red-800 text-white py-2 px-4 rounded-lg text-sm">
																Cancel Trip
															</button>
														</>
													)}

													{activeTab === 'past' && (
														<button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-lg text-sm">
															Book Similar Trip
														</button>
													)}
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-12">
										<div className="text-5xl mb-4">🚀</div>
										<h3 className="text-xl font-bold mb-2">
											No {activeTab} trips found
										</h3>
										<p className="text-gray-400 mb-6">
											{activeTab === 'upcoming'
												? "You do not have any upcoming space trips booked."
												: "You have not completed any space trips yet."}
										</p>
										<Link
											href="/booking"
											className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg inline-block"
										>
											Book Your First Trip
										</Link>
									</div>
								)}
							</div>
						</div>

						{/* Space News Section */}
						<div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
							<h2 className="text-2xl font-bold mb-4">Space News & Updates</h2>

							<div className="space-y-4">
								<div className="border-b border-gray-700 pb-4">
									<h3 className="font-bold text-lg mb-1">
										New Mars Orbiter Package Announced
									</h3>
									<p className="text-gray-300 mb-2">
										Experience the red planet from our upgraded Mars Orbiter
										with enhanced viewing domes and longer surface excursions.
									</p>
									<div className="flex justify-between items-center">
										<span className="text-gray-400 text-sm">
											Posted 3 days ago
										</span>
										<Link
											href="/news/mars-orbiter"
											className="text-indigo-400 hover:text-indigo-300 text-sm"
										>
											Read More
										</Link>
									</div>
								</div>

								<div className="border-b border-gray-700 pb-4">
									<h3 className="font-bold text-lg mb-1">
										Safety Protocol Updates for All Destinations
									</h3>
									<p className="text-gray-300 mb-2">
										We have enhanced our safety protocols across all space
										destinations to ensure an even safer journey.
									</p>
									<div className="flex justify-between items-center">
										<span className="text-gray-400 text-sm">
											Posted 5 days ago
										</span>
										<Link
											href="/news/safety-updates"
											className="text-indigo-400 hover:text-indigo-300 text-sm"
										>
											Read More
										</Link>
									</div>
								</div>

								<div>
									<h3 className="font-bold text-lg mb-1">
										Dubai Space Center Expansion
									</h3>
									<p className="text-gray-300 mb-2">
										Our main launch facility in Dubai is expanding with three
										new departure terminals opening next month.
									</p>
									<div className="flex justify-between items-center">
										<span className="text-gray-400 text-sm">
											Posted 1 week ago
										</span>
										<Link
											href="/news/center-expansion"
											className="text-indigo-400 hover:text-indigo-300 text-sm"
										>
											Read More
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
