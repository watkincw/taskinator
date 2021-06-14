var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) { 
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input calues are empty strings
    if (!taskNameInput || !taskTypeInput) { 
        alert("You need to fill out the fask form!");
        return false;
    }

    formEl.reset();

    // package up data as an object
    var taskDataObj = { 
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to creatTaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) { 
    // 1.1.1. Create a new task item
    var listItemEl = document.createElement("li");
    // 1.1.2. Style the new task Item
    listItemEl.className = "task-item";

    // 2.1.1 Create a new div to hold task info and add list item
    var taskInfoEl = document.createElement("div");
    // 2.1.2 Style the new div
    taskInfoEl.className = "task-info";

    // 2.2.1 Add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // 2.2.2 Append the new div created by taskInfoEl to listItemEl
    listItemEl.appendChild(taskInfoEl);

    // // 1.2 Add the name of the task (replaced by 2.3)
    // listItemEl.textContent = taskNameInput;

    // 1.3. Append listItemEl to the task list(now with appended taskInfoEl)
    tasksToDoEl.appendChild(listItemEl);    
}

//// ADDING AN **EVENT** THATS ADDS A NEW li TO THE LIST OF 'TASKS TO DO' ////
// 1.0. Listen/Wait for -event- "submit"; when "submit(ed)" run taskFormHandler()
formEl.addEventListener("submit", taskFormHandler);