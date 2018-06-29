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

    Token.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Token.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    
      return Token;
    };