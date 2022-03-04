const { Router } = require('express')

const { Question } = require('../../../models')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    res.status(200).json(Question.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    console.log(req.params)
    res.status(200).json(Question.getById(req.params.quizId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:questionsId', (req, res) => {
  try {
    console.log(req.params)
    res.status(200).json(Question.delete(req.params.id))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:questionsId', (req, res) => {
  try {
    // verifier si l'id du quizz dans l'url est egale a celui de la question cree que l'on veut modifier
    const updateQuestions = req.body
    updateQuestions.quizId = req.params.quizId
    console.log(req.params)
    Question.update(req.params.questionsId, updateQuestions)
    res.status(200).json('c modifier pour question')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const newQuestions = req.body
    newQuestions.quizId = req.params.quizId
    const question = Question.create(newQuestions)
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
