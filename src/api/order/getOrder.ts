import { Order } from '../../../types'
import { getOrder } from '../../../service/order'

export default async function handler(req, res) {
	const { id } = req.query
	try {
		const order: Order = await getOrder(id)
		res.status(200).json(order)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
