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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/home/">Home</Link>
            </li>
          </ul>
        </nav>
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
