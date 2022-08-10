import { readFileSync } from 'fs'
const file = './data/search_filter'

export default function filter() {
  //const file = readFileSync('./data/search_filter', 'utf-8')
  const contents = readFileSync(file, 'utf-8').toString()

  const terms = contents.split('\n')

  console.log(`/${terms.join('|')}/g`)

  //const string = readFileSync(file).toString()
  // const terms = string.split('\n')
}
