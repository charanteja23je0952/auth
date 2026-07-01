import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieparser from 'cookie-parser';
import auth_routes from './features/auth/auth_routes.js';
import user_routes from './features/user/user_routes.js';
import admin_routes from './features/admin/admin_routes.js';
import errorHandler from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieparser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error('DB_URL environment variable is not defined');
mongoose.connect(DB_URL)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
app.use('/auth', auth_routes);
app.use('/user', user_routes);
app.use('/admin', admin_routes);
app.use(errorHandler);
