// app/page.js
import Link from 'next/link'
import Image from 'next/image'
import { getPopularDestinations } from '../data/destinations'
import { getFeaturedPackages } from '../data/packages'

export default function Home() {
	const popularDestinations = getPopularDestinations()
	const featuredPackages = getFeaturedPackages()

	return (
		<div>
			{/* Hero Section */}
			<section className="relative h-screen bg-black">
				<div className="absolute inset-0 bg-[url('/images/space-hero.jpg')] bg-cover bg-center opacity-60"></div>
				<div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Dubai to the Stars
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-3xl">
						The Ultimate Space Travel Experience
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href="/destinations"
							className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
						>
							Explore Destinations
						</Link>
						<Link
							href="/booking"
							className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg"
						>
							Book Now
						</Link>
					</div>
				</div>
			</section>

			{/* Popular Destinations */}
			<section className="py-16 px-4 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold mb-12 text-center">
						Popular Destinations
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{popularDestinations.map((destination) => (
							<div
								key={destination.id}
								className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
							>
								<div className="relative h-48">
									<div className="absolute inset-0 bg-gray-600"></div>
									<div className="absolute bottom-0 left-0 p-4">
										<h3 className="text-xl font-bold text-white">
											{destination.name}
										</h3>
										<p className="text-indigo-300">
											{destination.distance} from Earth
										</p>
									</div>
								</div>
								<div className="p-6">
									<p className="text-gray-300 mb-4">
										{destination.description}
									</p>
									<div className="flex justify-between items-center">
										<p className="text-indigo-400">
											From ${destination.price.economy.toLocaleString()}
										</p>
										<Link
											href={`/destinations/${destination.id}`}
											className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
										>
											Details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="text-center mt-12">
						<Link
							href="/destinations"
							className="inline-block border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors duration-300 font-bold py-3 px-8 rounded-lg"
						>
							View All Destinations
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Packages */}
			<section className="py-16 px-4 bg-indigo-900 text-white">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold mb-12 text-center">
						Featured Travel Packages
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{featuredPackages.map((pkg) => (
							<div
								key={pkg.id}
								className="bg-indigo-800 rounded-lg overflow-hidden shadow-xl"
							>
								<div className="relative h-48">
									<div className="absolute inset-0 bg-indigo-600"></div>
									<div className="absolute bottom-0 left-0 p-4">
										<h3 className="text-xl font-bold text-white">{pkg.name}</h3>
										<p className="text-indigo-200">{pkg.duration}</p>
									</div>
								</div>
								<div className="p-6">
									<p className="text-gray-200 mb-4">{pkg.description}</p>
									<ul className="mb-6 space-y-2">
										{pkg.includes.slice(0, 3).map((item, index) => (
											<li
												key={index}
												className="flex items-start"
											>
												<span className="mr-2 text-indigo-300">✓</span>
												<span className="text-gray-300">{item}</span>
											</li>
										))}
									</ul>
									<div className="flex justify-between items-center">
										<p className="text-white font-bold">
											${pkg.price.toLocaleString()}
										</p>
										<Link
											href={`/booking?package=${pkg.id}`}
											className="bg-white hover:bg-gray-100 text-indigo-700 py-2 px-4 rounded"
										>
											Book Now
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 px-4 bg-black text-white">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-3xl font-bold mb-12 text-center">
						Why Choose Dubai Space
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="bg-gray-900 p-8 rounded-lg text-center">
							<div className="text-indigo-400 text-4xl mb-4">🛰️</div>
							<h3 className="text-xl font-bold mb-2">
								Cutting-Edge Technology
							</h3>
							<p className="text-gray-400">
								Our spacecraft feature the latest safety and comfort
								innovations.
							</p>
						</div>
						<div className="bg-gray-900 p-8 rounded-lg text-center">
							<div className="text-indigo-400 text-4xl mb-4">👨‍🚀</div>
							<h3 className="text-xl font-bold mb-2">Expert Crews</h3>
							<p className="text-gray-400">
								Veteran astronauts and space professionals guide your journey.
							</p>
						</div>
						<div className="bg-gray-900 p-8 rounded-lg text-center">
							<div className="text-indigo-400 text-4xl mb-4">🌠</div>
							<h3 className="text-xl font-bold mb-2">Unique Destinations</h3>
							<p className="text-gray-400">
								Travel to remarkable places few humans have ever visited.
							</p>
						</div>
						<div className="bg-gray-900 p-8 rounded-lg text-center">
							<div className="text-indigo-400 text-4xl mb-4">💎</div>
							<h3 className="text-xl font-bold mb-2">Luxury Experience</h3>
							<p className="text-gray-400">
								Unparalleled comfort and service throughout your space
								adventure.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-16 px-4 bg-indigo-700 text-white">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to Experience Space Travel?
					</h2>
					<p className="text-xl mb-8">
						Book your journey today and be among the first generation of space
						tourists!
					</p>
					<Link
						href="/booking"
						className="inline-block bg-white hover:bg-gray-100 text-indigo-700 font-bold py-3 px-8 rounded-lg text-lg"
					>
						Book Your Space Adventure
					</Link>
				</div>
			</section>
		</div>
	)
}
