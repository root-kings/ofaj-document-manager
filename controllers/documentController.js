var Document = require('../models/document')

var moment = require('moment')

// API -----
exports.document_detail_get = (req, res) => {
	Document.findById(req.params.id).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.documents_get = (req, res) => {
	Document.find({}).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.document_create_post = (req, res) => {
	let newdocument = new Document({
		name: req.body.name
	})

	newdocument.save((err, result) => {
		if (err) return res.status(500).send(err)

		return res.send(result)
	})
}

exports.documents_delete_all_get = (req, res) => {
	Document.remove({}, (err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}

exports.document_delete_post = (req, res) => {
	Document.findByIdAndRemove(req.params.id, (err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(true)

		return res.send(false)
	})
}

exports.document_update_post = (req, res) => {
	let newdocument = {
		name: req.body.name
	}

	Document.findOneAndUpdate(
		{
			_id: req.params.id
		},
		newdocument,
		{
			safe: true,
			upsert: true
		}
	).exec((err, result) => {
		if (err) return res.status(500).send(err)

		if (result) return res.send(result)

		return res.send(false)
	})
}
