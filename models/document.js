var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var DocumentSchema = new Schema(
	{
		name: {
			type: String,
			default: ''
		}
	},
	{
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
)

module.exports = mongoose.model('Document', DocumentSchema)
