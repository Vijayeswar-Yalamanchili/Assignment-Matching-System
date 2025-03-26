import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import indexRoutes from '../src/routes/indexRoutes.js'

dotenv.config()
const PORT = process.env.PORT

//middlewares 
const app = express()
app.use(cors({
    origin : process.env.CLIENT_URL,
    methods : 'GET, POST, PUT,DELETE',
    credentials : true
}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(indexRoutes)
// app.use(express.static('productImages'))

app.listen(PORT,()=> console.log(`App is listening to ${PORT}`))