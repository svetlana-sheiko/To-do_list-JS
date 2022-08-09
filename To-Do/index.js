
const addTskBtn = document.getElementById('add-task');//add button
const deleteAllBtn = document.getElementById('delete-all');
const tskInput = document.getElementById('description-of-task');//input for task
const toDosWrapper  =  document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let toDoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;

} 
const createTemplate = (task, index) => {
  return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
        </div>
        `
}

const fillHtmlList = () => {             //добаление тасок в страницу (именно в html)
    toDosWrapper.innerHTML= '';
    if (tasks.length > 0){
        tasks.forEach((element,index) => {
            toDosWrapper.innerHTML += createTemplate(element, index);
        })
        toDoItemElems = document.querySelectorAll('.todo-item');
    }
 }

 fillHtmlList();

 const updateLocal  = () => {
    localStorage.setItem('tasks' , JSON.stringify(tasks));

}

const completeTask = index => {
    console.log(index);
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
         toDoItemElems[index].classList.add('checked');
    }
    else{
        toDoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTskBtn.addEventListener('click', () => {
    tasks.push(new Task (tskInput.value));
    updateLocal();
    fillHtmlList();
    tskInput.value = '';

})

const deleteTask = index => {
    toDoItemElems[index].classList.add('delition')
    setTimeout(() => {
        tasks.splice(index,1);
        updateLocal();
        fillHtmlList();
    },500);
}

deleteAllBtn.addEventListener('click', () => {
    tasks = [];
    updateLocal();
    fillHtmlList();
})


