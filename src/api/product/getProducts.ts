import { GroupedProduct } from '../../../types'
import { getProducts } from '../../../service/product'

export default async function handler(req, res) {
	try {
		const products: GroupedProduct[] = await getProducts()
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
