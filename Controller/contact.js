import Deal from '../Model/Deal.js';
import hubspotClient from '../index.js';

export async function getAllContactsFromHubspot(req,res){
    try{

        const allContacts = await hubspotClient.crm.contacts.getAll();
        console.log(allContacts)
        res.json(allContacts)

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function createContact(req,res){
    try{
    
        const { email, firstname, lastname, phone, company, WebSite, LifeCyclestage} = req.body;
        const contactobj =
                        {
                        "properties": {
                                    "email": email,
                                    "firstname": firstname,
                                    "lastname": lastname,
                                    "phone": phone,
                                    "company": company,
                                    "WebSite": WebSite,
                                    "LifeCyclestage": LifeCyclestage,
                                     }
                            };
        const contactid = await hubspotClient.crm.contacts.basicApi.create(contactobj);
        console.log(contactid);
        const contactId = contactid.id;
         const contact = new Contact({
            contactId,
            email,
            firstname,
            lastname,
            phone, 
            company,
            WebSite,
            LifeCyclestage
          });
          console.log(contact);
        await contact.save();
        console.log("done");
        res.status(201).json({ message: 'contact Creation successfully' });

    }catch(error){

        res.status(500).json({ error: 'Contact Creation Failed' });

    }
}

export async function getContact(req,res){
    try{

        const contactId = req.params.contactId;
        const contact = await Deal.findById(contactId);
        if (contact) {
            res.json(contact);
          } else {
            res.status(404).json({ message: 'Deal not found' });
          }

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function updateContact(req,res){
    try{
    
    }catch(error){

    }
}

export async function IdFromEmail(req, res){
    try{

    let contactId = NaN;
    const searchRequest = new PublicObjectSearchRequest({
        query: `email:${contactEmail}`,
        properties: ['id'],
        });

    client.crm.contacts.basicApi.search(searchRequest)
        .then(response => {
            contactId = response.body.results[0]?.id;
        });
        res.json(contactId);
    }catch(error){
        console.error('Error searching for contact:', error.response.body);
    }
}