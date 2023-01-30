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

// API for Board
lessonRoute.get('/board/',
  async (req, res) => {
    try {

      const post2 = await LessonModel.aggregate([
        {
          $sample: {
            size: 1
          },
        },
        {
            "$unwind": "$solutions"
        },
         {
           "$group": {
               "_id": "$name", 
               "total": {
                   "$sum": "$solutions.solvedNumber"
               }
           }
       },
       {
           "$project": {
              "_id": 0,
              "name": "$_id",
              "total": 1
          }
       }
       ])

      const post = await LessonModel.findOne({name: post2[0]['name']});

      let target = post['targetNumber']
      let solved = post2[0]['total']

      let title = post['name'] + " " + solved + " / " + target
      let message = ""

      if(solved > target) {
        message = "HEDEF TAMAMLANDI"
      } else {
        let question = target - solved
        message = "KALAN " + question + " SORU"
      }

      var data = {
        title: title,
        message: message
      };

      res.json(data)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = lessonRoute
