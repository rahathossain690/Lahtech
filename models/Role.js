module.exports = (sequelize, DataTypes) => {
    
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })

    // Submission.associate = (models => {
    //     Submission.belongsTo(models.User, {
    //         foreignKey: 'username',
    //         onDelete: 'CASCADE'
    //     })

    //     Submission.belongsTo(models.Problem, {
    //         foreignKey: 'problem_id',
    //         onDelete: 'CASCADE'
    //     })
    // })

    return Role;
}