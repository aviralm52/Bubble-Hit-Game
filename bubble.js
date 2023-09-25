document.querySelector('#panel-bottom').innerHTML = `<button class="button-36" role="button" id = "startGame">Start Game</button>`
let startGameBtn = document.querySelector('#startGame');


function getNewHit(){

    let newHit = (Math.random()*10).toFixed(0);
    return newHit;
}


function makeBubble(){
    for (let i = 0; i<=151; i++){
        const val = (Math.random()*10).toFixed(0)
        document.querySelector('#panel-bottom').innerHTML += `<div class="bubble bubbleValue" > ${val} </div>`
    }
}


function timer(){
    let intervalId = setInterval(() => {
        let timerVal = document.querySelector("#timer").textContent;
        if (timerVal > 0){
            document.querySelector("#timer").textContent--;        
        }
        else{
            clearInterval(intervalId);
            gameOver();
        }
    }, 1000);
}


function checkHit(){

    // let bubbles = document.querySelectorAll(".bubble");
    // bubbles = Array.from(bubbles)

    // for (let b of bubbles){      // ! in this code we had applied eventListener on every bubble which is not correct, instead of it we can take use of event bubbling

    //     b.addEventListener('click', () => {

    //         let bubbleValue = b.textContent;
    //         let hitVal = document.querySelector('#hit').textContent;

    //         if (Number(bubbleValue) === Number(hitVal)){

    //             document.querySelector('#score').textContent++;
    //             document.querySelector('#hit').textContent = getNewHit()

    //             document.querySelector('#panel-bottom').textContent = '';
    //             makeBubble();
    //             checkHit();
    //         }
    //     })
    // }

    let panelBottom = document.querySelector('#panel-bottom');      // ! in this code we had used event bubbling, which means we had applied eventListener on panel-bottom and not on bubble, when we click on bubble and it doesn't find evenListener it will move to its parent for the event and then the event executes from parent

    panelBottom.addEventListener('click', (e) => {
        
        let hitVal = document.querySelector('#hit').textContent;
        
        if (Number(e.target.textContent) === Number(hitVal)){

            document.querySelector('#score').textContent++;
            document.querySelector('#hit').textContent = getNewHit()

            document.querySelector('#panel-bottom').textContent = '';
            makeBubble();
            checkHit();
        }
    })
}


function gameOver(){        // ! this function is called inside timer() function
    document.querySelector('#panel-bottom').innerHTML = `<h1>GAME OVER</h1>`;
    document.querySelector('#panel-bottom').innerHTML += `<button class="button-36" role="button" id = "newGame" >New Game</button>`

    let newGameBtn = document.querySelector('#newGame');

    newGameBtn.addEventListener('click', () => {
        newGame()
    })
} 


function newGame(){

    document.querySelector('#panel-bottom').innerHTML = "";
    makeBubble();
    document.querySelector('#hit').textContent = (Math.random()*10).toFixed(0)
    document.querySelector('#score').textContent = 0;
    document.querySelector("#timer").textContent = 30;
    timer()
    checkHit()
}


startGameBtn.addEventListener('click', () => {

    document.querySelector('#panel-bottom').innerHTML = '';
    document.querySelector('#hit').textContent = getNewHit();
    document.querySelector('#timer').textContent = 30;
    document.querySelector('#score').textContent = 0;

    makeBubble()
    timer()
    checkHit()
})