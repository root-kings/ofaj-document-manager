let documentVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	documentVue = new Vue({
		el: '#document',
		data: {
			documentId: '',
			name: '',
			urgent: false,
			fileUrl: '',
			done: false,
			rejected: false,
			_id: '',
			applicant: '',
			currentOfficer: '',
			history: []
		},

		methods: {
			poplateDocument: function() {
				this.documentId = localStorage.getItem('selectedDocument')

				let currentVue = this

				fetch(`/api/document/${currentVue.documentId}`)
					.then(function(response) {
						return response.json()
					})
					.then(function(document) {
						currentVue.name           = document.name
						currentVue.urgent         = document.urgent
						currentVue.fileUrl        = document.fileUrl
						currentVue.done           = document.done
						currentVue.rejected       = document.rejected
						currentVue._id            = document._id
						currentVue.applicant      = document.applicant
						currentVue.currentOfficer = document.currentOfficer
						currentVue.history        = document.history
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
			}
		},

		mounted: function() {
			this.poplateDocument()
			M.AutoInit()
			hideWait()
		}
	})
})
