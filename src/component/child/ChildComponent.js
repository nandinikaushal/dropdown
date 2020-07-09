import React from 'react';
import './ChildStyles.css';
import downIcon from './../../assets/down.png';

export default class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: this.props.countries,
            showView: false,
            showMoreTextHidden: false,
            searchedText: undefined
        };
    }

    componentDidMount() {
        this.renderCountries();
    }

    renderCountries = () => {
        const { count, countries } = this.props;
        let visibleCountries = [];
        for (let i = 0; i < count; i++) {
            visibleCountries.push(countries[i]);
        }
        this.setState({ countries: visibleCountries });
    };

    searchCountry = searchedCountry => {
        let countryList = [];
        const { countries } = this.props;
        countryList = countries.filter(country => country.includes(searchedCountry));
        this.setState({ countries: countryList, searchedText: searchedCountry });
    };

    switchView = () => {
        this.setState({ showView: !this.state.showView });
    };

    countriesNotvisible = () => {
        const { count } = this.props;
        const notVisibleCount = this.props.countries.length - count;
        return notVisibleCount;
    };

    showMore = () => {
        this.setState({ countries: this.props.countries, showMoreTextHidden: true });
    };

    renderCountryList = () => {
        if (this.props.countries.length > 0) {
            return (
                this.state.countries.map((country, index) => {
                    return (
                        <span key={index} onClick={() => this.props.selectCountry(country)}> {country}</span>
                    )
                })
            );
        }
    };

    renderViewMore = () => {
        return (
            !this.state.showMoreTextHidden && this.props.countries.length > 0 ?
                <span className={"viewMore"} onClick={() => this.showMore()}> {`${this.countriesNotvisible()} more...`}</span > : null
        );
    };

    renderAddandSelectView = () => {
        if (this.state.searchedText && this.state.countries.length === 0 && this.props.accessGranted) {
            return (
                <div className={"addSelect"}>
                    <span className={"newCountry"}>{this.state.searchedText}</span>
                    <button className={"addCountryButton"} onClick={() => this.addCountry(this.state.searchedText)}>Add & Select</button>
                </div>
            );
        }
    };

    addCountry = country => {
        this.props.addCountry(country);
        this.renderCountries();
        this.setState({ searchedText: undefined });
    };

    render() {
        return (
            <div className={"mainContainer"}>
                <div className={"dropdownContainer"} onClick={() => this.switchView()}>
                    <span> Select a Location</span>
                    <img src={downIcon} className={"downIcon"} alt='' />
                </div>
                {
                    this.state.showView ? (
                        <>
                            <div className={"searchableContainer"}>
                                <input className={"searchInput"}
                                    type='text'
                                    placeholder="Search Country"
                                    onKeyUp={(e) => this.searchCountry(e.target.value)} />
                            </div>
                            <div className={"countryList"}>{this.renderCountryList()}</div>

                            {this.renderAddandSelectView()}
                            {this.renderViewMore()}
                        </>
                    )
                        : null
                }
            </div>
        );
    }
}