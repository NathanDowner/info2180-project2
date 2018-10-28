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
  // setup();

  
  //space them out
  function setup() {
    let p = 0
    for (let i = 0; i < 400; i+=100) {
      for (let j = 0; j < 400; j+=100) {
        pieces[p].style.top = `${i}px`;
        pieces[p].style.left = `${j}px`;
        //portioning the image
        pieces[p].style.backgroundPosition = `-${j}px -${i}px`;
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

  let emptySpace = [300,300];
  function findEmptySpace() {
    return 
  }
  
  


  //check if there is an empty space around
  //might include looping through to see if 

}