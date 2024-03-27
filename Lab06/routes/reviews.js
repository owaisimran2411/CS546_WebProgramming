// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { reviewsData } from './../data/index.js';

import {
  // argumentProvidedValidation,
  primitiveTypeValidation,
  objectIdValidation
} from './../helpers.js'


import { Router } from 'express';

const router = Router()

router
  .route('/:productId')
  .get(async (req, res) => {
    try {
      let productId = req.params.productId

      objectIdValidation(productId)

      const searchResult = await reviewsData.getAllReviews(productId)
      if (typeof searchResult === "string") {
        res.status(404).json({error: searchResult})
      }
      else {
        res.status(200).json(searchResult)
      }
    } catch (e) {
      res.status(400).json({error: e})
    }
    //code here for GET
  })
  .post(async (req, res) => {
    if(
      "title" in req.body &&
      "reviewerName" in req.body &&
      "review" in req.body &&
      "rating" in req.body
    ) {
      try {
        let productId = req.params.productId
        let title = req.body.title
        let reviewerName = req.body.reviewerName
        let review = req.body.review
        let rating = req.body.rating

        primitiveTypeValidation(productId, "productId", "String")
        primitiveTypeValidation(title, "title", "String")
        primitiveTypeValidation(reviewerName, "reviewerName", "String")
        primitiveTypeValidation(review, "review", "String")

        productId = productId.trim()
        objectIdValidation(productId)

        title = title.trim()
        reviewerName = reviewerName.trim()
        review = review.trim()

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

        try {
          const createReview = await reviewsData.createReview(productId, title, reviewerName, review, rating)
          if(typeof createReview === 'string' && createReview === 'Product Not Found') {
            res.status(404).json({error: createReview})
          } else if (typeof createReview === 'string') {
            res.status(400).json({error: createReview})
          } else {
            res.status(200).json(createReview)
          }
        } catch (e) {
          res.status(400).json({error: e})
        }

      } catch (e) {
        res.status(400).json({error: e})
      }


    } else {
      res.status(400).json({error: 'Incomplete fields supplied'})
    }
    //code here for POST
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    try {
      let reviewId = req.params.reviewId

      objectIdValidation(reviewId)

      const searchResult = await reviewsData.getReview(reviewId)
      if (typeof searchResult === "string") {
        res.status(404).json({error: searchResult})
      }
      else {
        let data = undefined
        for(let i=0; i<searchResult.length; i++) {
          if(searchResult[i]._id.toString() == reviewId) {
            data = searchResult[i]
          }
        }
        res.status(200).json(data)
      }
    } catch (e) {
      res.status(400).json({error: e})
    }
    //code here for GET
  })
  .patch(async (req, res) => {
    let reviewId = req.params.reviewId
    reviewId = reviewId.trim()
    try {
      objectIdValidation(reviewId)
    } catch (e) {
      res.status(400).json({error: e})
    }
    
    try {
      let title = undefined
      let reviewerName = undefined
      let review = undefined
      let rating = undefined
      if("title" in req.body) {
        title = req.body.title
        primitiveTypeValidation(title, "title", "String")
        title = title.trim()
      }
      if("reviewerName" in req.body) {
        reviewerName = req.body.reviewerName
        primitiveTypeValidation(reviewerName, "reviewerName", "String")
        reviewerName = reviewerName.trim()
      }
      if("review" in req.body) {
        review = req.body.review
        primitiveTypeValidation(review, "review", "String")
        review = review.trim()
      }
      if("rating" in req.body) {
        rating = req.body.rating
        primitiveTypeValidation(rating, "rating", "Number")
        try {
          if(rating>=1 && rating<=5) {
            if(Math.floor(rating) !== rating) {
              if(rating.toString().split(".")[1].length > 1) {
                throw `Decimal Digits in rating greater than 1`
              }
            }
          } else {
            throw `rating is less than or equal to zero`
          }
        } catch (e) {
          throw e
          // res.status(400).json({error: e})
        }
      }
      if (title === undefined && review === undefined && reviewerName === undefined && rating === undefined) {
        res.status(400).json({error: 'Atleast one field should be supplied'})
      } else {
        let updateObject = {}
        if (title != undefined) {
          updateObject.title = title
        }
        if (review != undefined) {
          updateObject.review = review
        }
        if (reviewerName != undefined) {
          updateObject.reviewerName = reviewerName
        }
        if (rating != undefined) {
          updateObject.rating = rating
        }
        try {
          const patchReview = await reviewsData.updateReview(reviewId, updateObject)
          if(typeof patchReview === 'string') {
            res.status(404).json({error: patchReview})
          } else {
            res.status(200).json(patchReview)
          }
        } catch (e) {
          res.status(400).json({error: e})
        }
      }
    } catch (e) {
      res.status(400).json({error: e})
    }
    //code for PATCH
  })
  .delete(async (req, res) => {
    try {
      let reviewId = req.params.reviewId

      objectIdValidation(reviewId)

      const deleteReview = await reviewsData.removeReview(reviewId)
      if (typeof deleteReview === "string") {
        res.status(404).json({error: deleteReview})
      }
      else {
        res.status(200).json(deleteReview)
      }
    } catch (e) {
      res.status(400).json({error: e})
    }
    //code here for DELETE
  });

export default router