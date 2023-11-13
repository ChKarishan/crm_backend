import Sale from '../Model/Sale.js';
import shortid from 'shortid';


export async function getSales(req, res) {
    try {
        const sales = await Sale.find();
        res.json(sales);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function createSale(req, res) {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const agent = decoded.id;

    const saleid = shortid.generate();
    const { 
      numberOfPanels,
      totalWattage,
      redline,
      financingDetails,
      Price,
      Date
     } = req.body;
     console.log(req.body);
     const saleData = {
      saleid,
      numberOfPanels,
      totalWattage,
      redline,
      financingDetails,
      Price,
      Date,
      agent
     }
      console.log(saleData)
      const sale = new Sale(saleData);
      await sale.save();
      res.status(201).json(sale);
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' });
    }
}

export async function getSale(req, res) {
  try {
    const saleID = req.params.id;
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
    // Update the sale properties with the new data
    sale.SaleID = updatedData.SaleID || sale.SaleID;
    sale.numberOfPanels = updatedData.numberOfPanels || sale.numberOfPanels;
    sale.totalWattage = updatedData.totalWattage || sale.totalWattage;
    sale.redline = updatedData.redline || sale.redline;
    sale.financingDetails = updatedData.financingDetails || sale.financingDetails;
    sale.Price = updatedData.Price || sale.Price;
    sale.Date = updatedData.Date || sale.Date;
    sale.agent = updatedData.agent || sale.agent;
    // Save the updated sale
    await sale.save();
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


export async function annualSale(req, res) {
  try{

  console.log('hi')
  const allSales = await Sale.find();
  console.log(allSales);
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  var total = 0;
  const salesThisYear = allSales.filter(sale => {
    const saleYear = new Date(sale.Date).getFullYear();
    console.log(saleYear);
    console.group(total);
    if(saleYear === currentYear){
      console.log("year same");
      total = total + sale.Price;
    }
  });
  console.log(total);
  res.json(total);

  }catch(error){

    res.status(500).json({ error: 'Internal Server Error' });

  }
}

export async function largestSale(req,res){
  try{

    const allSales = await Sale.find();
    let largestSale = allSales[0];
    for (let i = 1; i < allSales.length; i++) {
      if (allSales[i].Price > largestSale.Price) {
        largestSale = allSales[i];
      }
  }
  res.json(largestSale.Price)
  }catch(error){

    res.status(500).json({ error: 'Internal Server Error' });

  }
}

export async function dailyAverageSale(req,res){
  try{
    const currentYear = new Date().getFullYear();
    const allSales = await Sale.find();
    const totalSales = allSales.reduce((sum, sale) => sum + sale.Price, 0);
    const salesThisYear = allSales.filter(sale => {
      const saleYear = new Date(sale.Date).getFullYear();
      return saleYear === currentYear;
  });
  const uniqueDays = [...new Set(salesThisYear.map(sale => sale.Date))];
  const numberOfDays = uniqueDays.length;
  if (numberOfDays === 0) {
    return 0; // To avoid division by zero
  }
  const averageDailySale = totalSales / numberOfDays;
  res.json(averageDailySale)


  }catch(error){

    res.status(500).json({ error: 'Internal Server Error' });

  }
}

export async function saleWithMostPannels(req, res){
  try{
    const saleWithMostPanels = await Sale.findOne({})
    .sort({ numberOfPanels: -1 })
    .populate('agent') // If you want to populate the agent details
    .exec();
  res.json(saleWithMostPanels);

  }catch{(error)

    res.status(500).json({ error: 'Internal Server Error' });

  }
}

export async function saleWithMostWattage(req, res){
  try{
    const saleWithMostWattage = await Sale.findOne({})
    .sort({ totalWattage: -1 })
    .populate('agent') // If you want to populate the agent details
    .exec();
  res.json(saleWithMostWattage);

  }catch{(error)

    res.status(500).json({ error: 'Internal Server Error' });

  }
}