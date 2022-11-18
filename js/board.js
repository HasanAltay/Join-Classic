let todos = [
    {
        'id': 0,
        'department': 'Design',
        'title': 'Website redesign',
        'category': 'Todo',
        'description': 'Modify the contents of the main website'
    },

    {
        'id': 1,
        'department': 'Marketing',
        'title': 'Social media Strategy',
        'category': 'In progress',
        'description': 'Develop an ad campaign for brand positioning'
    },

    {
        'id': 2,
        'department': 'Sales',
        'title': 'Call potencial clients',
        'category': 'Awaiting Feedback',
        'description': 'Make the product presentation to the prospective buyers'
    },

    {
        'id': 3,
        'department': 'Backoffice',
        'title': 'Accounting Invoices',
        'category': 'Done',
        'description': 'Write open invoices for customer'
    }
];


let currentDraggedElement;


function updateHTML() {
    let todo = todos.filter(t => t['category'] == 'Todo');

    document.getElementById('todo').innerHTML = '';

    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];

        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }


    let inProgress = todos.filter(t => t['category'] == 'In progress');

    document.getElementById('inProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];

        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }


    let awaitingFB = todos.filter(t => t['category'] == 'Awaiting Feedback');

    document.getElementById('awaitingFB').innerHTML = '';

    for (let index = 0; index < awaitingFB.length; index++) {
        const element = awaitingFB[index];

        document.getElementById('awaitingFB').innerHTML += generateTodoHTML(element);
    }



    let done = todos.filter(t => t['category'] == 'Done');

    document.getElementById('done').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const element = done[index];

        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }

}


function startDragging(id) {
    currentDraggedElement = id;

    console.log('Aktuelles Todo ist ', currentDraggedElement);
}


function generateTodoHTML(element) {
    return `<div onclick="openTodoInfo('bo_popUp${element['id']}')" draggable="true" ondragstart="startDragging(${element['id']})" class="bo_todo c-pointer">
        <div class="bo_todo_infos">
          <span class="bo_department font16-400">${element['department']}</span>
          <br>
            <div class="bo_todo_title font16-700">${element['title']}</div>
              <div>
               <div class="font16-400">${element['description']}</div>
              </div>
         </div>
     </div>  

            <div id="bo_popUp${element['id']}" class="bo_pop_up d-none">
              <div class="bo_popup_todo_Info">
                <button class="bo_cancel_btn c-pointer">
                 <img src="./img/cancel.png">
                </button>
                  <span class="bo_popUp_department">${element['department']}</span>
                  <br>
                    <div class="mt-25 font61-700">${element['title']}</div>
                      <div>
                        <div class="mt-25 font21-400">${element['description']}</div>
                      </div>
                        <div class="mt-25 font21-400"><span class="mr-20 font21-700">Due date:</span> 05-08-2022</div>
                        <div class="mt-25 font21-400"><span class="mr-20 font21-700">Priority:</span></div>
                        <div class="mt-25 font21-400"><span class="mr-20 font21-700">Assigned to:</span></div>
                          <button class="bo_edit_todo c-pointer" onmouseover="changeEditBtn('./img/edit-light.png')" onmouseleave="resetEditBtn('./img/edit-dark.png')">
                            <img id="boEditTodo" src="./img/edit-dark.png">
                          </button>
                </div>
            </div>`;
}


    function allowDrop(ev) {
        ev.preventDefault();
}


    function moveTo(category) {
        todos[currentDraggedElement]['category'] = category;
    updateHTML();
}


function openTodoInfo(id){
    document.getElementById(id).classList.remove('d-none');
}


// function closeTodoInfo(id) {
//     document.getElementById(id).classList.add('d-none');
// }


function changeEditBtn(img) {
    document.getElementById('boEditTodo').src = img;
}


function resetEditBtn(img) {
    document.getElementById('boEditTodo').src = img;
}