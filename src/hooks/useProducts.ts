import { useState, useEffect } from 'react'
import { getProducts } from '../service/product'

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const fetchedProducts = await getProducts()
				setProducts(fetchedProducts)
			} catch (error) {
				console.log(error)
				setError(error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	return { products, loading, error }
}
