module.exports = (sequelize, DataTypes) => {
    
    const Doc = sequelize.define('Doc', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
        },
        creator: {
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

    return Doc;
}