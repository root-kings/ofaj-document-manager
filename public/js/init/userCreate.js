let userFormVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	userFormVue = new Vue({
		el: '#userCreateForm',
		data: {
			name: '',
			username: '',
			email: '',
			password: '',
			phone: ''
		},

		methods: {
			onSubmit: function() {
				showWait()

				axios
					.post('/api/user/create', {
						name: this.name,
						username: this.username,
						email: this.email,
						password: this.password,
						phone: this.phone
					})
					.then(function(response) {
						M.toast({ html: 'User application sent!' })
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.err(error)
					})
					.then(function() {
						hideWait()
						// TODO: redirect to success page
					})
			}
		},

		mounted: function() {
			M.AutoInit()
			M.updateTextFields()
			hideWait()
		}
	})
})
