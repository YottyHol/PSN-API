import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const axios = require('axios')
import filter from '../../../utils/filter'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database'

export default class VideoController {
  public async storeVideos(ctx: HttpContextContract) {
    let response
    let results = []
    const params = {
      key: Env.get('APP_KEY'),
      channelId: '',
      part: 'snippet',
      order: 'date',
      maxResults: '20',
      pageToken: '',
    }
    const channels = ['UCuTaETsuCOkJ0H_GAztWt0Q', 'UC_A--fhX5gea0i4UtpD99Gg']
    for (const channel of channels) {
      params.channelId = channel
      try {
        do {
          if (response) {
            params.pageToken = response.data.nextPageToken
          }
          response = await axios.get('https://www.googleapis.com/youtube/v3/search', { params })

          results = results.concat(response.data.items)
        } while (response.data.nextPageToken)
      } catch (error) {
        console.log(error)
      }
    }

    await Database.insertQuery().table('videos').returning(['id']).multiInsert(filter(results))
    //return 200
  }

  public async checkFilter(ctx: HttpContextContract) {}
}
