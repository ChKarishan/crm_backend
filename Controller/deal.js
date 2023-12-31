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

export async function getDeals(req, res) {
    try {
        const deals = await Deal.find();
        res.json(deals);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function createDeal(req,res){
    try{

        const { amount, closedate, dealname, pipeline,
            sizeofpannals, address, dealstage} = req.body;
        const dealobj =
                        {
                        "properties": {
                                    "amount": amount,
                                    "closedate": closedate,
                                    "dealname": dealname,
                                    "pipeline": pipeline,
                                    "dealstage": dealstage,
                                    
                                     }
                            };
                console.log(dealobj);            
        const dealid = await hubspotClient.crm.deals.basicApi.create(dealobj);
        console.log(dealid);
        const dealId = dealid.id;
         const deal = new Deal({
            dealId,
            amount,
            closedate,
            dealname,
            pipeline, 
            sizeofpannals,
            address,
            dealstage,
          });
          console.log(deal);
        await deal.save();
        console.log("done");
        res.status(201).json({ message: 'Deal Creation successfully' });

    }catch(error){

        res.status(500).json({ error: 'Deal Creation Failed' });

    }
}

export async function updateDeal(req, res){
    try{

        const dealId = req.params.dealId;
        const deal = await Deal.findOne({dealId});
        console.log(deal);
        const { amount, closedate, dealname, pipeline, 
            sizeofpannals, address, dealstage} = req.body;
        const data = {
            id: dealId,
            properties: {
                amount: amount,
                closedate: closedate,
                dealname: dealname,
                pipeline: pipeline,
                dealstage: dealstage
            },
        }
        deal.dealId = dealId || deal.dealId;
        deal.amount = amount || deal.amount;
        deal.closedate = closedate || deal.closedate;
        deal.dealname = dealname || deal.dealname;
        deal.pipeline = pipeline || deal.pipeline;
        deal.sizeofpannals = sizeofpannals || deal.sizeofpannals;
        deal.address = address || deal.address;
        deal.dealstage = dealstage || deal.dealstage;
        await deal.save();
        const response = await hubspotClient.crm.deals.batchApi.update({ inputs: [data] })
        res.json(response);

    }catch{
        res.status(500).send('Internal Server Error');

    }
}

export async function getDeal(req, res){
    try{

        const dealId = {dealId: req.params.id};
        const deal = await Deal.findOne(dealId);
        if (deal) {
            res.json(deal);
          } else {
            res.status(404).json({ message: 'Deal not found' });
          }

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function AssociateDealWithContact(req, res){
    try{
        const {dealId, contactId} = req.body
        await hubspotClient.crm.associations.v4.basicApi.create(
            'deal',
            dealId,
            'contacts',
            contactId,
            [
                {
                      "associationCategory": "HUBSPOT_DEFINED",
                      "associationTypeId": AssociationTypes.dealToContact 
                      // AssociationTypes contains the most popular HubSpot defined association types
                }
            ]
        )

    }catch(error){
        
    }
}

export async function dealsThisYear(req, res){
    try {
        // Get the current year
        const currentYear = new Date().getFullYear();
    
        // Query the database for deals with closedate in the current year
        const dealsCount = await Deal.countDocuments({
          closedate: { $regex: `^${currentYear}` }, // Assuming 'closedate' is a string in the format 'YYYY-MM-DD'
        });
    
        // Send the count as a JSON response
        res.json(dealsCount);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getClosedWonDeals(req, res){
    try {
        // Query the database for deals with dealstage 'closedwon'
        const closedWonDealsCount = await Deal.countDocuments({
          dealstage: 'closedwon',
        });
    
        // Send the count as a JSON response
        res.json(closedWonDealsCount);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}