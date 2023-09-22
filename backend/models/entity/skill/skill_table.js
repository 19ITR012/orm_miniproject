module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define('skill_details', {
        SkillId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Skill_Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Skill_Category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Iscertified:{
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        }
          
    },{
        timestamps: false,
    });

    return Skill;
}