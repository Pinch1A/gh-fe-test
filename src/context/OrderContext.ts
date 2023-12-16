import React, { createContext } from 'react'
import { Order } from '../../types'

export const OrderContext = createContext<{
	order: Order | null
	setOrder: (order: Order | null) => void
}>({
	order: null,
	setOrder: () => {},
})
