const express = require('express')
const Question = require('../models/questions')
const router = new express.Router()

router.get('/questions', async (req, res) => {
	try {
		const questions = await Question.find({})
		if (!questions) return res.status(404).send()
		return res.send(questions)
	} catch (e) {
		return res.status(500).send()
	}
})

router.get('/questions/:id', async (req, res) => {
	try {
		const questions = await Question.findById(req.params.id)
		if (!questions) return res.status(404).send()
		return res.send(questions)
	} catch (e) {
		return res.status(500).send()
	}
})

router.post('/questions', async (req, res) => {
	try {
		//const oldQuestion = await Question.find({"question":req.body['question']})
		//console.log(oldQuestion)
		//if(oldQuestion.length > 0)	return res.send('Question already exists')
		console.log(req.body)
		const questions = new Question(req.body)
		await questions.save()
		res.status(201).send('Question Added')
	} catch (e){
		console.log(e)
		return res.status(400).send(e)
	}
	
})

router.patch('/questions/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['question']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
	try{
		  const questions = await Question.findByIdAndUpdate(req.params.id,req.body)
		if (!questions) return res.status(404).send()
		  return res.send('Question updated')
	}catch{
		return res.status(500).send()
	}
})

router.delete('/questions/:id', async (req, res) => {
	try {
		const questions = await Question.findByIdAndDelete(req.params.id)
		if (!questions) return res.status(404).send()
		return res.send('Question deleted')
	} catch (e) {
		return res.status(500).send()
	}
})

module.exports = router
