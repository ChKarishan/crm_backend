import Sale from '../Model/Sale.js';
import Sale_Note from '../Model/Sale_Note.js'

export async function createSaleNote(req, res) {
    try {
       
        let { 
            sale,
            noteText
           } = req.body;
        let sale_obj = await Sale.findById(sale);

        const saleNoteData = {
           sale: sale_obj._id,
            noteText
           }
            console.log(saleNoteData)
            const saleNote = new Sale_Note(saleNoteData);
            await saleNote.save();
            
            res.status(201).json(saleNote);

      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getAll(req, res) {
    try {

        const allSaleNote = await Sale_Note.find({});
        res.json(allSaleNote);
       
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getSaleNoteById(req, res) {
    try {
       
        const saleNoteID = req.params.id;
        const saleNote = await Sale_Note.findById(saleNoteID);
        if (saleNote) {
          res.json(saleNote);
        } else {
          res.status(404).json({ message: 'Sale Note not found' });
        }

      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getSaleNoteBySaleId(req, res) {
    try {

        const sale = {sale: req.params.id};
        console.log(sale);
        const saleNote = await Sale_Note.findOne(sale);
        console.log(saleNote);
        if (saleNote) {
            res.json(saleNote);
          } else {
            res.status(404).json({ message: 'sale Note not found' });
          }
       
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}