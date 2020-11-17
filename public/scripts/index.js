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
	});
	const answers = document.querySelectorAll('.question ul li')
	answers.forEach(answer => {
		answer.addEventListener('click', function(e){
			this.parentNode.querySelectorAll('li').forEach(answerParent => (answerParent.dataset.correct === '1' ? answerParent.classList = 'correct' : answerParent.classList = 'incorrect'))
		})
	})
})
.catch(e => console.log(e))