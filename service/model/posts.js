import { DataTypes } from "sequelize";

const Posts = (sequelize) => {
  const Schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    }
  };

  return sequelize.define("posts", Schema);
};

export default Posts;
