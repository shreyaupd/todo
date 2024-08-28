const listscontainer=document.querySelector('[data-lists]')
let lists=['work','todo']
function render() {
    clearElement(listscontainer);  // Clears the container before rendering new elements
    lists.forEach(list => { //The forEach method iterates over each item in the lists array list is the individual array element
        const listelement = document.createElement('li');  // Creates a new 'li' element
        listelement.classList.add("list-name");  // Adds a CSS class to the 'li' element
        listelement.innerText = list;  // Sets the text of the 'li' to the current list name
        listscontainer.appendChild(listelement);  // Appends the 'li' to the container
    });
}

function clearElement(element){

}
render();
