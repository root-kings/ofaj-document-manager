var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var DocumentSchema = new Schema(
	{
		name: {
			type: String,
			default: '',
			required: true
		},
		applicant: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		urgent: {
			type: Boolean,
			default: false,
			required: true
		},
		fileUrl: {
			type: String,
			default: '',
			required: true
		},
		done: {
			type: Boolean,
			default: false,
			required: true
		},
		rejected: {
			type: Boolean,
			default: false,
			required: true
		},
		currentOfficer: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		history: [
			{
				officer: {
					type: Schema.Types.ObjectId,
					ref: 'User'
				},
				date: {
					type: Date
				},
				action: {
					type:String, 
					enum: ['Approved', 'Forwarded', 'Rejected', 'Finalized']
				}
			}
		]
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
