// Select HTML elements from the DOM using data attributes
const listsContainer = document.querySelector('[data-lists]'); // Container where the list items will be rendered
const newListForm = document.querySelector('[data-new-list-form]'); // The form for adding a new list
const newListInput = document.querySelector('[data-new-list-input]'); // The input field within the form
const deletelistbtn = document.querySelector('[data-delete-list-btn]');
// Define a key for storing lists in Local Storage
const LOCAL_STORAGE_LISTS_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LISTS_ID_KEY = 'task.selectedListId';

// Load the lists from Local Storage, or initialize an empty array if none exist
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LISTS_ID_KEY);

// Add an event listener to the lists container for detecting clicks on list items
listsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.listId;
        saveAndRender(); // Save the selected list ID and render the updated UI
    }
});

deletelistbtn.addEventListener('click', e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null;
    saveAndRender();
})
// Add an event listener to the form that listens for the 'submit' event
newListForm.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the default form submission behavior, which would refresh the page

    // Get the value from the new list input field
    const listName = newListInput.value;

    // Check if the input is empty or null; if so, do nothing and exit the function
    if (listName == null || listName === '') return;

    // Create a new list object using the createList function
    const list = createList(listName);

    // Add the newly created list object to the lists array
    lists.push(list);

    // Clear the input field after adding the new list
    newListInput.value = null;

    // Save the updated lists array to Local Storage and render the lists
    saveAndRender();
});

// Function to create a new list object
function createList(name) {
    return { id: Date.now().toString(), name: name, tasks: [] };
}

// Function to save the lists array to Local Storage
function save() {
    localStorage.setItem(LOCAL_STORAGE_LISTS_KEY, JSON.stringify(lists));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LISTS_ID_KEY, selectedListId);
}

// Function to save the lists array and render them on the page
function saveAndRender() {
    save();
    render();
}

// Function to render the lists on the page
function render() {
    // Clear the container before adding new elements
    clearElement(listsContainer);

    // Loop through each list in the lists array
    lists.forEach(list => {
        // Create a new 'li' (list item) element for each list
        const listElement = document.createElement('li');

        // Set a custom data attribute on the 'li' element for the list's unique ID
        listElement.dataset.listId = list.id;

        // Add a CSS class to the 'li' element for styling purposes
        listElement.classList.add("list-name");

        // Set the text of the 'li' element to the name of the current list
        listElement.innerText = list.name;

        // Highlight the active list if it is selected
        if (list.id === selectedListId) {
            listElement.classList.add('activelist');
        }

        // Append the 'li' element to the lists container in the DOM
        listsContainer.appendChild(listElement);
    });
}

// Function to remove all child elements from a given DOM element
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Initial render call to display the default lists on the page when the script first runs
render();
