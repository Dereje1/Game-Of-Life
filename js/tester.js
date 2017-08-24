let test=true;
let boxSize = 100;
let activeBoard = simulator(boxSize)
let generations =0;
let timeCollection=[]
console.log(activeBoard)
while(activeBoard.length>0){
  if(!test){break;}
  generations++;
  var t0 = performance.now();
  activeBoard = findLiveCells(activeBoard,boxSize)
  if(generations!=1){timeCollection.push(performance.now() - t0)}
  if (generations > 100){break;}

}
if(timeCollection.length>0){
  let totalTime=timeCollection.reduce(function(sum,value){
    return sum+value;
  })
  console.log("Ave time = " + totalTime/timeCollection.length + " ms")
}
else{
  console.log("somethings wrong")
}
