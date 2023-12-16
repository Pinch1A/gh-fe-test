import axios from 'axios'
import { Order } from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_API_URL = process.env.BASE_API_URL || 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api'

export const errorHandler = (error: any) => {
	if (error.response && error.response.status === 500) {
		// Show toast notification
		console.log('SHOW Toast Notification')
		toast.error('An error occurred on the server. Please try again.', {
			position: toast.POSITION.TOP_CENTER,
		})
	} else {
		console.error(error)
	}
}

export const getOrder = async (id: string): Promise<Order> => {
	try {
		const { data } = await axios.get(`${BASE_API_URL}/orders/${id}`)
		return data
	} catch (error) {
		errorHandler(error)
	}
}

export const createOrder = async (products: { id: number; quantity: number }[]): Promise<string | null> => {
	try {
		return await axios.post(`${BASE_API_URL}/orders`, products)
	} catch (error) {
		errorHandler(error)
	}
}

interface updateOrderParams {
	orderId: string
	productId: string
	quantity: number
	action: string
}

export const updateOrder = async (params: updateOrderParams): Promise<void> => {
	const { orderId, ...rest } = params
	try {
		return await axios.patch(`${BASE_API_URL}/orders/${orderId}`, rest)
	} catch (error) {
		errorHandler(error)
	}
}

export const buyOrder = async (id: string): Promise<void> => {
	try {
		return await axios.post(`${BASE_API_URL}/orders/${id}/buy`, id)
	} catch (error) {
		errorHandler(error)
	}
}
