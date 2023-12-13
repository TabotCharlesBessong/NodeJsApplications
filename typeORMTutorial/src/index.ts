import { createConnection } from 'typeorm'

const main = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: 'Localhost',
      port: 5432,
      username: 'postgres',
      password: 'PostgreSQL#123',
      database: 'tutorial'
    })
    console.log('Connected to postgresql')
  } catch (error) {
    console.log(error)
  }
}

main()