const { etudiants } = require("./models/FakeData");

exports.getEtudiants = (req, res) => {
    res.json(etudiants);
};