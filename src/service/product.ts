import axios from 'axios'
import { Product, GroupedProduct } from '../types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BASE_API_URL = process.env.BASE_API_URL || 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api'

export const errorHandler = (error: any) => {
	if (error.response && error.response.status === 500) {
		// Show toast notification
		toast.error('An error occurred on the server. Please try again.', {
			position: toast.POSITION.TOP_CENTER,
		})
	} else {
		console.error(error)
	}
}

// Api actions
export const getProducts = async (): Promise<GroupedProduct[]> => {
	try {
		return await axios.get(`${BASE_API_URL}/products`).then((response) => {
			return groupProductsByCategory(response.data)
		})
	} catch (error) {
		errorHandler(error)
	}
}

// group and sort Products by category
const groupProductsByCategory = (products: Product[]): GroupedProduct[] => {
	const groupedProducts = products.reduce((result, product) => {
		const category = product.category.name
		if (!result[category]) {
			result[category] = []
		}
		result[category].push(product)
		return result
	}, {} as GroupedProduct)

	return Object.fromEntries(
		Object.entries(groupedProducts).sort((a, b) => {
			const orderA = a[1][0].category.order
			const orderB = b[1][0].category.order
			return orderA - orderB
		}),
	)
}
