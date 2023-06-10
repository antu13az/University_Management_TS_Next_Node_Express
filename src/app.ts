import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandlers from './app/middlewares/globalErrorHandlers';
import { UserRoutes } from './app/modules/users/user.route';
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connection

// Application all controllers routs

app.use('/api/v1/users/', UserRoutes);

//Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello Server !!!!!!!');
});

//global error handler
app.use(globalErrorHandlers);

//handle not found
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'Not Found',
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: 'API Not Found',
//       },
//     ],
//   });
//   next();
// });
export default app;
