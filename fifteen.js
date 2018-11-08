
//***/The extra feature I'm submitting is the end game celebration***//
window.onload = function() {
  const pieces = document.querySelectorAll('#puzzlearea div');
  const shuffleBtn = document.querySelector('#shufflebutton');
  const puzzle = document.querySelector('#puzzlearea');
  let startTime, endTime;

  let empty = {
    top: 300,
    left: 300
  }

  let moveCount = 0;

  //add the puzzlepiece class to divs

  //**************************************************/
  
  setup();

  pieces.forEach(p => {
    p.classList.add('puzzlepiece');
    p.addEventListener('mouseover', ifMovable);
  });
  shuffleBtn.addEventListener('click', shuffle);
  
  //**************************************************/

  function setup() {
    // console.log("called setup");
    let p = 0
    for (let y = 0; y < 400; y+=100) {
      for (let x = 0; x < 400; x+=100) {    
        if (p < pieces.length) {
          pieces[p].style.top = `${y}px`;
          pieces[p].dataset.top = y;
          pieces[p].style.left = `${x}px`; 
          pieces[p].dataset.left = x; 
          pieces[p].style.backgroundPosition = `-${x}px -${y}px`;
        }
        p++;
      }    
    }
  }
  function celebrate() {
    // pieces.forEach(p => p.style.background = '0');
    // clearInterval(timer);
    const ending = document.createElement('h1');
    ending.textContent = 'You Win!';
    ending.style.position = 'absolute';
    ending.style.top = '50%';
    ending.style.left = '50%';
    ending.style.transform = 'translate(-50%,-50%)';
    ending.classList.add('movablepiece');
    puzzle.appendChild(ending);
    
    let state = false;
    let flashing = setInterval(function () {
      state = !state;
      ending.style.color = state? "red": "green";
    }, 500);
  }

  function didWin(piece) {
    if(rightPos(piece)) {
      for (let i = 0; i < pieces.length; i++) {
        if (rightPos(pieces[i])){
        } else {
          return false;
        }
      }
      return true;
    } else {
      return  false;
    }
  }

  function shuffle() {
    moveCount = 0;
    moves.textContent= 0;
    for (let i = 0; i < 100; i++) {
      let index = Math.floor(Math.random() * 14);
      move(pieces[index]);
    }
    start();
   let timer = setInterval(end,1000);

  }

  function ifMovable(e) {
    if (nextToBlank(this)) {
      this.classList.add('movablepiece');
      this.addEventListener('click', movePiece);
    } else {
      if (this.classList.contains('movablepiece')){
        this.classList.toggle('movablepiece');
        this.removeEventListener('click', movePiece);
      }
    }
    // console.log(`${e.target.textContent} is ${nextToBlank(this)}`);
  }

  function getTop(piece) {
    return parseInt(piece.style.top, 10);
  }

  function setTop(piece, val) {
    piece.style.top = `${val}px`;
  }

  function getLeft(piece) {
    return parseInt(piece.style.left, 10);
  }

  function setLeft(piece, val) {
    piece.style.left = `${val}px`;
  }

  function rightPos(piece) {
    // console.log(`type of getLeft ${ typeof getLeft(piece)} and typeof ${typeof piece.dataset.left}`);
    if  (`${getLeft(piece)}` === piece.dataset.left && `${getTop(piece)}` === piece.dataset.top)
      return true;
    else
      return false;
  }

  function move(piece) {
    piece.style.transition = 'left 0.25s , top 0.25s';
    // console.log("Called movePiece.");
    let top = getTop(piece);
    let left = getLeft(piece);
    setTop(piece,empty.top);
    setLeft(piece,empty.left);
    empty.top = top;
    empty.left = left;
    // console.log(`empty top is: ${empty.top} \n empty left is: ${empty.left}`);
    piece.removeEventListener('click', movePiece);
    piece.classList.toggle('movablepiece');
  }

  function movePiece() {
    // console.log("Called movePiece.");
    //transition
    this.style.transition = 'left 0.25s , top 0.25s';
    let top = getTop(this);
    let left = getLeft(this);
    setTop(this,empty.top);
    setLeft(this,empty.left);
    empty.top = top;
    empty.left = left;
    updateMoves();    
    if (didWin(this))
      celebrate();
    this.removeEventListener('click', movePiece);
    this.classList.toggle('movablepiece');
  }

  function nextToBlank(piece) {
    // console.log('Called move nextToBlank.');
    let top = getTop(piece);
    let left = getLeft(piece);
    if ((top - 100 === empty.top && left === empty.left) || //above
         (top === empty.top && left + 100 === empty.left) || //right
         (top + 100 ===empty.top && left === empty.left) || // below
         (top === empty.top && left - 100 === empty.left)) { //left
           return true;
         } else {
           return false;
         }
  }

  const timeArea = document.createElement('div');
  timeArea.innerHTML = `
  <h4 style="margin-bottom:2px;">Your Time:</h4>
  <p id="time" style="margin:0;"></p><br>
  <h4 style="margin-top:10px; margin-bottom:0;">Number of moves:</h4>
  <p id="moves" style="margin:0;"></p>`;
  timeArea.style.position = 'absolute';
  timeArea.style.left = '450px';
  puzzle.appendChild(timeArea);

  const time = document.querySelector('#time');
  const moves = document.querySelector('#moves');
  moves.textContent = moveCount;

  function updateMoves() {
    moveCount++;
    moves.textContent = moveCount;
  }

  function start() {
    startTime = new Date();
  };

  function end() {
    endTime = new Date();
    let timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    var seconds = Math.round(timeDiff);
    time.textContent = `${seconds}s`;
  }
}