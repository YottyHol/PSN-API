import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios')
import filter from '../../../utils/filter'
import Env from '@ioc:Adonis/Core/Env'

export default class VideoController {
  public async storeVideos(ctx: HttpContextContract) {
    let response
    let results = []
    const params = {
      key: Env.get('APP_KEY'),
      channelId: 'UCuTaETsuCOkJ0H_GAztWt0Q',
      part: 'snippet',
      order: 'date',
      maxResults: '20',
      pageToken: '',
    }
    try {
      //do {
      //  if (response) {
      //    params.pageToken = response.data.nextPageToken
      //   }
      response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params })
      results = results.concat(response.data.items)

      //} while (response.data.nextPageToken)
      return results
    } catch (error) {
      console.log(error)
    }
  }
  public async checkFilter(ctx: HttpContextContract) {
    filter()
    console.log(Env.get('APP_KEY'))
  }

  /*   private async getVideos() {
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
  } */
}
