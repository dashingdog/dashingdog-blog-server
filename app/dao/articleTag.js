import { Op } from 'sequelize';
import { ArticleTag } from '../model/articleTag';
import { Tag } from '../model/tag';
// const { Author, ArticleAuthor } = require('@models')
class ArticleTagDao {
  async createArticleTag (articleId, tags, options = {}) {
    const arr = typeof tags === 'string' ? JSON.parse(tags) : tags;
    for (let i = 0; i < arr.length; i++) {
      await ArticleTag.create({
        article_id: articleId,
        tag_id: arr[i]
      }, { ...options });
    }
  }

  async getArticleTag (articleId) {
    const result = await ArticleTag.findAll({
      where: {
        article_id: articleId
      }
    });
    let ids = result.map(v => v.tag_id);
    const tags = await Tag.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    });
    return tags;
  }

  async getArticleIds (tagId) {
    const result = await ArticleTag.findAll({
      where: {
        tag_id: tagId
      }
    });
    return result.map(v => v.article_id);
  }

  async deleteArticleTag (articleId, tags = []) {
    const result = await ArticleTag.findAll({
      where: {
        article_id: articleId
      }
    });
    // 如果 id 相同则不再需要删除
    if (tags.length && result.map(v => v.tag_id).sort().join('') === tags.sort().join('')) {
      return false;
    } else {
      for (let i = 0; i < result.length; i++) {
        await result[i].destroy();
      }
      return true;
    }
  }
}

export {
  ArticleTagDao
};