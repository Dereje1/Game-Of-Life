let tested=[];
function findLiveCells(alive,boxSize){
  //function returns new state of live cells on board
  tested=[]
  let newState=[];
  //run grid till box size
  for(let i=0;i<boxSize;i++){
    for(let j=0;j<boxSize;j++){
      let cellId = i.toString()+"_"+j.toString();
      tested.push(cellId)
      //find total liveNeighbours for each and every cell , even if dead
      //this is probably what is taxing the most computation time
      //look for improvements here!!
      let totalLiveNb = liveNeighbours(cellId,alive,boxSize)
      if((totalLiveNb>3)&&(totalLiveNb<2)){break;}
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
  console.log(tested.length)
  return newState;
}

function liveNeighbours(cell,alive,boxSize){//finds live neighbours for a given cell
    //first needs to find all 8 neighbours

    //then test to see if any of them are alive, if so send total count
    let filteredNeigbhours=possibleNeighbours(cell,boxSize).filter(function(z){
     if(alive.includes(z)){return z}
    })
    return filteredNeigbhours.length
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

    let transformArray = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
    let possibleNeighbours=[]
    while (transformArray.length > 0){
      let neighbour = cellCoordinates.map(function(current,idx){
        let transformed = current + transformArray[0][idx];
        if (transformed<0){return (boxSize-1)}
        else if (transformed>(boxSize-1)){return 0}
        else {return transformed}
      })
      possibleNeighbours.push(neighbour)
      transformArray.shift()
    }
  //convert back to string and adjust for boundry conditions
  possibleNeighbours=possibleNeighbours.map(function(u){
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
//-----new testing below
function findLiveCells2(alive,boxSize){
  //function returns new state of live cells on board
  let newState=[];

  //run grid till box size
  for(let i=0;i<boxSize;i++){
    for(let j=0;j<boxSize;j++){
      let cellName = [i,j]
      if(checkInclusion(cellName,newState)){break;}
      let totalLiveNb = liveNeighbours2(cellName,alive,boxSize)
      if((totalLiveNb>3)&&(totalLiveNb<2)){break;}
      for(let u=0; u<alive.length;u++){
        //if target cell is already alive
        if(checkInclusion(cellName,newState)){break;}
        if((alive[u][0]===i)&&(alive[u][1]===j)){
          if (totalLiveNb === 2){newState.push(cellName)}
          if (totalLiveNb === 3){newState.push(cellName)}
        }
        else{//if it is dead
          if(totalLiveNb===3){ newState.push(cellName)}
        }
      }
    }
  }
  //console.log(newState)
  return newState;
}
function checkInclusion(cell,newStateArr){
  for (let i=0; i<newStateArr.length;i++){
    if((cell[0]===newStateArr[i][0])&&(cell[1]===newStateArr[i][1])){
      return true;
    }
  }
  return false;
}
function liveNeighbours2(cell,alive,boxSize){//finds live neighbours for a given cell
  let liveNeighbourCount=0;
  //first needs to find all 8 neighbours
  let allNeigbhours = possibleNeighbours2(cell,boxSize)
  //then test to see if any of them are alive, if so send total count
    for(let j=0;j<allNeigbhours.length;j++){
      for (let i=0;i<alive.length;i++){
        if((allNeigbhours[j][0]===alive[i][0])&&(allNeigbhours[j][1]===alive[i][1])){
            liveNeighbourCount++;
            break;
        }
    }
  }
  return liveNeighbourCount
}

function possibleNeighbours2(cell,boxSize){

  cellCoordinates=cell.map(function(u){
    return parseInt(u,10)
  })

  let transformArray = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
  possibleNeighbours=[]
  while (transformArray.length > 0){
    let neighbour = cellCoordinates.map(function(current,idx){
      return (current + transformArray[0][idx])
    })
    if (neighbour[0]<0){neighbour[0]=boxSize-1}
    if (neighbour[1]<0){neighbour[1]=boxSize-1}
    if (neighbour[0]>(boxSize-1)){neighbour[0]=0}
    if (neighbour[1]>(boxSize-1)){neighbour[1]=0}
    possibleNeighbours.push(neighbour)
    transformArray.shift()
  }
  return possibleNeighbours;
}

function simulator2(param){
  //places a random set of alive cells
  let newState=[]
  let newStateNum=[]
  //use all cells of board
  let areaCovered = Math.pow(param,2)
  for (let i=0;i<areaCovered;i++){
    let y = Math.floor(Math.random() * param)
    let x = Math.floor(Math.random() * param)
    let stringCoords = y.toString()+"_"+x.toString()
    if(!newState.includes(stringCoords)){
      newState.push(stringCoords)
      newStateNum.push(stringCoords.split("_").map(function(u){
        return parseInt(u,10)
      }))
    }
  }
 return newStateNum;
}
