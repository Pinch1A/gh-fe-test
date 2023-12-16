import React from 'react'

export default function Layout({ children }) {
	return (
		<>
			<main className="flex flex-col min-h-screen p-4 bg-slate-300">{children}</main>
		</>
	)
}
