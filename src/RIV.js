import React, { Component } from "react";
import "./RIV.css";

/*  Bootstrap */

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

export default class RIV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      subR: "",
      nextPic: 0,
      numOfImg: 100,
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
          const urlStr = JSON.stringify(rJ[i].data.url);
          console.log(urlStr);
          if (
            urlStr.endsWith('.jpg"') ||
            urlStr.endsWith('.png$"') ||
            urlStr.endsWith('.jpeg"') ||
            urlStr.endsWith('.gif"')
          ) {
            tmpArray.push(rJ[i].data.url);
          }
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

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.renderMyData(this.state.numOfImg);
    }
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
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Form inline>
            <FormControl
              name="subR"
              onChange={this.handleInputChange}
              onKeyDown={this._handleKeyDown}
              type="text"
              placeholder="Search Subreddit"
              className="mr-sm-2"
            />
            <Button
              onClick={() => this.renderMyData(this.state.numOfImg)}
              variant="success"
            >
              Search
            </Button>
          </Form>
        </Navbar>

        <CardColumns>
          {this.state.data ? (
            this.state.data.map(function (item, i) {
              return (
                <Card key={i}>
                  <Card.Img src={item} />
                </Card>
              );
            })
          ) : (
            <div>LOAD</div>
          )}
        </CardColumns>
      </div>
    );
  }
}
