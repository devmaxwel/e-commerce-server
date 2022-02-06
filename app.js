import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes.js'
import connect from './utils/connect.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors());


app.listen(process.env.PORT,  async() => {

      console.info(`Server is running at http://localhost:${process.env.PORT}`)
      await connect();
      routes(app);
});