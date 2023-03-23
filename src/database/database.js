import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "club_nautico", // Nombre BD
    "postgres", // Usuario
    "1234", //Password
    {
        host: "localhost",
        port:"5432",
        dialect:"postgres"
    }
)