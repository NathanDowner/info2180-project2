window.onload = function() {
  const pieces = document.querySelectorAll('#puzzlearea div');
  const second = pieces[1];
  const puzzle = document.querySelector('#puzzlearea');
  const puzzleWidth = puzzle.style.width;
  const puzzleHeight = puzzle.style.height;
 
  const grid = new Array(4);
  for (i=0;i<grid.length;i++) {
    grid[i] = new Array(4);
  }
//can be deleted
  // let b = 0;
  // for (let i = 0; i < 4; i++) {
  //   for (let j = 0; j < 4; j++) {
  //     grid[i][j] = pieces[b];
  //     b++;
  //   }    
  // }
  let empty = {
    top: 300,
    left: 300
  }

  //add the puzzlepiece class to divs

  //**************************************************/
  
  setup();
  layoutGrid();

  pieces.forEach(p => {
    p.classList.add('puzzlepiece');
    p.addEventListener('mouseover', ifMovable);
    
  });
  
    
  //**************************************************/

  
  //space them out
  function setup() {
    console.log("called setup");
    let p = 0
    for (let y = 0; y < 400; y+=100) {
      for (let x = 0; x < 400; x+=100) {
        // pieces[p].style.top = `${y}px`;
        // pieces[p].style.left = `${x}px`;
        //portioning the image
        // pieces[p].style.backgroundPosition = `-${x}px -${y}px`;
        if (p < pieces.length) {
          pieces[p].dataset.x = x; 
          pieces[p].dataset.y = y; 
          
        }
        grid[y/100][x/100] = pieces[p];
        p++;
      }    
    }
  }

  function layoutGrid() {
    console.log('called layoutGrid');
    pieces.forEach(p => {
      let x = p.dataset.x;
      let y = p.dataset.y;
      p.style.left = x +'px';
      p.style.top = y +'px';
      p.style.backgroundPosition = `-${x}px -${y}px`;
    });
  }

  function ifMovable() {
    if (nextToBlank(this)) {
      this.classList.add('movablepiece');
      this.addEventListener('click', movePiece);
    } else if (this.classList.contains('movablepiece')){
      this.classList.toggle('movablepiece');
    }
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
  
  //pieces has space if a space around the div has no element 
  //matching the coords

  function movePiece() {
    console.log("Called movePiece.");
    let top = getTop(this);
    let left = getLeft(this);
    setTop(this,empty.top);
    setLeft(this,empty.left);
    empty.top = top;
    empty.left = left;
    console.log(`empty top is: ${empty.top} \n empty left is: ${empty.left}`);
    this.removeEventListener('click', movePiece);
    this.classList.toggle('movablepiece');
  }

  function nextToBlank(piece) {
    console.log('Called move nextToBlank.');
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
//add mouseover event to each piece
  // function adds the class if its moveable
  //function allows piece to move if moveable
}