// in https://jscomplete.com/repl/


class Button extends React.Component {
  handleClick = () => {
    this.props.onClickFun(this.props.step)
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        +{this.props.step}
      </button>
    )
  }
}

const Result = (props) => {
  return (
    <div>
      {props.num}
    </div>
  )
}


class App extends React.Component {
  state = { counter: 0 }

  incCount = (num) => {
    this.setState((prevState) => ({
      counter: prevState.counter + num
    }))
  }

  render() {
    return (
      <div>
        <Button step={1} onClickFun={this.incCount} />
        <Button step={5} onClickFun={this.incCount} />
        <Button step={10} onClickFun={this.incCount} />
        <Button step={100} onClickFun={this.incCount} />
        <Result num={this.state.counter} />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)
