import { PositiveIdValidator } from '../../validator/common';
import { LinRouter } from 'lin-mizar';
import { AuthorDao } from '../../dao/author';
const AuthorDto = new AuthorDao();

const authorApi = new LinRouter({
  prefix: '/v1/blog/author'
});

// 获取作者详情
authorApi.get('/detail', async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('query.id');

  const author = await AuthorDto.getAuthorDetail(id);
  ctx.body = author;
});

// 获取全部作者
authorApi.get('/authors', async (ctx) => {
  const authors = await AuthorDto.getAuthors();
  ctx.body = authors;
});

module.exports = authorApi;