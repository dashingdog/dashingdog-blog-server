import { LinRouter, disableLoading } from 'lin-mizar';
import { CreateOrUpdateTagValidator } from '../../validator/tag';
import { PositiveIdValidator } from '../../validator/common';
import { TagDao } from '../../dao/tag';
import {
  groupRequired } from '../../middleware/jwt';
// book 的红图实例
const tagApi = new LinRouter({
  prefix: '/v1/tag',
  module: '标签'
});

const tagDto = new TagDao();

// 获取所有标签
tagApi.get('/tags', async (ctx) => {
  const tags = await tagDto.getTags();
  ctx.body = tags;
});

tagApi.post('/', async (ctx) => {
  const v = await new CreateOrUpdateTagValidator().validate(ctx);
  await tagDto.createTag(v);
  ctx.success({ message: '新建标签成功' });
});

tagApi.put('/:id', async (ctx) => {
  const v = await new CreateOrUpdateTagValidator().validate(ctx);
  const id = v.get('path.id');
  await tagDto.updateTag(v, id);
  ctx.success({ message: '更新标签成功' });
});

// 删除标签 拥有权限才能删除标签
tagApi.linDelete(
  'deletetag',
  '/:id',
  tagApi.permission('删除标签'),
  groupRequired,
  async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await tagDto.deleteTag(id);
    ctx.success({ message: '删除标签成功' });
  }
);

module.exports = { tagApi, [disableLoading]: false };
