import { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { getOrder as fetchOrder, createOrder, updateOrder, buyOrder } from '../service/order'

import { Order } from '../types'
import { OrderContext } from '../context/OrderContext'
import Products from '../pages/products/index'

const DEFAULT_QUANTITY = 1

interface Params {
	orderId?: string
	productId: number
	quantity: number
}

export const useOrder = (id: string) => {
	const { order, setOrder } = useContext(OrderContext)

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const handleError = useCallback((error: Error) => {
		setError(error)
		setLoading(false)
	}, [])

	const getOrder = useCallback(
		async (id: string): Promise<Order> => {
			try {
				const order = await fetchOrder(id)
				setOrder(order)
				return order
			} catch (error) {
				handleError(error)
			}
		},
		[handleError, setOrder],
	)

	useEffect(() => {
		const fetchData = async (id) => {
			return await getOrder(id)
		}
		id && fetchData(id)
	}, [id, getOrder])

	const addProductToOrder = useCallback(
		async (products): Promise<Order | null> => {
			try {
				const response = await createOrder(products)
				const order = getOrder(response.data.id)
				setOrder(order)
				return order
			} catch (error) {
				handleError(error)
				return null
			}
		},
		[getOrder, setOrder, handleError],
	)

	const updateProductQuantity = useCallback(
		async (params: Params): Promise<Order> => {
			try {
				await updateOrder({ ...params, action: 'update_quantity' })
				const updatedOrder = await getOrder(params.orderId)
				return updatedOrder
			} catch (error) {
				handleError(error)
			}
		},
		[handleError, getOrder],
	)

	const buyCart = useCallback(
		async (id: string): Promise<Order | null> => {
			try {
				const response = await buyOrder(id)
				if (response.status === 204) {
					const [order] = await Promise.all([getOrder(id)])
					setOrder(order)
					return order
				}
			} catch (error) {
				handleError(error)
			}
		},
		[handleError, getOrder, setOrder],
	)

	const memoizedOrder = useMemo(() => order, [order])

	return {
		order: memoizedOrder,
		getOrder,
		loading,
		error,
		addProductToOrder,
		updateProductQuantity,
		buyCart,
	}
}
