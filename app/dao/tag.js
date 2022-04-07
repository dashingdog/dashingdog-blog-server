import { NotFound, Forbidden } from 'lin-mizar';
import { Tag } from '../model/tag';
import { ArticleTag } from '../model/articleTag';
class TagDao {
  async createTag (v) {
    const tag = await Tag.findOne({
      where: {
        name: v.get('body.name')
      }
    });
    if (tag) {
      throw new Forbidden({
        message: '标签已存在'
      });
    }
    const newTag = await Tag.create({
      name: v.get('body.name')
    });
    return newTag;
  }

  async getTag (id) {
    const tag = Tag.findOne({
      where: {
        id
      }
    });
    return tag;
  }

  async getTags () {
    const tags = Tag.findAll();
    return tags;
  }

  async updateTag (v, id) {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      throw new NotFound({
        message: '没有找到相关标签'
      });
    }
    tag.name = v.get('body.name');
    tag.save();
  }

  async deleteTag (id) {
    const tag = await Tag.findOne({
      where: {
        id
      }
    });
    if (!tag) {
      throw new NotFound({
        message: '没有找到相关标签'
      });
    }
    const result = await ArticleTag.findOne({
      where: {
        tag_id: id
      }
    });
    if (result) {
      throw new Forbidden({
        message: '该标签下有文章，禁止删除'
      });
    }
    tag.destroy();
  }
}

module.exports = {
  TagDao
};