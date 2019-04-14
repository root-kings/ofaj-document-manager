let documentsVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	documentsVue = new Vue({
		el: '#documentList',
		data: {
			documents: {
				urgent: [
					{
						name: 'Document 00',
						_id: 'o00000'
					},
					{
						name: 'Document 10',
						_id: 'o00010'
					}
				],
				normal: [
					{
						name: 'Document 01',
						_id: 'o00001'
					},
					{
						name: 'Document 11',
						_id: 'o00011'
					}
				]
			}
		},

		methods: {
			poplateDocuments: function() {
				let currentVue = this

				fetch('/api/documents')
					.then(function(response) {
						return response.json()
					})
					.then(function(documents) {
						currentVue.documents.urgent = documents.filter(document => document.urgent)
						currentVue.documents.normal = documents.filter(document => !document.urgent)
					})
					.catch(function(error) {
						M.toast({ html: 'Error occured! Check console for details.' })
						console.error(error)
					})
			},
			viewDocument: function(id) {
				localStorage.setItem('selectedDocument', id)
				window.location.href = '/document'
			}
		},

		mounted: function() {
			this.poplateDocuments()
			M.AutoInit()
			hideWait()
		}
	})
})
