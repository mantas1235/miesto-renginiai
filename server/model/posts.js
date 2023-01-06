import { DataTypes } from "sequelize";

const Posts = (sequelize) => {
  const Schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    }
  };

  return sequelize.define("posts", Schema);
};

export default Posts;
