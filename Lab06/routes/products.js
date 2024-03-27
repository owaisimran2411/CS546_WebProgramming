// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { productsData } from './../data/index.js';

import {
  // argumentProvidedValidation,
  primitiveTypeValidation,
  objectIdValidation
} from './../helpers.js'

import { Router } from 'express';

const router = Router()

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const data = await productsData.getAll()
      res.json(data)
    } catch (e) {
      res.status(400).json({error: e})
    }

  })
  .post(async (req, res) => {
    
    if("productName" in req.body &&
        "productDescription" in req.body &&
        "modelNumber" in req.body &&
        "price" in req.body && 
        "manufacturer" in req.body &&
        "manufacturerWebsite" in req.body &&
        "keywords" in req.body && 
        "categories" in req.body &&
        "dateReleased" in req.body && 
        "discontinued" in req.body) {
          try {
            let productName = req.body.productName
            let productDescription = req.body.productDescription
            let modelNumber = req.body.modelNumber
            let manufacturer = req.body.manufacturer
            let manufacturerWebsite = req.body.manufacturerWebsite
            let dateReleased = req.body.dateReleased
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
          
            let price = req.body.price
            primitiveTypeValidation(price, "price", "Number")
          
            if(price>0) {
              if(Math.floor(price) !== price) {
                if(price.toString().split(".")[1].length > 2) {
                  throw `Decimal Digits in price greater than 2`
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
              // res.status(400).json({error: ``})
            }
          
            let keywords = req.body.keywords
            let categories = req.body.categories
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
            
            let discontinued = req.body.discontinued
            primitiveTypeValidation(discontinued, "discontinued", "Boolean")
          
            // validating dateRelease argument
            let _MM = parseInt(dateReleased.split('/')[0])
            let _DD = parseInt(dateReleased.split('/')[1])
            let _YYYY = parseInt(dateReleased.split('/')[2])
          
            const currentDate = new Date()
            currentDate.setHours(0,0,0,0)
            if ( currentDate >= new Date(dateReleased) ) {
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
            } else {
              throw `Invalid date input`
            }
            try {
              const productCreation = await productsData.create(productName, productDescription, modelNumber, price, manufacturer, manufacturerWebsite, keywords, categories, dateReleased, discontinued)
              res.status(200).json(productCreation)
            } catch (e) {
              res.status(400).json({error: e})
            }
          } catch (e) {
            res.status(400).json({error: e})
          }
    } else {
      res.status(400).json({error: 'All field inputs not provided'})
    }

    
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    try {
      let productId = req.params.productId

      objectIdValidation(productId)

      const searchResult = await productsData.get(productId)
      if (typeof searchResult === "string") {
        res.status(404).json({error: `Product not found`})
      }
      else {
        res.status(200).json(searchResult)
      }
    } catch (e) {
      res.status(400).json({error: e})
    }
  })
  .delete(async (req, res) => {
    try {
      let productId = req.params.productId

      objectIdValidation(productId)
      const deletionResult = await productsData.remove(productId)
      if(deletionResult != 'Unable to delete product') {
        res.status(200).json(deletionResult)
      } else {
        res.status(404).json({error: 'Product Not Found'})
      }
    } catch(e) {
      res.status(400).json({error: e})
    }
    
    //code here for DELETE
  })
  .put(async (req, res) => {
    if("productName" in req.body &&
        "productDescription" in req.body &&
        "modelNumber" in req.body &&
        "price" in req.body && 
        "manufacturer" in req.body &&
        "manufacturerWebsite" in req.body &&
        "keywords" in req.body && 
        "categories" in req.body &&
        "dateReleased" in req.body && 
        "discontinued" in req.body) {
          try {
            let productId = req.params.productId
            let productName = req.body.productName
            let productDescription = req.body.productDescription
            let modelNumber = req.body.modelNumber
            let manufacturer = req.body.manufacturer
            let manufacturerWebsite = req.body.manufacturerWebsite
            let dateReleased = req.body.dateReleased
            
            try {
              objectIdValidation(productId)
            } catch(e) {
              throw {
                statusCode: 400,
                message: "Invalid Object ID"
              }
            }
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
          
            let price = req.body.price
            primitiveTypeValidation(price, "price", "Number")
          
            if(price>0) {
              if(Math.floor(price) !== price) {
                if(price.toString().split(".")[1].length > 2) {
                  throw {
                    statusCode: 400,
                    message: `Decimal Digits in price greater than 2`
                  }
                }
              }
            } else {
              throw {
                statusCode: 400,
                message: `Price is less than or equal to zero`
              }
            }
          
          
            if(manufacturerWebsite.substring(0, 11) === "http://www." 
                && manufacturerWebsite.substring(manufacturerWebsite.length-4) === ".com"
                && manufacturerWebsite.substring(11, manufacturerWebsite.length-4).trim().length>=5) {
          
            } else {
              throw {
                statusCode: 400,
                message: `Manufacturer website does not start with http://www. OR does not end with .com OR domain name is less than 5 characters`
              }
              // res.status(400).json({error: ``})
            }
          
            let keywords = req.body.keywords
            let categories = req.body.categories
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
            
            let discontinued = req.body.discontinued
            primitiveTypeValidation(discontinued, "discontinued", "Boolean")
          
            // validating dateRelease argument
            let _MM = parseInt(dateReleased.split('/')[0])
            let _DD = parseInt(dateReleased.split('/')[1])
            let _YYYY = parseInt(dateReleased.split('/')[2])
          
            const currentDate = new Date()
            currentDate.setHours(0,0,0,0)
            if ( currentDate >= new Date(dateReleased) ) {
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
            } else {
              throw `Invalid date input`
            }
            try {
              const productUpdation = await productsData.update(productId, productName, productDescription, modelNumber, price, manufacturer, manufacturerWebsite, keywords, categories, dateReleased, discontinued)
              
              if (typeof productUpdation === "string") {
                res.status(400).json({error: 'Unable to Update Product, Fields are similar'})
              } else {
                res.status(200).json(productUpdation)
              }
            } catch (e) {
              res.status(400).json({error: e})
            }
          } catch (e) {
            if(typeof e === "object" && "statusCode" in e && "message" in e) {
              res.status(e.statusCode).json({error: e.message})
            } else {
              res.status(400).json({error: e})
            }
          }
    } else {
      res.status(400).json({error: 'All field inputs not provided'})
    }
    //code here for PUT
  });

export default router
