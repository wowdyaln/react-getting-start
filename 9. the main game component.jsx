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
  return(
    <div className="col-2">
      <button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>
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
   numberOfStars: 1 + Math.floor(Math.random() * 9)  // state 可以每次隨機生成
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

  unselectNum = (num) => {
      this.setState( prevState => ({
        selectedNumbers: prevState.selectedNumbers.filter( ele => ele !== num)
      }))
  }

  render(){
    const { selectedNumbers, numberOfStars} = this.state 
    return(
      <div className="container">
        <h3>play nine</h3>
        <hr/>
        <div className="row">
          <Stars numberOfStars = {numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}/>
          <Answer selectedNumbers={selectedNumbers}
                  unselectNum = {this.unselectNum}/>
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers}
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


