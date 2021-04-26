
var c = 1;
var comp = 0;
var span = document.getElementById('todoCount');
var spanComplete = document.getElementById('compCount');
var ch2 = document.getElementById('completed_h2');
var th2 = document.getElementById('tasks_h2');
countVali(span,c);
toshow();


// show todo count
function toshow(){
  if(comp === 0)  ch2.style.visibility = 'hidden';
  else ch2.style.visibility = 'visible'

  if (c > 0 || comp > 0) {
    th2.style.visibility = 'visible';
  } else {
    th2.style.visibility = 'hidden';
  }

}




// clears input section
function addItem (value) {
  addItemToDOM(value);
  document.getElementById('item').value = '';
}


// validates if input has a value
function vali() {
  var value = document.getElementById('item').value;
  if (value){
      addItem(value);
  }
}

// gets value from input buttons then adds to html elements
document.getElementById('inputEnter').addEventListener('click', vali);  // button from input
document.getElementById('add').addEventListener('click', vali);         // navigation button

// lets users add tasks using enter key
document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) addItem(value);
});






function displayCount(element, ci){
  element.innerText = ci;
  element.style.backgroundColor = 'lightgrey';
}

function eraseCount(element, ci){
  element.innerText = '';
  element.style.backgroundColor = null;
}

function countVali(element, ci){
  console.log("cVali: " + ci);
  console.log("compVali: " + comp);
  if(ci > 0) {
    displayCount(element, ci)
  } else {
    eraseCount(element, ci);
  }
}




function removeItem() {

  var item = this.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;


  if(parent.id === 'tasks'){
    parent.removeChild(item);
    countVali(span, --c);
  } else {
    parent.removeChild(item);
    countVali(spanComplete, --comp);
  }

  toshow(); 
  
}


function completeItem() {
  var item = this.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;


  // Check if the item should be added to the completed list or to re-added to the todo list
  var target = (id === 'tasks') ? document.getElementById('completed'):document.getElementById('tasks');


  if(target.id === 'completed'){
    countVali(spanComplete, ++comp);
    countVali(span, --c);    
  } else {
    countVali(spanComplete, --comp);
    countVali(span, ++c);
  }

  toshow();
    
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}



// adds elements/li to html dom
function addItemToDOM(text, completed) {
  countVali(span, ++c);
  toshow();

  var list = (completed) ? document.getElementById('completed'):document.getElementById('tasks');
  
  var item = document.createElement('li');
  item.classList.add('todo');
  item.innerText = text;
  
  var add_item = document.createElement('button');
  add_item.classList.add('img1');

  var remove_item = document.createElement('button');
  remove_item.classList.add('img2');

  var chk_img = document.createElement('img');
  var del_img = document.createElement('img');
  chk_img.classList.add('iimmgg');

  chk_img.src = 'img/checkmark.png';
  del_img.src = 'img/del.png';

  add_item.addEventListener('click', completeItem);
  remove_item.addEventListener('click', removeItem);
  
  add_item.appendChild(chk_img);
  remove_item.appendChild(del_img);
  item.appendChild(add_item);
  item.appendChild(remove_item);
  
  list.insertBefore(item, list.childNodes[0]);
}


