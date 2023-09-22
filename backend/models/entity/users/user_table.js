module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user_details', {
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        EmailId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        IsAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        },
            
    },{
        timestamps: false,
    });

    return User;
}