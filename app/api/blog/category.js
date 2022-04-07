import { LinRouter } from 'lin-mizar';
import { CategoryDao } from '../../dao/category';
import { PositiveIdValidator } from '../../validator/common';
const categoryApi = new LinRouter({
  prefix: '/v1/blog/category'
});

const CategoryDto = new CategoryDao();

// 获取所有分类
categoryApi.get('/categories', async (ctx) => {
  const categories = await CategoryDto.getCategories();
  ctx.body = categories;
});

// 获取分类详情
categoryApi.get('/', async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('query.id');
  const category = await CategoryDto.getCategory(id);
  ctx.body = category;
});

module.exports = { categoryApi };