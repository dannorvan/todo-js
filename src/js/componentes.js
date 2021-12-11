import '../css/componentes.css';
import {Todo, TodoList} from "../classes";
import {todoList} from "../index";



// Referencias en el HTML.
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
        <li class="${todo.completado && 'completed'}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completado && 'checked'}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li> `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

//Eventos

txtInput.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' && txtInput.value.trim().length > 0) {
            const nuevoTodo = new Todo(txtInput.value);
            todoList.nuevoTodo(nuevoTodo);
            txtInput.value = ''
            crearTodoHtml(nuevoTodo);
    }
})

divTodoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName;
    const todoElement = e.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.toggleTodo(todoId);
        todoElement.classList.toggle('completed');

    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElement);
    }

    console.log(todoList)
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length -1 ; i >= 0; i--) {

        const element = divTodoList.children[i];
        if(element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }
})

ulFilters.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if(!filtro) return;

    anchorFilters.forEach(elem => elem.classList.remove('selected'))


    for (let element of divTodoList.children) {
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');
        console.log(completado)

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    element.classList.add('hidden')
                }

                break;


            case 'Completados':
                if(!completado){
                    element.classList.add('hidden')
                }

                break;
        }

    }
})