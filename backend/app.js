import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
const app = express()


dotenv.config({
    path:'./.env'
})

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))




import userRouter from './routes/user.routes.js'
import propertyRouter from './routes/property.routes.js'


app.use('/user',userRouter);
app.use('/property',propertyRouter);


export {app}