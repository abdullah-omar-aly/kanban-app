import '../scss/styles.scss'

import { Task } from "./Task";
import { Board } from "./Board";

const TaskModel = new Task()
const board = new Board()

board.renderTasks(TaskModel.getAllTasks())

//handling add new task
document.getElementById("add-task-btn").addEventListener('click', (e) => {
    
    const addTaskform = document.forms['add-new-task']

    const title = addTaskform.title.value
    const description = addTaskform.description.value

    TaskModel.create(title, description)

    addTaskform.title.value = ""
    addTaskform.description.value = ""

    board.clean()
    board.renderTasks(TaskModel.getAllTasks())
})

window.deleteTask = function (taskId) {

}


//handlin drag&drop

const draggingContainers = document.querySelectorAll('.dragging-container')

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