
module.exports = function(grunt){

	var _ = grunt.util._,
		path = require("path");

	grunt.registerMultiTask("template_bundle", "", function(){

		var o = this.options({
			list: false,
			trim: true,
			header: "module.exports = "
		});

		this.files.forEach(function(file){
			var data = {}, list = [];

			file.src.forEach(function(name){
				var key, value;
				value = grunt.file.read(name);
				key = path.parse(name).name;
				data[key] = o.trim ? value.replace(/\n\s*/g, "") : value;
			});

			if(o.list){
				_.each(data, function(value, key){
					list.push({
						name: key,
						value: value
					})
				});
				data = list;
			}

			data = o.header + JSON.stringify(data);

			grunt.file.write(file.dest, data);
			grunt.log.writeln("Bundle > " + file.dest);
		});

	});

};