const Items = require("../models/items");
const itemController = {};
///SEARCH FUTURE
itemController.searchBy = (req, res, next) => {
  Items.searchBy(req.body.item_name)
    .then(result => {
      res.locals.search = result.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};
////////////////SEARCH FUTURE END

/**
 * getAll - returns all Items
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 * @param next - Callback Function w signature (err, users)
 */
itemController.getAll = (req, res, next) => {
  Items.getAll()
    .then(result => {
      res.locals.items = result.rows;
      // returns an array with objects containing all fields in row:
      // user_id, item_name, description, pic_url, item_id
      next();
    })
    .catch(err => {
      return next(err);
    });
};

/**
 * adds an item to the DB and return all items.
 * @param req
 * @param res
 * @param next
 */
itemController.add = (req, res, next) => {
  Items.add(req.body.user_id, req.body.item_name, req.body.description)
    .then(result => {
      next();
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = itemController;
