import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _barcos from  "./barcos.js";
import _bitacoras from  "./bitacoras.js";
import _patrones from  "./patrones.js";
import _socios from  "./socios.js";

export default function initModels(sequelize) {
  const barcos = _barcos.init(sequelize, DataTypes);
  const bitacoras = _bitacoras.init(sequelize, DataTypes);
  const patrones = _patrones.init(sequelize, DataTypes);
  const socios = _socios.init(sequelize, DataTypes);

  bitacoras.belongsTo(barcos, { as: "barco", foreignKey: "barco_id"});
  barcos.hasMany(bitacoras, { as: "bitacoras", foreignKey: "barco_id"});
  bitacoras.belongsTo(patrones, { as: "patron", foreignKey: "patron_id"});
  patrones.hasMany(bitacoras, { as: "bitacoras", foreignKey: "patron_id"});
  barcos.belongsTo(socios, { as: "socio", foreignKey: "socio_id"});
  socios.hasMany(barcos, { as: "barcos", foreignKey: "socio_id"});

  return {
    barcos,
    bitacoras,
    patrones,
    socios,
  };
}
