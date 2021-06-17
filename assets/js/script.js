var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

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

    // increase task counter for next unique id
    taskIdCounter++;
    // the first task is given an ID of 0, because thats what its set to by default
        // when the first task gets added and given the 0 id, then this taskIdCounter++ adds 1 to the value of taskIdCounter so the next taskd added is given a new id

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

//// ADDING AN **EVENT('submit' event)** THATS ADDS A NEW li TO THE LIST OF 'TASKS TO DO' ////
// 1.0. Listen/Wait for -event- "submit"; when "submit(ed)" run taskFormHandler()
formEl.addEventListener("submit", taskFormHandler);

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
};
// Listen/Wait for -event- "click"; when "click(ed)" run taskButtonHandler()
pageContentEl.addEventListener("click", taskButtonHandler);