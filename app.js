
var task_count = 0;
var complete_count = 0;

var taskList = (localStorage.getItem('todoListItems')) ? JSON.parse(localStorage.getItem('todoListItems')):{
    todo: [],
    completed: []
};

var count_div = document.getElementById('todoCount');
var complete_count_div = document.getElementById('completeCount');


renderTodoList();

updateCount();
updateCompleteCount();

document.getElementById('add_todo').addEventListener('click', function(e) {
    var item = document.getElementById('input').value;
    if(item){
        addTask(item);

        taskList.todo.push(item);

        dataObjectUpdated();

        document.getElementById('input').value = '';
    }
});

document.getElementById('input').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        addTask(value);

        taskList.todo.push(value);

        dataObjectUpdated();

        document.getElementById('input').value = '';
    }
});

function dataObjectUpdated() {
    localStorage.setItem('todoListItems', JSON.stringify(taskList));
}

function renderTodoList() {
    if (!taskList.todo.length && !taskList.completed.length) return;
    
    console.log('render todo lenght: ' + taskList.todo.length);
    if(taskList.todo.length !== 0){
        for (var i = 0; i < taskList.todo.length; i++) {
            var value = taskList.todo[i];
            addTask(value, 0);
          }
    }

    console.log('after render todo lenght: ' + taskList.todo.length);
    task_count = taskList.todo.length;
    console.log('render-task-count: ' + task_count);
    updateCount();
  
    if(taskList.completed.length !== 0){
        for (var j = 0; j < taskList.completed.length; j++) {
            var value = taskList.completed[j];
            addTask(value, 1);
        }
    } 

    console.log('render-complete-number: ' + complete_count);
}


function updateCount(){
    var top = document.getElementById('h_2');
    
    if(task_count > 0 || complete_count > 0){
        if(complete_count > 0 && task_count === 0) count_div.style.visibility = 'hidden';
        else count_div.style.visibility = 'visible';
        
        top.style.visibility = 'visible';
        count_div.innerText = task_count;
        return;
    } else {
        count_div.style.visibility = 'hidden';
        top.style.visibility = 'hidden';
    }
}

function updateCompleteCount(){
    var top_comp = document.getElementById('top_completed');

    if(complete_count > 0){
        complete_count_div.style.visibility = 'visible';
        top_comp.style.visibility = 'visible';
        complete_count_div.innerText = complete_count;
        return;
    }
    complete_count_div.style.visibility = 'hidden';
    top_comp.style.visibility = 'hidden';
}

function viewTodo() {
    var text = this.innerText;
    console.log(text);
    var see_container = document.getElementById('see_todo');
    see_container.style.visibility = 'visible';

    var span_t = document.getElementById('see_todo_text');
    span_t.innerText = text;

    span_t.addEventListener('click', ()=>{
        see_container.style.visibility = 'hidden';
    });


    var see_btn = document.getElementById('go-back');

    see_btn.addEventListener('click', () => {
        see_container.style.visibility = 'hidden';
    });

}


function addTask(text, completed){

    var list = (completed) ? document.getElementById('completed'):document.getElementById('tasks');

    if(list.id === 'tasks'){
        task_count++;
        updateCount();
    } else {
        complete_count++;
        updateCompleteCount();
    }

    var li = document.createElement('li');
    li.classList.add('item');


    var btns = document.createElement('div');
    btns.classList.add('buttons');
    var done = document.createElement('button');
    done.classList.add('done');
    var remove = document.createElement('button');
    remove.classList.add('remove');

    var span = document.createElement('span');
    span.innerText = text;

    span.addEventListener('click', viewTodo);

    var done_img = document.createElement('img');
    var remove_img = document.createElement('img');

    done_img.src = 'img/checkmark.png';
    if(list.id === 'completed')
        done_img.src = 'img/checkmark-black.png';
    remove_img.src = 'img/del.png';

    // add event listener to buttons
    done.addEventListener('click', taskComplete);
    remove.addEventListener('click', removeTask);


    // places all created elements to btns div, then to li
    done.appendChild(done_img);
    remove.appendChild(remove_img);
    btns.appendChild(done);
    btns.appendChild(remove);
    
    li.appendChild(btns);
    li.appendChild(span);

    
    list.insertBefore(li, list.childNodes[0]);

}

function taskComplete(){
    var button_div = this.parentNode;
    var li = button_div.parentNode;
    var ul = li.parentNode;
    var id = ul.id;
    var text_value = li.innerText;

    var target = (id === 'tasks') ? document.getElementById('completed'):document.getElementById('tasks');

    if (target.id === 'completed'){
        task_count--;
        updateCount();
        complete_count++;
        updateCompleteCount();

        this.childNodes[0].src = 'img/checkmark-black.png';

        taskList.todo.splice(taskList.todo.indexOf(text_value), 1);
        taskList.completed.push(text_value);

    } else {
        task_count++;
        updateCount();
        complete_count--;
        updateCompleteCount();

        this.childNodes[0].src = 'img/checkmark.png';

        taskList.completed.splice(taskList.completed.indexOf(text_value), 1);
        taskList.todo.push(text_value);
    }

    ul.removeChild(li);

    console.log('completed: ' + "'" + target.id + "'" + '...');
    console.log('task number: ' + task_count);
    console.log('complete number: ' + complete_count);
    console.log('...')

    dataObjectUpdated();
    target.insertBefore(li, target.childNodes[0]);
}

function removeTask(){
    var button_div = this.parentNode;
    var li = button_div.parentNode;
    var ul = li.parentNode;
    var id = ul.id;
    var text_value = li.innerText;

    console.log('remove');
    if(id === 'tasks'){
        task_count--;
        updateCount();
        
        taskList.todo.splice(taskList.todo.indexOf(text_value), 1);
    } else {

        complete_count--;
        updateCompleteCount();

        taskList.completed.splice(taskList.completed.indexOf(text_value), 1);
    }

    console.log('remove...')
    console.log('task number: ' + task_count);
    console.log('complete number: ' + complete_count);
    console.log('...');

    dataObjectUpdated();
    ul.removeChild(li);
}



// TO DO
// improve input and button