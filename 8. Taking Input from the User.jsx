//running in https://jscomplete.com/repl/

const Card = (props)=> {
  return (
    <div style={{margin: '1em'}}>
      <img width='75' src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  )
}





const CardList = (props)=> {
  return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  )
}

class Form extends React.Component {
  state = { userName: ''}

  handleSubmit = (event)=>{
    event.preventDefault()
    // console.log('evnet: Form submit', this.state.userName)
    axios.get(`https://api.github.com/users/${this.state.userName}`)
          .then(res => {
            this.props.onSubmit(res.data)
            this.setState({ userName: ''})
          })
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          value = {this.state.userName}
          onChange = {(event)=> this.setState({ userName: event.target.value })}
          placeholder="github username" required />
        <button type="submit">Add Card</button>
      </form>
    )
  }
}

class App extends React.Component{
  state = {
    cards: [
      {
        name: "Paul O’Shannessy",
        avatar_url: "https://avatars.githubusercontent.com/u/8445?v=3",
        company: "Facebook"
      },
      {
        name: "Ben Alpert",
        avatar_url: "https://avatars.githubusercontent.com/u/6820?v=3",
        company: "Facebook"
      },
    ]
  }

  addNewCard = (cardInfo)=> {
    this.setState( prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }))
  }

  render(){
    return(
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode)