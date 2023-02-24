export class Task {

    create(title , description) {

        const id = Date.now().toString()
        const newTask = {
            id,
            title ,
            description ,
            status: 'todo'
        }

        localStorage.setItem('tasks', JSON.stringify([...this.getAllTasks(), newTask]))
        console.log('tasks from localstorage' , JSON.parse(localStorage.getItem('tasks')))

    }
    getAllTasks () {
        return JSON.parse(localStorage.getItem('tasks') ) || []
    }

    getSingleTask(taskId) {
        return this.getAllTasks().filter(task => task.id === taskId)[0]
    }

    delete (taskId) {
        const tasks = this.getAllTasks().filter(task => task.id !== taskId) 
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    // update({
    //     taskId , title , description
    // }) {
    //     const task = this.getSingleTask(taskId)
    //     console.log(task)
    //     task.title = title
    //     task.description = description

    //     this.delete(taskId)
    //     localStorage.setItem('tasks', JSON.stringify([...this.getAllTasks(), task]))
    // }
}

  


