const btnClear = document.querySelector('#clear-button');


let allCount = 0;
let notremovedCount = allCount;

const prePopulatedTasks = [
    'Να λύσω ξανά την άσκηση αυτή την επόμενη εβδομάδα που θα ξέρω πώς χειριζόμαστε τα συμβάντα',
    'Να πάρω τα χάπια μου',
    'Να διαβάσω JS',
    'Να ταϊσω τη γάτα',
    'Να μαγειρέψω'
]
    

    
  
  
  // Add the pre-populated tasks to the list when the page is loaded
  window.addEventListener('load', () => {
    const todoList = document.querySelector('#todo-list');
    prePopulatedTasks.forEach(task => addToList(task));
  });


const addToList = (item) => {
    let todoList = document.querySelector("#todo-list");
    let li = document.createElement("li");
    li.innerText = item;
    const currentTime = Date.now();    
    const date = new Date(currentTime);
    const dateStr = date.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeString = getTime(date);
    
    li.innerHTML = `<span class="date column-1">${dateStr}<br>${timeString}</span>
    <span class="item column-2">${item}</span>`;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        if (li.classList.contains("completed")) {
            notremovedCount--;
            updateScore();
        } else {
            notremovedCount++;
            updateScore();            
        }        
    });
    

    li.addEventListener("dblclick", () => {
        
        li.remove();
        if (li.classList.contains("completed")) {
            allCount--;
            updateScore();
        } else {
            allCount--;
            notremovedCount--;
            updateScore();
        }
        colorEveryOddTask();
    
    });    
    
    todoList.appendChild(li);
    allCount++;
    notremovedCount++;
    updateScore();
    colorEveryOddTask();
};




const updateScore = () => {
    const allCountElem = document.querySelector("#all-count");
    const notremovedCountElem = document.querySelector("#not-removed-count");
    allCountElem.textContent = allCount;
    notremovedCountElem.textContent = notremovedCount;
}

const newItem = document.querySelector("#new-item")
newItem.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        if (newItem.value !== "") {
            addToList(newItem.value)
            newItem.value = ""
        }
    }
}) 


const getTime = (date) => {
    const today = new Date();
    const taskDate = new Date(date);
    const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
    
    if (taskDate.toDateString() === today.toDateString()) {
      return 'Σήμερα';
    } else if (taskDate.toDateString() === yesterday.toDateString()) {
      return 'Χθες';
    } else {
      return `${taskDate.toLocaleDateString('el-GR')} ${taskDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

function colorEveryOddTask() {
    const taskList = document.querySelector("#todo-list");
    const tasks = taskList.querySelectorAll(".column-2");
    tasks.forEach((task, index) => {
      if (index % 2 === 1) {
        task.style.backgroundColor = "";
      } else {
        task.style.backgroundColor = "lightgrey";
      }
    });
  }
