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

  let b = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      grid[i][j] = pieces[b];
      b++;
    }    
  }

  //blank piece
  // const blank = document.createElement('div');
  // blank.classList.add('puzzlepiece');
  // blank.textContent = 'blank';
  // blank.style.top = '300px';
  // blank.style.left = '300px';
  // blank.style.background = "rgba(0,0,0,0)";

  // puzzle.appendChild(blank);

  //add the puzzlepiece class to divs
  pieces.forEach(p => p.classList.add('puzzlepiece'));
  // pieces.forEach(p => {
  //   if (hasEmptySpace(p)) {
  //     p.classList.add('movablepiece');
  //   }
  // });
  setup();
  pieces.forEach(p => {
    if(hasEmptySpace(p))
      p.classList.add('movablepiece');
  })

  
  //space them out
  function setup() {
    let p = 0
    for (let y = 0; y < 400; y+=100) {
      for (let x = 0; x < 400; x+=100) {
        pieces[p].style.top = `${y}px`;
        pieces[p].style.left = `${x}px`;
        //portioning the image
        pieces[p].style.backgroundPosition = `-${x}px -${y}px`;

        //
        pieces[p].dataset.x = x; 
        pieces[p].dataset.y = y; 
        p++;
      }    
    }
  }

  function getTop(piece) {
    return parseInt(piece.style.top, 10);
  }

  function getLeft(piece) {
    return parseInt(piece.style.left, 10);
  }
  
  //pieces has space if a space around the div has no element 
  //matching the coords

  function hasEmptySpace(piece) {
    let top = getTop(piece);
    let left = getLeft(piece);
  
    pieces.forEach(p => {
      if(getTop(p) === (top - 100) || getLeft(p) === (left + 100) || getTop(p) === (top + 100) || getLeft(p) === (left - 100)) {
        return false;
      }
    });
    return true;
  }
  
  


  //check if there is an empty space around
  //might include looping through to see if 

}