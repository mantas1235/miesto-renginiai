import { DataTypes, INTEGER } from "sequelize";

const Orders = (sequelize) => {
    const Schema = {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        event: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }

    return sequelize.define("orders", Schema)
}

export default Orders;