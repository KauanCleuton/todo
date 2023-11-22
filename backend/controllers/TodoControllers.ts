import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Task } from '@prisma/client';

const prisma = new PrismaClient();


export const exitsTodo = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const todos = await prisma.task.findMany();

    const { id } = req.body;
    const todoExists = todos.find((todo: Task) => todo.id === id);

    if (todoExists) {
      return res.status(500).json({ message: "Tarefa já existe!" });
    } else {
      next();
    }
  } catch (error) {
    console.error("Erro ao buscar tarefa:", error);
    return res.status(500).json({ message: "Ocorreu um erro ao buscar tarefa." });
  }
};


export const addTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTodo = await prisma.task.create({
      data: {
        title: title,
        description: description,
        completed: false,
      },
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Aconteceu algum erro! 😭' });
  }
};

export const editTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const id = parseInt(req.params.id);
    const updatedTodo = await prisma.task.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
        updatedAt: new Date(),
      },
    });

    if (updatedTodo) {
      return res.status(200).json({ message: 'Tarefa atualizada com sucesso', item: updatedTodo });
    } else {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao editar tarefa!' });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedTodo = await prisma.task.delete({
      where: { id: id },
    });

    if (deletedTodo) {
      return res.status(200).json({ message: 'Tarefa excluída com sucesso', item: deletedTodo });

    } else {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
};

export const completed = async (req: Request, res: Response) => {
  try {
    const { completed } = req.body;
    const id = parseInt(req.params.id);
    const updatedTodo = await prisma.task.update({
      where: { id: id },
      data: { completed: completed },
    });

    if (updatedTodo) {
      return res.status(200).json({ message: 'Tarefa completada com sucesso' });
    } else {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao completar tarefa' });
  }
};

export const listTodos = async (req: Request, res: Response) => {
  const todos = await prisma.task.findMany();
  console.table(todos)
  return res.status(200).json(todos);
};
