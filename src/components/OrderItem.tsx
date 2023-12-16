import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Product } from '../types'

interface Props {
	item: Product
	quantity: number
	setQuantity: ({ productId: number, quantity: number }) => void
}

export default function OrderItem({ item, quantity, setQuantity }: Props) {
	const [currentQuantity, setCurrentQuantity] = useState(1)

	useEffect(() => {
		setCurrentQuantity(quantity)
	}, [quantity])

	const updateQuantity = (value) => {
		setCurrentQuantity(value)
		setQuantity({ productId: item.id, quantity: value })
	}

	return (
		<div className="flex justify-between w-full border-b border-b-gray-400 last:border-b-0 p-4 items-center">
			<div className="flex space-x-5 items-center">
				<Image className="rounded-md shadow-lg" src={item.image} alt={item.name} width={40} height={40} />
				<div className="flex font-bold">{item.name}</div>
			</div>
			<div className="flex justify-end items-center space-x-3">
				<div className="flex ">
					<input
						type="number"
						className="border text-center rounded-md hover:border-gray-800 px-1 w-14 h-10 bg-white"
						value={currentQuantity}
						min={1}
						onChange={(e) => updateQuantity(parseInt(e.target.value))}
					/>
				</div>
				<div className="flex ">$ {item.price}</div>
			</div>
		</div>
	)
}
