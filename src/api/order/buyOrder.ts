import { buyOrder } from '../../../service/order'

export default async function handler(req, res) {
	const { id } = req.query
	try {
		await buyOrder(id)
		res.status(200).json({ message: 'Order bought successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
