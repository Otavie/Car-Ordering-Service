import express from 'express'

const app = express()

const PORT = 5468

app.listen((PORT), () => {
    console.log(`App is running on PORT http://localhost:${PORT}`)
})