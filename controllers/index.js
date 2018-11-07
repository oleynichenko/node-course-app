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

module.exports = {
  getIndex,
  getProfile,
  getNotifications,
  getDocs
};
