import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class ArticleTag extends Model {

}

ArticleTag.init(
  {
    article_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  merge(
    {
      sequelize,
      tableName: 'articleTag',
      modelName: 'articleTag'
    },
    InfoCrudMixin.options
  )
);

export { ArticleTag };
