import { useState } from "react"
import "./App.css"
import { LinearProgress } from "@mui/material"

function App() {
	const URL = "https://api.breakingbadquotes.xyz/v1/quotes"
	const [author, setAuthor] = useState("")
	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const fetchQuote = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(URL)
			const data = await response.json()
			setMessage(data[0].quote)
			setAuthor(data[0].author)
		} catch (error) {
			console.error("Error fetching quote:", error)
		}
		setIsLoading(false)
	}

	let quoteContent
	if (message) {
		quoteContent = (
			<div className="bg-gray-800 p-6 rounded-lg shadow-md text-center max-w-lg">
				<p className="text-lg italic mb-4">{message}</p>
				<p className="text-sm font-semibold">- {author}</p>
			</div>
		)
	} else {
		quoteContent = null
	}

	return (
		<div className="flex flex-col items-center justify-center bg-slate-600 h-screen w-screen p-4 text-white">
			<h1 className="text-3xl font-bold underline mb-6">
				Random Quote Generator
			</h1>

			{quoteContent}

			{isLoading && <LinearProgress className="w-full mt-4" />}

			<button
				className="mt-6 px-6 py-3 text-lg font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
				onClick={fetchQuote}
				disabled={isLoading}>
				{isLoading ? "Loading..." : "Generate Quote"}
			</button>
		</div>
	)
}

export default App
