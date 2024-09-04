// Select DOM elements
const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListBtn = document.querySelector('[data-delete-list-btn]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitle = document.querySelector('[data-list-title]');
const listCount = document.querySelector('[data-list-count]');
const taskContainer = document.querySelector('[data-tasks]');

// Keys for local storage
const LOCAL_STORAGE_LISTS_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LISTS_ID_KEY = 'task.selectedListId';

// Load lists from local storage or initialize as an empty array
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LISTS_ID_KEY);

// Event listener for clicking on list items
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        // Remove the 'active-list' class from previously selected list
        const previouslySelected = listsContainer.querySelector('.active-list');
        if (previouslySelected) {
            previouslySelected.classList.remove('active-list');
        }
        // Add 'active-list' class to the clicked list item
        e.target.classList.add('active-list');
        selectedListId = e.target.dataset.listId;
        saveAndRender();
    }
});

// Event listener for deleting the selected list
deleteListBtn.addEventListener('click', () => {
    if (selectedListId) {
        lists = lists.filter(list => list.id !== selectedListId);
        selectedListId = null;
        saveAndRender();
    }
});

// Event listener for adding a new list
newListForm.addEventListener('submit', e => {
    e.preventDefault();
    const listName = newListInput.value.trim();
    if (listName === '') return;

    const list = createList(listName);
    lists.push(list);
    newListInput.value = '';
    saveAndRender();
});

// Function to create a new list object
function createList(name) {
    return { id: Date.now().toString(), name, tasks: [] };
}

// Function to save lists and selected list ID to local storage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LISTS_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LISTS_ID_KEY, selectedListId);
}

// Function to save data and render the UI
function saveAndRender() {
    save();
    render();
}

// Function to render the list and selected list details
function render() {
    clearElement(listsContainer);
    renderList();

    const selectedList = lists.find(list => list.id === selectedListId);
    if (selectedList) {
        listDisplayContainer.style.display = '';
        listTitle.innerText = selectedList.name;
        renderTaskCount(selectedList);
        clearElement(taskContainer);
        // You might want to add code here to render tasks if needed
    } else {
        listDisplayContainer.style.display = 'none';
    }
}

// Function to render the task count for the selected list
function renderTaskCount(selectedList) {
    const incompleteTasks = selectedList.tasks.filter(task => !task.complete).length;
    const taskString = incompleteTasks === 1 ? 'task' : 'tasks';
    listCount.innerText = `${incompleteTasks} ${taskString} remaining`;
}

// Function to render the list of lists
function renderList() {
    lists.forEach(list => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = list.id;
        listElement.classList.add('list-name');
        listElement.innerText = list.name;

        if (list.id === selectedListId) {
            listElement.classList.add('active-list');
        }

        listsContainer.appendChild(listElement);
    });
}

// Function to clear all child elements of a given element
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Initial render
render();
