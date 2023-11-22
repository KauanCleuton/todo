"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/todoRoutes.ts
const express_1 = __importDefault(require("express"));
const TodoControllers_1 = require("../controllers/TodoControllers");
const router = express_1.default.Router();
router.post('/add', TodoControllers_1.addTodo);
router.put('/edit/:id', TodoControllers_1.editTodo);
router.get('/list', TodoControllers_1.listTodos);
router.delete('/delete/:id', TodoControllers_1.deleteTodo);
router.patch('/done/:id', TodoControllers_1.completed);
exports.default = router;
