import { updateOrder } from '../../../service/order'

export default async function handler(req, res) {
	const { productId, quantity } = req.body
	try {
		await updateOrder({ action: 'update_quantity', productId, quantity })
		res.status(200).json({ message: 'Order updated successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
