let documentFormVue

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	documentFormVue = new Vue({
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
			
		},

		mounted: function() {
			M.AutoInit()
			hideWait()
		}
	})
})
