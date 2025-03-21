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
			<section className="relative h-screen bg-black overflow-hidden">
				<div className="absolute inset-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 600"
						className="w-full h-full"
					>
						{/* Background gradient representing space */}
						<defs>
							<linearGradient
								id="spaceGradient"
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop
									offset="0%"
									style={{ stopColor: '#000B2E', stopOpacity: 1 }}
								/>
								<stop
									offset="40%"
									style={{ stopColor: '#0F1B47', stopOpacity: 1 }}
								/>
								<stop
									offset="70%"
									style={{ stopColor: '#1E0B46', stopOpacity: 1 }}
								/>
								<stop
									offset="100%"
									style={{ stopColor: '#160735', stopOpacity: 1 }}
								/>
							</linearGradient>

							{/* Stars pattern */}
							<pattern
								id="stars"
								width="300"
								height="300"
								patternUnits="userSpaceOnUse"
							>
								<circle
									cx="10"
									cy="10"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="50"
									cy="30"
									r="0.8"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="90"
									cy="10"
									r="1.2"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="130"
									cy="40"
									r="0.6"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="170"
									cy="20"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="210"
									cy="50"
									r="0.7"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="250"
									cy="30"
									r="1.1"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="290"
									cy="10"
									r="0.8"
									fill="#ffffff"
									opacity="0.7"
								/>

								<circle
									cx="30"
									cy="70"
									r="0.9"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="70"
									cy="90"
									r="1.3"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="110"
									cy="70"
									r="0.7"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="150"
									cy="100"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="190"
									cy="80"
									r="0.8"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="230"
									cy="110"
									r="1.2"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="270"
									cy="90"
									r="0.6"
									fill="#ffffff"
									opacity="0.6"
								/>

								<circle
									cx="10"
									cy="130"
									r="1.1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="50"
									cy="150"
									r="0.7"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="90"
									cy="130"
									r="1"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="130"
									cy="160"
									r="0.8"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="170"
									cy="140"
									r="1.2"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="210"
									cy="170"
									r="0.6"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="250"
									cy="150"
									r="1.1"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="290"
									cy="130"
									r="0.7"
									fill="#ffffff"
									opacity="0.7"
								/>

								<circle
									cx="30"
									cy="190"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="70"
									cy="210"
									r="0.8"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="110"
									cy="190"
									r="1.2"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="150"
									cy="220"
									r="0.7"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="190"
									cy="200"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="230"
									cy="230"
									r="0.6"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="270"
									cy="210"
									r="1.1"
									fill="#ffffff"
									opacity="0.9"
								/>

								<circle
									cx="10"
									cy="250"
									r="0.8"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="50"
									cy="270"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="90"
									cy="250"
									r="0.7"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="130"
									cy="280"
									r="1.2"
									fill="#ffffff"
									opacity="0.9"
								/>
								<circle
									cx="170"
									cy="260"
									r="0.6"
									fill="#ffffff"
									opacity="0.7"
								/>
								<circle
									cx="210"
									cy="290"
									r="1"
									fill="#ffffff"
									opacity="0.8"
								/>
								<circle
									cx="250"
									cy="270"
									r="0.8"
									fill="#ffffff"
									opacity="0.6"
								/>
								<circle
									cx="290"
									cy="250"
									r="1.1"
									fill="#ffffff"
									opacity="0.9"
								/>
							</pattern>

							{/* Planet gradient */}
							<radialGradient
								id="planetGradient"
								cx="50%"
								cy="50%"
								r="50%"
								fx="20%"
								fy="30%"
							>
								<stop
									offset="0%"
									style={{ stopColor: '#7B96E8', stopOpacity: 1 }}
								/>
								<stop
									offset="70%"
									style={{ stopColor: '#3566D5', stopOpacity: 1 }}
								/>
								<stop
									offset="100%"
									style={{ stopColor: '#2243A5', stopOpacity: 1 }}
								/>
							</radialGradient>

							{/* Dubai skyline silhouette */}
							<linearGradient
								id="skylineGradient"
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop
									offset="0%"
									style={{ stopColor: '#F8D07A', stopOpacity: 1 }}
								/>
								<stop
									offset="100%"
									style={{ stopColor: '#E8A92F', stopOpacity: 1 }}
								/>
							</linearGradient>

							{/* Glow effect */}
							<filter
								id="glow"
								x="-50%"
								y="-50%"
								width="200%"
								height="200%"
							>
								<feGaussianBlur
									stdDeviation="10"
									result="blur"
								/>
								<feComposite
									in="SourceGraphic"
									in2="blur"
									operator="over"
								/>
							</filter>
						</defs>

						{/* Main background */}
						<rect
							width="1200"
							height="600"
							fill="url(#spaceGradient)"
						/>

						{/* Stars background */}
						<rect
							width="1200"
							height="600"
							fill="url(#stars)"
							opacity="0.8"
						/>

						{/* Distant planets */}
						<circle
							cx="200"
							cy="150"
							r="30"
							fill="#A75BD4"
							opacity="0.7"
						/>
						<circle
							cx="900"
							cy="120"
							r="20"
							fill="#E87A56"
							opacity="0.6"
						/>

						{/* Large blue planet */}
						<circle
							cx="760"
							cy="380"
							r="180"
							fill="url(#planetGradient)"
							opacity="0.9"
						/>
						<ellipse
							cx="760"
							cy="380"
							rx="180"
							ry="20"
							fill="#1A3B8C"
							opacity="0.6"
						/>

						{/* Space station with glow */}
						<g transform="translate(400, 280) rotate(15)">
							<rect
								x="-80"
								y="-10"
								width="160"
								height="20"
								rx="5"
								fill="#D1D5E8"
							/>
							<rect
								x="-60"
								y="-40"
								width="120"
								height="30"
								rx="5"
								fill="#B7BEDC"
							/>
							<rect
								x="-40"
								y="10"
								width="80"
								height="15"
								rx="5"
								fill="#C4CAE3"
							/>
							<circle
								cx="-70"
								cy="-25"
								r="10"
								fill="#4C6BC6"
							/>
							<circle
								cx="70"
								cy="-25"
								r="10"
								fill="#4C6BC6"
							/>
							<rect
								x="-15"
								y="-70"
								width="30"
								height="60"
								fill="#A1ABD3"
							/>
							<ellipse
								cx="0"
								cy="0"
								rx="20"
								ry="20"
								fill="#E5E9F5"
							/>
							<rect
								x="-80"
								y="-3"
								width="160"
								height="6"
								fill="#8895CC"
							/>
						</g>

						{/* Futuristic spacecraft */}
						<g transform="translate(300, 340) rotate(-20)">
							<path
								d="M0,0 L80,-15 L100,0 L80,15 Z"
								fill="#E5E9F5"
							/>
							<path
								d="M-40,0 L0,0 L0,15 L-35,10 Z"
								fill="#C4CAE3"
							/>
							<path
								d="M-40,0 L0,0 L0,-15 L-35,-10 Z"
								fill="#B7BEDC"
							/>
							<circle
								cx="-35"
								cy="0"
								r="10"
								fill="#404E88"
							/>
							<circle
								cx="50"
								cy="0"
								r="5"
								fill="#4C6BC6"
							/>
							<path
								d="M100,0 L120,-5 L120,5 Z"
								fill="#D1D5E8"
							/>
							<rect
								x="80"
								y="-3"
								width="10"
								height="6"
								fill="#8895CC"
							/>
						</g>

						{/* Dubai skyline silhouette at the bottom */}
						<path
							d="M0,600 L0,500 L50,490 L70,500 L100,480 L130,490 L150,460 L170,470 L200,430 L220,440 
                   L250,380 L270,390 L300,370 L320,380 L340,320 L360,330 L380,300 L400,310 L420,280 
                   L440,290 L460,260 L480,270 L500,240 L520,250 L540,230 L560,240 L580,220 L600,230 
                   L620,210 L640,220 L660,200 L680,210 L700,190 L720,200 L740,180 L760,190 L780,180 
                   L800,190 L820,170 L840,180 L860,200 L880,170 L900,180 L920,230 L940,240 L960,220 
                   L980,230 L1000,260 L1020,270 L1040,250 L1060,260 L1080,280 L1100,290 L1120,270 
                   L1140,280 L1160,310 L1180,320 L1200,300 L1200,600 Z"
							fill="url(#skylineGradient)"
							opacity="0.8"
						/>

						{/* Burj Khalifa prominent in the skyline */}
						<path
							d="M580,220 L590,150 L600,140 L610,150 L620,210"
							fill="#F8D07A"
						/>
					</svg>
				</div>

				<div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
					<h1 className="text-4xl md:text-7xl font-bold mb-3 text-white animate__animated animate__fadeInDown">
						Dubai to the Stars
					</h1>
					<p className="text-xl md:text-3xl mb-8 text-indigo-300 max-w-3xl animate__animated animate__fadeIn animate__delay-1s">
						The Ultimate Space Travel Experience
					</p>
					<div className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp animate__delay-2s">
						<Link
							href="/destinations"
							className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
						>
							Explore Destinations
						</Link>
						<Link
							href="/booking"
							className="bg-white hover:bg-gray-100 text-indigo-700 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
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
