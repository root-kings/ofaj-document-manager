let documentFormVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	documentFormVue = new Vue({
		el: '#documentCreateForm',
		data: {
			name: '',
			officer: '',
			file: '',
			officers: [{ name: 'Officer 0', _id: 'o00000' }, { name: 'Officer 1', _id: 'o00001' }]
		},

		methods: {
			onSubmit: function() {
				showWait()

				let formData = new FormData()
				formData.append('document', this.file)
				formData.append('name', this.name)
				formData.append('officer', this.officer)

				axios
					.post('/api/document/create', formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(function(response) {
						M.toast({ html: 'Document application sent!' })
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.err(error)
					})
					.then(function() {
						hideWait()
						// TODO: redirect to success page
					})
			},

			onFileUpload: function() {
				this.file = this.$refs.file.files[0]
			}
		},

		mounted: function() {
			M.AutoInit()
			M.updateTextFields()
			hideWait()
		}
	})
})
