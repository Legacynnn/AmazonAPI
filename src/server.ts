import Express from "express";
import requestPromise from "request-promise";

const app = Express()
const PORT = process.env.PORT || 3333

const apiKey = '2ec950d164ec32fe8eaafe14672371d4'
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(Express.json())

app.get('/', (request, response) => {
  response.send("Hello there")
})

//Get champion details
app.get('/details/:productId', async (request, response) => {
  const {productId} = request.params

  try {
    const productDetails = await requestPromise(`${baseUrl}&url=https://amazon.com/dp/${productId}`)

    response.json(JSON.parse(productDetails))
  } catch(err) {
    response.json(err)
  }
})

app.listen(PORT, () => {
  console.log("🚀 Server is running: localhost:", PORT)
})