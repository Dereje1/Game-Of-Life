class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      alive:[],
      elapsedTime:0,
      generations:0,
      updateInterval:50,
      elementSize:20
    }
    this.manualStateChange=this.manualStateChange.bind(this)
  }
  componentDidMount(){
    console.log("Mounted")
    this.setState({
        alive:simulator(this.state.elementSize)
      })
    this.intervalId = setInterval(this.tick.bind(this), this.state.updateInterval);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  tick(){
    this.setState({
        alive:conway(this.state.alive,this.state.elementSize),
        elapsedTime:this.state.elapsedTime+=this.state.updateInterval,
        generations:this.state.generations+1
      })
    //if(this.state.generations>=100){clearInterval(this.intervalId)}
  }
  manualStateChange(e,cellData){
    //console.log(cellData)
    let x =this.state.alive.slice();
    if (x.includes(cellData)){
      x.splice(x.indexOf(cellData),1)
    }
    else{
      x.push(cellData)
    }
    this.setState({ alive:x})

  }

  elementbuilder(){
    let x=[],bcol;
    let elementWidth = (500/this.state.elementSize).toString()+"px"
    for (let i=0;i<this.state.elementSize;i++){
      for(let j=0;j<this.state.elementSize;j++){
          let idConstruct = i.toString()+"_"+j.toString();
          if(this.state.alive.includes(idConstruct)){bcol="#2f47fc"}
          else{bcol="white"}
          x.push(   <span
                     id={idConstruct}
                     onClick={(e)=>this.manualStateChange(e,idConstruct)}
                     className="Elemental"
                     style={{background: bcol,
                            width:elementWidth,
                            height:elementWidth,
                     }}
                     />
          )
      }
    }
    return x;
  }
  //Control Panel Actions below
  reset(){
    clearInterval(this.intervalId);
    this.setState({
        alive:simulator(this.state.elementSize),
        elapsedTime:0,
        generations:0
      })
    this.intervalId = setInterval(this.tick.bind(this), this.state.updateInterval);
  }
  pause(){
    clearInterval(this.intervalId);
  }
  play(){
    this.intervalId = setInterval(this.tick.bind(this), this.state.updateInterval);
  }
  dump(){
    clearInterval(this.intervalId);
    this.setState({
        alive:[],
        elapsedTime:0,
        generations:0
      })
  }
  render(){
    return(
      <div>
        <ControlPanel
          generations={this.state.generations}
          onReset = {()=>this.reset()}
          onPause = {()=>this.pause()}
          onPlay = {()=>this.play()}
          onDump = {()=>this.dump()}
        />
        <div id="elementHolder">{this.elementbuilder()}</div>
      </div>
    )
  }
}

class ControlPanel extends React.Component{
  constructor(props){
    super(props)
  }
  playPause(){
    let ButtonGroup = ReactBootstrap.ButtonGroup ;
    let Button = ReactBootstrap.Button ;
    return(
      <ButtonGroup>
        <Button onClick={this.props.onPlay}><i className="fa fa-play" aria-hidden="true"></i></Button>
        <Button onClick={this.props.onPause}><i className="fa fa-pause" aria-hidden="true"></i></Button>
        <Button onClick={this.props.onReset}><i className="fa fa-refresh" aria-hidden="true"></i></Button>
        <Button onClick={this.props.onDump}><i className="fa fa-trash" aria-hidden="true"></i></Button>
      </ButtonGroup>
    )
  }
  render(){
    return(
      <div id="BoardInfo">
        <h3>{this.props.generations}</h3>
        {this.playPause()}
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("app")
)
