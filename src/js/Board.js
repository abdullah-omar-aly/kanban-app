export class Board {
    clean() {
        const draggingContainers = document.querySelectorAll('.dragging-container')
        draggingContainers.forEach(container => container.innerHTML = "")
    }

    renderTasks(tasks = []) {
        const draggingContainers = document.querySelectorAll('.dragging-container')
        tasks?.forEach(task => {
            draggingContainers.forEach(container => {
                if (container.getAttribute('data-status') === task.status) {
                    container.innerHTML += `
                            <div 
                                    class="task-card draggable"
                                    draggable="true" 
                                    data-id="${task.id}"
                                    ondragstart="dragCardStart(event)"
                                    ondragend="dragCardEnd(event)"  
                                    data-bs-target="#task-details-modal"
                                    data-bs-toggle="modal"    
                                >
                                    <h5>${task.title}</h5>
                                    <p>${task.description}</p>
                                </div>
            
                    `
                }
            })
        })
    }

}


