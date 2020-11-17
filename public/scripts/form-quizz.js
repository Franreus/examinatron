const formQuizz = document.querySelector('.form-quizz form')
formQuizz.addEventListener('submit', (e) => {
	e.preventDefault()
	data = {
		question:formQuizz.querySelector('input#question').value,
		answers:[
			{
				answer:formQuizz.querySelector('input#answer1').value,
				correct:(formQuizz.querySelector('input#answerCorrect1').checked ? "1":"0")
			},
			{
				answer:formQuizz.querySelector('input#answer2').value,
				correct:(formQuizz.querySelector('input#answerCorrect2').checked ? "1":"0")
			},
			{
				answer:formQuizz.querySelector('input#answer3').value,
				correct:(formQuizz.querySelector('input#answerCorrect3').checked ? "1":"0")
			},
			{
				answer:formQuizz.querySelector('input#answer4').value,
				correct:(formQuizz.querySelector('input#answerCorrect4').checked ? "1":"0")
			}
		]
	}
	fetch('/api/questions',{
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body:JSON.stringify(data)})
	.then(res => res.text())
	.then(data => alert(data))
	.catch(e => console.log(e))
	formQuizz.reset()
})