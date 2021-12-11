import {crearTodoHtml, saludar} from './js/componentes.js';
import './styles.css';
import {Todo, TodoList} from "./classes";

export const todoList = new TodoList();

// todoList.todos.forEach( todo => crearTodoHtml(todo));

todoList.todos.forEach(crearTodoHtml);