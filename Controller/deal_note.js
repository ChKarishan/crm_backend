import Deal from '../Model/Deal.js';
import Deal_Note from '../Model/Deal_Note.js'

export async function createDealNote(req, res) {
    try {
       
        let { 
            deal,
            noteText
           } = req.body;
           let deal_obj = await Deal.findOne({dealId: deal});

        const dealNoteData = {
           deal: deal_obj._id,
            noteText
           }
            console.log(dealNoteData)
            const dealNote = new Deal_Note(dealNoteData);
            await dealNote.save();
            
            res.status(201).json(dealNote);

      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getAll(req, res) {
    try {

        const allDealNote = await Deal_Note.find({});
        res.json(allDealNote);
       
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getDealNoteById(req, res) {
    try {
       
        const dealNoteID = req.params.id;
        const dealNote = await Deal_Note.findById(dealNoteID);
        if (dealNote) {
          res.json(dealNote);
        } else {
          res.status(404).json({ message: 'Deal Note not found' });
        }

      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getDealNoteByDealId(req, res) {
  try {

      const deal = req.params.id;
      console.log(deal);
      let deal_obj = await Deal.findOne({dealId: deal});
      console.log(deal_obj);
      const dealNote = await Deal_Note.find({deal: deal_obj._id});
      console.log(dealNote);
      if (dealNote) {
          res.json(dealNote);
        } else {
          res.status(404).json({ message: 'deal Note not found' });
        }
     
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}