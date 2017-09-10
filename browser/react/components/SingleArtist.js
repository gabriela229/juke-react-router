import React from "react";
import axios from "axios";
import Songs from "./Songs";
import AllAlbums from "./AllAlbums";
import {Link, Route, NavLink} from "react-router-dom";


export default class SingleArtist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: {},
      albums: [],
      songs: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.artistId;

    Promise.all([
      axios.get(`/api/artists/${id}`),
      axios.get(`/api/artists/${id}/albums`),
      axios.get(`/api/artists/${id}/songs`)
    ]).then(([artist, albums, songs]) => {
      this.setState({
        artist: artist.data,
        albums: albums.data,
        songs: songs.data
      });
    });
  }

  render() {
    const { artist, albums, songs } = this.state;

    return (
      <div>
        <h3>{artist.name}</h3>
        <ul className="nav nav-tabs">
          <li><NavLink to={`/artists/${artist.id}/albums`} activeClassName="selected">ALBUMS</NavLink></li>
          <li><NavLink to={`/artists/${artist.id}/songs`} activeClassName="selected">SONGS</NavLink></li>
        </ul>
        <Route path='/artists/:artistId/albums' render={() =>
          <AllAlbums albums={albums} /> }/>
        <Route path='/artists/:artistId/songs' render={() =>
          <Songs songs={songs} /> }/>
        </div>
    );
  }
}
