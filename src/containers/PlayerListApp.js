import React, { Component } from 'react';
import styles from './PlayerListApp.module.css';
import { connect } from 'react-redux';

import { addPlayer, deletePlayer, starPlayer } from '../actions/PlayersActions';
import { PlayerList, AddPlayerInput, Pagination } from '../components';

import { PAGE_SIZE } from '../constants/Pagination'

class PlayerListApp extends Component {
  render() {
    const { data, total } = this.getData()
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
        <PlayerList players={data} actions={actions} />
        <Pagination page={page} pageSize={PAGE_SIZE} total={total} onSetPage={this.setPage.bind(this)}/>
      </div>
    );
  }

  constructor (props) {
    super(props);
    this.state = {
      page: 1
    }
  }

  // 通过此方法获取列表数据
  getData () {
    let result = {}
    const { page } = this.state
    const { playerlist: { playersById } } = this.props;
    result.data = playersById.slice( (page - 1) * PAGE_SIZE , page * PAGE_SIZE)
    result.total = playersById.length
    return result
  }

  // 修改page属性的值
  setPage (val) {
    this.setState({
      page: val
    })
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
