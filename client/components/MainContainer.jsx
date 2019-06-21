import React from 'react';
import Header from './Header';
import MainDisplay from './MainDisplay';
import Footer from './Footer';
import FavoritesModal from './FavoritesModal';
import AddItemModal from './AddItemModal';

export default function MainContainer({ onFavoritesPage, onAddItemPage, userInfo }) {
  console.log('rerendered main container', userInfo);
  return (
    <div>
      <Header />
      <MainDisplay />
      <Footer />
      {onFavoritesPage && <FavoritesModal />}
      {onAddItemPage && <AddItemModal />}
    </div>
  );
}
