import cloudinary from "~/helper/cloundinary"
import Configuration from "~/models/configurationModal"

class ConfigService {
  async addConfig(data, file, creator) {
    const uploadImage = new Promise((res, rej) => {
      // Tạo một mảng bằng Promise từ việc tải lên từng tệp
      const uploadPromises = file.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(file.path, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result.secure_url)
            }
          })
        })
      })

      // Sử dụng Promise.all để đợi tất cả các Promise hoàn thành
      Promise.all(uploadPromises)
        .then((uploadUrls) => {
          res(uploadUrls)
        })
        .catch((err) => {
          rej(err)
        })
    })

    try {
      const uploadUrls = await uploadImage

      console.log("Uploaded URLs:", uploadUrls)
      console.log("data", data)
      const homepageSlider = uploadUrls.map((url, index) => {
        return {
          Id: Date.now() + index, // Sử dụng timestamp hiện tại và thêm index để tạo Id
          title: data.title[index],
          image_url: url,
          position: data.position[index],
          createAt: new Date().toISOString(),
          updateAt: new Date().toISOString(),
          createBy: creator,
        }
      })
      console.log(data)
      console.log(JSON.stringify(homepageSlider))
      const config = new Configuration()
      config.name = data.name
      config.homepage_slider = JSON.stringify(homepageSlider)
      config.contact_email = data.contact_email
      config.phone_number = data.phone_number
      await config.save()
      return config
    } catch (err) {
      console.error("Error uploading images:", err)
    }
  }
  async getAll(query) {
    const { page = 0, limit = 8 } = query
    const Config = await Configuration.find()
      .skip(page * limit)
      .limit(limit)
    return Config
  }
  async getConfig() {}
}
const configService = new ConfigService()

export default configService
