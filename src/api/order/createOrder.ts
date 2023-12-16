// api/orders/createOrder.ts

import { createOrder } from '../../../service/order'

export default async function handler(req, res) {
	try {
		const { products } = req.body
		await createOrder(products)
		res.status(201).json({ message: 'Order created successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
