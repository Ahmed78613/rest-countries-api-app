// Get Stored User Data
getStorage();

/** Variables **/
const text = document.querySelector("#search");
const dropdown = document.querySelector("#options");
const todoStore = document.querySelector(".todo");
const doneStore = document.querySelector(".done");

// buttons
const addBtn = document.querySelector("#submit");
const doneBtn = document.querySelectorAll("#done");
const todoBtn = document.querySelectorAll("#todo");
const deleteBtn = document.querySelectorAll("#delete");

/**  Event Handler **/
addBtn.addEventListener("click", AddOrDone);

for (let i = 0; i < deleteBtn.length; i++) {
	deleteBtn[i].addEventListener("click", DeleteItem);
}

for (let i = 0; i < doneBtn.length; i++) {
	doneBtn[i].addEventListener("click", Move);
}

for (let i = 0; i < todoBtn.length; i++) {
	todoBtn[i].addEventListener("click", Move);
}

let todoValueArray = document.querySelectorAll(".todo-store");
let doneValueArray = document.querySelectorAll(".done-store");

for (let i = 0; i < todoValueArray.length; i++) {
	todoValueArray[i].addEventListener("input", SaveNewInput);
}

for (let i = 0; i < doneValueArray.length; i++) {
	doneValueArray[i].addEventListener("input", SaveNewInput);
}

/** Function **/

// Move List Items
function Move(e) {
	let item = e.target.parentNode;
	item.remove();

	if (item.className == "todo-store") {
		item.classList.remove("todo-store");
		item.classList.add("done-store");
		item.children[2].id = "done";
		doneStore.append(item);
	} else {
		item.classList.remove("done-store");
		item.classList.add("todo-store");
		item.children[2].id = "todo";
		todoStore.append(item);
	}
	saveToLocalStorage();
}

// Deleting items
function DeleteItem(e) {
	let item = e.target.parentNode;
	item.style.transition = "all 1s ease";
	item.style.opacity = "0.2";
	item.style.height = "10px";
	setTimeout(Del, 1000, item);

	function Del(item) {
		item.remove();
		// hr animation start
		const hrElm = document.querySelector("hr");
		hrElm.style.background = "rgba(255, 2, 2, 0.3)";
		hrElm.style.transition = "1s ease";
		setTimeout(hrLoad, 1000, hrElm);

		function hrLoad(hrElm) {
			hrElm.style.background = "black";
		}
		// hr animation  end

		saveToLocalStorage();
	}
}

//Add new item to "To do" or "Done" section

function AddOrDone() {
	// hr animation start
	const hrElm = document.querySelector("hr");
	hrElm.style.background = "#21a57e";
	hrElm.style.width = "2%";
	hrElm.style.transition = "1.5s ease";
	setTimeout(hrLoad, 1500, hrElm);

	function hrLoad(hrElm) {
		hrElm.style.background = "black";
		hrElm.style.width = "80%";
	}
	// hr animation  end

	const newDiv = document.createElement("div");

	let textbox = document.createElement("input");
	textbox.setAttribute("type", "text");
	textbox.setAttribute("value", text.value);

	let inputDel = document.createElement("input");
	inputDel.setAttribute("id", "delete");
	inputDel.setAttribute("type", "button");

	let inputMove = document.createElement("input");
	inputMove.setAttribute("type", "button");

	newDiv.append(textbox);
	newDiv.append(inputDel);
	newDiv.append(inputMove);

	if (dropdown.value == "todo") {
		newDiv.className = "todo-store";
		inputMove.setAttribute("id", "todo");
		todoStore.append(newDiv);
	} else {
		newDiv.className = "done-store";
		inputMove.setAttribute("id", "done");
		doneStore.append(newDiv);
	}

	newDiv.children[0].addEventListener("input", SaveNewInput);
	newDiv.children[1].addEventListener("click", DeleteItem);
	newDiv.children[2].addEventListener("click", Move);

	// Animate new element into list
	newDiv.style.transition = "1.5s ease";
	newDiv.style.opacity = "0";
	if (newDiv.className == "todo-store") {
		newDiv.style.transform = "translateX(-200%)";
	} else {
		newDiv.style.transform = "translateX(200%)";
	}

	setTimeout(newElem, 100, newDiv);
	function newElem(newDiv) {
		newDiv.style.transform = "translateX(0%)";
		newDiv.style.opacity = "1";
		saveToLocalStorage();
	}
}

// Save Input Changes
function SaveNewInput(e) {
	e.target.setAttribute("value", e.target.value);
	saveToLocalStorage();
}

/** Storage **/

// Set local Storage

function saveToLocalStorage() {
	localStorage.setItem(
		"TodoStorage",
		document.querySelector(".store-container").innerHTML
	);
}

// Get local Storage
function getStorage() {
	if (localStorage.getItem("TodoStorage") != null) {
		let storedData = localStorage.getItem("TodoStorage");
		document.querySelector(".store-container").innerHTML = storedData;
	} else return;
}
