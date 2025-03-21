// data/accommodations.js
export const accommodations = [
	{
		id: 1,
		name: 'Orbital Grand Hotel',
		description:
			"The first luxury hotel in Earth's orbit, featuring stunning panoramic views of our planet.",
		location: 'Low Earth Orbit',
		destinationId: 1, // Orbital Station Alpha
		pricePerNight: 50000,
		rating: 4.8,
		amenities: [
			'Zero-G swimming pool',
			'Space walk experience',
			'Gourmet restaurant',
		],
		rooms: ['Standard Cabin', 'Deluxe Suite', 'Observation Dome Suite'],
		image: '/images/orbital-grand.jpg',
	},
	{
		id: 2,
		name: 'Tranquility Base Resort',
		description:
			'Built near the historic Apollo 11 landing site, this lunar resort offers unique moonwalking experiences.',
		location: 'Lunar Surface',
		destinationId: 2, // Lunar Gateway
		pricePerNight: 85000,
		rating: 4.9,
		amenities: [
			'Guided moon walks',
			'Lunar rover excursions',
			'Low-gravity fitness center',
		],
		rooms: [
			'Moon View Room',
			'Lunar Suite',
			'Neil Armstrong Presidential Suite',
		],
		image: '/images/tranquility-base.jpg',
	},
	{
		id: 3,
		name: 'Olympus Mons Base Camp',
		description:
			'A rugged but comfortable accommodation for the adventurous travelers visiting Mars orbit.',
		location: 'Mars Orbit',
		destinationId: 3, // Mars Orbiter
		pricePerNight: 120000,
		rating: 4.6,
		amenities: [
			'Mars surface simulation',
			'Scientific research participation',
			'Martian garden',
		],
		rooms: ['Explorer Cabin', 'Research Suite', 'Panoramic Mars View Suite'],
		image: '/images/olympus-mons.jpg',
	},
	{
		id: 4,
		name: 'Asteroid Hollows',
		description:
			'Luxury accommodations carved into a stable asteroid, offering truly unique space living experience.',
		location: 'Asteroid Belt',
		destinationId: 4, // Asteroid Belt Resort
		pricePerNight: 175000,
		rating: 4.7,
		amenities: [
			'Asteroid material spa',
			'Mineral collection tours',
			'Zero-G entertainment center',
		],
		rooms: [
			'Mining Heritage Room',
			'Asteroid Core Suite',
			'Platinum Class Chamber',
		],
		image: '/images/asteroid-hollows.jpg',
	},
	{
		id: 5,
		name: 'Cloud Nine Habitat',
		description:
			"Floating in the habitable zone of Venus's atmosphere, this resort offers cloud surfing and unique views.",
		location: 'Venus Atmosphere',
		destinationId: 5, // Venus Cloud City
		pricePerNight: 95000,
		rating: 4.5,
		amenities: [
			'Atmospheric observation deck',
			'Cloud diving',
			'Venusian sunrise lounge',
		],
		rooms: [
			'Cloud View Cabin',
			'Atmospheric Research Suite',
			'Presidential Cloud Suite',
		],
		image: '/images/cloud-nine.jpg',
	},
]

export const getAccommodation = (id) => {
	return accommodations.find(
		(accommodation) => accommodation.id === parseInt(id)
	)
}

export const getAccommodationsByDestination = (destinationId) => {
	return accommodations.filter(
		(accommodation) => accommodation.destinationId === parseInt(destinationId)
	)
}
