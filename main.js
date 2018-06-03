const endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json"

const PrintResults = () => {
	// Replace ./data.json with your JSON feed
	fetch(endpoint).then(response => {
	  return response.json();
	}).then(data => {
	  // Work with JSON data here
	  let datosJson = {
	  	time: data.time.updated,
	  	priceUsd: data.bpi.USD.rate,
	  	priceGbp: data.bpi.GBP.rate,
	  	priceEur: data.bpi.EUR.rate,
	  	symbolDolar: data.bpi.USD.sybmol
	  }

	  console.log(data)

	  const el = document.getElementById('results')

	  document.title = `USD: ${datosJson.priceUsd}, EUR: ${datosJson.priceEur}, GBP: ${datosJson.priceGbp}`

	  const timeEl = document.createElement('div')
	  const priceUsdEl = document.createElement('div')
	  const priceGbpEl = document.createElement('div')
	  const priceEurEl = document.createElement('div')

	  timeEl.classList.add("time")
	  priceUsdEl.classList.add("price-usd")
	  priceGbpEl.classList.add("price-gbp")
	  priceEurEl.classList.add("price-eur")

	  timeEl.id = "time"
	  priceUsdEl.id = "price-usd"
	  priceGbpEl.id = "price-gbp"
	  priceEurEl.id = "price-eur"

	  timeEl.textContent = `⟳ ${datosJson.time}`
	  priceUsdEl.textContent = `$ ${datosJson.priceUsd}`
	  priceGbpEl.textContent = `£ ${datosJson.priceGbp}`
	  priceEurEl.textContent = `€ ${datosJson.priceEur}`

	  el.appendChild(timeEl)
	  el.appendChild(priceUsdEl)
	  el.appendChild(priceGbpEl)
	  el.appendChild(priceEurEl)

	  el.classList.add("show")

	}).catch(err => {
	  document.getElementById("results").textContent = "No se pudo conectar."
	});
}

const update = () => {
	document.getElementById("results").classList.remove("show")
	setTimeout(() => {
		document.getElementById("results").remove()
		const newEl = document.createElement("div")
		newEl.classList.add("results")
		newEl.id = "results"

		document.getElementById("wrapper").appendChild(newEl)
	}, 300)

	setTimeout(() => {
		PrintResults()
	}, 3000)
}

document.addEventListener("DOMContentLoaded", PrintResults)

const btcLogo = document.getElementById("bitcoin-logo")

btcLogo.addEventListener("click", () => {
	update()

	btcLogo.classList.add("rotate")

	setTimeout(() => {
		btcLogo.classList.remove("rotate")
	}, 1500)
})