import React, { Component } from "react";
import axios from "axios";
import AllAlbums from "./AllAlbums";
import { Link } from "react-router-dom";

export default class StatefulAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/albums/")
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums });
      });
  }

  render() {
    const { albums } = this.state;

    return <AllAlbums albums={albums} />;
  }
}
