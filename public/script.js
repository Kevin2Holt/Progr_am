const 	itemTypes = ["title",
				   "info",
				   "list"];
var		eventData;
$(function() {//On document ready
try {
	document.getElementById("main_search_input").addEventListener("keypress", (event) => {
		console.log("main_search_input:keypress");
		if (event.key === "Enter") {
			event.preventDefault();
			main_search();
		}
	});
} catch(err) {}
try {
	document.getElementById("topBar_search_input").addEventListener("keypress", (event) => {
		console.log("topBar_search_input:keypress");
		if(event.key === "Enter") {
			event.preventDefaualt();
			topBar_search();
		}
	});
} catch(err) {}

newItemButtons = document.getElementsByClassName("addItem");
for(i=0;i< newItemButtons.length;i++) {
	newItemButtons.item(i).addEventListener("click", createNewItem);
}
newListItemButtons = document.getElementsByClassName("new_listItem");
for(i=0;i< newListItemButtons.length;i++) {
	newListItemButtons.item(i).addEventListener("click", addNewListItem);
}
});

function eventDataLoad(data) {
	eventData = data;
	console.log(eventData);
}

function topBar_searchReset_click() {
	document.getElementById("topBar_search_input").value="";
}
function topBar_signIn_show() {
	console.log("topBar_signIn_show()");

	cur = document.getElementById("topBar_signIn_form").style.display;
	if(cur == "inline") {
		document.getElementById("topBar_signIn_form").style.display = "none";
		document.getElementById("topBar_signIn").innerHTML = "Sign In";
	}
	else {
		document.getElementById("topBar_signIn_form").style.display = "inline";
		document.getElementById("topBar_signIn").innerHTML = "Close";
	}
}
function main_search_reset_click() {
	document.getElementById("main_search_input").value="";
}

function main_search() {
	console.log("main_search()");
	eventCode = document.getElementById("main_search_input").value;
	window.location.href = "/"+eventCode;
}
function topBar_search() {
	console.log("topBar_search()");
	eventCode = document.getElementById("topBar_search_input").value;
	window.location.href = "/"+eventCode;
}

function switchSection(sectionId) {
	console.log(sectionId);

	// Set all sections as inactive
	var sections = document.getElementsByClassName("section");
	for(i=0; i<sections.length; i++) {
		sections.item(i).classList.remove("section_active");
		sections.item(i).classList.add("section_inactive");
	}
	// Set Active Section
	document.getElementById(sectionId).classList.remove("section_inactive");
	document.getElementById(sectionId).classList.add("section_active");

	// Set all tabs as inactive
	var tabs = document.getElementsByClassName("section_tab");
	for(i=0; i<tabs.length; i++) {
		tabs.item(i).classList.remove("section_tab_active");
		tabs.item(i).classList.add("section_tab_inactive");
	}
	// Set Active Tab
	document.getElementById("section_tab_"+sectionId).classList.remove("section_tab_inactive");
	document.getElementById("section_tab_"+sectionId).classList.add("section_tab_active");
}

function addNewListItem(event) {
	callButton = event.currentTarget;
	sectionId = callButton.dataset.sectionId;
	item = callButton.dataset.item;
	listItem = callButton.dataset.listItem;

	list = document.getElementById("item_list_"+item);
	newListItem = document.createElement("li");
	newInput = document.createElement("input");

	newInput.placeholder = "Content";

	newListItem.classList.add("edit");
	newListItem.classList.add("content");
	newListItem.appendChild(newInput);

	list.insertBefore(newListItem, list.children[list.children.length-1]);
}

