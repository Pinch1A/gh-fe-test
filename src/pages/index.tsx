import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const linkClass = 'px-2 py-1 border rounded-lg border-orange-600 bg-orange-200 hover:bg-orange-500 hover:text-white'
	return (
		<main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
			<div className="flex z-10 text-5xl justify-center w-full items-center font-mono lg:flex">HOME PAGE</div>
			<div className="flex mt-8 w-40 text-orange-600 max-w-5xl justify-between font-mono text-md">
				<Link className={linkClass} href="/products">
					Products
				</Link>
				<Link className={linkClass} href="/cart">
					Cart
				</Link>
			</div>
		</main>
	)
}
