module.exports=(sequelize, DataTypes)=>{
    var Token = sequelize.define("Token", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    });

    Token.associate = (models)=>{
        User.belongsToMany(models.User, {
            through: "user2game"
        });
        User.hasMany(models.Post, {
            onDelete: "cascade"
        })
    }

    return Token;
};