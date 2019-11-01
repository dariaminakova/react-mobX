import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './components.css'

@observer class Card extends Component {

  render() {
  
    const {url, urlToImage, title, description} = this.props;

    return (
      <div className='card'>
        <img className='card-img' src={urlToImage} alt='news'/>
        <h3>{title}</h3>
        <p>{description}</p><hr/>
        <a className='link' href={url}>READ MORE</a>
      </div>
    )
  }
}

export default Card;