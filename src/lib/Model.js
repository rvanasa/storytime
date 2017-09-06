'use strict'

var mongoose = require('mongoose');

module.exports = function()
{
	class Model
	{
		constructor(name)
		{
			this.name = name;
			
			this.props = {};
			this.methods = {};
		}
		
		table(tableName)
		{
			this.tableName = tableName;
		}
		
		prop(name, type, options)
		{
			// if(type === null) type = mongoose.Schema.Types.Mixed;
			
			this.prev = Object.assign({
				type, required: true,
			}, options);
			this.props[name] = this.prev;
			
			if(typeof type === 'string')
			{
				this.prev.type = mongoose.Schema.Types.ObjectId;
				this.prev.ref = type;
			}
			return this;
		}
		
		ref(type)
		{
			this.prev.type = mongoose.Schema.Types.ObjectId;
			this.prev.ref = type;
			return this;
		}
		
		opt()
		{
			this.prev.required = false;
			return this;
		}
		
		lowercase()
		{
			this.prev.lowercase = true;
			return this;
		}
		
		array()
		{
			delete this.prev.required;
			this.prev.type = [this.prev.type];
			return this;
		}
		
		default(provider)
		{
			this.prev.default = provider;
			return this;
		}
		
		unique()
		{
			if(!this.prev.index) this.prev.index = {};
			this.prev.index.unique = true;
			return this;
		}
		
		method(name, handler)
		{
			if(!handler)
			{
				handler = name;
				name = handler.name;
			}
			
			this.methods[name] = handler;
			return this;
		}
		
		static(name, handler)
		{
			if(!handler)
			{
				handler = name;
				name = handler.name;
			}
			
			this.statics[name] = handler;
			return this;
		}
		
		toSchema()
		{
			return new mongoose.Schema(this.props);
		}
		
		build(connection)
		{
			var schema = this.toSchema();
			
			Object.assign(schema.methods, this.methods);
			Object.assign(schema.statics, this.statics);
			
			return connection.model(this.name, schema, this.tableName);
		}
	}
	
	return (name) => new Model(name);
}