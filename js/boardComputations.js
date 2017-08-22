function findLiveCells(alive,boxSize){
  var t0 = performance.now();

  //function returns new state of live cells on board
  let newState=[];
  //run grid till box size
  for(let i=0;i<boxSize;i++){
    for(let j=0;j<boxSize;j++){
      let cellId = i.toString()+"_"+j.toString();
      //find total liveNeighbours for each and every cell , even if dead
      //this is probably what is taxing the most computation time
      //look for improvements here!!
      let totalLiveNb = liveNeighbours(cellId,alive,boxSize)
      //if target cell is already alive
      if(alive.includes(cellId)){
        if (totalLiveNb === 2){newState.push(cellId)}
        if (totalLiveNb === 3){newState.push(cellId)}
      }
      else{//if it is dead
        if(totalLiveNb===3){
          newState.push(cellId)
        }
      }
    }
  }
  var t1 = performance.now();
  console.log("Took " + (t1 - t0) + " milliseconds.")
  return newState;
}

function liveNeighbours(cell,alive,boxSize){//finds live neighbours for a given cell
  let liveNeighbourCount=0;
  //first needs to find all 8 neighbours
  let allNeigbhours = possibleNeighbours(cell,boxSize)
  //then test to see if any of them are alive, if so send total count
  for (let i=0;i<alive.length;i++){
    if(!allNeigbhours.includes(alive[i])){continue;}
    else{liveNeighbourCount++;}
  }
  return liveNeighbourCount
}

function possibleNeighbours(cell,boxSize){
  //finds all potential neighbours for any given cell
  //box size is used for finding boundries to wrap around
  let cellCoordinates = cell.split("_");
  //convert to numbers
  cellCoordinates=cellCoordinates.map(function(u){
    return parseInt(u,10)
  })
  //all 8 neighbours
  let possibleNeighbours=[
    //top 3
    [cellCoordinates[0]-1,cellCoordinates[1]-1],
    [cellCoordinates[0]-1,cellCoordinates[1]],
    [cellCoordinates[0]-1,cellCoordinates[1]+1],
    //middle 2
    [cellCoordinates[0],cellCoordinates[1]-1],
    [cellCoordinates[0],cellCoordinates[1]+1],
    //bottom 3
    [cellCoordinates[0]+1,cellCoordinates[1]-1],
    [cellCoordinates[0]+1,cellCoordinates[1]],
    [cellCoordinates[0]+1,cellCoordinates[1]+1],
  ]
  //convert back to string and adjust for boundry conditions
  possibleNeighbours=possibleNeighbours.map(function(u){
    if (u[0]<0){u[0]=boxSize-1}
    if (u[1]<0){u[1]=boxSize-1}
    if (u[0]>(boxSize-1)){u[0]=0}
    if (u[1]>(boxSize-1)){u[1]=0}
    return (u[0].toString()+"_"+u[1].toString())
  })
  return possibleNeighbours;
}

function simulator(param){
  //places a random set of alive cells
  let newState=[]
  //use all cells of board
  let areaCovered = Math.pow(param,2)
  for (let i=0;i<areaCovered;i++){
    let y = Math.floor(Math.random() * param)
    let x = Math.floor(Math.random() * param)
    let stringCoords = y.toString()+"_"+x.toString()
    if(!newState.includes(stringCoords)){
      newState.push(stringCoords)
    }
  }
 return newState;
}
