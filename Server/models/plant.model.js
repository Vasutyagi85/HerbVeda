const mongoose=require('mongoose');

const plantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    SceintificName:{
        type:String,
        required:true
    },
    family:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    category: {
        type: String,
        required: true,
        enum: ['Culinary', 'Medicinal', 'Aromatic']
    }
},{
    timestamps:true
});

const Plant=mongoose.model('Plant',plantSchema);

module.exports=Plant;