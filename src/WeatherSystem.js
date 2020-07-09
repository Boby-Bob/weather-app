import React, { Component } from 'react';
import axios from 'axios';

import "./WeatherSystem.css";

import Period from "./Period";
import CityForm from "./CityForm";
class WeatherSystem extends Component {
    state = {
        periods: [],
        cities: ["Lens"]
     }
     
    componentDidMount() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cities}&lang=fr&units=metric&appid=8c3a54c385c9c9d874d88f2cd6b3dda8`)
        .then(res => {
            console.log(res.data);
            this.setState({
                periods: res.data.list
            })
        })
    }

    render() { 
        let periodsList = this.state.periods
        .slice(0,8)
        .map(period => {
            return <Period period={period} />
        })

        let cityList = this.state.cities.map(city => {
            return <CityForm city={city} />
        });
        console.log(cityList);

        return ( 
            <div className="weathersystem">
                {periodsList}
            </div>
         );
    }
}
 
export default WeatherSystem;