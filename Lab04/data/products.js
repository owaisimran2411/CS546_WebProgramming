import {
  argumentProvidedValidation,
  primitiveTypeValidation
} from "./../helpers.js"

import {
  products
} from "./../config/mongoCollections.js"
import { ObjectId } from "mongodb";
import { after } from "node:test";

// TODO: Export and implement the following functions in ES6 format
const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {

  // checking if all arguments are supplied
  argumentProvidedValidation(productName, "productName")
  argumentProvidedValidation(productDescription, "productDescription")
  argumentProvidedValidation(modelNumber, "modelNumber")
  argumentProvidedValidation(price, "price")
  argumentProvidedValidation(manufacturer, "manufacturer")
  argumentProvidedValidation(manufacturerWebsite, "manufacturerWebsite")
  argumentProvidedValidation(keywords, "keywords")
  argumentProvidedValidation(categories, "categories")
  argumentProvidedValidation(dateReleased, "dateReleased")
  
  if(!discontinued.toString()) {
    throw `discontinued not provided`
  }


  // data type valdiation
  primitiveTypeValidation(productName, "productName", "String")
  primitiveTypeValidation(productDescription, "productDescription", "String")
  primitiveTypeValidation(modelNumber, "modelNumber", "String")
  primitiveTypeValidation(manufacturer, "manufacturer", "String")
  primitiveTypeValidation(manufacturerWebsite, "manufacturerWebsite", "String")
  primitiveTypeValidation(dateReleased, "dateReleased", "String")

  productName = productName.trim()
  productDescription = productDescription.trim()
  modelNumber = modelNumber.trim()
  manufacturer = manufacturer.trim()
  manufacturerWebsite = manufacturerWebsite.trim()
  dateReleased = dateReleased.trim()

  primitiveTypeValidation(price, "price", "Number")

  if(price>0) {
    if(Math.floor(price) !== price) {
      if(price.toString().split(".")[1].length > 2) {
        throw `Decimal Digits in price than 2`
      }
    }
  } else {
    throw `Price is less than or equal to zero`
  }


  if(manufacturerWebsite.substring(0, 11) === "http://www." 
      && manufacturerWebsite.substring(manufacturerWebsite.length-4) === ".com"
      && manufacturerWebsite.substring(11, manufacturerWebsite.length-4).trim().length>=5) {

  } else {
    throw `Manufacturer website does not start with http://www. OR does not end with .com OR domain name is less than 5 characters`
  }

  primitiveTypeValidation(keywords, "keywords", "Array")
  primitiveTypeValidation(categories, "categories", "Array")

  for(let i=0; i<keywords.length; i++) {
    primitiveTypeValidation(keywords[i], `keyword[${i.toString()}]`, "String")
    keywords[i] = keywords[i].trim()
  }

  for(let i=0; i<categories.length; i++) {
    primitiveTypeValidation(categories[i], `category[${i.toString()}]`, "String")
    categories[i] = categories[i].trim()
  }

  primitiveTypeValidation(discontinued, "discontinued", "Boolean")

  // validating dateRelease argument
  let _MM = parseInt(dateReleased.split('/')[0])
  let _DD = parseInt(dateReleased.split('/')[1])
  let _YYYY = parseInt(dateReleased.split('/')[2])

  if ((_MM === 1 || _MM === 3 || _MM === 5 || _MM === 7 || _MM === 8 || _MM === 10 || _MM === 12)
     && (_DD > 0 && _DD <= 31) 
      && (_YYYY <= 2024 && _YYYY >= 1900)) {
        // do nothing
      }
  else if ((_MM === 4 || _MM === 6 || _MM === 9 || _MM === 11)
     && (_DD > 0 && _DD <= 30) 
      && (_YYYY <= 2024 && _YYYY >= 1900)) {
        // do nothing
      }
  else if ((_MM === 2)
     && (_DD > 0 && _DD <= 28) 
      && (_YYYY <= 2024 && _YYYY >= 1900)) {
        // do nothing
      }
  else {
    throw `Invalid date input`
  }

  const newProduct = {
    productName: productName,
    productDescription: productDescription,
    modelNumber: modelNumber,
    price: price,
    manufacturer: manufacturer,
    manufacturerWebsite: manufacturerWebsite,
    keywords: keywords,
    categories: categories,
    dateReleased: dateReleased,
    discontinued: discontinued
  }
  const productsCollection = await products()
  const productInsertion = await productsCollection.insertOne(newProduct)

  // console.log(productInsertion);

  if(!productInsertion.acknowledged || !productInsertion.insertedId) {
    throw `Unable to add product record`
  }

  const newProductID = productInsertion.insertedId.toString()
  const productInformation = await get(newProductID)
  
  // console.log(productInformation);
  return productInformation
};

const getAll = async () => {
  const productsCollection = await products()
  const productsInformation = await productsCollection.find().toArray()
  if(!productsInformation) {
    throw `Unable to fetch products`
  }
  return productsInformation.map((productInformation) => {
    productInformation._id = productInformation._id.toString()
    return productInformation
  })

};

const get = async (id) => {
  argumentProvidedValidation(id, "id")
  primitiveTypeValidation(id, "id", "String")
  id = id.trim()
  
  if(!ObjectId.isValid(id)) {
    throw `${id} is not a valid object id`
  }

  const productsCollection = await products()
  const productInformation = await productsCollection.findOne(
    {_id: new ObjectId(id)}
  )
  if (productInformation === null) {
    throw `no product with id: ${id} exists`
  } else {
    productInformation._id = productInformation._id.toString()
    return productInformation
  }
};

const remove = async (id) => {
  argumentProvidedValidation(id, "id")
  primitiveTypeValidation(id, "id", "String")
  id = id.trim()
  
  if(!ObjectId.isValid(id)) {
    throw `${id} is not a valid object id`
  }
  const productsCollection = await products()
  const deletedProductInformation = await productsCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });
  if (!deletedProductInformation) {
    throw `Unable to delete product`
  } else {
    return `${deletedProductInformation.productName} has been successfully deleted!`
  }
};

const rename = async (id, newProductName) => {
  argumentProvidedValidation(id, "id")
  primitiveTypeValidation(id, "id", "String")
  id = id.trim()
  
  if(!ObjectId.isValid(id)) {
    throw `${id} is not a valid object id`
  }

  argumentProvidedValidation(newProductName, "newProductName")
  primitiveTypeValidation(newProductName, "newProductName", "String")

  const _productInformationBeforeUpdate = await get(id)
  if (_productInformationBeforeUpdate.productName === newProductName) {
    throw `New and Old Product Name are similar`
  }
  const productsCollection = await products()
  const productInformationAfterUpdate = await productsCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: {
      productName: newProductName
    }},
    {returnDocument: 'after'}
  )
  // console.log(productInformationAfterUpdate);
  if(!productInformationAfterUpdate) {
    throw `Unable to update product`
  } else {
    productInformationAfterUpdate._id = productInformationAfterUpdate._id.toString()
    return productInformationAfterUpdate
  }

};

export {
  create,
  getAll,
  get,
  remove,
  rename
}
