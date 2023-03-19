const btnClear = document.querySelector('#clear-button');


let allCount = 0;
let notremovedCount = allCount;


const addToList = (item) => {
    let todoList = document.querySelector("#todo-list");
    let li = document.createElement("li");
    li.innerText = item  // create the list

    const myDiv = document.createElement('div');
    myDiv.classList.add('delete-box');

    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Αφαίρεση"
    deleteButton.classList.add("delete-button")

    deleteButton.addEventListener("click", () => {
        li.remove();
        if(li.classList.contains("completed")){
            allCount--;
            notremovedCount--;
        }
        else{
            allCount--;
        }
        
    })

    myDiv.appendChild(deleteButton);
    li.appendChild(myDiv);


    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        if (li.classList.contains("completed")){
            notremovedCount--;
        }
        else{
            notremovedCount++;
        }
        updateScore();
    }) // click to toggle linethrough

    todoList.appendChild(li);
    allCount++;
    notremovedCount++;
    updateScore();
}


const updateScore = () => {
    const allCountElem = document.querySelector("#all-count");
    const notremovedCountElem = document.querySelector("#not-removed-count");
    allCountElem.textContent = allCount;
    notremovedCountElem.textContent = notremovedCount;
}

const newItem = document.querySelector("#new-item")
newItem.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (newItem.value !== "") {
            addToList(newItem.value)
            newItem.value = ""
        }
    }
}) // add new items in the list after you hit enter