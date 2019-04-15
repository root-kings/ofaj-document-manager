let loginFormVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	loginFormVue = new Vue({
		el: '#loginForm',
		data: {
			user: '',
			users: []
		},

		methods: {
			onSubmit: function() {
				showWait()
				if (this.user != undefined && this.user != '') {
					localStorage.setItem('loggedUser', this.user)
					window.location.href = '/'
				} else {
					alert('Please select a user!')
				}
				hideWait()
			},

			populateUsers: function() {
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
			}
		},

		mounted: function() {
			M.AutoInit()
			M.updateTextFields()
			this.populateUsers()

			hideWait()
		}
	})
})
