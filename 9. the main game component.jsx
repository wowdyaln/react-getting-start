let possibleCombinationSum = function (arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  let listSize = arr.length, combinationsCount = (1 << listSize)
  for (let i = 1; i < combinationsCount; i++) {
    let combinationSum = 0;
    for (let j = 0; j < listSize; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
        <button className="btn btn-secondary" 
        onClick={props.checkAnswer} 
        disabled={props.selectedNumbers.length === 0}>=</button>
      break;
  }
  return(
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm"
              onClick={props.redraw}
              disabled={props.redraws === 0}>
        <i className="fa fa-sync"></i> {props.redraws}
      </button>
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

const DoneFrame = (props) => {
  return(
    <div className="card text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-primary"
              onClick= {props.resetGame}
              >Play again</button>
    </div>
  )
}

class Game extends React.Component {

  static randomNum(){
    return 1 + Math.floor(Math.random() * 9)
  }

  static initialState(){
    return {
      selectedNumbers: [],
      numberOfStars: Game.randomNum(),  // state 可以每次隨機生成
      usedNumbers: [],
      answerIsCorrect: null,
      redraws: 5,
      doneStatus: null,
    }
  }
  // status
  state = Game.initialState()

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
      numberOfStars: Game.randomNum()
    }), this.updateDoneStatus)
  }

  redraw = () => {
    if (this.state.redraws === 0){return}
    this.setState(prevState => ({
      numberOfStars: Game.randomNum(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus)
  }

  // return true / false
  possibleSolutions = ({numberOfStars, usedNumbers})=> {
    const possibleNumbers = _.range(1,10).filter( num => {
      usedNumbers.indexOf(num) === -1
    })

    return possibleCombinationSum(possibleNumbers, numberOfStars)
  }

  updateDoneStatus = () => {
    this.setState( prevState => {
      if (prevState.usedNumbers.length === 9){
        return { doneStatus: 'Done. Good Job!'}
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over'}
      }
    })
  }

  resetGame = () => {
    this.setState(Game.initialState())
  }

  render(){
    const { selectedNumbers,
            numberOfStars,
            usedNumbers,
            answerIsCorrect,
            redraws,
            doneStatus,
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
                  acceptAnswer={this.acceptAnswer}
                  redraws={redraws}
                  redraw={this.redraw}/>
          <Answer selectedNumbers={selectedNumbers}
                  unselectNum = {this.unselectNum}/>
        </div>
        <br />
        {/* 以下語法很強大 if true ? : 直接寫在 return() 裡面  */}
        {doneStatus ? 
        <DoneFrame doneStatus={doneStatus}
                   resetGame={this.resetGame}/> :

        <Numbers selectedNumbers={selectedNumbers}
                selectNum={this.selectNum}
                usedNumbers={usedNumbers}/>
        }
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


