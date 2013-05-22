StackEdit theming guide
=======================

In **StackEdit**, a theme is pretty much a CSS file that overrides the default look and feel.

*Create your special theme very quickly by following these steps:*

 1. Fork **StackEdit** on [GitHub][1].

 2. In the `themes` folder, create a sub-folder containing your resources (CSS, images...).

	> The CSS file should have the same name as the sub-folder.

	> **Example:** `themes/cool-theme/cool-theme.css`

 3. Add an entry in `THEME_LIST` at the end of `config.js` with the folder name as a key and the name of your theme as a value.

	> **Example:** `"cool-theme": "The coolest ever"`

 4. Run the application on your machine, go to `Settings -> Editor -> Theme` and select your theme. Check that everything is marvelous (don't forget to test the `viewer.html`).

 5. List your resource files in `cache.manifest`, commit, push, create a pull request and wait for publishing...

That's it!

### Please, keep in mind these simple rules

 - Avoid using gradients, shadows and other effects as much as possible (for performance concern).
 - Try to create something at least as nice as the default theme...


> Written with [StackEdit](http://benweet.github.io/stackedit/).


  [1]: https://github.com/benweet/stackedit