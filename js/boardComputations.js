function conway(alive,boxSize){
  let newState=[];
  for(let i=0;i<boxSize;i++){
    for(let j=0;j<boxSize;j++){
      let cellId = i.toString()+"_"+j.toString();
      let totalLiveNb = liveNeighbours(cellId,alive,boxSize)

      if(alive.includes(cellId)){
        if (totalLiveNb === 2){newState.push(cellId)}
        if (totalLiveNb === 3){newState.push(cellId)}
      }
      else{
        if(totalLiveNb===3){
          newState.push(cellId)
        }
      }
    }
  }

  return newState;
}

function liveNeighbours(cell,alive,boxSize){
  let liveNeighbourCount=0;
  let allNeigbhours = possibleNeighbours(cell,boxSize)
  for (let i=0;i<alive.length;i++){
    if(!allNeigbhours.includes(alive[i])){continue;}
    else{liveNeighbourCount++;}
  }
  return liveNeighbourCount
}

function possibleNeighbours(cell,boxSize){
  let cellCoordinates = cell.split("_");
  cellCoordinates=cellCoordinates.map(function(u){
    return parseInt(u,10)
  })
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
  let newState=[]
  let areaCovered = param*param
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
