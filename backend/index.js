import express from "express";
import cors from "cors"; // Import the cors middleware
import { connectDB } from "./config/index.js";
import 'dotenv/config';
import employee from './routes/Employee.routes.js';
import admin from './routes/admin.routes.js';

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

connectDB();

app.use(express.json());


app.use(cors());

app.use('/api', employee);
app.use('/api', admin);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
