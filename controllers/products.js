const Product = require('../model/products')

const getAllProducts = async(req,res) => {
    const {company, name, featured, sort, select} = req.query;
    const queryObj = {};

    let apiData = Product.find(queryObj);

    if(company){
        queryObj.company=company;
    }

    if(featured){
        queryObj.featured= featured;
    };
    
    if(name){
        queryObj.name= {$regex:name, $options:'i'};
    };

    if(sort){
        let sortFix = sort.replace(","," ");
        apiData = apiData.sort(sortFix)
    };

    if(select){
        let selectFix = select.replace(","," ");
        apiData = apiData.select(selectFix)
    };

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObj);

    const myData = await apiData;
    res.status(200).json({myData});
};

const getAllProductsTesting = async(req,res) => {
    const myData = await Product.find(req.query)
    res.status(200).json({myData});
}

module.exports = {getAllProducts, getAllProductsTesting}