window.onload = function() {
  const pieces = document.querySelectorAll('#puzzlearea div');
  const second = pieces[1];
  // console.log(pieces);

  //add the puzzlepiece class to divs
  pieces.forEach(p => p.classList.add('puzzlepiece'));
  
  //space them out
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

  //assign the pics




 
  // pieces.forEach( piece => {
  //   let txt = piece.textContent;
  //   if (txt < 5 ) {

  //   } else if (txt < 9) {
      
  //   } else if (txt < 13) {

  //   } else {

  //   }
  // });
  // for (j=0; j<5; j++) {
  //   for (i=0; i<300; i+=100) {
  //     console.log(j,i);
  //   }
  // }
    
  
  
  
  //break the picture up
}