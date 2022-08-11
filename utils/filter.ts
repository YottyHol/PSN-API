import { readFileSync } from 'fs'
import { readFile } from 'fs'
const file = './data/search_filter'
import moment from 'moment'

export default function filter(data) {

  const contents = readFileSync(file, 'utf-8').toString()
  const terms = contents.split('\r\n')
  const regex = `/|${terms.join('|')}|/g`
  var insertArray: {
    id: string
    title: string
    date: string
  }[] = []

  readFile('./data/results.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.log('File read failed:', err)
      return
    }

    var json = JSON.parse(jsonString)

    for (const video of json) {

      const found = video.snippet.title.match(regex)

      var insert = {
        id: '',
        title: '',
        date: '',
      }
      if (found) {
        insert.id = video.id.videoId
        insert.title = video.snippet.title
        insert.date = moment(video.snippet.publishedAt).format('YYYY-MM-DD HH:MM:SS')

        insertArray.push(insert)
      }
    }
    console.log(insertArray)
  })


