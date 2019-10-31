import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, configure, action, decorate, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store{
 user;

 getUser(){
  fetch('https://randomuser.me/api/')
  .then(res => res.json())
  .then(json => {
    if(json.results) {
      //this.setUser(json.results);
      runInAction(() => {
        this.user = json.results[0];
      })
    }
  })
}

setUser(results) {
this.user = results[0];
}
};

decorate(Store, {
  user: observable,
  getUser: action.bound,
  setUser: action
})

const store = new Store();

@observer class App extends Component {

  render() {
    const {store} = this.props;
    console.log(store)
    return (
      <div>
        <DevTools />
        <button onClick={store.getUser}>Get User</button>
        <h1>{store.user ? store.user.login.username : 'no current user'}</h1>
      </div>
    )
  }
}

ReactDOM.render(<App store={store}/>, document.getElementById('root'));