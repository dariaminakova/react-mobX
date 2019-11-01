import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
  devsList = [
    {name: 'Jack', sp: 10},
    {name: 'Mike', sp: 8},
    {name: 'Lion', sp: 12},
    {name: 'Sam', sp: 11},
    {name: 'Dean', sp: 7},
    {name: 'Cris', sp: 9}
  ];
  filter = '';

  get totalSum(){
    return this.devsList.reduce((sum, {sp}) => sum+= sp, 0)
  }

  get topDev(){
    const maxSp = Math.max(...this.devsList.map(({sp}) => sp));
    return this.devsList.find(({name, sp})=>{
       if(maxSp === sp){
         return name;
       }
     })
  };

  get goFilter(){
    const matches = new RegExp(this.filter, 'i');
    return this.devsList.filter(({name}) => !this.filter || matches.test(name) )

  }

  clearList(){
    this.devsList = [];
  };

  addNewDev(dev){
    this.devsList.push(dev);
  };
  setFilter(value){
    this.filter = value;
  }

}

decorate(Store, {
  devsList: observable,
  filter: observable,
  totalSum: computed,
  topDev: computed,
  goFilter: computed,
  clearList: action,
  addNewDev: action,
  setFilter: action
})

const RowList = ({data: {name, sp}}) => {
  return (
    <p>{name} {sp}</p>
  )
}

@observer class List extends Component {
  render(){
    const {store} = this.props;
    return (
    <>
      <div>
        {store.goFilter.map((dev, i) => <RowList key={i} data={dev} /> )}
      </div>
      <div>
        {store.topDev? store.topDev.name: ''}
      </div>
      <div>
        {store.totalSum}
      </div>
    </>
    )
  }
}

@observer class Controls extends Component {

  clearList = () => {this.props.store.clearList()}
  addDev = () => {
    const name = prompt('Enter name');
    const sp = parseInt(prompt('Enter sp'),10);
    this.props.store.addNewDev({name, sp})}
  filterDev = ({target: {value}}) => { this.props.store.setFilter(value)}

  render(){
    return (
      <div>
        <button onClick={this.clearList}>Clear</button>
        <button onClick={this.addDev} >Add new dev</button>
        <input value={this.props.store.filter} onChange={this.filterDev} placeholder='find dev' />
      </div>
    )
  }
}

const appstore = new Store();

class App extends Component {
  render() {
    return (
      <div>
        <DevTools/>
        <Controls store={appstore}/>
        <List store={appstore}/>
      </div>
    )
  }
}

ReactDOM.render(<App store={Store}/>, document.getElementById('root'));