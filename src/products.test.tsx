import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import ProductsPage from './pages/products/index'

jest.mock('./hooks/useProducts', () => ({
	useProducts: jest.fn().mockReturnValue({
		products: [
			{
				id: '1',
				name: 'Product 1',
				description: 'Product 1 description',
				price: 100,
				image: 'https://picsum.photos/200/300',
			},
			{
				id: '2',
				name: 'Product 2',
				description: 'Product 2 description',
				price: 200,
				image: 'https://picsum.photos/200/300',
			},
		],
		loading: false,
		error: null,
	}),
}))

jest.mock('./hooks/useCart', () => ({
	useCart: jest.fn().mockReturnValue({
		cart: [],
		addToCart: jest.fn(),
		fromOrderToCart: jest.fn(),
		cartTotalQuantity: 0,
	}),
}))

jest.mock('./hooks/useOrder', () => ({
	useOrder: jest.fn().mockReturnValue({
		updateProductQuantity: jest.fn(),
		addProductToOrder: jest.fn(),
	}),
}))

jest.mock('next/router', () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}))

test('Products page', async () => {
	render(<ProductsPage />)

	// Check if the page title is "Products"
	expect(screen.title).toMatch(/Products/i)

	// Check if the page contains a button with text "Cart has 0 items"
	const cartButton = screen.getByRole('button', { name: /Cart has 0 items/i })
	expect(cartButton).toBeInTheDocument()

	// Check if the page contains a button with text "Go to checkout"
	const checkoutButton = screen.getByRole('button', { name: /Go to checkout/i })
	expect(checkoutButton).toBeInTheDocument()

	// Click the "Go to checkout" button
	userEvent.click(checkoutButton)

	// Check if the page navigates to the cart page
	expect(useRouter().push).toHaveBeenCalledWith('/cart')
})
