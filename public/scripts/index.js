const questions = document.querySelector('.questions')

fetch('/api/questions')
.then(res => res.json())
.then(data => {
	if(data.length == 0) questions.innerHTML = 'There are no questions'
	data.forEach(question => {
		let answers = '';
		question['answers'].forEach(answer => {
			answers += `<li data-correct="${answer['correct']}">${answer['answer']}</li>`
		})
		questions.innerHTML += `<div class="question">
			<p><b>${question['question']}</b></p>
			<ul>${answers}</ul>
		</div>`
		console.log(answers)
	});
})
.catch(e => console.log(e))