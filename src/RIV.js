import React, { Component } from "react";
import "./RIV.css";

/*  Bootstrap */

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export default class RIV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      subR: "",
      nextPic: 0,
    };
  }

  // componentDidMount() {
  //   this.renderMyData();
  // }

  renderMyData = (lim) => {
    var url = new URL(`https://www.reddit.com/r/${this.state.subR}/.json`),
      params = { limit: lim };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let tmpArray = [];
        let rJ = responseJson.data.children;
        for (var i = 0; i < rJ.length; i++) {
          tmpArray.push(rJ[i].data.url);
        }
        //DELETE NEXTPIC, FOR TESTING PURPOSES ONLY
        this.setState({ data: tmpArray, nextPic: 0 });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  //Change index of array containing pictures so the next or the previous image is accessed, via adding/subtracting 1
  handlePicChange = (addV) => {
    this.setState({
      nextPic: this.state.nextPic + addV,
    });
  };

  render() {
    return (
      // <div className="wrapper">
      //   <span className="topNav" onClick={() => this.renderMyData(100)}>
      //     Search
      //   </span>
      //   <input
      //     className="topNav"
      //     type="text"
      //     name="subR"
      //     onChange={this.handleInputChange}
      //   />

      //   {this.state.data ? (
      //     <div className="container">
      //       <img
      //         className="img-fluid"
      //         src={this.state.data[this.state.nextPic]}
      //         alt=""
      //       />
      //     </div>
      //   ) : (
      //     <div>LOAD</div>
      //   )}
      //   <div className="botNavCont">
      //     <span className="botNav" onClick={() => this.handlePicChange(-1)}>
      //       Previous
      //     </span>
      //     <span className="botNav" onClick={() => this.handlePicChange(1)}>
      //       Next
      //     </span>
      //   </div>
      // </div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar>
    );
  }
}
