
    
const Product  = require('../models/model');


const getAllProducts = async (req,res) => {
  
  try {
    const {company,name,featured,sort,select} = req.query;
  //  console.log(sort);
  const queryObject= {};
  let apiData =  Product.find(queryObject)
 
  if(company){
    queryObject.company = { $regex: `.*${company}.*`, $options: 'i' };
  }
  if(featured){
    queryObject.featured= featured;
  }
  if(name){
    queryObject.name= { $regex: `.*${name}.*`, $options: 'i' };
  }

  
  if(sort){
   
    let sortflix = sort.replace(',',' ');
   apiData = apiData.sort(sortflix);
  }

  if(select){
   
    let selectfix = select.split(',').join(' ');
   apiData = apiData.select(selectfix);
  }
  
  let page = Number(req.query.page)||1;
  let limit = Number(req.query.limit)||15;
  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);

  // const products = await apiData;

  // console.log(queryObject)


    const data = await apiData;
    res.status(200).json({data,nbHits:data.length});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
  
}


const getAllProductsTesting = async (req,res) => {
  
  try {
    console.log(req.query);
    const data = await Product.find(req.query).select('name company');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
  }



const getBadOnes = async (req,res)=>{
  const data = await Product.find(req.query);

  res.status(200).json(data);
}
  module.exports = {getAllProducts,getAllProductsTesting,getBadOnes};