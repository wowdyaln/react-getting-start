const Stars = (props)=> {
  const numberOfStars = 1 + Math.floor(Math.random()*9)


  return(
    <div className="col-5">
      {_.range(numberOfStars).map( ele => 
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
        props.selectedNumber.map( (ele, i) => 
        <span key={i}>{ele}</span>)
      }
    </div>
  )
}


const Numbers = (props) => {
  let selected = (num) => {
    if (props.selectedNumber.indexOf(num) >= 0) {
      return "selected"
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map( (ele, i)=> 
          <span key={i} className={selected(ele)}>{ele}</span>
        )}
      </div>
    </div>
  )
}
Numbers.list = _.range(1, 10)

class Game extends React.Component {
  state = {
   selectedNumber: [2,4]
  }

  render(){
    return(
      <div className="container">
        <h3>play nine</h3>
        <hr/>
        <div className="row">
          <Stars />
          <Button />
          <Answer selectedNumber={this.state.selectedNumber}/>
        </div>
        <br />
        <Numbers selectedNumber={this.state.selectedNumber}/>
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


