const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
  mood: {
    type: String,
    enum: ['happiness', 'sadness', 'anxiety', 'irritability', 'energetic', 'calm', 'confident'],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  dayDetails: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Entry', entrySchema)
// Alternative schema??? Idk man
//   happiness: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   },
//   sadness: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   },
//   anxiety: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   },
//   irritability: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   },
//   energetic: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   },
//   calm: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   },
//   confident: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 10
//   }
// }],
