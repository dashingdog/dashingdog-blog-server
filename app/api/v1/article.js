import { LinRouter, disableLoading } from 'lin-mizar';
import {
  CreateOrUpdateArticleValidator,
  GetArticlesValidator,
  SetPublicValidator,
  SetStarValidator
} from '../../validator/article';
import {
  groupRequired } from '../../middleware/jwt';
import { PositiveIdValidator } from '../../validator/common';

import { ArticleDao } from '../../dao/article';
import { logger } from '../../middleware/logger';
const { CommentDao } = require('../../dao/comment');

const articleApi = new LinRouter({
  prefix: '/v1/article',
  module: '文章'
});

const ArticleDto = new ArticleDao();
const CommentDto = new CommentDao();

// 创建文章
articleApi.linPost('createArtic', '/', articleApi.permission('发布文章'),
  groupRequired, logger('发布了新文章'), async (ctx) => {
    const v = await new CreateOrUpdateArticleValidator().validate(ctx);
    await ArticleDto.createArticle(v);
    ctx.success({ message: '新建文章成功' });
  });

// 更新文章
articleApi.linPut('updateArtic', '/', articleApi.permission('更新文章'),
  groupRequired, logger('更新了文章'), async (ctx) => {
    const v = await new CreateOrUpdateArticleValidator().validate(ctx);
    await ArticleDto.updateArticle(v);
    ctx.success({ message: '更新文章成功' });
  });

// 获取文章详情
articleApi.get('/', async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const article = await ArticleDto.getArticle(v.get('query.id'));

  ctx.body = article;
});

// 获取文章内容
articleApi.get('/content', async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const content = await ArticleDto.getContent(v.get('query.id'));

  ctx.body = content;
});

// 管理后台 获取全部文章
articleApi.get('/articles', async (ctx) => {
  const v = await new GetArticlesValidator().validate(ctx);

  const result = await ArticleDto.getArticles(v);
  ctx.body = result;
});

// 删除某篇文章，需要最高权限
articleApi.linDelete('deleteArticle', '/:id', articleApi.permission('删除文章'),
  groupRequired, async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await ArticleDto.deleteArticle(id);
    ctx.success({ message: '删除文章成功' });
  });

// 设置某篇文章为 公开 或 私密
articleApi.put('/public', async (ctx) => {
  const v = await new SetPublicValidator().validate(ctx);
  const id = v.get('query.id');
  const publicId = v.get('body.publicId');

  await ArticleDto.updateArticlePublic(id, publicId);
  ctx.success({ message: `设为${publicId === 1 ? '公开' : '私密'}成功` });
});

// 设置某篇文章为 精选 或 非精选
articleApi.put('/star', async (ctx) => {
  const v = await new SetStarValidator().validate(ctx);
  const id = v.get('query.id');
  const starId = v.get('body.starId');

  await ArticleDto.updateArticleStar(id, starId);
  ctx.success({ message: `设为${starId === 2 ? '精选' : '非精选'}成功` });
});

// 获取文章下的全部评论
articleApi.get('/get/comment', async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx, {
    id: 'articleId'
  });
  const articleId = v.get('query.articleId');
  const comments = await CommentDto.getComments(articleId);
  ctx.body = comments;
});

// 删除某条评论 需要最高权限
articleApi.linDelete('deleteComment', '/del/comment/:id', articleApi.permission('删除评论'),
  groupRequired, async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await CommentDto.deleteComment(id);
    ctx.success({ message: '删除评论成功' });
  });

module.exports = { articleApi, [disableLoading]: false };