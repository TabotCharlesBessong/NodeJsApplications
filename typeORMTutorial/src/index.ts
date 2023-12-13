import { createConnection } from 'typeorm'
import { Client } from './entity/Client'
import { Banker } from './entity/Banker'
import { Transaction } from './entity/Transaction'
import express from 'express'
import { createClientRouter } from './routes/create-client'
import { createBankerRouter } from './routes/create_banker'
import { connectBankerToClientRouter } from './routes/connect_bank_to_client'
import { createTransactionRouter } from './routes/create_transactions'
import { deleteClientRouter } from './routes/delete_client'
import { fetchClientsRouter } from './routes/fetch_client'

const app = express()

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
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(createClientRouter);
		app.use(createBankerRouter);
		app.use(connectBankerToClientRouter);
		app.use(createTransactionRouter);
		app.use(deleteClientRouter);
		app.use(fetchClientsRouter);

		app.listen(8080, () => {
			console.log('Now running on port 8080');
		});
    console.log('Connected to postgresql')
  } catch (error) {
    console.log(error)
  }
}

main()