const Stars = (props)=> {
  // const numberOfStars = 1 + Math.floor(Math.random()*9)


  return(
    <div className="col-5">
      {_.range(props.numberOfStars).map( ele => 
          <i key={ele} className="fa fa-star"></i>
        )}
    </div>
  )
}

const Button = (props)=> {
  return(
    <div className="col-2">
      <button>=</button>
    </div>
  )
}

const Answer = (props)=> {
  

  return(
    <div className="col-5">
      {
        props.selectedNumbers.map( (ele, i) => 
        <span key={i}>{ele}</span>)
      }
    </div>
  )
}


const Numbers = (props) => {
  let selected = (num) => {
    if (props.selectedNumbers.indexOf(num) >= 0) {
      return "selected"
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map( (ele, i)=> 
          <span key={i} className={selected(ele)} 
                onClick={ ()=> props.selectNum(ele)}>
            {ele}
          </span>
        )}
      </div>
    </div>
  )
}
Numbers.list = _.range(1, 10)

class Game extends React.Component {
  state = {
   selectedNumbers: [],
   numberOfStars: 1 + Math.floor(Math.random() * 9)
  }

  selectNum = (num)=> {
    if (this.state.selectedNumbers.indexOf(num) >= 0){
      return
    } else {
      this.setState( prevState => ({
        selectedNumbers: prevState.selectedNumbers.concat(num)
      }))
    }
  }

  render(){
    return(
      <div className="container">
        <h3>play nine</h3>
        <hr/>
        <div className="row">
          <Stars numberOfStars = {this.state.numberOfStars}/>
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers}/>
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers}
                 selectNum={this.selectNum}/>
      </div>
    )
  }
}

class App extends React.Component {
  render(){
    return(
      <div>
        <Game />
      </div>
    )
  }
}

ReactDOM.render(<App /> ,mountNode)


