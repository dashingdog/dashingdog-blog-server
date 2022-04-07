import { LinRouter } from 'lin-mizar';
import { BlogDao } from '../../dao/blog';

const blogApi = new LinRouter({
  prefix: '/v1/blog/blog'
});

const blogDto = new BlogDao();

// 获取友链
blogApi.get('/friend/friends', async (ctx) => {
  const friends = await blogDto.getFriends();
  ctx.body = friends;
});

module.exports = { blogApi };