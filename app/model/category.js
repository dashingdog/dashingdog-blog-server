import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Category extends Model {

}

Category.init(
  {
    name: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    cover: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  },
  merge(
    {
      sequelize,
      tableName: 'category',
      modelName: 'category'
    },
    InfoCrudMixin.options
  )
);

export { Category };
