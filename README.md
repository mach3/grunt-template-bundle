
# grunt-template-bundle

Grunt plugin to bundle templates

```
grunt.initConfig({
	template_bundle: {
		options: {
			list: false, // if true, export as array
			trim: true, // if true, trim indents in template
			header: "module.exports = " // header string for dest file
		},

		bundle: {
			dest: "./html/assets/js/templates.js",
			src: ["./html/assets/templates/**/*.html"]
		}
	}
})
```
