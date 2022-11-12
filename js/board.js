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
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="bo_todo">

                <div class="bo_todo_infos">
                     <span class="bo_department">${element['department']}</span>
                     <br>
                        <div class="bo_todo_title"><b>${element['title']}</b></div>
                        <div>
                            <div>${element['description']}</div>
                        </div>
                 </div>
            </div> `;
}


    function allowDrop(ev) {
        ev.preventDefault();
}


    function moveTo(category) {
        todos[currentDraggedElement]['category'] = category;
    updateHTML();

}