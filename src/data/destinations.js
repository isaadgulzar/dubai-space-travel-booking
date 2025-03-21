// data/destinations.js
export const destinations = [
	{
		id: 1,
		name: 'Orbital Station Alpha',
		description:
			"The first commercial space station in Earth's orbit, offering stunning views of our home planet.",
		distance: '400 km',
		travelTime: '3 hours',
		image: '/images/orbital-alpha.jpg',
		price: {
			economy: 150000,
			business: 280000,
			luxury: 450000,
		},
		amenities: ['Artificial gravity', 'Observation deck', 'Space restaurant'],
		popular: true,
	},
	{
		id: 2,
		name: 'Lunar Gateway',
		description:
			'A space station orbiting the Moon, serving as a hub for lunar exploration and tourism.',
		distance: '384,400 km',
		travelTime: '3 days',
		image: '/images/lunar-gateway.jpg',
		price: {
			economy: 350000,
			business: 550000,
			luxury: 950000,
		},
		amenities: [
			'Zero-gravity spa',
			'Lunar observation lounge',
			'Scientific laboratories',
		],
		popular: true,
	},
	{
		id: 3,
		name: 'Mars Orbiter',
		description:
			'Experience the red planet from orbit before humans establish permanent settlements.',
		distance: '54.6 million km',
		travelTime: '6 months',
		image: '/images/mars-orbiter.jpg',
		price: {
			economy: 1200000,
			business: 1800000,
			luxury: 2500000,
		},
		amenities: [
			'Hibernation chambers',
			'Virtual reality suite',
			'Hydroponic gardens',
		],
		popular: false,
	},
	{
		id: 4,
		name: 'Asteroid Belt Resort',
		description:
			'A luxury destination built within a hollowed-out asteroid, offering unique entertainment options.',
		distance: '329 million km',
		travelTime: '8 months',
		image: '/images/asteroid-resort.jpg',
		price: {
			economy: null,
			business: 3200000,
			luxury: 4800000,
		},
		amenities: [
			'Asteroid mining tours',
			'Zero-G casino',
			'Asteroid material spa treatments',
		],
		popular: false,
	},
	{
		id: 5,
		name: 'Venus Cloud City',
		description:
			'A floating habitat in the upper atmosphere of Venus, where conditions are surprisingly Earth-like.',
		distance: '41 million km',
		travelTime: '5 months',
		image: '/images/venus-cloud.jpg',
		price: {
			economy: 980000,
			business: 1500000,
			luxury: 2200000,
		},
		amenities: [
			'Cloud surfing',
			'Atmospheric research lab',
			'Venusian sunset lounge',
		],
		popular: true,
	},
]

export const getDestination = (id) => {
	return destinations.find((destination) => destination.id === parseInt(id))
}

export const getPopularDestinations = () => {
	return destinations.filter((destination) => destination.popular)
}
