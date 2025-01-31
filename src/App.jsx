import { useState } from "react"
import {
	LinearProgress,
	TextField,
	Button,
	Card,
	CardContent,
	Typography,
} from "@mui/material"
import "./App.css"
import { Analytics } from "@vercel/analytics/react"

function App() {
	const URL = "https://api.breakingbadquotes.xyz/v1/quotes/1"
	const [quotes, setQuotes] = useState([])
	const [numQuotes, setNumQuotes] = useState(1)
	const [loading, setLoading] = useState(false)

	async function getQuotes() {
		setLoading(true)
		setQuotes([])

		try {
			const requests = []

			for (let index = 0; index < numQuotes; index++) {
				const request = fetch(URL)
					.then(function (response) {
						return response.json()
					})
					.then(function (data) {
						return data[0]
					})
				requests.push(request)
			}

			const newQuotes = await Promise.all(requests)
			setQuotes(newQuotes)
		} catch (error) {
			console.error("Failed to fetch quotes:", error)
		}

		setLoading(false)
	}

	function handleInputChange(event) {
		const value = Number(event.target.value)
		setNumQuotes(value)
	}

	return (
		<>
			<Analytics />
			<div className="quote-container">
				<Typography
					variant="h3"
					className="mb-8 text-white">
					Quote Generator
				</Typography>

				<div className="mb-8">
					<TextField
						label="Number of Quotes"
						type="number"
						value={numQuotes}
						onChange={handleInputChange}
						slotProps={{
							input: {
								min: 1,
								max: 10,
							},
						}}
						sx={{
							backgroundColor: "white",
							borderRadius: 1,
							width: "200px",
						}}
					/>
				</div>

				{loading && <LinearProgress className="w-full mb-8" />}

				<div className="quote-grid">
					{quotes.map(function (quote, index) {
						return (
							<Card
								key={index}
								sx={{
									backgroundColor: "#333",
									color: "white",
								}}>
								<CardContent>
									<Typography
										variant="body1"
										className="mb-4 italic">
										&ldquo;{quote.quote}&rdquo;
									</Typography>
									<Typography
										variant="subtitle2"
										color="primary">
										- {quote.author}
									</Typography>
								</CardContent>
							</Card>
						)
					})}
				</div>

				<Button
					variant="contained"
					onClick={getQuotes}
					disabled={loading}
					className="mt-8 px-8 py-2">
					{loading ? "Loading..." : "Get Quotes"}
				</Button>
			</div>
		</>
	)
}

export default App
