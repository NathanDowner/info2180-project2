window.onload = function() {
  const pieces = document.querySelectorAll('#puzzlearea div');
  const shuffleBtn = document.querySelector('#shufflebutton');
  const puzzle = document.querySelector('#puzzlearea');

  let empty = {
    top: 300,
    left: 300
  }

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
          pieces[p].style.left = `${x}px`; 
          pieces[p].style.backgroundPosition = `-${x}px -${y}px`;
        }
        p++;
      }    
    }
  }

  function shuffle() {
    for (let i = 0; i < 100; i++) {
      let index = Math.floor(Math.random() * 14);
      move(pieces[index]);
    }
    start();
    setInterval(end,1000);

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

  function move(piece) {
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
    let top = getTop(this);
    let left = getLeft(this);
    setTop(this,empty.top);
    setLeft(this,empty.left);
    empty.top = top;
    empty.left = left;
    // console.log(`empty top is: ${empty.top} \n empty left is: ${empty.left}`);
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
  <h1>Your Time</h1>
  <h3 id="time"></h3>`;
  timeArea.style.position = 'absolute';
  timeArea.style.left = '450px';
  puzzle.appendChild(timeArea);

  const time = document.querySelector('#time');

  let startTime, endTime;

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