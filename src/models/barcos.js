import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class barcos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_barco: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    matricula: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    amarre: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    cuota: {
      type: DataTypes.REAL,
      allowNull: false
    },
    socio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'socios',
        key: 'id_socio'
      }
    }
  }, {
    sequelize,
    tableName: 'barcos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "barcos_pkey",
        unique: true,
        fields: [
          { name: "id_barco" },
        ]
      },
    ]
  });
  }
}
