import { Uploader, config } from 'lin-mizar';
import { FileModel } from '../../model/file';
import path from 'path';
import { URL } from 'url';
import COS from 'cos-nodejs-sdk-v5';
class TencentUploader extends Uploader {
  constructor () {
    super();
    this.cos = new COS({
      SecretId: config.getItem('tencentCos.secretId'),
      SecretKey: config.getItem('tencentCos.secretKey')
    });
  }
  /**
   * 处理文件对象
   * { size, encoding, fieldname, filename, mimeType, data }
   */
  async upload (files) {
    const arr = [];
    for (const file of files) {
      // 由于stream的特性，当读取其中的数据时，它的buffer会被消费
      // 所以此处深拷贝一份计算md5值
      const md5 = this.generateMd5(file);
      // 检查md5存在
      const exist = await FileModel.findOne({
        where: {
          md5: md5
        }
      });
      if (exist) {
        arr.push({
          id: exist.id,
          key: file.fieldName,
          path: exist.path,
          url: exist.path,
          type: exist.type,
          name: exist.name,
          extension: exist.extension,
          size: exist.size
        });
      } else {
        const { realName } = this.getStorePath(
          file.filename
        );
        // const target = fs.createWriteStream(absolutePath);
        // await target.write(file.data);
        const ext = path.extname(realName);
        const { Location } = await this.corsPutObject(file, md5);
        const url = new URL('http://' + Location);
        const resourceDomain = config.getItem('resourceDomain');
        const resourceUrl = resourceDomain
          ? `${resourceDomain}${url.pathname}` : Location;
        const saved = await FileModel.createRecord(
          {
            path: resourceUrl,
            type: 'COS',
            name: realName,
            extension: ext,
            size: file.size,
            md5: md5
          },
          true
        );
        arr.push({
          id: saved.id,
          key: file.fieldName,
          path: resourceUrl,
          url: resourceUrl,
          type: saved.type,
          name: file.name,
          extension: saved.extension,
          size: saved.size
        });
      }
    }
    return arr;
  }

  corsPutObject (file, md5) {
    return new Promise((resolve, reject) => {
      this.cos.putObject(
        {
          Bucket: config.getItem('tencentCos.bucket') /* 必须 */,
          Region: config.getItem('tencentCos.region'),
          Key: file.filename /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file.data, // 上传文件对象
          onProgress: async function (progressData) {

          }
        },
        function (err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        }
      );
    });
  }
}

module.exports = { TencentUploader };
