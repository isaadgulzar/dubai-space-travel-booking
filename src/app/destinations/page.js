// app/destinations/page.js
import Link from 'next/link'
import { destinations } from '../../data/destinations'

export default function DestinationsPage() {
	return (
		<div className="bg-gray-900 text-white min-h-screen">
			{/* Hero Banner */}
			<div className="relative py-16 bg-black">
				<div className="absolute inset-0 bg-[url('/images/stars-bg.jpg')] bg-cover bg-center opacity-30"></div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
							Space Destinations
						</h1>
						<p className="mt-4 max-w-3xl mx-auto text-xl text-gray-300">
							Discover extraordinary places beyond Earth and book your next
							space adventure.
						</p>
					</div>
				</div>
			</div>

			{/* Destinations Grid */}
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{destinations.map((destination) => (
						<div
							key={destination.id}
							className="bg-gray-800 rounded-xl overflow-hidden shadow-lg group hover:shadow-indigo-500/30 transition-all duration-300"
						>
							<div className="relative h-56 bg-gray-700 group-hover:bg-indigo-900 transition-colors duration-300">
								<div className="absolute bottom-0 left-0 p-6">
									<h2 className="text-2xl font-bold text-white">
										{destination.name}
									</h2>
									<p className="text-indigo-300">
										Distance: {destination.distance}
									</p>
								</div>
							</div>
							<div className="p-6">
								<div className="flex justify-between items-center mb-4">
									<span className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
										Travel time: {destination.travelTime}
									</span>
									{destination.popular && (
										<span className="bg-amber-600 text-white text-sm px-3 py-1 rounded-full">
											Popular
										</span>
									)}
								</div>

								<p className="text-gray-300 mb-6">{destination.description}</p>

								<div className="mb-6">
									<h3 className="text-lg font-medium mb-2">Amenities</h3>
									<ul className="space-y-1">
										{destination.amenities.map((amenity, index) => (
											<li
												key={index}
												className="text-gray-400 flex items-center"
											>
												<span className="text-indigo-400 mr-2">✓</span>{' '}
												{amenity}
											</li>
										))}
									</ul>
								</div>

								<div className="border-t border-gray-700 pt-4">
									<div className="mb-4">
										<h3 className="text-lg font-medium mb-2">Pricing</h3>
										<div className="grid grid-cols-3 gap-2">
											{destination.price.economy && (
												<div className="text-center">
													<div className="text-gray-400 text-sm">Economy</div>
													<div className="text-white font-medium">
														${destination.price.economy.toLocaleString()}
													</div>
												</div>
											)}
											{destination.price.business && (
												<div className="text-center">
													<div className="text-gray-400 text-sm">Business</div>
													<div className="text-white font-medium">
														${destination.price.business.toLocaleString()}
													</div>
												</div>
											)}
											{destination.price.luxury && (
												<div className="text-center">
													<div className="text-gray-400 text-sm">Luxury</div>
													<div className="text-white font-medium">
														${destination.price.luxury.toLocaleString()}
													</div>
												</div>
											)}
										</div>
									</div>

									<div className="flex justify-between items-center">
										<Link
											href={`/accommodations?destination=${destination.id}`}
											className="text-indigo-400 hover:text-indigo-300"
										>
											View Accommodations
										</Link>
										<Link
											href={`/booking?destination=${destination.id}`}
											className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
										>
											Book Trip
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
