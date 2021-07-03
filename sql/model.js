const Sequelize = require('sequelize');

module.exports = {
    model: {

        id: {
            type: Sequelize.INTEGER,
            unique: true,
            primaryKey: true,
        },
        gameName: Sequelize.STRING,
        date: Sequelize.STRING,
        player1: Sequelize.STRING,
        player2: Sequelize.STRING,
        player3: Sequelize.STRING,
        player4: Sequelize.STRING,
        player5: Sequelize.STRING,
        player6: Sequelize.STRING,
        player7: Sequelize.STRING,
        player8: Sequelize.STRING,
        player9: Sequelize.STRING,
        player10: Sequelize.STRING,

    }
}