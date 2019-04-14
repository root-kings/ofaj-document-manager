let documentFormVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	documentFormVue = new Vue({
		el: '#documentCreateForm',
		data: {
			user: localStorage.getItem('loggedUser'),
			name: '',
			selectedofficer: '',
			file: '',
			fileUrl: '',
			urgent: false,
			officers: []
		},

		methods: {
			onSubmit: function() {
				showWait()

				// let formData = new FormData()
				// formData.append('document', this.file)
				// formData.append('applicant', this.user)
				// formData.append('name', this.name)
				// formData.append('officer', this.selectedofficer)
				// formData.append('urgent', this.urgent)

				axios
					// .post('/api/document/create', formData, {
					// 	headers: {
					// 		'Content-Type': 'multipart/form-data'
					// 	}
					// })
					.post('/api/document/create', {
						fileUrl: this.fileUrl,
						applicant: this.user,
						name: this.name,
						officer: this.selectedofficer,
						urgent: this.urgent
					})
					.then(function(response) {
						M.toast({ html: 'Document application sent!' })
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
					.then(function() {
						hideWait()
						// TODO: redirect to success page
					})
			},

			onFileUpload: function() {
				this.file = this.$refs.file.files[0]
				if (this.file == null) return alert('No file selected.')
				this.getSignedRequest(this.file)
			},

			getSignedRequest: function(file) {
				// console.log(file)
				currentVue = this
				axios
					.get('/api/document/sign-s3', {
						params: {
							fileName: file.name,
							fileType: file.type
						}
					})
					.then(function(response) {
						let data = response.data
						currentVue.uploadFile(file, data.signedRequest, data.url)
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
			},

			uploadFile: function(file, signedRequest, url) {
				currentVue = this

				fetch(signedRequest, {
					method: 'PUT',
					mode: 'cors',
					body: file
				})
					.then(function(response) {
						currentVue.fileUrl = url
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
			},

			populateOfficers: function() {
				let currentVue = this

				axios
					.get('/api/users')
					.then(function(response) {
						currentVue.officers = response.data

						// let officerSelectInstance = M.FormSelect.init(this.$refs.officerSelect)
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
			}
		},

		created: function() {},

		mounted: function() {
			M.AutoInit()
			// console.log(officerSelectInstance.dropdownOptions)
			M.updateTextFields()
			this.populateOfficers()

			hideWait()
		}
	})
})
