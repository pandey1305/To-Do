const clear=document.querySelector(".clear");
const myDate=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");
const blank=document.getElementsByClassName("empty");

let LIST,id;

const check="fa-check-circle";
const uncheck="fa-circle-thin";
const line_through="lineThrough";

const options={weekday : "long", month: "short", day:"numeric"};
const today=new Date();
myDate.innerHTML=today.toLocaleDateString("en-us",options);


function addToDo(toDo,id,done,trash)
{
	if(trash)
	{
		return ;
	}
	const DONE = done ? check: uncheck;
	const LINE = done ? line_through: "";
	const item=`
				<li class="item">
					<i class="fa ${DONE} co" job="complete" id="${id}"></i>
					<p class="text ${LINE}">${toDo}</p>
					<i class="fas fa-trash-alt de" job="delete" id="${id}"></i>
				</li>
	`;

	const position ="beforeend";

	list.insertAdjacentHTML(position,item);
}

document.addEventListener("keyup",function(even)
{
	if(event.keyCode==13)
	{
		const toDo=input.value;
		if(toDo)
		{
			addToDo(toDo,id,false,false);
			LIST.push({
				name:toDo,
				id: id,
				done: false,
				trash: false
			});

			localStorage.setItem("TODO",JSON.stringify(LIST));
			id++;
		}
		input.value="";
	}
});

// complete to do
function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}


// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
	// window.alert("Nothing to show");
	// list.style.backgroundImage="url('/images.jpg')";
	// list.insertAdjacentHTML("",`<i class="far fa-file"></i>`);
    LIST = [];
    id = 0;
}
// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
