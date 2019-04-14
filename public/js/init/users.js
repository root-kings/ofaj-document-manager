let usersVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	usersVue = new Vue({
		el: '#userList',
		data: {
			users: []
		},

		methods: {
			poplateUsers: function() {
				showWait()
				let currentVue = this

				fetch('/api/users')
					.then(function(response) {
						return response.json()
					})
					.then(function(users) {
						currentVue.users = users
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
					.then(function(){
						hideWait()
					})
			}
		},

		mounted: function() {
			this.poplateUsers()
			M.AutoInit()
			hideWait()
		}
	})
})
