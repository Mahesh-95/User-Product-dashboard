
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './backend/db/config.js'
import userRoutes from './backend/routes/userRoutes.js'
import productRoutes from './backend/routes/productRoutes.js'
import uploadRoutes from './backend/routes/uploadRoutes.js'
import {errorHandler} from './backend/middleware/errorMiddleware.js'

dotenv.config()

// Connecting to Mongodb
connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/upload', uploadRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('API is running.....'));
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)


