const express = require('express')

const passport = require('passport')

const Entry = require('../models/entry')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
router.get('/entries', requireToken, (req, res, next) => {
  Entry.find()
    .then(entries => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return entries.map(entry => entry.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(entries => res.status(200).json({ entries: entries }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
router.get('/entries/:id', requireToken, (req, res, next) => {
  Entry.findById(req.params.id)
    .then(handle404)
    .then(entry => res.status(200).json({ entry: entry.toObject() }))
    .catch(next)
})

// CREATE
router.post('/entries', requireToken, (req, res, next) => {
  req.body.entry.owner = req.user.id
  Entry.create(req.body.entry)
    .then(entry => {
      res.status(201).json({ entry: entry.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/entries/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.entry.owner

  Entry.findById(req.params.id)
    .then(handle404)
    .then(entry => {
      requireOwnership(req, entry)
      return entry.updateOne(req.body.entry)
    })
    .then(() => res.sendStatus(204))

    .catch(next)
})

// DESTROY
router.delete('/entries/:id', requireToken, (req, res, next) => {
  Entry.findById(req.params.id)
    .then(handle404)
    .then(entry => {
      requireOwnership(req, entry)
      entry.deleteOne()
    })

    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
