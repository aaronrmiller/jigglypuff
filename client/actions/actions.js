import actionTypes from '../constants/actionTypes';

export const requestItems = () => ({
  type: actionTypes.REQUEST_ITEMS
});

export const receiveItems = json => ({
  type: actionTypes.RECEIVE_ITEMS,
  payload: json
});

/**
 * Dispatch this in case of receiving invalid data or the request fails
 * @param {*} err error object
 */
export const requestItemsFailure = err => ({
  type: actionTypes.REQUEST_ITEMS_FAILURE,
  payload: err
});

export const fetchItems = user_id => dispatch => {
  console.log('fetchItems');
  dispatch(requestItems());
  const promiseArr = [fetch('/api/items'), fetch(`/api/favorites/${user_id}`)];
  Promise.all(promiseArr) // need to build a promise arr bc doing two fetches
    .then(responses => {
      const parsingPromises = [];
      responses.forEach(res => {
        parsingPromises.push(res.json());
      });
      Promise.all(parsingPromises).then(parsedResponses => {
        // console.log('ok', parsedResponses);
        const favoritedItemIds = {};
        parsedResponses[1].forEach(item => {
          favoritedItemIds[item.item_id] = 1; // build obj to record which ids are favorites
          item.favoritedByUser = true; // mark the favorites as favorites so no button appears
        });
        parsedResponses[0].forEach(item => {
          // see if the current item matches the favorites
          if (favoritedItemIds[item.item_id]) {
            item.favoritedByUser = true;
          }
        });
        if (!isValidItems(parsedResponses))
          throw new Error('something went wrong in fetchItems');
        return dispatch(receiveItems(parsedResponses));
      });
    })
    .catch(err => dispatch(requestItemsFailure(err)));
};

export const updateItems = updatedItemList => ({
  type: actionTypes.UPDATE_ITEMS,
  payload: updatedItemList
});

function isValidItems(res) {
  return Array.isArray(res);
}

export const proceedToFavorites = () => ({
  type: actionTypes.PROCEED_TO_FAVORITES
});

export const exitFavorites = () => ({
  type: actionTypes.EXIT_FAVORITES
});

export const addToFavorites = (item, item_index) => ({
  type: actionTypes.ADD_TO_FAVORITES,
  payload: { item, item_index } // NEED TO ADD FETCH TO THIS !!!
});

//new action: formOnChange
export const formOnChange = event => ({
  type: actionTypes.FORM_ONCHANGE,
  payload: event
});

export const createAccount = userInfo => dispatch => {
  return fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log('testing getting here', res, res[0]);
      let { row } = res[0];
      // const username = row
      // const username = row.split`,`
      row = row.split`,`;
      const username = row[0].slice(1);
      const user_id = row[1].slice(0,-1);
      const userInfo = {
        username,
        user_id,
      }
      //"(asdfasdf,16)"}

      return dispatch(createAccountStore(userInfo));
    })
    .catch(err => console.error(err));

  // used to check route without async from above
  // return dispatch(createAccountStore(userInfo.userName));
};

export const createAccountStore = res => ({
  type: actionTypes.CREATE_ACCOUNT_STORE,
  payload: res
});

// export const acceptPurchase = resMsg => dispatch => {
//   dispatch(fetchProducts());
//   return dispatch({
//     type: types.ACCEPT_PURCHASE,
//     payload: resMsg
//   });
// };
export const search_by = banana => ({
  type: actionTypes.SEARCH_BY,
  payload: banana
});

export const search_byClick = searchBy => dispatch => {
  // console.log({ item_name: searchBy });
  return (
    fetch('/api/search/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ item_name: searchBy }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        // getting information from back en via res.send
        console.log(res);
        return dispatch(createCategory(res));
      })
      // handeling errors
      .catch(err => console.error(err))
  );
};

// send info to state
export const createCategory = res => ({
  type: actionTypes.SEARCH_BYCLICK,
  payload: res
});

// send login info

export const make_login = accInfo => dispatch => {
  return fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(accInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(res => {
      // console.log('heres the login result', res);
      if(res.length === 0){
        return dispatch(invalidU());
      } else {
        return dispatch(login(res[0]));
      }
      
    });
};

export const invalidU = () => ({
  type: actionTypes.INVALIDU,
})
export const login = res => ({
  type: actionTypes.LOGIN,
  payload: res
});


