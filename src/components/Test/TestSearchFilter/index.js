/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import TextField from '@mui/material/TextField';

import logo from '../../../assets/logo.png'
// import blankImg from "./blank.gif";

// import "./style.css";
// import "./flags.min.css";

import countriesList from "./countries.json";

class Test extends Component {
  state = {
    search: ""
  };

  renderCountry = country => {
    const { search } = this.state;
    var code = country.code.toLowerCase();

    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }*/

    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <div>
          <div>
            <p className="">
              <img
                src={logo}
                className="w-16"
                alt={country.name}
              />
            </p>
            <div title={country.name}>
              {country.name.substring(0, 15)}
              {country.name.length > 15 && "..."}
            </div>
          </div>
        </div>
      </div>
    );
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    const { search } = this.state;
    const filteredCountries = countriesList.filter(country => {
      return country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    return (
      <div className="flyout">
        <main style={{ marginTop: "4rem" }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <center>
                  <h3>
                    <a
                      href="https://www.youtube.com/watch?v=RM_nXOyHwN0"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch youtube demo here
                    </a>
                  </h3>
                </center>
              </div>
              <div className="col">
                <input
                  label="Search Country"
                  onChange={this.onchange}
                  placeholder="Search Country"
                />
              </div>
              <div className="col" />
            </div>
            <div className="row">
              {filteredCountries.map(country => {
                return this.renderCountry(country);
              })}
            </div>
          </div>
        </main>
        <div color="indigo">
          <p className="mb-0 footer-copyright">
            &copy; {new Date().getFullYear()} Copyright
          </p>
        </div>
      </div>
    );
  }
}

export default Test;
