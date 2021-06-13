var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() { 
    // 1. Create a new task item
    var listItemEl = document.createElement("li");
    // 2. Style the new task Item
    listItemEl.className = "task-item";
    // 3. Add the text
    listItemEl.textContent = "This is a new task.";
    // 4. Append this element to the task list
    tasksToDoEl.appendChild(listItemEl);
}

//// ADDING AN **EVENT** THATS ADDS A NEW li TO THE LIST OF 'TASKS TO DO' ////
// 0. Listen for -event- "click"; when "click(ed)" run function()
buttonEl.addEventListener("click", createTaskHandler);