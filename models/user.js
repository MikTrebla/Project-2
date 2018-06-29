module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    screen_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "/img/default.png"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    routeName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  User.associate = models => {
    User.belongsToMany(models.Game, {
      through: "user2game"
    });
    User.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return User;
};
