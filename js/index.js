class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      board:[],
      elapsedTime:0,
      updateInterval:20
    }
    this.boardstate=this.boardstate.bind(this)
  }
  componentDidMount(){
    console.log("Mounted")
    this.intervalId = setInterval(this.testtimer.bind(this), this.state.updateInterval);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  testtimer(){
    this.boardstate(0,simulator())
    //console.log(this.state.elapsedTime)
    this.setState({elapsedTime:(this.state.elapsedTime+=this.state.updateInterval)})
    if(this.state.elapsedTime>20000){clearInterval(this.intervalId)}
  }
  boardstate(e,cellData){
    //console.log(cellData)
    let x =this.state.board.slice();
    if (x.includes(cellData)){
      x.splice(x.indexOf(cellData),1)
    }
    else{
      x.push(cellData)
    }
    this.setState({ board:x})

  }

  elementbuilder(){
    let x=[],bcol;

    for (let i=0;i<20;i++){
      for(let j=0;j<20;j++){
          let idConstruct = i.toString()+"_"+j.toString();
          if(this.state.board.includes(idConstruct)){bcol="blue"}
          else{bcol="white"}
          x.push(   <div
                     id={idConstruct}
                     onClick={(e)=>this.boardstate(e,idConstruct)}
                     className="Elemental"
                     style={{background: bcol}}
                     />
          )
      }
    }
    return x;
  }

  render(){
    return(
      <div id="elementHolder">
        {this.elementbuilder()}

      </div>
    )
  }
}

function simulator(){
  let y = Math.floor(Math.random() * 19) + 1
  let x = Math.floor(Math.random() * 19) + 1
  return(y.toString()+"_"+x.toString())
}

ReactDOM.render(
  <Main />,
  document.getElementById("app")
)
