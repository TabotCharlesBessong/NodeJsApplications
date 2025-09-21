import express from 'express';
import db from './models';
import authRoutes from './routes/authRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';
// import dotenv from "dotenv"

// dotenv.config()

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('Fintech MVP Backend is running!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await db.sequelize.sync({ force: false }); // `force: true` will drop existing tables
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
