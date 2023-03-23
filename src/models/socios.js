import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class socios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_socio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    edad: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'socios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "socios_pkey",
        unique: true,
        fields: [
          { name: "id_socio" },
        ]
      },
    ]
  });
  }
}
