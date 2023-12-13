import { createConnection } from 'typeorm'
import { Client } from './entity/Client'
import { Banker } from './entity/Banker'
import { Transaction } from './entity/Transaction'

const main = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'Localhost',
      port: 5432,
      username: 'postgres',
      password: 'PostgreSQL#123',
      database: 'tutorial',
      entities:[Client,Banker,Transaction],
      synchronize:true
    })
    console.log('Connected to postgresql')
  } catch (error) {
    console.log(error)
  }
}

main()