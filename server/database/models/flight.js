'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define('Flight', {
    name: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    time: DataTypes.DATE,
    price: DataTypes.INTEGER,
  }, {});
  Flight.associate = function(models) {
    // associations can be defined here
  };
  return Flight;
};