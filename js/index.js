class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      board:[]
    }
  }

  boardstate(cellData){
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
    let x=[];
    for (let i=0;i<10;i++){
      for(let j=0;j<10;j++){
          let idConstruct = i.toString()+j.toString();
          x.push(
            <Element elId={idConstruct} callBackToMain={(cellData)=>this.boardstate(cellData)}/>
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

class Grids extends React.Component{
  constructor(props){
    super(props)
    this.state={
      actives:[],
      bgColor:'white',
      cname:"Element"
    }
    this.elementbuilder=this.elementbuilder.bind(this)
    this.elementSelection=this.elementSelection.bind(this)
  }
  elementSelection(e){
    let currentSelection = e.target.id;
    let x =this.state.actives.slice();
    if (x.includes(currentSelection)){
      x.splice(x.indexOf(currentSelection),1)
      this.setState({ bgColor:'white',
                      cname: 'Element'
      })
    }
    else{
      x.push(currentSelection)
      this.setState({ bgColor:'blue',
                      cname: 'ElementColored'
      })
    }
    this.setState({ actives:x})
  }
  render(){
    return(
      <div>
        {this.elementbuilder()}
      </div>
    )
  }
}



class Element extends React.Component{
  constructor(props){
    super(props)
    this.state={
      active: false,
      bgcolor:function(){
        if (this.active){return "blue"}
        else{return "white"}
      }
    }
    this.elementClicked=this.elementClicked.bind(this)
  }
  elementClicked(e){
    this.props.callBackToMain(this.props.elId)
    if (!this.state.active){
      this.setState({active: true})
    }
    else{
      this.setState({active: false})
    }
  }
  render(){
    return (<div
            className="Elemental"
            onClick={(e)=>this.elementClicked(e)}
            style={{background: this.state.bgcolor()}}
            />)
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById("app")
)
