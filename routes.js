/* eslint-disable new-cap */
/* eslint-disable capitalized-comments */
const router = require('express').Router()

// const multer = require('multer')
// const upload = multer({ dest: __dirname + '/uploads/' })

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/documents', (req, res) => {
	res.render('documents')
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

router.get('/document', (req, res) => {
	res.render('document')
})

router.get('/users', (req, res) => {
	res.render('users')
})

router.get('/user/create', (req, res) => {
	res.render('userCreate')
})

// Document -----

const documentController = require('./controllers/documentController')

router.get('/api/documents', documentController.documents_get)

router.get('/api/document/sign-s3', documentController.document_sign_s3_get)

router.get('/api/documents/deleteall', documentController.documents_delete_all_get)

router.post('/api/document/create', documentController.document_create_post)
// router.post('/api/document/create', upload.single('document'), documentController.document_create_post)

router.get('/api/document/:id', documentController.document_detail_get)

router.post('/api/document/:id/delete', documentController.document_delete_post)

router.post('/api/document/:id/reject', documentController.document_reject_post)

router.post('/api/document/:id/edit', documentController.document_update_post)


// User -----

const userController = require('./controllers/userController')

router.get('/api/users', userController.users_get)

router.get('/api/user/:id', userController.user_detail_get)

router.get('/api/users/deleteall', userController.users_delete_all_get)

router.post('/api/user/create', userController.user_create_post)

router.post('/api/user/:id/delete', userController.user_delete_post)

router.post('/api/user/:id/edit', userController.user_update_post)

router.post('/api/user/:id/activate', userController.user_activate_post)

router.post('/api/user/login', userController.user_login_post)





module.exports = router
