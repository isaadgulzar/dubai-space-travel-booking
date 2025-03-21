// data/packages.js
export const packages = [
	{
		id: 1,
		name: 'Earth Orbit Explorer',
		description:
			'A weekend getaway to experience zero gravity and see Earth from space.',
		destinationId: 1, // Orbital Station Alpha
		duration: '3 days',
		price: 185000,
		includes: [
			'Return trip on Dubai Space Shuttle',
			'2 nights at Orbital Grand Hotel',
			'Space walk experience',
			'Zero-G dining experience',
			'Earth photography session',
		],
		image: '/images/package-orbit.jpg',
		featured: true,
	},
	{
		id: 2,
		name: 'Lunar Adventure',
		description:
			'Experience walking on the Moon and see Earth from our nearest celestial neighbor.',
		destinationId: 2, // Lunar Gateway
		duration: '7 days',
		price: 650000,
		includes: [
			'Return trip on Dubai Space Liner',
			'6 nights at Tranquility Base Resort',
			'Guided lunar surface excursion',
			'Apollo landing sites tour',
			'Lunar rover driving experience',
		],
		image: '/images/package-lunar.jpg',
		featured: true,
	},
	{
		id: 3,
		name: 'Red Planet Observer',
		description:
			'Orbit the mysterious red planet and prepare for future Mars colonization.',
		destinationId: 3, // Mars Orbiter
		duration: '14 months',
		price: 2500000,
		includes: [
			'One-way trip on Interplanetary Cruiser with return date flexibility',
			'Private cabin during transit',
			'3-month stay at Olympus Mons Base Camp',
			'Scientific research participation',
			'Deep space communication package',
		],
		image: '/images/package-mars.jpg',
		featured: false,
	},
	{
		id: 4,
		name: 'Asteroid Mining Experience',
		description:
			'Learn about asteroid mining technologies while enjoying luxury accommodations in the asteroid belt.',
		destinationId: 4, // Asteroid Belt Resort
		duration: '18 months',
		price: 3800000,
		includes: [
			'Round-trip on Deep Space Explorer vessel',
			'6-month stay at Asteroid Hollows',
			'Asteroid mining workshop',
			'Precious mineral collection opportunity',
			'Zero-G entertainment package',
		],
		image: '/images/package-asteroid.jpg',
		featured: false,
	},
	{
		id: 5,
		name: 'Venus Cloud Surfing',
		description:
			'Experience the thrill of surfing the clouds of Venus in a specially designed suit.',
		destinationId: 5, // Venus Cloud City
		duration: '12 months',
		price: 1800000,
		includes: [
			'Round-trip on Solar System Liner',
			'3-month stay at Cloud Nine Habitat',
			'Venus cloud surfing certification',
			'Atmospheric research participation',
			'Venusian photography workshop',
		],
		image: '/images/package-venus.jpg',
		featured: true,
	},
]

export const getPackage = (id) => {
	return packages.find((pkg) => pkg.id === parseInt(id))
}

export const getPackagesByDestination = (destinationId) => {
	return packages.filter((pkg) => pkg.destinationId === parseInt(destinationId))
}

export const getFeaturedPackages = () => {
	return packages.filter((pkg) => pkg.featured)
}
