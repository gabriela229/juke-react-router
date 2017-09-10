import React from "react";
import axios from "axios";
import Songs from "./Songs";
import AllAlbums from "./AllAlbums";

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
        <h4>{<AllAlbums albums={albums} />}</h4>
        <h4>SONGS {<Songs songs={songs} />}</h4>
      </div>
    );
  }
}
