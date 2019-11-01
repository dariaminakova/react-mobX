import './index.css';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import NewsUi from './components/NewsUi';
import Controls from './components/Controls';

@observer class App extends Component {

  chooseCountry = ({ target: { value } }) => {
    this.props.store.updateCountry(value);
  }
  chooseCategory = ({ target: { value } }) => {
    this.props.store.updateCategory(value);
  }

  countries = [
    { val: "ua", name: "Ukraine" },
    { val: "us", name: "United States" },
    { val: "ru", name: "Russia" },
    { val: "ae", name: "United Arab Emirates" },
    { val: "br", name: "Brazil" },
    { val: "pt", name: "Portugal" },
    { val: "ve", name: "Venezuela" },
    { val: "sk", name: "Slovakia" },
    { val: "hu", name: "Hungary" }
  ]

  categories = [
    { val: "general", name: "General" },
    { val: "business", name: "Business" },
    { val: "technology", name: "Technology" },
    { val: "science", name: "Science" },
    { val: "sports", name: "Sports" },
    { val: "entertainment", name: "Entertainment" },
    { val: "health", name: "Health" }
  ]

  render() {
    const { store } = this.props;
    return (
      <div>
        <DevTools />
        <h1>Please choose your country and category</h1>
        <div className="controls">
          <div className='select-box'>
            <Controls chooseOption={this.chooseCountry}
              arrayOptions={this.countries}
              default='Choose your country' />
          </div>
          <div className='select-box'>
            <Controls chooseOption={this.chooseCategory}
              arrayOptions={this.categories}
              default='Choose your category' />
          </div>
        </div>
        <button onClick={store.getNews}>Get News</button>
        <NewsUi news={store.news} />
      </div>
    )
  }
}

export default App;