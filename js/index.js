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
    if(this.state.alive.length===0){clearInterval(this.intervalId)}
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
  speed(e){
    this.pause();
    this.setState({updateInterval:parseInt(e,10)},this.play)
  }
  grid(e){
    clearInterval(this.intervalId);
    this.setState({
        alive:simulator(this.state.elementSize),
        elapsedTime:0,
        generations:0,
        elementSize:parseInt(e,10)
      },this.play)
  }
  render(){
    return(
      <div>
        <ControlPanel
          generations={this.state.generations}
          speed = {this.state.updateInterval}
          grid = {this.state.elementSize}
          onReset = {()=>this.reset()}
          onPause = {()=>this.pause()}
          onPlay = {()=>this.play()}
          onDump = {()=>this.dump()}
          onSpeed = {(e)=>this.speed(e)}
          onGrid = {(e)=>this.grid(e)}
          onRead = {()=>window.open('http://web.stanford.edu/~cdebs/GameOfLife/')}
        />
        <div id="elementHolder">{this.elementbuilder()}</div>
      </div>
    )
  }
}

class ControlPanel extends React.Component{
  constructor(props){
    super(props)
    this.speedChange=this.speedChange.bind(this)
    this.gridChange=this.gridChange.bind(this)
  }
  speedChange(e){
    this.props.onSpeed(e)
  }
  gridChange(e){
    this.props.onGrid(e)
  }
  playPause(){
    let ButtonGroup = ReactBootstrap.ButtonGroup ;
    let Button = ReactBootstrap.Button ;
    let OverlayTrigger = ReactBootstrap.OverlayTrigger ;
    let Tooltip = ReactBootstrap.Tooltip ;
    const tooltip1 = (<Tooltip id="tooltip"><strong>Reset Random Board</strong></Tooltip>);
    const tooltip2 = (<Tooltip id="tooltip"><strong>Clear Board</strong></Tooltip>);
    const tooltip3 = (<Tooltip id="tooltip"><strong>Learn More</strong></Tooltip>);
    return(
      <ButtonGroup>
        <Button onClick={this.props.onPlay}><i className="fa fa-play" aria-hidden="true"></i></Button>
        <Button onClick={this.props.onPause}><i className="fa fa-pause" aria-hidden="true"></i></Button>
        <OverlayTrigger placement="top" overlay={tooltip1}>
          <Button onClick={this.props.onReset}><i className="fa fa-refresh" aria-hidden="true"></i></Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip2}>
          <Button onClick={this.props.onDump}><i className="fa fa-trash" aria-hidden="true"></i></Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip3}>
          <Button onClick={this.props.onRead}><i className="fa fa-book" aria-hidden="true"></i></Button>
        </OverlayTrigger>
      </ButtonGroup>
    )
  }
  render(){
    let SplitButton = ReactBootstrap.SplitButton ;
    let MenuItem = ReactBootstrap.MenuItem ;
    let Well = ReactBootstrap.Well ;
    return(
      <div id="ControlPanel">
        <p className="cPanelHeader">Generations = {this.props.generations}</p>
        <Well>
            {this.playPause()}

          <SplitButton bsStyle="primary" title="Speed" dropdown pullLeft id="split-button-dropdown-pull-right" onSelect={this.speedChange}>
              <MenuItem eventKey="50">50 ms</MenuItem>
              <MenuItem eventKey="100">100 ms</MenuItem>
              <MenuItem eventKey="200">200 ms</MenuItem>
          </SplitButton>
          <SplitButton bsStyle="danger" title="Grid" dropdown pullLeft id="split-button-dropdown-pull-right" onSelect={this.gridChange}>
              <MenuItem eventKey="10">10 X 10</MenuItem>
              <MenuItem eventKey="20">20 X 20</MenuItem>
              <MenuItem eventKey="50">50 X 50</MenuItem>
              <MenuItem eventKey="60">60 X 60</MenuItem>
          </SplitButton>
          <p className="cPanelSummary">{"Update Speed = " +
              this.props.speed + "ms, Grid = " +
              this.props.grid + " X " + this.props.grid
              }
          </p>
        </Well>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("app")
)
