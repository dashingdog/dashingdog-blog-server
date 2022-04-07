import { NotFound } from 'lin-mizar';
import { Comment } from '../model/comment';
import { Article } from '../model/article';
class CommentDao {
  async createComment (v, articleId) {
    const article = await Article.findByPk(articleId);
    if (!article) {
      throw new NotFound({
        msg: '没有找到相关文章'
      });
    }
    const comment = await Comment.create({
      nickname: v.get('body.nickname'),
      content: v.get('body.content'),
      email: v.get('body.email'),
      website: v.get('body.website'),
      article_id: articleId
    });
    return comment;
  }

  async getComments (articleId) {
    let comments = await Comment.findAll({
      where: {
        article_id: articleId
      },
      order: [
        ['create_time', 'DESC']
      ],
      attributes: { exclude: ['article_id', 'ArticleId'] }
    });
    comments.forEach(v => {
      v.setDataValue('created_date', v.create_time);
    });
    return comments;
  }

  async deleteComment (id) {
    const comment = await Comment.findOne({
      where: {
        id
      }
    });
    if (!comment) {
      throw new NotFound({
        msg: '没有找到相关评论'
      });
    }
    comment.destroy();
  }

  async likeComment (id) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new NotFound({
        msg: '没有找到相关评论'
      });
    }
    await comment.increment('like', { by: 1 });
  }

  async replyComment (v, articleId, parentId) {
    const article = await Article.findByPk(articleId);
    if (!article) {
      throw new NotFound({
        msg: '没有找到相关文章'
      });
    }
    const comment = await Comment.findByPk(parentId);
    if (!comment) {
      throw new NotFound({
        msg: '没有找到相关评论'
      });
    }
    const newComment = await Comment.create({
      parent_id: parentId,
      article_id: articleId,
      nickname: v.get('body.nickname'),
      content: v.get('body.content'),
      email: v.get('body.email'),
      website: v.get('body.website')
    });
    return newComment;
  }
}

export { CommentDao };
