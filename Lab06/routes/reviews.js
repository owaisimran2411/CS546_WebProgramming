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
            res.status(400).json({error: e})
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
    //code here for GET
  })
  .patch(async (req, res) => {
    //code for PATCH
  })
  .delete(async (req, res) => {
    //code here for DELETE
  });

export default router