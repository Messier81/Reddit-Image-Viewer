import React, { Component } from "react";
import "./RIV.css";

/*  Bootstrap */

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

export default class RIV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      subR: "",
      numOfImg: 5,
      afterStart: null,
      sigPic: 0,
      visible: false,
    };
  }

  renderMyData = (lim, afterStart) => {
    this.setState({ visible: false });
    var url = new URL(
      `https://www.reddit.com/r/${this.state.subR}/.json?limit=${lim}&after=${afterStart}`
    );
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let tmpArray = [];
        let rJ = responseJson.data.children;
        for (var i = 0; i < rJ.length; i++) {
          const urlStr = JSON.stringify(rJ[i].data.url);
          if (
            urlStr.endsWith('.jpg"') ||
            urlStr.endsWith('.png"') ||
            urlStr.endsWith('.jpeg"') ||
            urlStr.endsWith('.gif"')
          ) {
            tmpArray.push(rJ[i].data.url);
          }
        }
        if (tmpArray.length === 0) {
          if (this.state.sigPic > 5) {
            this.setState({ visible: true });
          } else {
            this.setState(
              {
                sigPic: this.state.sigPic + 1,
                afterStart: responseJson.data.after,
              },
              () => this._callRender()
            );
          }
        } else {
          this.setState({
            data: this.state.data ? this.state.data.concat(tmpArray) : tmpArray,
            afterStart: responseJson.data.after,
          });
        }
      })
      .catch((error) => {
        this.setState({ visible: true });
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

  _handleCommon = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({ subR: name }, () => this._callRender());
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this._newSearch();
    }
  };

  _callRender = () => {
    this.renderMyData(this.state.numOfImg, this.state.afterStart);
  };

  _newSearch = () => {
    this.setState(
      { data: null, numOfImg: 5, afterStart: null, sigPic: 0 },
      () => this._callRender()
    );
  };

  _newEmptySearch = () => {
    this.setState({ data: null, numOfImg: 5, afterStart: null, sigPic: 0 });
  };

  render() {
    const miscItems = [
      "pics",
      "funny",
      "aww",
      "OldSchoolCool",
      "memes",
      "AdviceAnimals",
      "wholesomememes",
      "TheWayWeWere",
    ];
    const artItems = [
      "Art",
      "UnusualArt",
      "Illustration",
      "Museum",
      "Calligraphy",
      "StreetArt",
      "Watercolor",
    ];
    const natItems = ["Outdoors", "gardening"];
    const aniItems = [
      "birdpics",
      "TinyUnits",
      "OceanCreatures",
      "WildlifePhotos",
    ];
    const tecItems = ["ProgrammerHumor", "homelab"];
    const phoItems = [
      "wildlifephotography",
      "photocritique",
      "itookapicture",
      "photographs",
    ];
    return (
      <div>
        <Navbar bg="light" expand="lg" sticky="top">
          <Navbar.Brand className="homeButton" onClick={this._newEmptySearch}>
            Home
          </Navbar.Brand>
          <Form inline>
            <FormControl
              name="subR"
              onChange={this.handleInputChange}
              onKeyDown={this._handleKeyDown}
              type="text"
              placeholder="Search Subreddit"
              className="mr-sm-2"
            />
            <Button onClick={this._newSearch} variant="success">
              Search
            </Button>
          </Form>
        </Navbar>
        {this.state.visible ? (
          <Alert variant="danger">
            No other significant image(s) exist in this subreddit. Please browse
            another subreddit.
          </Alert>
        ) : null}
        <Container fluid>
          {this.state.data ? (
            <Row>
              {this.state.data.map((item, i) => (
                <Col md={4} key={i}>
                  <Card.Img className="imageDisplay" src={item} />
                </Col>
              ))}
              <Col md={12}>
                <Button
                  variant="primary"
                  size="lg"
                  block
                  onClick={this._callRender}
                >
                  Load More
                </Button>
              </Col>
            </Row>
          ) : (
            <div>
              <div className="commonSubTitle">Common Subreddits</div>
              <Row className="listOfSubRs">
                <Col md={2}>
                  <ListGroup className="subRedListTopic">
                    <ListGroup.Item>Miscellaneous</ListGroup.Item>
                    {miscItems.map((item, i) => (
                      <ListGroup.Item
                        action
                        variant="light"
                        className="topics"
                        name={item}
                        key={i}
                        onClick={this._handleCommon}
                      >
                        /r/{item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={2}>
                  <ListGroup>
                    <ListGroup.Item className="subRedListTopic">
                      Artistic
                    </ListGroup.Item>
                    {artItems.map((item, i) => (
                      <ListGroup.Item
                        action
                        variant="light"
                        className="topics"
                        name={item}
                        key={i}
                        onClick={this._handleCommon}
                      >
                        /r/{item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={2}>
                  <ListGroup>
                    <ListGroup.Item className="subRedListTopic">
                      Natural
                    </ListGroup.Item>
                    {natItems.map((item, i) => (
                      <ListGroup.Item
                        action
                        variant="light"
                        className="topics"
                        name={item}
                        key={i}
                        onClick={this._handleCommon}
                      >
                        /r/{item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={2}>
                  <ListGroup>
                    <ListGroup.Item className="subRedListTopic">
                      Animals
                    </ListGroup.Item>
                    {aniItems.map((item, i) => (
                      <ListGroup.Item
                        action
                        variant="light"
                        className="topics"
                        name={item}
                        key={i}
                        onClick={this._handleCommon}
                      >
                        /r/{item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={2}>
                  <ListGroup>
                    <ListGroup.Item className="subRedListTopic">
                      Technology
                    </ListGroup.Item>
                    {tecItems.map((item, i) => (
                      <ListGroup.Item
                        action
                        variant="light"
                        className="topics"
                        name={item}
                        key={i}
                        onClick={this._handleCommon}
                      >
                        /r/{item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={2}>
                  <ListGroup>
                    <ListGroup.Item className="subRedListTopic">
                      Photography
                    </ListGroup.Item>
                    {phoItems.map((item, i) => (
                      <ListGroup.Item
                        action
                        variant="light"
                        className="topics"
                        name={item}
                        key={i}
                        onClick={this._handleCommon}
                      >
                        /r/{item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      </div>
    );
  }
}
