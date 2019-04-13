/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
const router = require('express').Router()

const multer = require('multer')
const upload = multer({ dest: __dirname + '/uploads/' })

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/about', (req, res) => {
	res.render('about')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.get('/document/create', (req, res) => {
	res.render('documentCreate')
})

// Machine -----

const documentController = require('./controllers/documentController')

router.get('/api/documents', documentController.documents_get)

router.get('/api/document/:id', documentController.document_detail_get)

router.get('/api/documents/deleteall', documentController.documents_delete_all_get)

router.post('/api/document/create', upload.single('document'), documentController.document_create_post)

router.post('/api/document/:id/delete', documentController.document_delete_post)

router.post('/api/document/:id/edit', documentController.document_update_post)

module.exports = router
