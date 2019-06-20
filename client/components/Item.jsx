import React, { Component } from 'react';

function Item(props) {
  console.log(props.items);
  let itemsArr = [];
  itemsArr = props.items.map((item, i) => (
    <div className="item" key={i}>
      <img src={`${item.pic_url}`} width="45%" height="45%" />
      <div className="text item-name">{item.item_name} </div>
      <div className="text">{item.description}</div>
      {item.favoritedByUser ? (
        <div className="has-been-favorited">😻</div>
      ) : (
        <button
          id="add-to-favorites"
          onClick={() => props.addToFavorites(item, i)}>
          add 2 favorites
        </button>
      )}
    </div>
  ));

  return <div id="catalog">{itemsArr}</div>;
}

export default Item;
