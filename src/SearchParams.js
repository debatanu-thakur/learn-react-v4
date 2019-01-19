import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleSubmit = () => {
    navigate("/");
  };
  render() {
    return <SearchBox search={this.handleSubmit} />;
  }
}

export default SearchParams;
