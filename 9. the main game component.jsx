const Stars = (props)=> {
  return(
    <div className="col-5">
      {_.range(props.numberOfStars).map( ele => 
          <i key={ele} className="fa fa-star"></i>
        )}
    </div>
  )
}

const Button = (props)=> {
  let button  
  switch(props.answerIsCorrect){
    case true:
      button =
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check"></i>
        </button>
      break;
    case false:
      button =
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
      break;
    default:
      button =
        <button className="btn" 
        onClick={props.checkAnswer} 
        disabled={props.selectedNumbers.length === 0}>=</button>
      break;
  }
  return(
    <div className="col-2">
      {button}
    </div>
  )
}

const Answer = (props)=> {
  return(
    <div className="col-5">
      {
        props.selectedNumbers.map( (ele, i) => 
        <span key={i} onClick={()=> props.unselectNum(ele)}>{ele}</span>)
      }
    </div>
  )
}


const Numbers = (props) => {
  let numClassName = (num) => {
    if (props.usedNumbers.indexOf(num) >= 0) {
      return "used"
    }
    if (props.selectedNumbers.indexOf(num) >= 0) {
      return "selected"
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map( (ele, i)=> 
          <span key={i} className={numClassName(ele)} 
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
   numberOfStars: 1 + Math.floor(Math.random() * 9),  // state 可以每次隨機生成
   usedNumbers: [],
   answerIsCorrect: null,
  }

  selectNum = (num)=> {
    if (this.state.selectedNumbers.indexOf(num) >= 0 || 
        this.state.usedNumbers.indexOf(num) >= 0){
      return
    } else {
      this.setState( prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(num)
      }))
    }
  }

  unselectNum = (num) => {
      this.setState( prevState => ({
        selectedNumbers: prevState.selectedNumbers.filter( ele => ele !== num)
      }))
  }

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars ===
        prevState.selectedNumbers.reduce( (acc, n)=> acc + n, 0)
    }))
  }

  acceptAnswer = () => {
    this.setState( prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: 1 + Math.floor(Math.random() * 9)
    }))
  }

  render(){
    const { selectedNumbers,
            numberOfStars,
            usedNumbers,
            answerIsCorrect,
          } = this.state 
    return(
      <div className="container">
        <h3>play nine</h3>
        <hr/>
        <div className="row">
          <Stars numberOfStars = {numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
                  answerIsCorrect={answerIsCorrect}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}/>
          <Answer selectedNumbers={selectedNumbers}
                  unselectNum = {this.unselectNum}/>
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers}
                 selectNum={this.selectNum}
                 usedNumbers={usedNumbers}/>
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


