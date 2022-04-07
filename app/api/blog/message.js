import { LinRouter } from 'lin-mizar';
import { CreateMessageValidator } from '../../validator/message';
import { MessageDao } from '../../dao/message';
import { PaginateValidator } from '../../validator/common';
const MessageDto = new MessageDao();

const messageApi = new LinRouter({
  prefix: '/v1/blog/message'
});

// 创建留言
messageApi.post('/', async (ctx) => {
  const v = await new CreateMessageValidator().validate(ctx);
  await MessageDto.createMessage(v);
  ctx.success({ message: '新建留言成功' });
});

// 获取所有留言
messageApi.get('/messages', async (ctx) => {
  const v = await new PaginateValidator().validate(ctx);
  const { rows, total } = await MessageDto.getMessages(v);
  ctx.body = {
    collection: rows,
    total
  };
});

module.exports = messageApi;
