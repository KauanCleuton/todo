"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTodos = exports.completed = exports.deleteTodo = exports.editTodo = exports.addTodo = exports.exitsTodo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const exitsTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma.task.findMany();
        const { id } = req.body;
        const todoExists = todos.find((todo) => todo.id === id);
        if (todoExists) {
            return res.status(500).json({ message: "Tarefa já existe!" });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        return res.status(500).json({ message: "Ocorreu um erro ao buscar tarefa." });
    }
});
exports.exitsTodo = exitsTodo;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const newTodo = yield prisma.task.create({
            data: {
                title: title,
                description: description,
                completed: false,
            },
        });
        return res.status(201).json(newTodo);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Aconteceu algum erro! 😭' });
    }
});
exports.addTodo = addTodo;
const editTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const id = parseInt(req.params.id);
        const updatedTodo = yield prisma.task.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                updatedAt: new Date(),
            },
        });
        if (updatedTodo) {
            return res.status(200).json({ message: 'Tarefa atualizada com sucesso', item: updatedTodo });
        }
        else {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao editar tarefa!' });
    }
});
exports.editTodo = editTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedTodo = yield prisma.task.delete({
            where: { id: id },
        });
        if (deletedTodo) {
            return res.status(200).json({ message: 'Tarefa excluída com sucesso', item: deletedTodo });
        }
        else {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao excluir tarefa' });
    }
});
exports.deleteTodo = deleteTodo;
const completed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { completed } = req.body;
        const id = parseInt(req.params.id);
        const updatedTodo = yield prisma.task.update({
            where: { id: id },
            data: { completed: completed },
        });
        if (updatedTodo) {
            return res.status(200).json({ message: 'Tarefa completada com sucesso' });
        }
        else {
            return res.status(404).json({ message: 'Tarefa não encontrada' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao completar tarefa' });
    }
});
exports.completed = completed;
const listTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.task.findMany();
    console.table(todos);
    return res.status(200).json(todos);
});
exports.listTodos = listTodos;
