import React, { Component } from 'react';
import "./Period.css";
import Moment from 'react-moment';

class Period extends Component {
    state = {  }
    render() { 
        let period = this.props.period;
        let iconURL = `http://openweathermap.org/img/wn/${period.weather[0].icon}@2x.png`;
        return ( 
        <div className="period">
            <span className="period__date"><Moment format="ddd" locale="fr">{period.dt_txt}</Moment></span>
            <img src={iconURL} className="period__img" alt=""/>
            <span className="period__temp">{period.main.temp.toFixed(0)} °C</span>
        </div>
        );
    }
}
 
export default Period;