import { useState } from 'react'
import { Order } from '../types'
interface Params {
	id: string
	quantity: number
}

interface CartItem {
	id: string
	quantity: number
}

export const useCart = () => {
	const [cart, setCart] = useState<CartItem[]>([])

	const addToCart = (params: Params) => {
		if (cart.length === 0) {
			setCart([...cart, params])
		}

		let updatedItemList = []
		const productExists = cart.find((item: CartItem) => item.id === params.id)

		if (productExists) {
			const updated = updateCartItemQuantity(productExists, params.quantity)
			setCart([updated])
		} else {
			setCart([...cart, params])
		}
	}

	const updateCartItemQuantity = (item, quantity): CardItem => {
		return { id: item.id, quantity: parseInt(item.quantity) + quantity }
	}

	const fromOrderToCart = (order: Order): CartItem[] => {
		const newCart = order.products.map((item) => {
			return { id: item.product.id, quantity: item.quantity }
		})
		setCart(newCart)
		return newCart
	}

	const cartTotalQuantity = (): number => {
		return cart.reduce((acc, { quantity, id }) => acc + quantity, 0)
	}

	return {
		cart,
		addToCart,
		cartTotalQuantity: cartTotalQuantity(),
		fromOrderToCart,
	}
}
