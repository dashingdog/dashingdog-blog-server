import { LinRouter } from 'lin-mizar';
import { TagDao } from '../../dao/tag';
const TagDto = new TagDao();
const tagApi = new LinRouter({
  prefix: '/v1/blog/tag',
  module: '文章'
});
// book 的dao 数据库访问层实例

// 获取所有标签
tagApi.get('/tags', async (ctx) => {
  const tags = await TagDto.getTags();
  ctx.body = tags;
});

module.exports = { tagApi };