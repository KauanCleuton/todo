import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', todoRoutes);

app.listen(3333, () => {
  console.log('Server is running!');
});
