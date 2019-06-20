const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const favoriteController = require("../controllers/favoriteController");
const userController = require("../controllers/userController");
// Get all products
router.get("/items", itemController.getAll, (req, res) => {
  return res.status(200).json(res.locals.items);
});

router.post("/items", itemController.add, (req, res) => {
  return res.status(200).send("added item !");
});

router.get("/favorites/:user_id", favoriteController.getAll, (req, res) => {
  return res.status(200).json(res.locals.favoriteItems);
});

router.post("/favorites", favoriteController.add, (req, res) => {
  return res.status(200).send("added favorite !");
});

//SEARCH FUTURE SEARCH FUTURE SEARCH FUTURE SEARCH FUTURE SEARCH FUTURE
router.post("/search", itemController.searchBy, (req, res) => {
  res.status(200).json(res.locals.search);
});
//SEARCH FUTURE END SEARCH FUTURE END SEARCH FUTURE END SEARCH FUTURE END

router.post("/signup", userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});

router.post("/login", userController.login, (req, res) => {
  return res.status(200).json(res.locals.logedIn);
});

//TODO
// // route for signing up
// router.get('/signup', productCtrl.getCategory, (req, res) => {
//   return res.status(200).json(res.locals.category);
// });

// // api route for logging in
// router.post('/login', productCtrl.updateInventory, (req, res) => {
//   return res.status(200).send(res.locals.success);
// });

module.exports = router;
