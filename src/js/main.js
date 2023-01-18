// Import our custom CSS
import '../scss/styles.scss'
import Modal from 'bootstrap/js/dist/modal';

import { Task } from "./Task";
import { Board } from "./Board";

const TaskModel = new Task()
const board = new Board()

const createTaskModal = new Modal(document.getElementById('create-task-modal'))
const taskDetailsModal = new Modal(document.getElementById('task-details-modal'))



board.renderTasks(TaskModel.getAllTasks())

taskDetailsModal._element.addEventListener('show.bs.modal', event => {
    console.log(event.relatedTarget)
    const taskCard = event.relatedTarget

    const taskId = taskCard.getAttribute('data-id')
    const task = TaskModel.getSingleTask(taskId)

    event.currentTarget.querySelector('.modal-content').innerHTML = `
   
    <div class="modal-body">
    <div style="display:flex;justify-content: space-between">
    <h2 class="task-details-card__title" name="task-title">${task.title}</h2>
    <div>
    <button>
    <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
      <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"/>
      <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25H13.75"/>
  </svg>
  </button>
  <button>
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 105.16 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>delete</title><path class="cls-1" d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></svg>
  </button>
    </div>
    </div>
    <p  class="task-details-card__discription" name="task-description">${task.description}</p>
    </div>
`


})

window.deleteTask = function (e) {
    console.log(e)
    // console.log("delete task" , taskId)
}





//handling add new task
document.forms['add-new-task'].addEventListener('submit', (e) => {
    e.preventDefault()

    const title = e.currentTarget.title.value
    const description = e.currentTarget.description.value

    TaskModel.create(title, description)

    e.currentTarget.title.value = ""
    e.currentTarget.description.value = ""

    createTaskModal.hide()

    board.clean()
    board.renderTasks(TaskModel.getAllTasks())
})

window.deleteTask = function (taskId) {

}


//handlin drag&drop

const draggingContainers = document.querySelectorAll('.dragging-container')

window.showTaskDetails = function (taskId) {
    console.log(history.pushState('/bodda'))
    // const task = TaskModel.getSingleTask(taskId.toString())
    // document.querySelector('.task-details-card-modal').classList.add('show')
    // document.querySelector('.task-details-card').children.namedItem("task-title").textContent = task.title
    // document.querySelector('.task-details-card').children.namedItem("task-description").textContent = task.description
}

window.dragCardStart = function (e) {
    draggingContainers.forEach(container => container.classList.add('dragging-over'))
    e.currentTarget.classList.add('dragging')
}

window.dragCardEnd = function (e) {
    console.log(e.currentTarget)
    draggingContainers.forEach(container => container.classList.remove('dragging-over'))
    e.currentTarget.classList.remove('dragging')
}


draggingContainers.forEach(container => {
    container.addEventListener('dragover', function (e) {
        e.preventDefault()
        const draggable = document.querySelector('.dragging')
        const afterElement = dragAfterElement(container, e.clientY)


        if (afterElement == null) {
            container.appendChild(draggable)

        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

draggingContainers.forEach(container => {
    container.addEventListener('drop', (e) => {
        const draggable = document.querySelector('.dragging')
        console.log(draggable)
        const taskId = draggable.getAttribute("data-id")
        const tasks = TaskModel.getAllTasks()
        const containerStatus = container.getAttribute('data-status')
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.status = containerStatus
            }
        })

        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
})


function dragAfterElement(container, y) {
    const draggableElements =
        [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2


        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}