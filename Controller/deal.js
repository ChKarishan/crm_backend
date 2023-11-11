import Deal from '../Model/Deal.js';
import hubspotClient from '../index.js';

export async function getAllDealsFromHubspot(req,res){
    try{

        const allDeals = await hubspotClient.crm.deals.getAll();
        console.log(allDeals)
        res.json(allDeals)

    }catch(error){

    res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function createDeal(req,res){
    try{

        const { amount, closedate, dealname, pipeline, dealstage} = req.body;
        const deal = new Deal({
            amount,
            closedate,
            dealname,
            pipeline, 
            dealstage,
          });
        console.log(deal);
        deal = await hubspotClient.crm.deals.basicApi.create(dealobj);
        console.log(deal);
        await deal.save();
        res.status(201).json({ message: 'Deal Creation successfully' });

    }catch(error){

        res.status(500).json({ error: 'Deal Creation Failed' });

    }
}

export async function updateDeal(req, res){
    try{

        const dealId = req.params.dealId;
        const { amount, closedate, dealname, pipeline, dealstage} = req.body;
        const data = {dealId, amount, closedate, dealname, pipeline, dealstage};
        const response = await hubspotClient.put(`/deals/v1/deal/${dealId}`, data);
        res.json(response.data);

    }catch{

        console.error(error);
        res.status(500).send('Internal Server Error');

    }
}

export async function getDeal(req, res){
    try{

        const dealId = req.params.id;
        const deal = await Deal.findById(dealId);
        if (deal) {
            res.json(deal);
          } else {
            res.status(404).json({ message: 'Deal not found' });
          }

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}