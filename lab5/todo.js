const btnClear = document.querySelector('#clear-button');


let allCount = 0;
let notremovedCount = allCount;


const addToList = (item) => {
    let todoList = document.querySelector("#todo-list");
    let li = document.createElement("li");
    li.innerText = item  // create the list
    const currentTime = Date.now();
    
    const date = new Date(currentTime)
    const dateStr = date.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeAgoString = getTimeAgoString(date);
    
    li.innerHTML = `<span class="date column-1">${dateStr}<br>${timeAgoString}</span>
    <span class="item column-2">${item}</span>`;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        if (li.classList.contains("completed")){
            notremovedCount--;
            updateScore();
        }
        else{
            notremovedCount++;
            updateScore();
            
        }
        
    }) // click to toggle linethrough
    

    li.addEventListener("dblclick", () => {
        
        li.remove();
        if(li.classList.contains("completed")){
            allCount--;
            updateScore();
        }
        else{
            allCount--;
            notremovedCount--;
            updateScore();
        }
        
    })
    
    
    todoList.appendChild(li);
    allCount++;
    notremovedCount++;
    updateScore();
};


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


const getTimeAgoString = (date) => {
  const today = new Date();
  const diffTime = Math.abs(today - new Date(date));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Σήμερα';
  } else if (diffDays === 1) {
    return 'Χθες';
  } else {
    return `${diffDays} ημέρες πριν`;
  }
};
