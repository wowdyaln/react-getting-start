//running in https://jscomplete.com/repl/

const Card = (props)=> {
  return (
    <div style={{margin: '1em'}}>
      <img src="http://placehold.it/75" />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div>name: {props.name}</div>
        <div>address: {props.address}</div>
        <div>open_time: {props.open_time}</div>
      </div>
    </div>
  )
}

let data = [
  {
    "id": "000703fe-cf8a-43c8-bd83-c90cfd61915f",
    "name": "\u8702\u5de2\u5496\u5561",
    "city": "taipei",
    "wifi": 0,
    "seat": 3,
    "quiet": 2,
    "tasty": 5,
    "cheap": 4,
    "music": 2,
    "url": "https:\/\/www.facebook.com\/honeycombcafe2016\/",
    "address": "\u65b0\u5317\u5e02\u6c38\u548c\u5340\u6c38\u8c9e\u8def214\u865f",
    "latitude": "25.00409680",
    "longitude": "121.51528650",
    "limited_time": "no",
    "socket": "no",
    "standing_desk": "yes",
    "mrt": "",
    "open_time": ""
  },
  {
    "id": "0022fc3b-598f-4bb5-bb69-1b7d1b9b5202",
    "name": "The Kaffa Lovers",
    "city": "taipei",
    "wifi": 5,
    "seat": 5,
    "quiet": 5,
    "tasty": 5,
    "cheap": 4,
    "music": 5,
    "url": "https:\/\/www.facebook.com\/thekaffalovers\/?fref=ts",
    "address": "\u53f0\u5317\u5e02\u4e2d\u6b63\u5340\u91d1\u5c71\u5317\u8def3\u865f",
    "latitude": "25.04435400",
    "longitude": "121.53045590",
    "limited_time": "no",
    "socket": "maybe",
    "standing_desk": "yes",
    "mrt": "\u5fe0\u5b5d\u65b0\u751f",
    "open_time": "\u9031\u4e8c\u81f3\u9031\u4e94 10:00-19:00            \u516d\u65e509:00-19:00 "
  },
]

const CardList = (props)=> {
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  )
}

ReactDOM.render(<CardList cards={data}/>, mountNode)