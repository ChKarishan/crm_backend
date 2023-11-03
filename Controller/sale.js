import Sale from '../Model/Sale.js';

export async function getSales(req, res) {
    try {
        const sales = await Sale.find();
        res.json(sales);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function createSale(req, res) {
    const saleData = req.body;
    try {
      const sale = new Sale(saleData);
      await sale.save();
      res.status(201).json(sale);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
}

export async function getSale(req, res) {
    const saleID = req.params.id;
  try {
    const sale = await Sale.findById(saleID);
    if (sale) {
      res.json(sale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateSale(req, res) {
  try{

    const saleID = req.params.id;
    const sale = await Sale.findById(saleID);
    const updatedData = req.body

    if (!sale) {
      return { success: false, message: 'Sale not found' };
    }
    console.log(sale)
    console.log(updatedData)
    // Update the sale properties with the new data
    sale.SaleID = updatedData.SaleID || sale.SaleID;
    sale.ItemID = updatedData.ItemID || sale.ItemID;
    sale.ItemName = updatedData.ItemName || sale.ItemName;
    sale.Price = updatedData.Price || sale.Price;
    sale.Date = updatedData.Date || sale.Date;
    console.log(sale)
    // Save the updated sale
    await sale.save();
    console.log("saved")
    res.json(sale)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export async function deleteSale(req, res) {
    const saleID = req.params.id;
    console.log(saleID)
    try {
      const sale = await Sale.findByIdAndDelete(saleID);
      console.log(sale)
      if (sale) {
        res.json(sale);
      } else {
        res.status(404).json({ message: 'Sale not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
