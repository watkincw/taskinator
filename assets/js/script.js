  var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

// creat array to hold tasks for saving
var tasks = [];

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
    
    ////// when submiting new task, isEdit = false; when saving after editing a task, isEdit = true -- hasAttribute checks if the test has a taskId, if yes isEdit = true; if not, isEdit = false -- an new Task is not assigned a taskId until after the submit button is clicked
    var isEdit = formEl.hasAttribute("data-task-id");
    
    //// has data attribute, so get task id and call function to complete edit process
    if (isEdit) { 
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //// no data attribute, so create object as normal and pass to createTaskEl function
    else { 
        // package up data as an object
        var taskDataObj = { 
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };        
        // send it as an argument to creatTaskEl
        createTaskEl(taskDataObj);
    }    
};

// edit task without permanently changing the button text and being able to add more new tasks after editing an existing task
var completeEditTask = function(taskName, taskType, taskId) { 
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through [tasks] and task objects with new content
    for (var i = 0; i < tasks.length; i++) { 
        if (tasks[i].id === parseInt(taskId)) { 
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    alert("Task Updated!");

    // reset the form and change the button text back to 'Add Task' from 'Save Task'
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    // save tasks to local storage
    saveTasks();
};

var createTaskEl = function(taskDataObj) { 
    // 1.1.1. Create a new task item
    var listItemEl = document.createElement("li");
    // 1.1.2. Style the new task Item
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

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

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl)

    // 1.3. Append listItemEl to the task list(now with appended taskInfoEl)
    tasksToDoEl.appendChild(listItemEl);

    // add the Id of the task to the tasks array
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // increase task counter for next unique id
    taskIdCounter++;
    // the first task is given an ID of 0, because thats what its set to by default
        // when the first task gets added and given the 0 id, then this taskIdCounter++ adds 1 to the value of taskIdCounter so the next taskd added is given a new id

    // save tasks to local storage
    saveTasks();
}

var createTaskActions = function(taskId) { 
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // add edit button to div
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // add delete button to div
    actionContainerEl.appendChild(deleteButtonEl);


    // task status dropdown box
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
        // for loop to add the indecies in statusChopices[] to the statusSelectEl dropdown <select>
    for (var i = 0; i < statusChoices.length; i++) { 
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
}


// function that targets an element when a delete/edit button is clicked, preparing it for deletion/editing 
var taskButtonHandler = function(event) { 
    // get tartget element from event
    var targetEl = event.target;
    
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) { 
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) { 
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
// function that actually edits a task
var editTask = function (taskId) { 
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};
// function that actually deletes a task
var deleteTask = function(taskId) { 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array for hold updated list of tasks
    var updatedTaskArr = [];

    // loop throug current tasks
    for (var i = 0; i < tasks.length; i++) { 
        // if tasks[i].id doesn't match the value of tasksIf, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) { 
            updatedTaskArr.push(tasks[i]);
        }
    }
    // re-assign [tasks] to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // save tasks to local storage
    saveTasks();
};

// changed the column the task is in based on if the user says its To Do, In Progress, or Completed
var taskStatusChangeHandler = function(event) { 
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected options' value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") { 
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") { 
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") { 
        tasksCompletedEl.appendChild(taskSelected);
    }
    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) { 
        if (tasks[i].id === parseInt(taskId)) { 
            tasks[i].status = statusValue;
        }
    }
    
    // save tasks to local storage
    saveTasks();
};

// function to save tasks to localStorage so they are not deleted everytime the user closes/refreshes the page
var saveTasks = function() { 
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// function that loads tasks onto the screen from localStorage eveytime you reload the page from the device that you created them on
var loadTasks = function() { 
    // Gets task items from localStorage
    var savedTasks = localStorage.getItem("tasks");
    
    // Check if [tasks] is equal to and empty array by using and if statment
    if (!savedTasks) { 
        // if there are no tasks, set tasks to an empty array and return out of the function
        return false;
        // if its not 'null', we dont ahve to worry about it and we can skip the if statment's code block(dont need and else statment)
    }
    console.log("Saved tasks found!");
    // else, load up saved tasks

    // parse into array of objects
    savedTasks = JSON.parse(savedTasks);
    // loop through [savedTasks]
    for (var i = 0; i < savedTasks.length; i++) { 
        // pass each task object into the `createTaskEl()` function
        createTaskEl(savedTasks[i]);
    }
};

// 1.0. Listen/Wait for -event- "submit"; when "submit(ed)" run taskFormHandler()
formEl.addEventListener("submit", taskFormHandler);

// Listens/Wait for -event- "click"; when "click(ed)" run taskButtonHandler()
pageContentEl.addEventListener("click", taskButtonHandler);

// Listens/Waits for -event- "change"; when "change(d)" run taskStatusChangeHandler() -- dictates which column the task in question falls under
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();