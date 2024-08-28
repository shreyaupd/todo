// Select the HTML elements from the DOM using data attributes
// These variables now hold references to specific elements in the HTML document
const listscontainer = document.querySelector('[data-lists]'); // Container where the list items will be rendered
const newlistform = document.querySelector('[data-new-list-form]'); // The form for adding a new list
const newlistinput = document.querySelector('[data-new-list-input]'); // The input field within the form

// Initialize the lists array with some sample data
// Each list is represented as an object with a unique ID, a name, and an empty array for tasks
let lists = [
    { id: 1, name: 'work' }, // First list object with ID 1 and name 'work'
    { id: 2, name: 'todo' }  // Second list object with ID 2 and name 'todo'
];

// Add an event listener to the form that listens for the 'submit' event
// This function will run whenever the form is submitted
newlistform.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the default form submission behavior, which would refresh the page

    // Get the value from the new list input field
    const listName = newlistinput.value;

    // Check if the input is empty or null; if so, do nothing and exit the function
    if (listName == null || listName === '') return;

    // Create a new list object using the createlist function
    const list = createlist(listName);

    // Clear the input field after adding the new list
    newlistinput.value = null;

    // Add the newly created list object to the lists array
    lists.push(list);

    // Call the render function to update the displayed list items
    render();
});

// Function to create a new list object
// This function generates a unique ID based on the current time and returns an object
// containing the list's ID, name, and an empty array for tasks
function createlist(name) {
    return { id: Date.now().toString(), name: name, tasks: [] };
}

// Function to render the lists on the page
// This function clears the existing list elements and then adds each item from the lists array to the DOM
function render() {
    // Clear the container before adding new elements
    clearElement(listscontainer);

    // Loop through each list in the lists array
    lists.forEach(list => {
        // Create a new 'li' (list item) element for each list
        const listelement = document.createElement('li');

        // Set a custom data attribute on the 'li' element for the list's unique ID
        // This allows easy identification and manipulation of specific list items later
        listelement.dataset.listId = list.id;

        // Add a CSS class to the 'li' element for styling purposes
        listelement.classList.add("list-name");

        // Set the text of the 'li' element to the name of the current list
        listelement.innerText = list.name;

        // Append the 'li' element to the lists container in the DOM
        listscontainer.appendChild(listelement);
    });
}

// Function to remove all child elements from a given DOM element
// This function clears the container before new list items are added during the render process
function clearElement(element) {
    // Continue to remove the first child element until the element has no children left
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

// Initial render call to display the default lists on the page when the script first runs
render();
