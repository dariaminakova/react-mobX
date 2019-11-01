import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './components.css'
import Card from './Card';

@observer class NewsUi extends Component {

  render() {
    const {news} = this.props;
    const showNews = news.length ? 
    news.map((n) => <Card key={n.url} urlToImage={n.urlToImage} title={n.title} description={n.description} url={n.url} />) : 'HERE WILL BE YOUR NEWS';

    return <div className='content-box'>{showNews}</div>
  }
}

export default NewsUi;