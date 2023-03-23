import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bitacoras extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_bitacora: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tiempo_salida: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_salida: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    barco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'barcos',
        key: 'id_barco'
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'patrones',
        key: 'id_patron'
      }
    }
  }, {
    sequelize,
    tableName: 'bitacoras',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bitacoras_pkey",
        unique: true,
        fields: [
          { name: "id_bitacora" },
        ]
      },
    ]
  });
  }
}
