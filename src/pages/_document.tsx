import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="flex flex-col w-full min-h-screen bg-slate-300 p-4 ">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
