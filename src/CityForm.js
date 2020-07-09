import React, { Component } from 'react';
import WeatherSystem from './WeatherSystem';
class CityForm extends Component {
    state = {  }


    render() { 
        let city = this.props.cityList;
        console.log(city);
        return ( 
            <form action="">
                <input id="city_name" type="text" col="10" value={city}/>

                <input type="submit"></input>
            </form>
         );
    }
}
 
export default CityForm;
//- lorsque vous soumettez le formulaire, vous récupérez la ville.
//- Dans votre URL, vous spécifiez la nouvelle ville
//- Vous récupérez les infos et vous adaptez le periods