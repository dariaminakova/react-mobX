import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { observable, configure, action, decorate, runInAction } from 'mobx';
import App from './App';

configure({ enforceActions: 'observed' });

class Store {
  apiUrl = 'http://newsapi.org/v2/top-headlines?';
  apiKey = '9c27b0f722b84da5a08312d2b125351b';
  country = '';
  category = '';
  q = '';
  news;

  getNews = () => {
    const url = this.apiUrl + 'country=' + this.country + '&apiKey=' + this.apiKey + '&category=' + this.category + '&q=' + this.q;
    return fetch(url)
      .then((response) => response.json())
      .then(res => runInAction(() => {this.news = res.articles;}))
      .catch((eror) => console.eror(eror))
  };
  updateCountry(value) {
    this.country = value;
  }
  updateCategory(value) {
    this.category = value;
  }

}

decorate(Store, {
  country: observable,
  category: observable,
  news: observable,
  updateCountry: action('Country selected'),
  updateCategory: action('Category selected'),
  getNews: action('Get news'),
  setUser: action('Set news')
})

const store = new Store();

ReactDOM.render(<App store={store} />, document.getElementById('root'));