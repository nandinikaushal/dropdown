import React from 'react';
import ChildComponent from "../child/ChildComponent";
import './ParentStyle.css';

export default class ParentComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            accessGranted: false,
            countries: ['India', 'Singapore', 'China', 'America', 'Australia', 'Kenya', 'South Afirca', 'Iran', 'Canada']
        }
    }

    selectCountry = (country) => {
        alert(country);
    };

    addCountry = (country) => {
        const { countries } = this.state;
        const updatedCountryList = countries;
        updatedCountryList.push(country);
        this.setState({ countries: updatedCountryList });
    };

    grantAccess = () => {
        this.setState({ accessGranted: !this.state.accessGranted });
    };

    render() {
        return (
            <div className={"parentContainer"}>

                <ChildComponent
                    countries={this.state.countries}
                    count={3}
                    accessGranted={this.state.accessGranted}
                    selectCountry={this.selectCountry}
                    addCountry={this.addCountry} />

                <button onClick={() => { this.grantAccess() }} className={"accessButton"}>
                    {this.state.accessGranted ? "Add Privilegies Granted" : "Add Privilegies Revoked"}
                </button>
            </div>
        );
    }
}