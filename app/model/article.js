import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';
import { Comment } from './comment';
import { Category } from './category';
import { UserModel } from './user';
import { Tag } from './tag';
import { ArticleAuthor } from './articleAuthor';
import { ArticleTag } from './articleTag';
class Article extends Model {

}

Article.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    cover: {
      type: Sequelize.STRING(400),
      defaultValue: ''
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    created_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    public: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    like: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    star: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  merge(
    {
      sequelize,
      tableName: 'article',
      modelName: 'article'
    },
    InfoCrudMixin.options
  )
);

// 关联作者和评论
Article.hasMany(Comment, {
  as: 'comments',
  foreignKey: 'article_id',
  constraints: false
});

// 关联作者和分类
Article.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
  constraints: false
});

// 关联文章和作者
Article.belongsToMany(UserModel, {
  through: {
    model: ArticleAuthor,
    unique: false
  },
  foreignKey: 'article_id',
  constraints: false,
  as: 'authors'
});

UserModel.belongsToMany(Article, {
  through: {
    model: ArticleAuthor,
    unique: false
  },
  foreignKey: 'author_id',
  constraints: false
});

// 关联文章和标签
Article.belongsToMany(Tag, {
  through: {
    model: ArticleTag,
    unique: false
  },
  foreignKey: 'article_id',
  constraints: false,
  as: 'tags'
});

Tag.belongsToMany(Article, {
  through: {
    model: ArticleTag,
    unique: false
  },
  foreignKey: 'tag_id',
  constraints: false
});

export { Article };
