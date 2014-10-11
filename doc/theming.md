StackEdit theming guide
=======================

In **StackEdit**, a theme is pretty much a [LESS][1] file that overrides the default look and feel.

### Create your special theme very quickly by following these steps

 1. Fork **StackEdit** on [GitHub][2] and clone the repository localy.

 2. Install the development tools as described in the [Developer guide][3].

 3. In `res/themes`, create a LESS file, just like the other themes.

	> You can put images in `res/img`.

 4. Add an entry in `THEME_LIST` at the end of `public/res/constants.js` with the filename as a key and the name of your theme as a value.

	> **Example:** `"cool": "The coolest ever"`

 5. Run the application on your machine using the `?debug` flag. Basically:
 
        http://localhost/stackedit/?debug
 
 6. Go to `Settings -> Editor -> Theme` and select your theme. Check that everything is fine.

 7. Commit, push, create a pull request and wait for publishing.


> Written with [StackEdit](http://benweet.github.io/stackedit/).


  [1]: http://lesscss.org/
  [2]: https://github.com/benweet/stackedit
  [3]: https://github.com/benweet/stackedit/blob/master/doc/developer-guide.md#getting-started