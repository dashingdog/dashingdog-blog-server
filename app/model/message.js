import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Message extends Model {
  toJSON () {
    let origin = {
      id: this.id,
      nickname: this.nickname,
      content: this.content,
      createTime: this.createTime
    };
    return origin;
  }
}

Message.init({
  nickname: {
    type: Sequelize.STRING(32)
  },
  content: {
    type: Sequelize.STRING(1023),
    allowNull: false
  }
}, merge(
  {
    sequelize,
    tableName: 'message',
    modelName: 'message'
  },
  InfoCrudMixin.options
));

module.exports = {
  Message
};
