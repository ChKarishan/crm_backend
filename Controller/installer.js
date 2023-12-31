import Installer from '../Model/Installer.js';

export async function createInstaller(req,res){
    try{
        const installerData = req.body;
        console.log(installerData);
        const installer = new Installer(installerData);
        await installer.save();
        res.status(201).json(installer);

    }catch(error){

        res.status(500).json({ error: 'Installer Creation failed' });

    }

}

export async function getAll(req,res){
    try{

        const installer = await Installer.find();
        res.json(installer);
        
    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }

}

export async function getInstaller(req,res){
    try{

        const installerID = req.params.id;
        const installer = await Installer.findById(installerID);
        if (installer) {
        res.json(installer);
        } else {
        res.status(404).json({ message: 'Sale not found' });
        }
        
    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }

}

export async function getListInstaller(req,res){
    try{

        const List = req.body;
        const results = [];
        for (let i = 0; i < List.length; i++) {
            const installer = await Installer.findById(List[i]);
            console.log(installer);
            results.push(installer);
           console.log(i+1);
          }
          console.log(results);
      
         res.status(200).json({results});
   
        
        
    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }

}

export async function updateInstaller(req,res){
    try{
        
    const installerID = req.params.id;
    const installer = await Installer.findById(installerID);
    const updatedData = req.body
    if (!installer) {
      return { success: false, message: 'Installer not found' };
    }
    installer.Name = updatedData.Name || installer.Name;
    installer.PhoneNumber = updatedData.PhoneNumber || installer.PhoneNumber;
    // Save the updated installer
    await installer.save();
    res.json(installer);
        
    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }

}