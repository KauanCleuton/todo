// routes/todoRoutes.ts
import express from 'express';
import {addTodo, editTodo,exitsTodo,listTodos, deleteTodo, completed} from '../controllers/TodoControllers';

const router = express.Router();

router.post('/add',addTodo);
router.put('/edit/:id', editTodo);
router.get('/list', listTodos);
router.delete('/delete/:id',deleteTodo)
router.patch('/done/:id', completed)




export default router;
