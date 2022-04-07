import { Message } from '../model/message';
class MessageDao {
  async createMessage (v) {
    const message = await Message.create({
      nickname: v.get('body.nickname'),
      content: v.get('body.content')
    });
    return message;
  }

  async getMessages (v) {
    const start = v.get('query.page');
    const pageCount = v.get('query.count');

    const { rows, count } = await Message.findAndCountAll({
      order: [
        ['id', 'DESC']
      ],
      offset: start * pageCount,
      limit: pageCount
    });
    return {
      rows,
      total: count
    };
  }
}

module.exports = {
  MessageDao
};