import { UserModel } from '../model/user';
import { NotFound, Forbidden } from 'lin-mizar';
import { Op } from 'sequelize';
class AuthorDao {
  // 创建友链
  async getAuthors () {
    const authors = await UserModel.findAll({
      where: {
        username: {
          [Op.ne]: 'root'
        }
      }
    });
    return authors;
  }

  async getAuthorDetail (id) {
    const author = await UserModel.findOne({
      where: {
        id
      }
    });
    return author;
  }
}

export {
  AuthorDao
};