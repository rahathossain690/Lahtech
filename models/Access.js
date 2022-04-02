module.exports = (sequelize, DataTypes) => {
    
    const Access = sequelize.define('Access', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        doc_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
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

    return Access;
}