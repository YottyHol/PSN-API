/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('videos', async () => {
    return Database.from('videos').select('*')
  })
  Route.post('store', 'VideoController.storeVideos')

  Route.get('video/:id', async ({ params }) => {
    return await Database.from('videos').where({ id: params.id })
  })

  Route.delete('video/:id', async ({ params }) => {
    return await Database.from('videos').where({ id: params.id }).delete()
  })

  Route.get('videoSearch/:title', async ({ params }) => {
    return await Database.from('videos')
      .select('id', 'title')
      .where('title', 'LIKE', '%' + params.title + '%')
  })
}).prefix('/api')
