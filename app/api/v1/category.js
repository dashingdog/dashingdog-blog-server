import { LinRouter, disableLoading } from 'lin-mizar';
import { CreateOrUpdateCategoryValidator } from '../../validator/category';
import { PositiveIdValidator } from '../../validator/common';

import { CategoryDao } from '../../dao/category';

// book 的红图实例
const categoryApi = new LinRouter({
  prefix: '/v1/category',
  module: '标签'
});

// book 的dao 数据库访问层实例
const categoryDto = new CategoryDao();

// 获取所有分类
categoryApi.get('/categories', async (ctx) => {
  const categories = await categoryDto.getCategories();
  ctx.body = categories;
});

categoryApi.post('/', async (ctx) => {
  const v = await new CreateOrUpdateCategoryValidator().validate(ctx);
  await categoryDto.createCategory(v);
  ctx.success({ message: '新建分类成功' });
});

categoryApi.put('/:id', async (ctx) => {
  const v = await new CreateOrUpdateCategoryValidator().validate(ctx);
  const id = v.get('path.id');
  await categoryDto.updateCategory(v, id);
  ctx.success({ message: '更新分类成功' });
});

// 删除分类 需要最高权限才能删除分诶
categoryApi.linDelete(
  'deleteCategory',
  '/:id',
  categoryApi.permission('删除分类'),
  async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await categoryDto.deleteCategory(id);
    ctx.success({ message: '删除分类成功' });
  }
);

module.exports = { categoryApi, [disableLoading]: false };
