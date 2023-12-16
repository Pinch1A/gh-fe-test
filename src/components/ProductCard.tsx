import React, { useState } from 'react'
import { Product } from '../types'
import Image from 'next/image'

interface Props {
	product: Product
	addToBasket: (productId: string) => void
}

export default function ProductCard({ product, addToBasket }: Props) {
	const [productQuantity, setProductQuantity] = useState(1)

	const handleAddToCart = () => {
		addToBasket({ id: product.id, quantity: productQuantity })
	}

	return (
		<div className="flex flex-col items-center justify-center p-4 border border-white rounded-lg shadow-lg bg-white">
			<div className="flex w-full items-start justify-between space-x-2 ">
				<div className="flex">
					<Image
						className="rounded-md shadow-lg"
						src={product.image}
						alt={product.name}
						width={100}
						height={100}
					/>
					<div className="flex text-xl font-bold ml-3">{product.name}</div>
				</div>
				<div className="flex text-sm text-gray-600 border-b border-b-amber-200">$ {product.price}</div>
			</div>
			<div className="flex flex-col ">
				<div className="my-2 text-sm text-gray-600 h-20 overflow-y-auto">{product.description}</div>
			</div>
			<div className="mt-3 text-sm border-t-2">
				Category: {product.category.name} - {product.category.order}
			</div>
			<div className="flex w-full space-x-5 justify-center items-center mt-3">
				<input
					type="number"
					className="border rounded-md hover:border-gray-800 px-2 w-14 h-10 bg-white"
					value={productQuantity}
					min={0}
					max={product.quantity}
					onChange={(e) => setProductQuantity(parseInt(e.target.value))}
				/>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					disabled={productQuantity === 0}
					onClick={handleAddToCart}
				>
					Add to cart
				</button>
			</div>
		</div>
	)
}
