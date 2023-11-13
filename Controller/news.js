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

        const allNews = await News.find();
        const currentDate = new Date().getDate();
        console.log(currentDate);
        const newsToday = allNews.filter(news => {
          const newsDay = new Date(news.date).getDate();
          console.log(newsDay);
          return newsDay === currentDate;
        });
        console.log(newsToday);
        res.json(newsToday);

    }catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function getNewsMonthly(req, res){
    try{

        const allNews = await News.find();
        const currentMonth = new Date().getMonth();
        console.log(currentMonth);
        const newsThisMonth = allNews.filter(news => {
          const newsMonth = new Date(news.date).getMonth();
          console.log(newsMonth);
          return newsMonth === currentMonth;
        });
        console.log(newsThisMonth);
        res.json(newsThisMonth);

    }catch(error){
        
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

export async function getNewsYearly(req, res){
    try{

        const allNews = await News.find();
        const currentYear = new Date().getFullYear();
        console.log(currentYear);
        const newsThisYear = allNews.filter(news => {
          const newsYear = new Date(news.date).getFullYear();
          console.log(newsYear);
          return newsYear === currentYear;
        });
        console.log(newsThisYear);
        res.json(newsThisYear);

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