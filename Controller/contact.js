import Deal from '../Model/Deal.js';
import Contact from '../Model/Contact.js';
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
                                    "website": WebSite,
                                    "lifecyclestage": LifeCyclestage,
                                     }
                            };
                            console.log(contactobj);

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

        const contactId = {contactId: req.params.contactId};
        const contact = await Contact.findOne(contactId);
        if (contact) {
            res.json(contact);
          } else {
            res.status(404).json({ message: 'Contact not found' });
          }

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function updateContact(req,res){
    try{
        const contactId = req.params.contactId;
        const contact = await Contact.findOne({contactId});
        console.log(contact);
        const { email, closedate, firstname, lastname, phone, company, 
            WebSite, LifeCyclestage} = req.body;
        const data = {
            id: contactId,
            properties: {
                email: email,
                closedate: closedate,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                company: company,
                WebSite: WebSite,
                LifeCyclestage: LifeCyclestage
            },
        }
        contact.contactId = contactId || contact.contactId;
        contact.email = email || contact.email;
        contact.closedate = closedate || contact.closedate;
        contact.firstname = firstname || contact.firstname;
        contact.lastname = lastname || contact.lastname;
        contact.phone = phone || contact.phone;
        contact.company = company || contact.company;
        contact.WebSite = WebSite || contact.WebSite;
        contact.LifeCyclestage = LifeCyclestage || contact.LifeCyclestage;
        await contact.save();
        const response = await hubspotClient.crm.contacts.batchApi.update({ inputs: [data] })
        res.json(response);

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function IdFromEmail(req, res){
    try{
    const email = req.params.email;
    const contact = await Contact.findOne({email});
    console.log(contact);
    res.json(contact.contactId);

    }catch(error){
        console.log('Error searching for contact:', error.response.body);
    }
}