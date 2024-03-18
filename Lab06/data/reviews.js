// This data file should export all functions using the ES6 standard as shown in the lecture code
import {
  argumentProvidedValidation,
  primitiveTypeValidation,
  objectIdValidation
} from "./../helpers.js"

import {
  products
} from "./../config/mongoCollections.js"

import productsData from './products.js'

import { ObjectId } from "mongodb";

const createReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {
  
  argumentProvidedValidation(productId, "productId")
  argumentProvidedValidation(title, "title")
  argumentProvidedValidation(reviewerName, "reviewerName")
  argumentProvidedValidation(review, "review")
  argumentProvidedValidation(rating, "rating")

  primitiveTypeValidation(productId, "productId", "String")
  primitiveTypeValidation(title, "title", "String")
  primitiveTypeValidation(reviewerName, "reviewerName", "String")
  primitiveTypeValidation(review, "review", "String")

  productId = productId.trim()
  title = title.trim()
  reviewerName = reviewerName.trim()
  review = review.trim()

  objectIdValidation(productId)

  primitiveTypeValidation(rating, "rating", "Number")
  

  if(rating>=1 && rating<=5) {
    if(Math.floor(rating) !== rating) {
      if(rating.toString().split(".")[1].length > 1) {
        throw `Decimal Digits in rating greater than 1`
      }
    }
  } else {
    throw `rating is less than or equal to zero`
  }
  
  const reviewDate = new Date()
  reviewDate.setHours(0,0,0,0)
  
  const productsCollection = await products()
  const productInformation = await productsData.get(productId)
  if(!productInformation) {
    return 'Product Not Found'
  }
  
  const reviewObject = {
    _id: new ObjectId(),
    title: title,
    reviewDate: `${reviewDate.getMonth() + 1 }/${reviewDate.getDate()}/${reviewDate.getFullYear()}`,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  }
  
  // console.log(productInformation.reviews)
  productInformation.reviews.push(reviewObject)
  // console.log(productInformation.reviews)
  const ratingsArray = productInformation.reviews.map((review) => {return review.rating})
  // console.log(ratingsArray)
  let averageRating = (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
  averageRating = Math.round(averageRating*10)/10
  const updatedProductObject = {
    reviews: productInformation.reviews,
    averageRating: averageRating
  }
  // console.log(updatedProductObject)
  
  const productUpdate = await productsCollection.updateOne({_id: new ObjectId(productId)}, {$set: updatedProductObject})
  if (productUpdate.modifiedCount>0) {
    return reviewObject
  } else {
    return `Unable to add review`
  }


};

const getAllReviews = async (productId) => {
  argumentProvidedValidation(productId, 'productId')
  primitiveTypeValidation(productId, 'productId', 'String')

  productId = productId.trim()
  objectIdValidation(productId)

  const productsCollection = await products()
  const productInformation = await productsCollection.findOne(
    {_id: new ObjectId(productId)},
    {projection: {
      _id: 0,
      'reviews': 1
    }}
  )
  console.log(productInformation.reviews);
  if(productInformation) {
    if(productInformation.reviews.length > 0) {
      return productInformation.reviews
    } else {
      return 'No reviews for the product'
    }
  } else {
    return 'No Product Found'
  }
};

const getReview = async (reviewId) => {
  argumentProvidedValidation(reviewId, 'reviewId')
  primitiveTypeValidation(reviewId, 'reviewId', 'String')
  reviewId = reviewId.trim()

  objectIdValidation(reviewId)

  const productsCollection = await products()
  const productsInformation = await productsCollection.find().project({_id: 0, reviews: 1}).toArray()

  const dataToReturn = undefined
  const found = false
  for(let i=0; i<productsInformation.length; i++) {
    for(let j=0; j<productInformation[i].reviews.length; i++) {
      if(productsInformation[i].reviews[j]._id.toString() == reviewId) {
        dataToReturn = productInformation[i].reviews[j]
        found = true
      }
    }
  }
  if(found) {
    return dataToReturn
  } else {
    throw `no review found with the given review id`
  }

};

const updateReview = async (reviewId, updateObject) => {
  argumentProvidedValidation(reviewId, 'reviewId')
  argumentProvidedValidation(updateObject, 'updateObject')

  reviewId = reviewId.trim()

  let ratingValueSupplied = false

  objectIdValidation(reviewId)

  if('title' in updateObject) {
    argumentProvidedValidation(updateObject.title, "title")
    primitiveTypeValidation(updateObject.title, "title", "String")

    updateObject.title = updateObject.title.trim()
  }
  if('reviewerName' in updateObject) {
    argumentProvidedValidation(updateObject.reviewerName, "reviewerName")
    primitiveTypeValidation(updateObject.reviewerName, "reviewerName", "String")

    updateObject.reviewerName = updateObject.reviewerName.trim()
  }
  if('review' in updateObject) {
    argumentProvidedValidation(updateObject.review, "review")
    primitiveTypeValidation(updateObject.review, "review", "String")

    updateObject.review = updateObject.review.trim()
  }
  if('rating' in updateObject) {
    argumentProvidedValidation(updateObject.rating, "rating")
    primitiveTypeValidation(updateObject.rating, "rating", "Number")
    if(rating>1 && rating<5) {
      if(Math.floor(rating) !== rating) {
        if(rating.toString().split(".")[1].length > 1) {
          throw `Decimal Digits in rating greater than 1`
        } else {
          ratingValueSupplied = true
        }
      }
    } else {
      throw `rating is less than or equal to zero`
    }
  }

  let productsInformation = await productsCollection.find().project({_id: 1, reviews: 1}).toArray()
  let _pid = undefined
  let _iValue = undefined
  let _jValue = undefined

  for(let i=0; i<productsInformation.length; i++) {
    for(let j=0; j<productInformation[i].reviews.length; i++) {
      if(productsInformation[i].reviews[j]._id.toString() == reviewId) {
        _pid = productsInformation[i].reviews[j]._id
        _iValue = i
        _jValue = j
      }
    }
  }

  if(_pid && _iValue && _jValue) {
    productInformation[_iValue].reviews[_jValue] = updateObject
    productInformation[_iValue].reviews[_jValue] = new ObjectId(_pid.toString())
    const productInformation = await productsData.get(productId)
    const productsCollection = await products()

    if (ratingValueSupplied) {
      const reviewsList = productInformation.reviews
      const ratingsArray = reviewsList.map((review) => {return review.rating})

      const updatedProductObject = {
        reviews: reviewsList,
        averageRating: Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10
      }

      const productUpdate = await productsCollection.updateOne({_id: new ObjectId(productId)}, {$set: updatedProductObject})
      if (productUpdate) {
        return await products(productID)
      } else {
        throw `Unable to add review`
      }
    }
  } else {
      throw `Unable to find product ID`
  }

  

};

const removeReview = async (reviewId) => {
  argumentProvidedValidation(reviewId, 'reviewId')
  primitiveTypeValidation(reviewId, 'reviewId', 'String')

  reviewId = reviewId.trim()
  objectIdValidation(reviewId)

  let productsInformation = await productsCollection.find().project({_id: 1, 'reviews.id': 1}).toArray()
  let _pid = undefined
  let _iValue = undefined
  let _jValue = undefined

  for(let i=0; i<productsInformation.length; i++) {
    for(let j=0; j<productInformation[i].reviews.length; i++) {
      if(productsInformation[i].reviews[j]._id.toString() == reviewId) {
        _pid = productsInformation[i].reviews[j]._id
        _iValue = i
        _jValue = j
      }
    }
  }

  if(_pid && _iValue && _jValue) {
    productsInformation.splice(productsInformation[_iValue].reviews[_jValue])
  } else {
    throw `Unable to find product`
  }


  
};

export default {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  removeReview
}