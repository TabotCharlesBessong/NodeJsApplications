import express from 'express';
import { Client } from '../entity/Client';
import { Banker } from '../entity/Banker';

const router = express.Router();

router.put(
	'/api/banker/:bankerId/client/:clientId',
	async (req, res) => {
		const { bankerId, clientId } = req.params;

		const client = await Client.findOne({
			where: { id: parseInt(clientId) },
		});

		const banker = await Banker.findOne({
			where: { id: parseInt(bankerId) },
		});

		if (banker && client) {
			banker.clients = [client];
			await banker.save();
			return res.json({
				msg: 'banker connected to client',
			});
		} else {
			return res.json({
				msg: 'banker or client not found',
			});
		}
	}
);

export { router as connectBankerToClientRouter };