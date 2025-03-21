// app/layout.js
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Dubai Space - Space Travel Booking Platform',
	description:
		'Book your journey to the stars with Dubai Space, the premier space travel booking platform.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<Header />
				<main className="flex-grow">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
