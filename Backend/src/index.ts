import express from 'express';
import cors from 'cors';

import interpreterRoute from './routes/route';

const app = express();
const allowedOrigins = ['http://localhost:5173'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));
app.use(express.json());

const PORT = 5000;

app.use('/route', interpreterRoute);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});