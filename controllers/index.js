const getIndex = (req, res) => {
  res.render(`index`, {pageName: `index`});
};

const getProfile = (req, res) => {
  res.render(`profile`, {pageName: `profile`});
};

const getNotifications = (req, res) => {
  res.render(`notifications`);
};

const getDocs = (req, res) => {
  res.render(`docs`, {pageName: `docs`});
};

const signin = (req, res) => {
  res.render(`signin`);
};

const signup = (req, res) => {
  res.render(`signup`);
};

module.exports = {
  getIndex,
  getProfile,
  getNotifications,
  getDocs,
  signin,
  signup
};
