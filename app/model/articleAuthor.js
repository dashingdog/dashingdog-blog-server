import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class ArticleAuthor extends Model {

}

ArticleAuthor.init({
  article_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, merge(
  {
    sequelize,
    tableName: 'articleAuthor',
    modelName: 'articleAuthor'
  },
  InfoCrudMixin.options
));

module.exports = {
  ArticleAuthor
};