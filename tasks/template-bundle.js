
module.exports = function(grunt){

	var _ = grunt.util._,
		path = require("path");

	grunt.registerMultiTask("template_bundle", "bundle template files as javascript file", function(){

		var o = this.options({
			list: false,
			trim: true,
			base: "./templates",
			template: "module.exports = <%=data %>;"
		});

		this.files.forEach(function(file){
			var data = {}, list = [];

			file.src.forEach(function(name){
				var key, value;
				value = grunt.file.read(name);
				key = (function(name){
					var p = path.parse(path.relative(o.base, name));
					return path.join(p.dir, p.name);
				}(name));

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

			data = grunt.template.process(
				o.template,
				{ data: { data: JSON.stringify(data) } }
			);

			grunt.file.write(file.dest, data);
			grunt.log.writeln("Bundle > " + file.dest);
		});

	});

};