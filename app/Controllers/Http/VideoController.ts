import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios')

export default class VideoController {
  public async storeVideos(ctx: HttpContextContract) {
    const params = {
      key: '',
      channelId: 'UCuTaETsuCOkJ0H_GAztWt0Q',
      part: 'snippet',
      order: 'date',
      maxResults: '20',
    }
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params })
      return response.data
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  private async getVideos() {
    const params = {
      key: '',
      channelId: 'UCuTaETsuCOkJ0H_GAztWt0Q',
      part: 'snippet',
      order: 'date',
      maxResults: '20',
    }
    return axios
      .get('https://www.googleapis.com/youtube/v3/search', { params })
      .then((response) => {
        response.data
        console.log(response.data)
        console.log(response.data.url)
        console.log(response.data.explanation)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
