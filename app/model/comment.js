import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Comment extends Model {

}

Comment.init({
  parent_id: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  nickname: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  content: {
    type: Sequelize.STRING(1023),
    allowNull: false
  },
  like: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(320),
    allowNull: true
  },
  website: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  article_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, merge(
  {
    sequelize,
    tableName: 'comment',
    modelName: 'comment'
  },
  InfoCrudMixin.options
));

module.exports = {
  Comment
};