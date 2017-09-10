import React, { Component } from "react";
import SingleAlbum from "./SingleAlbum";
import Sidebar from "./Sidebar";
import Player from "./Player";
import AllArtists from "./AllArtists";
import SingleArtist from "./SingleArtist";
import StatefulAlbums from "./StatefulAlbums";
import { HashRouter, Route, Switch } from "react-router-dom";
import NoMatch from "./NoMatch";

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar deselectAlbum={this.deselectAlbum} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/" component={StatefulAlbums} />
              <Route exact path="/albums" render={() => <StatefulAlbums />} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Player />
        </div>
      </HashRouter>
    );
  }
}
