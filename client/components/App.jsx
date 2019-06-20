import React from "react";
import UserPage from "./UserPage";
import MainContainer from "./MainContainer";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const mapStateToProps = store => ({
  onAddItemPage: store.items.onAddItemPage,
  onFavoritesPage: store.items.onFavoritesPage,
  userInfo: store.items.userInfo
});

function App({ onAddItemPage, onFavoritesPage, userInfo }) {
  return (
    <Router>
      <div id="router-wrapper">
        <div id="links">
          <Link to="/" className="link login-link">
            login
          </Link>
          <Link to="/home/" className="link home-link">
            home
          </Link>
        </div>
        <Route path="/" exact component={UserPage} />
        {/* <Route
          path="/"
          render={
            (props) => {
              <UserPage
                {...props}
              />
            }
          }
          /> */}
        <Route
          path="/home/"
          render={() => (
            <MainContainer 
            onAddItemPage={onAddItemPage} 
            onFavoritesPage={onFavoritesPage}
            userInfo={userInfo}
            />
          )}
        />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
