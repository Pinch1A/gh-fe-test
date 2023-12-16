export interface Category {
	name: string
	order: number
}

export interface Product {
	id: number
	name: string
	description: string
	image: string
	price: number
	category: Category
}

export interface OrderProduct {
	id: number
	quantity: number
	product: Product
}

export interface Order {
	id: number
	createdAt: string
	status: string
	products: OrderProduct[]
}

export interface GroupedProduct {
	[key: string]: Product[]
}
