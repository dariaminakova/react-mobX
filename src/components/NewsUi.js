import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './components.css'

@observer class NewsUi extends Component {

  render() {
    const {news} = this.props;
    const showNews = news ? 
    news.map((n) => <div className='card'><img className='card-img' src={n.urlToImage} alt='news'/><h3>{n.title}</h3><p>{n.description}</p><hr/><a className='link' href={n.url}>READ MORE</a></div> ): 
    'HERE WILL BE YOUR NEWS' ;

    return (
      <div className='content-box'>
        {showNews}
      </div>
    )
  }
}

export default NewsUi;