var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) { 
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // 1.1. Create a new task item
    var listItemEl = document.createElement("li");
    // 1.2. Style the new task Item
    listItemEl.className = "task-item";
    // 2.1 Create a new div to hold task info and add list item
    var taskInfoEl = document.createElement("div");
    // 2.2 Style the new div
    taskInfoEl.className = "task-info";
    // 2.3.1 Add HTML content to the div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // 2.3.2 Append the new div created by taskInfoEl to listItemEl
    listItemEl.appendChild(taskInfoEl);

    // // 1.3 Add the name of the task (replaced by 2.3)
    // listItemEl.textContent = taskNameInput;

    // 1.4. Append listItemEl to the task list(now with appended taskInfoEl)
    tasksToDoEl.appendChild(listItemEl);
}

//// ADDING AN **EVENT** THATS ADDS A NEW li TO THE LIST OF 'TASKS TO DO' ////
// 1.0. Listen/Wait for -event- "submit"; when "submit(ed)" run createTaskHandler()
formEl.addEventListener("submit", createTaskHandler);