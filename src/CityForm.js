import React, { Component } from 'react';
import './CityForm.css';

class CityForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input class="form" type="text"placeholder="Entrez une ville" value={this.props.city} onChange={this.props.changeCity} />
                <input class="submit" type="submit" value="Valider" />
            </form>
        )
    }
}

export default CityForm;