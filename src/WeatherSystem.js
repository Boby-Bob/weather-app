import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/fr';
import geolocated from "react-geolocated";
import Geocode from "react-geocode";


import "./WeatherSystem.css";

import Period from "./Period";
import CityForm from "./CityForm";

class WeatherSystem extends Component {
    state = {
        default: "",
        periods: [],
        city: CityForm,
        error: "",
        country: "",
        todayTemp: [],
        todayIcone: [],
        todayDate: [],
        todayDescription: ""
     }

    componentDidMount() {

        Geocode.setApiKey("AIzaSyCpgy1UJF3bTgAJAfld2lLmU31Jamr7IKI");

        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude, position.coords.longitude);
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                    (response) => {
                        const address = response.results[0].formatted_address;
                        console.log(address);
                        let cityLocation;
                        for (let i = 0; i < response.results[0].address_components.length; i++) {
                            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                                switch (response.results[0].address_components[i].types[j]) {
                                    case "locality":
                                        cityLocation = response.results[0].address_components[i].long_name;
                                        break;
                                }
                            }
                        }
                        this.setState({ city: cityLocation })
                        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&lang=fr&units=metric&appid=6eec445e25d0e2ae04cdd2ed239167fe`)
                        .then(res => {
                            console.log(res.data.list);
                            this.setState({
                                todayDate: res.data.list[0].dt_txt,
                                todayIcone: res.data.list[0].weather[0].icon,
                                todayTemp: res.data.list[0].main.temp.toFixed(0),
                                todayDescription: res.data.list[0].weather[0].description,
                                periods: res.data.list,
                                error: "",
                                country: res.data.city.country,
                                default: ""
                            })
                        })
                        console.log(this.state.city);    
                    },
                    (error) => {
                      console.error(error);
                    }
                );
              });
          } else {
            console.log("Not Available");
        }
    }

    changeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    getWeather = (e) => {
        e.preventDefault();
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&lang=fr&units=metric&appid=6eec445e25d0e2ae04cdd2ed239167fe`)
        .then(res => {
            console.log(res.data);
            this.setState({
                todayDate: res.data.list[0].dt_txt,
                todayIcone: res.data.list[0].weather[0].icon,
                todayTemp: res.data.list[0].main.temp,
                periods: res.data.list,
                error: "",
                country: res.data.city.country,
                default: ""

            })
        })
        .catch(err => {
            console.log('erreur');
            this.setState({
                error: "erreur"
            })
        })
    }

    render() { 
        let periodsList = this.state.periods
        .map(period => period.dt_txt.includes("12:00:00") ? <Period period={period} /> : "");

        if (this.state.error === "" && this.state.city != undefined) {
            return ( 
                <div className="weathersystem">
                    <div className="nav">
                        <CityForm city={this.state.city} 
                        changeCity={this.changeCity}
                        getWeather={this.getWeather}
                        />  
                    </div>
                    <div className="today">
                        <h2>Actuellement</h2>
                        <div className="content-today">
                            <img src={`http://openweathermap.org/img/wn/${this.state.todayIcone}@4x.png`} alt=""/>
                            <div className="text">
                                <h1>{this.state.city}</h1>
                                <p>Température: {this.state.todayTemp} °C</p>
                                <p>{this.state.todayDescription}</p>

                            </div>
                        </div>
                    </div>
                    <div className="content">
                        {periodsList}
                    </div>
                </div>
             );
        } else {
            return (
                <div className="weathersystem">   
                    <div class="nav">
                        <h1>Météo</h1> 
                        <h2>{this.state.city}</h2>
                        <CityForm city={this.state.city} 
                            changeCity={this.changeCity}
                            getWeather={this.getWeather}
                        />
                    </div>
                      
                    <h2>Entrez un nom de ville</h2>
                </div>
             );
        }

    }
}
 
export default WeatherSystem;