import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
  store: store.items.searchBy
});

const mapDispatchToProps = dispatch => ({
  search_by: banana => dispatch(actions.search_by(banana)),
  search_byClick: s => dispatch(actions.search_byClick(s))
});

function Search({ search_by, search_byClick, store }) {
  return (
    <div>
      <input
        autoComplete="off"
        id="searchInput"
        placeholder="do u like searching"
        onChange={event => search_by(event.target.value)}
        type="text"
      />
      <button onClick={e => search_byClick(store)} id="searchBtn">
        Search
      </button>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
