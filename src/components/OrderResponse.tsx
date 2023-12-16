import React from 'react'
import cx from 'classnames'

export default function OrderResponse({ status }: Props) {
	const boxStyle = () => {
		switch (status) {
			case 'success':
				return 'bg-green-500 border-green-800 text-green-800'
				break
			case 'error':
				return 'bg-red-500 border-red-800 text-red-800'
				break
			default:
				break
		}
	}

	return (
		<div className={cx(boxStyle(), 'transition-all flex flex-col w-1/2 mt-4 p-3 rounded-lg shadow-lg')}>
			<h1 className="text-2xl font-bold">Order {status}</h1>
			<p className="text-lg">Order purchased with {status}</p>
		</div>
	)
}
