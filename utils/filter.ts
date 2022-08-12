import { readFileSync } from 'fs'
const file = './data/search_filter'
import moment from 'moment'

export default function filter(data) {
  var id = 0
  const contents = readFileSync(file, 'utf-8').toString()
  const terms = contents.split('\r\n')
  const regex = `/|${terms.join('|')}|/g`
  var insertArray: {
    id: number
    title: string
    date: string
  }[] = []
  if (data) {
    for (const video of data) {
      const found = video.snippet.title.match(regex)

      var insert = {
        id: 0,
        title: '',
        date: '',
      }
      if (found) {
        insert.id = id
        insert.title = video.snippet.title
        insert.date = moment(video.snippet.publishedAt).format('YYYY-MM-DD HH:MM:SS')
        id++
        insertArray.push(insert)
      }
    }
  }
  return insertArray
}
