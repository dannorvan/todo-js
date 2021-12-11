
import {Todo} from './todo.class';

export class TodoList {

    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id  );
        this.guardarLocalStorage();
    }

    toggleTodo(id) {
        this.todos.map(todo => todo.id == id ? todo.completado = !todo.completado : todo.completado)
        this.guardarLocalStorage();
    }

    eliminarCompletados(id) {
        this.todos = this.todos.filter(todo => !todo.completado);
    }

    guardarLocalStorage(){
        localStorage.setItem('todo',JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = localStorage.getItem('todo')
            ? JSON.parse(localStorage.getItem('todo'))
            : this.todos = [];

        // this.todos = this.todos.map(Todo.fromJson);
    }

}