import { PositiveIdValidator, PaginateValidator } from './common';
import { LinValidator, Rule } from 'lin-mizar';
class CreateOrUpdateArticleValidator extends LinValidator {
  constructor () {
    super();
    this.validateTags = checkTags;
    this.validateAuthors = checkAuthors;
    this.title = [
      new Rule('isLength', '标题必须在1~64个字符之间', {
        min: 1,
        max: 64
      })
    ];
    this.content = [
      new Rule('isLength', '文章内容不能为空', {
        min: 1
      })
    ];
    this.cover = [
      new Rule('isOptional'),
      new Rule('isURL', '不符合URL规范')
    ];
    this.createdDate = new Rule('isNotEmpty', '创建时间不能为空');
    this.categoryId = [ new Rule('isInt', '分类ID需要是正整数', {
      min: 1
    })
    ],
    this.status = [
      new Rule('isInt', '文章状态需要为正整数', {
        min: 1
      })
    ],
    this.public = [
      new Rule('isInt', '文章公开需要为正整数', {
        min: 1
      })
    ];
    this.star = [
      new Rule('isInt', '文章精选需要为正整数', {
        min: 1
      })
    ];
  }
}

function checkTags (val) {
  let tags = val.body.tags;
  if (!tags) {
    throw new Error('tags是必须参数');
  }
  try {
    if (typeof tags === 'string') {
      tags = JSON.parse(tags);
    }
  } catch (error) {
    throw new Error('tags参数不合法');
  }
  if (!Array.isArray(tags)) {
    throw new Error('tags必须是元素都为正整数的数组');
  }
}

function checkAuthors (val) {
  let authors = val.body.authors;
  if (!authors) {
    throw new Error('authors是必须参数');
  }
  try {
    if (typeof tags === 'string') {
      authors = JSON.parse(authors);
    }
  } catch (error) {
    throw new Error('authors参数不合法');
  }
  if (!Array.isArray(authors)) {
    throw new Error('authors必须是元素都为正整数的数组');
  }
}

class GetArticlesValidator extends PaginateValidator {
  constructor () {
    super();
    this.categoryId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
    this.authorId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
    this.tagId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
    this.publicId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
    this.statusId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
    this.starId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
    this.search = [
      new Rule('isOptional'),
      new Rule('isLength', '关键词必须在1~10个字符之间', {
        min: 1,
        max: 10
      })
    ];
  }
}

class SearchArticlesValidator extends PaginateValidator {
  constructor () {
    super();
    this.search = [
      new Rule('isLength', '关键词必须在1~10个字符之间', {
        min: 1,
        max: 10
      })
    ];
  }
}

class SetPublicValidator extends PositiveIdValidator {
  constructor () {
    super();
    this.publicId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
  }
}

class SetStarValidator extends PositiveIdValidator {
  constructor () {
    super();
    this.starId = [
      new Rule('isInt', '需要是整数', {
        min: 0
      })
    ];
  }
}

class CreateCommentValidator extends PositiveIdValidator {
  constructor () {
    super();
    this.nickname = [
      new Rule('isLength',
        '昵称必须在1~32个字符之间', {
          min: 1,
          max: 32
        })
    ],
    this.content = [
      new Rule('isLength', '内容必须在1~1023个字符之间', {
        min: 1,
        max: 1023
      })
    ];
    this.email = [
      new Rule('isOptional'),
      new Rule('isEmail', '不符合Email规范')
    ];
    this.website = [
      new Rule('isOptional'),
      new Rule('isURL', '不符合URL规范')
    ];
  }
}

class ReplyCommentValidator extends CreateCommentValidator {
  constructor () {
    super();
    this.parentId = [
      new Rule('isInt', '需要是正整数', {
        min: 1
      })
    ];
  }
}

module.exports = {
  CreateOrUpdateArticleValidator,
  CreateCommentValidator,
  ReplyCommentValidator,
  GetArticlesValidator,
  SetPublicValidator,
  SetStarValidator,
  SearchArticlesValidator
};