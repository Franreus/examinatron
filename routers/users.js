const {getHashPassword,comparePassword} = require('../src/utils')
const express = require('express')
const User = require('../models/users')
const router = new express.Router()

router.get('/users/:email&:password', async (req, res) => {
	try {
		const password = await getHashPassword(req.params.password)
		const user = await User.findOne({"email":req.params.email,"password":password})
		if (!user) return res.status(404).send()
		return res.send(user)
	} catch (e) {
		return res.status(500).send()
	}
})

router.post('/users', async (req, res) => {
	try {
		req.body.password = await getHashPassword(req.body.password)
		const user = new User(req.body)
		await user.save()
		res.status(201).send('User Added')
	} catch (e){
		console.log(e)
		return res.status(400).send(e)
	}
	
})

router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
	try{
		  const user = await User.findByIdAndUpdate(req.params.id,req.body)
		if (!user) return res.status(404).send()
		  return res.send('User updated')
	}catch{
		return res.status(500).send()
	}
})

router.delete('/users/:id', async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)
		if (!user) return res.status(404).send()
		return res.send('User deleted')
	} catch (e) {
		return res.status(500).send()
	}
})

module.exports = router
