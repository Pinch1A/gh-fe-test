import React, { useState, useEffect, Suspense, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useProducts } from '../../hooks/useProducts'
import { useCart } from '../../hooks/useCart'
import { useOrder } from '../../hooks/useOrder'
import ProductCard from '../../components/ProductCard'
import { createOrder } from '../../service/order'
import { Order, Product } from '../../types'
import { OrderContext } from '../../context/OrderContext'
import { ToastContainer } from 'react-toastify'

interface ItemParam {
	orderId?: string
	productId?: string
	id?: string
	quantity?: number
}

export default function Products() {
	const router = useRouter()

	const { products, loading, error } = useProducts()
	const { cart, addToCart, fromOrderToCart, cartTotalQuantity } = useCart()
	const { updateProductQuantity, addProductToOrder } = useOrder()
	const { order, setOrder } = useContext(OrderContext)

	useEffect(() => {
		if (order && cart.length === 0) {
			fromOrderToCart(order)
		}
	}, [order, fromOrderToCart, cart])

	if (loading) {
		return <div className="flex w-full h-screen items-center justify-center flex-col m-auto">Loading data</div>
	}

	if (error) {
		return (
			<div className="flex w-full h-screen items-center justify-center flex-col m-auto">
				<div className="p-6 flex flex-col h-30 w-2/3 rounded-lg bg-red-500">
					<span className="text-3xl self-center pb-2">Something went wrong</span>
					<button
						className="self-center border w-20 py-4 hover:bg-red-900 rounded-lg"
						onClick={() => window.location.reload(false)}
					>
						Refresh
					</button>
				</div>
			</div>
		)
	}

	const goToCheckout = () => {
		const params = { products: [...cart] }
		addProductToOrder(params)
			.then((response) => {
				if (response.id) {
					setOrder(response)
					router.push(`/cart/${response.id}`)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const addToBasket = (params: ItemParam) => {
		if (order) {
			fromOrderToCart(order)
		}
		addToCart(params)
	}

	return (
		<div className="flex flex-col">
			<h1 className="text-6xl font-bold text-center ">Products</h1>
			<div className="flex flex-col items-center justify-center py-2">
				<button
					className="border border-gray-500 shadow rounded px-2 py-1"
					disabled={cart.length === 0}
					onClick={goToCheckout}
				>
					Cart has <b>{cartTotalQuantity} items</b>
					{cart.length > 0 && (
						<p className="transition-all animate-pulse text-sm text-gray-500">
							Click here to go to checkout
						</p>
					)}
				</button>

				<Suspense
					fallback={
						<div className="flex w-full h-screen items-center justify-center flex-col m-auto">
							Loading...
						</div>
					}
				>
					{products &&
						Object.entries(products).map(([category, products], index) => (
							<div className="flex flex-col w-full" key={category}>
								<div className="flex justify-between items-center border-b-2 last:border-b-0">
									<div className="text-3xl ">{category}</div>
									<div className="px-2 border rounded-xl bg-slate-100">{products.length}</div>
								</div>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full my-8">
									{products.map((product: Product) => (
										<ProductCard key={product.id} product={product} addToBasket={addToBasket} />
									))}
								</div>
							</div>
						))}
				</Suspense>
				<ToastContainer />
			</div>
		</div>
	)
}
