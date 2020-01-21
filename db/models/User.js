module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      'User', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        role: {
          type: DataTypes.ENUM,
          values: ['admin', 'user', 'publisher'],
          defaultValue: 'user'
        },
        last_login: DataTypes.DATE
      }, {
        tableName: 'users',
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
      })
};
