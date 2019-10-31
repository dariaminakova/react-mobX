import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import NewsUi from './components/NewsUi';

configure({ enforceActions: 'observed' });

class Store{
    apiUrl = 'http://newsapi.org/v2/top-headlines?';
    apiKey = '9c27b0f722b84da5a08312d2b125351b';
    country = '';
    category = '';
    q = '';
    news;

    getNews = () => {
      const url = this.apiUrl + 'country=' + this.country + '&apiKey=' + this.apiKey +'&category=' + this.category +'&q=' + this.q;
      return fetch(url)
      .then((response) => response.json())
      .then(res => this.setUser(res.articles))
      .catch((eror) => console.eror(eror))
  };

  setUser = (articles) => {
    this.news = articles;
    console.log(articles)
  }
  updateCountry(value){
    this.country = value;
  }
  updateCategory(value){
    this.category = value;
  }

}

decorate(Store, {
  country: observable,
  category: observable,
  news: observable,
  updateCountry: action ('Country selected'),
  updateCategory: action ('Category selected'),
  getNews: action ('Get news'),
  setUser: action ('Set news')
})

const store = new Store();

@observer class App extends Component {

  chooseCountry = ({target: {value}}) => {
    this.props.store.updateCountry(value);
  }
  chooseCategory = ({target: {value}}) => {
    this.props.store.updateCategory(value);
  }

  render() {
    const {store} = this.props;
    console.log(store)
    return (
      <div>
        <DevTools />
        <h1>Please choose your country and category</h1>
        <div className="controls">
        <div className='select-box'>
            <select className="country" onChange={this.chooseCountry}>
                <option defaultValue>Choose your country</option>
                <option value="ua">Ukraine</option>
                <option value="us">United States</option>
                <option value="ve">Venezuela</option>
            </select>
        </div>
        <div className='select-box'>
            <select className="category" onChange={this.chooseCategory}>
                <option defaultValue>Choose your category</option>
                <option value="general">General</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
            </select>
        </div>
    </div> 
    <button onClick={store.getNews}>Get News</button>
        <NewsUi news={store.news}/>
  </div>
    )
  }
}

ReactDOM.render(<App store={store}/>, document.getElementById('root'));