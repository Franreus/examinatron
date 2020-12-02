const bcrypt = require('bcryptjs')
const password = 'wtfwtf'
const getHash = async() => {
	const hash = await bcrypt.hash(password, 8)
	return hash
}
const compare = async() => {
	const hash = await getHash()
	console.log(hash)
	const isCorrect = await bcrypt.compare(password, hash)
	console.log(isCorrect)
}

compare()
