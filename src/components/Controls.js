import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../index.css'

@observer class Controls extends Component {
  render() {

    const {chooseOption, arrayOptions} = this.props;
    const options = arrayOptions.map((el) => <option key={el.val} value={el.val}>{el.name}</option>)

    return (
      <select className="country" onChange={chooseOption}>
        <option defaultValue>{this.props.default}</option>
        {options}
      </select>
    )
  }
}

export default Controls;