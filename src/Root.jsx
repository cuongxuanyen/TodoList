import React, { Component } from "react";
import SourceData from "../assets/continents.json";

class SearchBox extends Component {
  state = {
    value: "",
    sourceData: []
  };

  handleChange = e => {
    this.setState({
      sourceData: SourceData
    });
  };

  filterList = e => {
    const updatedList = this.state.sourceData.filter(item => {
      return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ sourceData: updatedList });
  };

  render() {
    const searchBox = (
      <input
        type="text"
        onClick={this.handleChange}
        onChange={this.filterList}
      />
    );
    const selectBox = this.state.sourceData.map(option => (
      <li key={option.continent}>{option.continent}</li>
    ));

    return (
      <React.Fragment>
        <h2>Step 1</h2>
        <h3>Select a continent.</h3>
        {searchBox}
        {selectBox && <ul>{selectBox}</ul>}
      </React.Fragment>
    );
  }
}

export default SearchBox;
