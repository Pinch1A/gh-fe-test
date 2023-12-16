import { rest } from 'msw'

export const handlers = [
	rest.get('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/products', (_req, res, ctx) => {
		const response = [
			{
				id: 1,
				name: 'Product 1',
				description:
					'Iusto omnis recusandae nostrum optio libero dolorum aliquam maiores voluptates. Similique impedit soluta doloremque voluptas exercitationem. Amet rerum quia deleniti quam eius est maxime ab occaecati.\nMagnam veniam quo amet eius dolores. Porro ducimus beatae quia ipsum sed eaque tenetur omnis. Corrupti rerum omnis voluptates iure voluptatibus eaque.',
				image: 'https://loremflickr.com/600/600?lock=3836263798931456',
				price: 98,
				category: { name: 'Mask', order: 500 },
			},
		]
		return res(ctx.json(response))
	}),
	rest.get('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/orders/*', (_req, res, ctx) => {
		const order = {
			id: 15,
			createdAt: '2023-09-19T12:16:01.998Z',
			status: 'CART',
			products: [
				{
					id: 183,
					quantity: 3,
					product: {
						id: 13,
						name: 'Product 13',
						description:
							'Molestiae id impedit reprehenderit architecto ullam neque adipisci numquam voluptatibus. Ut minus perspiciatis repellat pariatur sed esse cupiditate sint. Quibusdam eligendi accusamus.\nPerspiciatis ab fuga. Fugiat corrupti voluptates. Molestiae voluptatem debitis dignissimos dolorem qui sint eos accusantium deserunt.\nNon natus ullam deserunt. Quis nulla quibusdam itaque repellendus voluptas dignissimos vel. Quos illum magni quae debitis.',
						image: 'https://loremflickr.com/600/600?lock=6785378973384704',
						price: 412,
						category: { name: 'Actives', order: 300 },
					},
				},
			],
		}
		return res(ctx.json(order))
	}),
	rest.post('https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/orders', (_req, res, ctx) => {
		const order = {
			id: 15,
			createdAt: '2023-09-19T12:16:01.998Z',
			status: 'CART',
			products: [
				{
					id: 183,
					quantity: 3,
					product: {
						id: 13,
						name: 'Product 13',
						description:
							'Molestiae id impedit reprehenderit architecto ullam neque adipisci numquam voluptatibus. Ut minus perspiciatis repellat pariatur sed esse cupiditate sint. Quibusdam eligendi accusamus.\nPerspiciatis ab fuga. Fugiat corrupti voluptates. Molestiae voluptatem debitis dignissimos dolorem qui sint eos accusantium deserunt.\nNon natus ullam deserunt. Quis nulla quibusdam itaque repellendus voluptas dignissimos vel. Quos illum magni quae debitis.',
						image: 'https://loremflickr.com/600/600?lock=6785378973384704',
						price: 412,
						category: { name: 'Actives', order: 300 },
					},
				},
			],
		}
		return res(ctx.json(order))
	}),
	rest.get('http://localhost:3000/favicon.ico', (_req, res, ctx) => {
		return
		res(
			ctx.json({
				title: 'Lord of the Rings',
				description:
					'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
			}),
		)
	}),
	rest.get('http://localhost:3000/*', (_req, res, ctx) => {
		return
		res(
			ctx.json({
				title: 'Lord of the Rings',
				description:
					'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
			}),
		)
	}),
]
