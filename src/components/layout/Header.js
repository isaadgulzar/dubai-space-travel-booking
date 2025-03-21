// components/layout/Header.js
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className="bg-black text-white shadow-md">
			<nav
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				aria-label="Top"
			>
				<div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
					<div className="flex items-center">
						<Link
							href="/"
							className="flex items-center"
						>
							<span className="text-2xl font-bold text-indigo-400">Dubai</span>
							<span className="text-2xl font-bold ml-1 text-white">Space</span>
							<span className="text-indigo-400 ml-2">🚀</span>
						</Link>
						<div className="hidden ml-10 space-x-8 lg:block">
							<Link
								href="/destinations"
								className="text-base font-medium text-white hover:text-indigo-300"
							>
								Destinations
							</Link>
							<Link
								href="/accommodations"
								className="text-base font-medium text-white hover:text-indigo-300"
							>
								Accommodations
							</Link>
							<Link
								href="/booking"
								className="text-base font-medium text-white hover:text-indigo-300"
							>
								Book a Trip
							</Link>
						</div>
					</div>
					<div className="hidden ml-10 space-x-4 lg:flex">
						<Link
							href="/dashboard"
							className="inline-block bg-indigo-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700"
						>
							My Dashboard
						</Link>
						<Link
							href="/login"
							className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
						>
							Login
						</Link>
					</div>
					<div className="lg:hidden">
						<button
							type="button"
							className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
							onClick={() => setIsOpen(!isOpen)}
						>
							<span className="sr-only">Open menu</span>
							{isOpen ? (
								<XMarkIcon
									className="block h-6 w-6"
									aria-hidden="true"
								/>
							) : (
								<Bars3Icon
									className="block h-6 w-6"
									aria-hidden="true"
								/>
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isOpen && (
					<div className="lg:hidden py-4 space-y-4">
						<Link
							href="/destinations"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
							onClick={() => setIsOpen(false)}
						>
							Destinations
						</Link>
						<Link
							href="/accommodations"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
							onClick={() => setIsOpen(false)}
						>
							Accommodations
						</Link>
						<Link
							href="/booking"
							className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-700"
							onClick={() => setIsOpen(false)}
						>
							Book a Trip
						</Link>
						<Link
							href="/dashboard"
							className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:bg-indigo-700"
							onClick={() => setIsOpen(false)}
						>
							My Dashboard
						</Link>
						<Link
							href="/login"
							className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:bg-indigo-700"
							onClick={() => setIsOpen(false)}
						>
							Login
						</Link>
					</div>
				)}
			</nav>
		</header>
	)
}
