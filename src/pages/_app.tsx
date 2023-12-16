import React, { useState } from 'react'
import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { OrderContext } from '../context/OrderContext'
import { Order } from '../types'
import { ToastContainer } from 'react-toastify'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	require('../../mocks')
}

export default function App({ Component, pageProps }: AppProps) {
	const [order, setOrder] = useState<Order | null>(null)

	return (
		<>
			<OrderContext.Provider value={{ order, setOrder }}>
				<Component {...pageProps} />
			</OrderContext.Provider>
		</>
	)
}
