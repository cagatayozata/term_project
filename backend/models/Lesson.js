const mongoose = require('mongoose')
const Schema = mongoose.Schema

let LessonSchema = new Schema(
  {
    name: {
      type: String,
    },
    targetNumber: {
      type: Number,
    },
    solutions: [
      {
        solvedNumber: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now
        },
      }
    ]
  },
  {
    collection: 'Lessons',
  },
)

module.exports = mongoose.model('LessonSchema', LessonSchema)
