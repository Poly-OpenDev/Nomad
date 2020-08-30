const ReplDatabase = require('repl-database')

;(async () => {
	const database = await new ReplDatabase()

	const users = database.collection('users')
	
	module.exports = users
})()


/*
user.set('friend', [
	{
		message: 'Hello!',
		author: 'friend'
	}, 
	{
		message: 'Test!',
		// if !author then set to replit-username
	}
])
*/