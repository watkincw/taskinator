var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) { 
    event.preventDefault();
    
    // 1.1. Create a new task item
    var listItemEl = document.createElement("li");
    // 1.2. Style the new task Item
    listItemEl.className = "task-item";
    // 1.3. Add the text
    listItemEl.textContent = "This is a new task.";
    // 1.4. Append this element to the task list
    tasksToDoEl.appendChild(listItemEl);
}

//// ADDING AN **EVENT** THATS ADDS A NEW li TO THE LIST OF 'TASKS TO DO' ////
// 1.0. Listen for -event- "submit"; when "submit(ed)" run createTaskHandler()
formEl.addEventListener("submit", createTaskHandler);