function createNewItem(event) {
	data = event.currentTarget.dataset;
	console.log(data.section_id);
	section 		= document.getElementById(data.sectionId);
	newItemButton 	= event.currentTarget;
	newItem 		= document.createElement("div");
	newItem_title 	= document.createElement("p");
	newItem_title.appendChild(document.createTextNode("New Item"));
	newItem_list 	= document.createElement("div");

	newItem.classList.add("edit");
	newItem.classList.add("newItem");
	newItem.id = "newItem_"+data.item+"_1";
	newItem_title.classList.add("newItem_title");
	newItem_list.classList.add("newItem_list");

	for(i=0; i<itemTypes.length; i++) {
		newItem_list_type = document.createElement("button");
		newItem_list_type.classList.add("newItem_list_type");
		newItem_list_type.dataset.item_id = newItem.id;
		// newItem_list_type.dataset.item = data.item;
		newItem_list_type.dataset.item_type = itemTypes[i];
		newItem_list_type.dataset.section_id = data.section_id;
		newItem_list_type.addEventListener("click", replaceNewItem);
		newItem_list_type.appendChild(document.createTextNode(itemTypes[i].charAt(0).toUpperCase() + itemTypes[i].slice(1)));
		newItem_list.appendChild(newItem_list_type);
	}

	newItem.appendChild(newItem_title);
	newItem.appendChild(newItem_list);

	newNewItemButton = document.createElement("button");
	newNewItemButton.classList.add("edit");
	newNewItemButton.classList.add("addItem");
	newNewItemButton.id = "addItem_"+data.item;
	newNewItemButton.addEventListener("click", createNewItem);
	newNewItemButton.appendChild(document.createTextNode("+"));

	newNewItemButton2 = document.createElement("button");
	newNewItemButton2.classList.add("edit");
	newNewItemButton2.classList.add("addItem");
	newNewItemButton2.id = "addItem_"+data.item;
	newNewItemButton2.addEventListener("click", createNewItem);
	newNewItemButton2.appendChild(document.createTextNode("+"));

	newItemButton.parentNode.insertBefore(newNewItemButton, newItemButton.nextSibling);
	newItemButton.parentNode.insertBefore(newNewItemButton2, newItemButton);
	newItemButton.parentNode.replaceChild(newItem, newItemButton);
}

function replaceNewItem(event) {
	data = event.currentTarget.dataset;
	placeholderItem = document.getElementById(data.item_id);
	console.log(placeholderItem);
	console.log(placeholderItem.parentNode);
	placeholderItem.parentNode.replaceChild(getNewItem(	data.item_type,
														data.item_id,
														data.section_id),
											placeholderItem);
}

function getNewItem(itemType, oldItemId, sectionId) {
	console.log(sectionId)
	item = document.createElement("div");
	item.classList.add("edit");
	item.classList.add(itemType);
	item.dataset.item = oldItemId+"_1";
	item.dataset.section_id = sectionId;

	content = document.createElement("input");
	content.classList.add("edit");
	content.classList.add("content");
	content.placeholder = "Content";

	label = document.createElement("input");
	label.classList.add("edit");
	label.classList.add("label");
	label.placeholder = "Label";

	switch(itemType) {
		case "title":
			label = null;

			break;
		case "info":
			break;
		case "list":
			content = 					document.createElement("ul");
				content.classList.add("edit");
				content.id = "item_list_"+item.dataset.item;

			listItem = 					document.createElement("li");
				listItem.classList.add("edit");
				listItem.classList.add("content");
				content.appendChild(listItem);

			listItem_input = 			document.createElement("input");
				listItem_input.placeholder = "Content";
				listItem.appendChild(listItem_input);

			listItemAddNew = 			document.createElement("li");
				listItemAddNew.classList.add("edit");
				listItemAddNew.classList.add("content");
				content.appendChild(listItemAddNew);

			listItemAddNew_button = 	document.createElement("button");
				listItemAddNew_button.classList.add("edit");
				listItemAddNew_button.classList.add("new_listItem");
				listItemAddNew_button.dataset.section_id = sectionId;
				listItemAddNew_button.dataset.item = item.dataset.item;
				listItemAddNew_button.addEventListener("click", addNewListItem);
				listItemAddNew.appendChild(listItemAddNew_button);

			listItemAddNew_buttonText = document.createTextNode("+");
				listItemAddNew_button.appendChild(listItemAddNew_buttonText);
				listItemAddNew.appendChild(listItemAddNew_button);
			break;
	}

	if(label!=null) {
		item.appendChild(label);
	}
	item.appendChild(content);

	return item;
}

