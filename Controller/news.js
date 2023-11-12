import News from "../Model/News.js";
import shortid from 'shortid';



export async function createNews(req, res){
    try{

        const {heading, discription, date} = req.body;
        const newsId = shortid.generate();
        const news = new News({
            newsId,
            heading,
            discription,
            date
        });
    await news.save();
    res.status(201).json({ message: 'News Created successfully' });

    }catch(error){

        res.status(500).json({ error: 'News Creation failed' });

    }
}

export async function getAllNews(req, res){
    try{

        const allNews = await News.find({});
        res.json(allNews);

    }catch(error){

        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function getNewsDaily(req, res){
    try{

        const today = new Date().toLocaleDateString(); // Get current date in string format
        const newsForToday = await News.find({ date: today });
        res.json(newsForToday);

    }catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function getNewsMonthly(req, res){
    try{

        const today = new Date(); // Get the current date
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30); // Calculate the date 30 days ago
    const formattedThirtyDaysAgo = thirtyDaysAgo.toLocaleDateString();
    const newsForLast30Days = await News.find({
      date: { $gte: formattedThirtyDaysAgo, $lte: today.toLocaleDateString() }
    });
    res.json(newsForLast30Days);

    }catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function getNewsYearly(req, res){
    try{

    const today = new Date(); // Get the current date
    const startOfYear = new Date(today.getFullYear(), 0, 1); // Start date of the current year
    const formattedStartOfYear = startOfYear.toLocaleDateString();
    const newsForThisYear = await News.find({
      date: { $gte: formattedStartOfYear, $lte: today.toLocaleDateString() }
    });
    res.json(newsForThisYear);

    }catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function updateNews(req, res){
    try{
        
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    const updatedData = req.body
    if (!news) {
        return { success: false, message: 'Sale not found' };
      }
      news.newsId = newsId || news.newsId;
      news.heading = updatedData.heading || news.heading;
      news.date = updatedData.date || news.date;
      news.discription = updatedData.discription || news.discription;
      // Save the updated news
    await news.save();
    res.json(news)

    }catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });

    }
}