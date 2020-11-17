const mongoose = require('mongoose')
const validator = require('validator')


const answerSchema = new mongoose.Schema({
	answer:{
		type: String,
		required: true
	},
	correct:{
		type: String,
		required: true,
		default: 0
	}
});

const Question = mongoose.model('Questions', {
	question: {
		type: String,
		required: true
	},
	answers: [answerSchema]
})

module.exports = Question