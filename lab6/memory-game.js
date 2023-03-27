
//We play with 6 image pairs
const numberImg = 6
//Total tries so far
let totalTries = 0
//How many pairs have been revealed so far
let revealedPairs = 0
//A total of 12 cards, we shuffle them
let cards = shuffleArr([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
function loadImages() {
    const promises = new Array()
    // ADD CODE HERE
    cards.forEach(image =>{
        promise = new Promise((resolve,reject) =>{
            img = document.createElement("img")
            img.src = `${image}.gif`
            img.setAttribute("data-image-id",image)
            imagePanel = document.querySelector(".images-panel")
            imagePanel.appendChild(img)
            img.addEventListener("load", () =>{
                resolve();
            })
        })
        promises.push(promise)
    });
    // load each image by using the promise API.
    // Since loading a resource, especially over the internet, might be slow, you have to ensure that
    // all images have been loaded before continuing.
    // The trick here is to user the 'load' event for each image. If 'load' event is fired, it means the
    // image has been loaded (i.e. the promise of loading an image has been resolved)
    // Some further details that might be helpful, not related to promises:
    // You might find helpful https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image,
    // which is equivalent to document.createElement('img')
    // Use the 6 images that are provided with this example. After making sure that the game works you can
    // get random images from the lorem picsum service (instruction will appear on virtualclass).
    //return the array that contains the promises
    return promises
}
Promise.all(
    loadImages()).then(() =>{
        // ADD CODE HERE
        cards.forEach(image =>{
            let cover = document.createElement("div")
            cover.setAttribute("data-image-id",image)
            cover.addEventListener("click",clickListener);
            document.querySelector(".covers-panel").appendChild(cover)
        })
        // Once the images have been loaded, then set up the game    
        // Each image appears twice in the game. That means that two elements are needed per image.
        // A helpful function is element.cloneNode() that creates a clone of an element
        // After creating each image element and attaching it to the images-panel
        // you need to create the cover, that covers the image:
        // let cover = document.createElement('div')
        // cover.setAttribute("data-image-id", imageId)
        // cover.addEventListener('click', clickListener);
        // document.querySelector('.covers-panel').appendChild(cover)
        // This way, element.dataset.imageId contains the imageId of the image
        // that lies below the cover (short explanation: the attribute was named 'data-image-id'. 
        // The first part, 'data-', is ommitted. The rest is converted from image-id to imageId.)
        // Long explanation in https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
    })
//will be called when the user clicks on a cover
function clickListener(event) {
    playCard(event.target)
}
//If no card has been uncovered this is undefined
//otherwise it contains the cover that has been previously clicked
let previouslySelectedCover
// contains the core game logic
//selectedCover is the cover that has just been clicked
function playCard(selectedCover) {
    if (previouslySelectedCover == undefined) {
        previouslySelectedCover = selectedCover
        selectedCover.style.opacity = 0;
        totalTries++;
    }
    // else if the image under selectedCover is the same as under previouslySelectedCover
    // ADD CODE HERE
    else{
        if(previouslySelectedCover.dataset.imageId === selectedCover.dataset.imageId){
            selectedCover.style.opacity = 0;
            previouslySelectedCover = undefined
            revealedPairs ++
            totalTries ++
        }
    // else it means that a second image has been uncovered that matches the previous one
    // ADD CODE HERE
        else{
            selectedCover.style.opacity = 0;
            setTimeout(() =>{
                selectedCover.style.opacity = 100;
                previouslySelectedCover.style.opacity = 100
                totalTries++
                previouslySelectedCover = undefined
            },300)
        }
    }
    if (revealedPairs == numberImg) {
        let gameEndPanel = document.querySelector('.game-end-panel')
        // gameEndPanel.innerHTML = "<p>Χρειάστηκαν συνολικά " + totalTries + " προσπάθειες</p>"
        gameEndPanel.innerHTML = "<p>It took you " + totalTries + " trys to finish the game</p>"
        gameEndPanel.style.zIndex = 3
        gameEndPanel.style.opacity = 1
    }
}
// Shuffle Array In place
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array;
}
