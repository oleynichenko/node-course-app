const getIndex = (req, res) => {
  res.render(`index`);
};

const getProfile = (req, res) => {
  res.render(`profile`);
};

const getNotifications = (req, res) => {
  res.render(`notifications`);
};

const getDocs = (req, res) => {
  res.render(`docs`);
};

module.exports = {
  getIndex,
  getProfile,
  getNotifications,
  getDocs
};
