import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import { useOrder } from '../../hooks/useOrder'
import { Product } from '../../types'
import OrderItem from '../../components/OrderItem'
import OrderResponse from '../../components/OrderResponse'
import { OrderContext } from '../../context/OrderContext'
import { ToastContainer } from 'react-toastify'

export default function Cart() {
	const {
		push,
		query: { id },
	} = useRouter()
	const { getOrder, buyCart, updateProductQuantity } = useOrder()
	const [totalPrice, setTotal] = useState(0)
	const [isOrderPlaced, setIsOrderPlaced] = useState(false)
	const { order, setOrder } = useContext(OrderContext)

	useEffect(() => {
		if (id) {
			getOrder(id).then((response) => {
				setOrder(response)
				response &&
					setTotal(
						response.products.reduce(
							(acc, { quantity, product }) => acc + quantity * parseInt(product.price),
							0,
						),
					)
			})
		}
	}, [id, getOrder, setOrder])

	const placeOrder = useCallback(() => {
		if (!isOrderPlaced) {
			buyCart(id).then((response) => {
				setIsOrderPlaced(true)
				setOrder(response)
			})
		}
	}, [isOrderPlaced, buyCart, id, setOrder])

	const handleGoBack = useCallback(() => {
		if (isOrderPlaced || order.status === 'PURCHASED') {
			setOrder(null)
			setIsOrderPlaced(false)
		}
		push('/products')
	}, [isOrderPlaced, push, setOrder, order])

	const handleItemQuantity = useCallback(
		(params: { productId: number; quantity: number }) => {
			updateProductQuantity({ ...params, orderId: id })
				.then((response) => {
					if (response.id) {
						setOrder(response)
						setTotal(
							response.products.reduce(
								(acc, { quantity, product }) => acc + quantity * parseInt(product.price),
								0,
							),
						)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		[id, updateProductQuantity, setOrder],
	)

	return (
		<div className="flex flex-col items-center justify-center py-2">
			<h1 className="text-6xl font-bold text-center ">Cart</h1>
			<div className="flex mt-8 justify-center h-auto flex-col w-[320px] md:w-[400px] border bg-white shadow-lg rounded px-2 py-1">
				{order && order.products.length === 0 && <div className="text-center">No products in cart</div>}
				{order &&
					order.status === 'CART' &&
					order.products.map(({ quantity, product, id }: OrderProduct) => (
						<OrderItem
							key={product.id}
							item={product}
							quantity={quantity}
							setQuantity={handleItemQuantity}
						/>
					))}
				{order && order.products.length > 0 && (
					<div className="flex justify-between w-full border-b border-b-gray-400 last:border-b-0 p-4 items-center">
						<div className="flex font-bold">Total</div>
						<div className="flex ">$ {totalPrice}</div>
					</div>
				)}
				{order && order.status === 'CART' && !isOrderPlaced && (
					<div className="flex items-center mt-5">
						<button
							className="w-full bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-l"
							onClick={placeOrder}
						>
							Place the order
						</button>
					</div>
				)}
			</div>
			{order && order.status === 'PURCHASED' && <OrderResponse status="success" />}
			<div className="flex mt-8 w-60 text-orange-600 max-w-5xl justify-center items-center font-mono text-md">
				<button
					className="px-2 py-1 border rounded-lg border-orange-600 bg-orange-200 hover:bg-orange-500 hover:text-white"
					onClick={handleGoBack}
				>
					Back to products
				</button>
			</div>
			<ToastContainer />
		</div>
	)
}
