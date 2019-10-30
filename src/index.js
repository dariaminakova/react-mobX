import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed, configure, action } from 'mobx';
import { observer } from 'mobx-react';

configure ({enforceActions: 'observed'})

const nickName = observable ({
  firstName:'Piter',
  age: 23,

get nickName () {
  return `${this.firstName}${this.age}`;
},
increment (){this.age++},
decrement (){this.age--}
},{
  increment: action ('plus one'),
  decrement: action ('minus one')
},{name: 'nickNameObservableObj'});

// const todo = observable ([
//   {text: 'make a cup of coffe'},
//   {text: 'bring a glass of vine'}
// ])

@observer class Counter extends Component {

handleIncrement = () => {this.props.store.increment()}
handleDecrement = () => {this.props.store.decrement()}

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.nickName}</h1>
        <h1>{this.props.store.age}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
        {/* {todo.map((task) => <p key={task.text}>{task.text}</p>)} */}
      </div>
    );
  }
}

ReactDOM.render(<Counter store={nickName}/>, document.getElementById('root'));

// todo.push({text: 'make a cup of tea'})

serviceWorker.unregister();