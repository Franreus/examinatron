const questions = document.querySelector('.questions')
localStorage.setItem("results", ``)
fetch('/api/questions/haha@gmail.com&testtest')
.then(res => res.json())
.then(data => {
	if(data.length == 0) questions.innerHTML = 'There are no questions'
	data.forEach(question => {
		let answers = '';
		question['answers'].forEach(answer => {
			answers += `<li data-correct="${answer['correct']}">${answer['answer']}</li>`
		})
		questions.innerHTML += `<div id="${question['_id']}" class="question">
			<p><b>${question['question']}</b></p>
			<ul>${answers}</ul>
		</div>`
	});
	const answers = document.querySelectorAll('.question ul li')
	let resultsLocal = ''
	let numCorrect = 0
	answers.forEach(answer => {
		if(answer.dataset.correct === '1') numCorrect++
		answer.addEventListener('click', function(e){
			const idQuestion = this.parentElement.parentElement.id
			const answerValue = this.textContent
			const correct = this.dataset.correct
			resultsLocal = localStorage.getItem("results") || ''
			try {
				resultsLocal = JSON.parse(resultsLocal)
			}catch{
				resultsLocal = ''
			}
			if(this.classList.contains('selected')){
				this.classList.remove('selected')
				if(typeof(resultsLocal) === 'object'){
					if(idQuestion in resultsLocal && answerValue in resultsLocal[idQuestion]){
						delete resultsLocal[idQuestion][answerValue]
						localStorage.setItem("results", JSON.stringify(resultsLocal))
					}
				}
			}else{
				this.classList.add('selected')
				if(typeof(resultsLocal) === 'object'){
					if(idQuestion in resultsLocal){
						resultsLocal[idQuestion] = {[answerValue]:correct,...resultsLocal[idQuestion]}
					}else{
						resultsLocal[idQuestion] = {[answerValue]:correct}	
					}
					localStorage.setItem("results", JSON.stringify(resultsLocal))
				}else{
					localStorage.setItem("results", `{"${idQuestion}":{"${answerValue}":"${correct}"}}`)
				}
			}
		})
	})
	const getResults = document.querySelector('.get-results')
	getResults.addEventListener('click',() => {
		resultsLocal = localStorage.getItem("results") || ''
		try {
			resultsLocal = JSON.parse(resultsLocal)
		}catch{
			resultsLocal = ''
		}
		if(typeof(resultsLocal) === 'object' && numCorrect > 0){
			let points = 0
			let notCorrect = 0
			const pointValue = 10/numCorrect
			for (const question in resultsLocal){
				for (const answer in resultsLocal[question]){
					if(resultsLocal[question][answer] === '1'){
						points += pointValue
					}else	notCorrect++
				}
			}
			points = points - (Math.floor(notCorrect/3)*pointValue)
			answers.forEach(answer => answer.classList.add((answer.dataset.correct === '1' ? 'correct': 'incorrect')))
			alert(`Has conseguido ${points} puntos de 10`)
		}
	})

})
.catch(e => console.log(e))