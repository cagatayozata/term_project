const express = require('express')
const lessonRoute = express.Router()

// model
let LessonModel = require('../models/Lesson')

// List History
lessonRoute.route('/gecmis/:name').get((req, res, next) => {
  if (req.params.name != 'all') {
    LessonModel.find({name: req.params.name}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }
  else {
    LessonModel.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  }
})

// Add Solution
lessonRoute.post('/addSolution/',
  async (req, res) => {
    try {
      const post = await LessonModel.findOne({name: req.body.name});
      const newComment = {
        solvedNumber: req.body.solvedNumber
      };
      post.solutions.unshift(newComment);
      await post.save();
      res.json(post.solutions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Add Lesson
lessonRoute.route('/addLesson').post((req, res, next) => {
  LessonModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Delete Lesson
lessonRoute.route('/deleteLesson/:id').delete((req, res, next) => {
  LessonModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = lessonRoute
