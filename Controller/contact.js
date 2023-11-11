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
    
    }catch(error){

    }
}

export async function getContact(req,res){
    try{
    
    }catch(error){

    }
}

export async function updateContact(req,res){
    try{
    
    }catch(error){

    }
}