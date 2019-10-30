import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
 devslist = [
  {name: 'Jack', sp: 10},
  {name: 'Mike', sp: 8},
  {name: 'Lion', sp: 12},
  {name: 'Sam', sp: 11},
  {name: 'Dean', sp: 7},
  {name: 'Cris', sp: 9}
 ];
 filter = '';

 get totalSum(){
   return this.devslist.reduce((sum, {sp}) => sum+= sp, 0);
 };
 get topPerf(){
  const maxSp = Math.max(...this.devslist.map(({sp}) => sp));
  return this.devslist.find(({sp, name})=>{
     if(maxSp === sp){
       return name;
     }
   })
  };

  get filteredDev (){
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.devslist.filter(({name}) => !this.filter || matchesFilter.test(name))
  };

  clearList(){
    this.devslist = [];
  };
  addDeveloper(dev){
    this.devslist.push(dev)
  };
  updateFilter(value){
    this.filter = value;
  }

}
decorate(Store, {
  devslist: observable,
  filter: observable,
  totalSum: computed,
  topPerf: computed,
  filteredDev: computed,
  clearList: action,
  addDeveloper: action,
  updateFilter: action
})

const appStore = new Store();

const Row = ({ data: { name, sp } }) => {
  return (
		<tr>
    	<td>{name}</td>
    	<td>{sp}</td>
  	</tr>
	);
};

@observer class Table extends Component {
  render() {
    const { store } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {store.filteredDev.map((dev, i) => <Row key={i} data={dev} />)}
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{store.totalSum}</td>
          </tr>
          <tr>
            <td>Top Performer:</td>
            <td>{store.topPerf ? store.topPerf.name : ''}</td>
          </tr>
        </tfoot>
      </table>
		);
  }
}

@observer class Controls extends Component {
  addDeveloper = () => {
    const name = prompt("The name:");
    const sp = parseInt(prompt("The story points:"), 10);
    this.props.store.addDeveloper({ name, sp });
  }

  clearList = () => { this.props.store.clearList(); }

  filterDevelopers = ({target: {value}}) => {
    this.props.store.updateFilter(value);
  }

  render() {
    return (
			<div className="controls">
      	<button onClick={this.clearList}>Clear table</button>
      	<button onClick={this.addDeveloper}>Add record</button>
        <input value={this.props.store.filter} onChange={this.filterDevelopers} />
    	</div>
		);
  }
}

class App extends Component {
  render() {
    return (
      <div>
				<DevTools />
        <h1>Sprint Board:</h1>
        <Controls store={appStore} />
        <Table store={appStore} />
      </div>
    )
  }
}

ReactDOM.render(<App store={Store} />, document.getElementById('root'));