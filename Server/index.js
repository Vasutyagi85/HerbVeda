const express =require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const Plant=require('./models/plant.model');

const app=express();
app.use(cors());
const PORT =5000;

const MONGO_URL="mongodb+srv://vasukelwin911_db_user:131422Vt@cluster0.mdxwwky.mongodb.net/HerbVeda?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(MONGO_URL).then(()=>{
    console.log('Successfully connected to mongoDB!');

    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err)=>{
    console.error('Failed to connect to MongoDB', err);
})

app.get('/', (req, res) => {
  res.send('Hello from the Herbal Garden API!');
});

app.get('/api/plants', async (req, res) => {
  try {
    let filter = {};
    const { category, q, ailment } = req.query;

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (q) {
      filter.name = { $regex: q, $options: 'i' };
    }
    
    if (ailment) {
      filter.ailments = { $regex: ailment, $options: 'i' };
    }
    const plants = await Plant.find(filter);
    res.status(200).json(plants);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/plants/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const plant = await Plant.findById(id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }


    res.status(200).json(plant);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

