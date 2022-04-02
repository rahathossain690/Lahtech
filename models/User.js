
module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('User', {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    // User.associate = (models => {
    //     User.hasMany(models.Submission, {
    //         foreignKey: 'username'
    //     })
    // })

    return User;
}