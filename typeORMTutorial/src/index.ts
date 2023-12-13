import { createConnection } from 'typeorm'
import { Client } from './entity/Client'

const main = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'Localhost',
      port: 5432,
      username: 'postgres',
      password: 'PostgreSQL#123',
      database: 'tutorial',
      entities:[Client],
      synchronize:true
    })
    console.log('Connected to postgresql')
  } catch (error) {
    console.log(error)
  }
}

main()