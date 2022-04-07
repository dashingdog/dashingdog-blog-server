import { LinValidator, Rule } from 'lin-mizar';

class CreateOrUpdateCategoryValidator extends LinValidator {
  constructor () {
    super();
    this.name = [
      new Rule('isLength', '分类名必须在1~64个字符之间', {
        min: 1,
        max: 64
      })
    ];
    this.cover = [
      new Rule('isOptional'),
      new Rule('isURL', '不符合URL规范')
    ];
    this.description = [
      new Rule('isLength', '分类描述必须在1~255个字符之间', {
        min: 1,
        max: 255
      })
    ];
  }
}

module.exports = {
  CreateOrUpdateCategoryValidator
};
