import React, { Component } from 'react';
import './Today.css';

class Today extends Component {
    state = {  }
    render() { 
        let today = this.props.today;
        let iconURL = `http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`;
        return ( 
        <div className="today">
            <span className="today__date">{today.dt_txt}</span>
            <img src={iconURL} className="today__img" alt=""/>
            <span className="today__temp">{today.main.temp}</span>
        </div>
        );
    }
}
 
export default Today;