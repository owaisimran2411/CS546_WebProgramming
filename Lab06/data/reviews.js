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
  if(typeof productInformation === "string") {
    return 'Product Not Found'
  } else {
      const reviewObject = {
        _id: new ObjectId(),
        title: title,
        reviewDate: `${reviewDate.getMonth() + 1 }/${reviewDate.getDate()}/${reviewDate.getFullYear()}`,
        reviewerName: reviewerName,
        review: review,
        rating: rating
      }
      
      productInformation.reviews.push(reviewObject)
      const ratingsArray = productInformation.reviews.map((review) => {return review.rating})
      let averageRating = (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
      averageRating = Math.round(averageRating*10)/10
      const updatedProductObject = {
        reviews: productInformation.reviews,
        averageRating: (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
      }
      
      const productUpdate = await productsCollection.updateOne({_id: new ObjectId(productId)}, {$set: updatedProductObject})
      if (productUpdate.modifiedCount>0) {
        return await productsData.get(productId)
      } else {
        return `Unable to modify product`
      }
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
  const productsInformation = await productsCollection.find({'reviews._id': new ObjectId(reviewId)}).project({_id: 0, reviews: 1}).toArray()
  
  if(productsInformation.length>0) {
    return productsInformation[0].reviews
  } else {
    return `no review found with the given review id`
  }

};

const updateReview = async (reviewId, updateObject) => {
  argumentProvidedValidation(reviewId, 'reviewId')
  argumentProvidedValidation(updateObject, 'updateObject')

  reviewId = reviewId.trim()

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
    if(updateObject.rating>=1 && updateObject.rating<=5) {
      if(Math.floor(updateObject.rating) !== updateObject.rating) {
        if(updateObject.rating.toString().split(".")[1].length > 1) {
          throw `Decimal Digits in rating greater than 1`
        }
      }
    } else {
      throw `rating is less than or equal to zero`
    }
  }
  const productsCollection = await products()
  let productsInformation = await productsCollection.find({'reviews._id': new ObjectId(reviewId)}).project({_id: 1, reviews: 1}).toArray()
  
  if (productsInformation.length>0) {
    const _pid = productsInformation[0]._id.toString()
    const newReviewsList = []
    const reviewDate = new Date()
    reviewDate.setHours(0,0,0,0)
    for(let i=0; i<productsInformation[0].reviews.length; i++) {
      const id = productsInformation[0].reviews[i]._id.toString()
      if(id === reviewId) {
        productsInformation[0].reviews[i]["review"] = updateObject.review || productsInformation[0].reviews[i]["review"]
        productsInformation[0].reviews[i]["reviewerName"] = updateObject.reviewerName || productsInformation[0].reviews[i]["reviewerName"]
        productsInformation[0].reviews[i]["rating"] = updateObject.rating || productsInformation[0].reviews[i]["rating"]
        productsInformation[0].reviews[i]["title"] = updateObject.title || productsInformation[0].reviews[i]["title"]
        productsInformation[0].reviews[i]["reviewDate"] = `${reviewDate.getMonth() + 1 }/${reviewDate.getDate()}/${reviewDate.getFullYear()}`
      } 
      newReviewsList.push(productsInformation[0].reviews[i])
      
    }
    let ratingsArray = newReviewsList.map((review) => {return review.rating})
    let averageRating = (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
    averageRating = Math.round(averageRating*10)/10
    const updatedProductObject = {
      reviews: newReviewsList,
      averageRating: (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
    }
    
    const productUpdate = await productsCollection.updateOne({_id: new ObjectId(_pid)}, {$set: updatedProductObject})
    if(productUpdate.modifiedCount>0) {
      return await productsData.get(_pid)
    } else {
      return "no change in review current and previous state"
    }
  } else {
    return "Review Not Found"
  }

  

};

const removeReview = async (reviewId) => {
  argumentProvidedValidation(reviewId, 'reviewId')
  primitiveTypeValidation(reviewId, 'reviewId', 'String')

  reviewId = reviewId.trim()
  objectIdValidation(reviewId)

  const productsCollection = await products()
  let productsInformation = await productsCollection.find({'reviews._id': new ObjectId(reviewId)}).project({_id: 1, 'reviews': 1}).toArray()
  if(productsInformation.length > 0) {
    const _pid = productsInformation[0]._id.toString()
    const newReviewsList = []
    for(let i=0; i<productsInformation[0].reviews.length; i++) {
      const id = productsInformation[0].reviews[i]._id.toString()
      if(id !== reviewId) {
        newReviewsList.push(productsInformation[0].reviews[i])
      } 
    }
    let updatedProductObject = undefined
    if(newReviewsList.length !== 0) {
      let ratingsArray = newReviewsList.map((review) => {return review.rating})
      let averageRating = (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
      averageRating = Math.round(averageRating*10)/10
      updatedProductObject = {
        reviews: newReviewsList,
        averageRating: (Math.round(ratingsArray.reduce((accumulator, current) => {return accumulator+current})*10)/10)/ratingsArray.length
      }
    } else {
      updatedProductObject = {
        reviews: newReviewsList,
        averageRating: 0
      }
    }
    const productUpdate = await productsCollection.updateOne({_id: new ObjectId(_pid)}, {$set: updatedProductObject})
    if(productUpdate.modifiedCount>0) {
      return await productsData.get(_pid)
    }
  } else {
    return "Review Not Found"
  }
  


  
};

export default {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  removeReview
}