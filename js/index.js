class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      alive:[],//array collects all live cell positions
      generations:0,//generation counter
      updateInterval:50,//set interval period
      elementSize:20//grid elements per board
    }
    //user click cell change
    this.manualCellChange=this.manualCellChange.bind(this)
  }
  componentDidMount(){
    //on mount set random cells
    this.setState({
        alive:simulator(this.state.elementSize)
      })
    //then start timer
    this.play();
  }
  componentWillUnmount(){
    //clear interval on unmount
    this.pause();
  }
  tick(){
    //callback function for set Interval, updates alive cells and total generations passed
    this.setState({
        alive:findLiveCells(this.state.alive,this.state.elementSize),
        generations:this.state.generations+1
      })
    //kill timer if board is empty
    if(this.state.alive.length===0){this.pause()}
  }
  manualCellChange(e,cellData){
    //use to turn on an off cells by user clicke
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
    //builds all cells
    let x=[],bcol;
    //find element width
    let elementWidth = (500/this.state.elementSize).toString()+"px"
    for (let i=0;i<this.state.elementSize;i++){
      for(let j=0;j<this.state.elementSize;j++){
          //construct id string cell coords
          let idConstruct = i.toString()+"_"+j.toString();
          //set color of cell if alive
          if(this.state.alive.includes(idConstruct)){bcol="#27bc20"}
          else{bcol="white"}
          //construct jsx and push
          x.push(   <span
                     id={idConstruct}
                     onClick={(e)=>this.manualCellChange(e,idConstruct)}
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
  //Control all Actions  sent from the panel below
  pause(){
    clearInterval(this.intervalId);
  }
  play(){
    this.intervalId = setInterval(this.tick.bind(this), this.state.updateInterval);
  }
  reset(){
    this.pause();
    this.setState({
        alive:simulator(this.state.elementSize),
        generations:0
      })
    this.play();
  }
  dump(){
    this.pause();
    this.setState({
        alive:[],
        generations:0
      })
  }
  speed(e){
    this.pause();
    //note callback to play on speedChange
    this.setState({updateInterval:parseInt(e,10)},this.play)
  }
  grid(e){
    this.pause();
    //note callback to play on grid change
    this.setState({
        alive:simulator(this.state.elementSize),
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
  //stateless child class control panel sends settings back to parent
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
    //play pause button tool bar
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
        <p className="cPanelHeader">{this.props.generations} Generations</p>
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
