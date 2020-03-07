import React, { Component } from 'react';
import styles from './PlayerListApp.module.css';
import { connect } from 'react-redux';

import { addPlayer, deletePlayer, starPlayer } from '../actions/PlayersActions';
import { PlayerList, AddPlayerInput, Pagination } from '../components';

import { PAGE_SIZE } from '../constants/Pagination'

class PlayerListApp extends Component {
  render() {
    const {
      playerlist: { playersById },
    } = this.props;

    const { page } = this.state

    const actions = {
      addPlayer: this.props.addPlayer,
      deletePlayer: this.props.deletePlayer,
      starPlayer: this.props.starPlayer,
    };

    return (
      <div className={styles.playerListApp}>
        <h1>NBA Players</h1>
        <AddPlayerInput addPlayer={actions.addPlayer} />
        <PlayerList players={playersById} actions={actions} />
        <Pagination page={page} pageSize={PAGE_SIZE} total={playersById.length}/>
      </div>
    );
  }

  constructor () {
    super();
    this.state = {
      page: 0
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  {
    addPlayer,
    deletePlayer,
    starPlayer,
  },
)(PlayerListApp);
