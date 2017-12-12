npm run build
  ->
live-server: dist
 ->
  index.html resource
    -> manifest


dist folder -> integrate to static blog dist

>
  二次开发 在 src folder 进行
  npm run build  ->  输出 dist目录


Notes:
  - Gzip off
  - config/index.js -> build / dev  env ·


TODO:


  - 添加 header ,
  - App.vue
    - 去掉 splash-screen
  - navbar:
    - background-color
    - icons : size / color / hover color
    - link dialog
    - img : upload ,
    - 去除 「File System」component
    - 规范icon 导出 path 格式

  - feature:
    - img upload  / （ P0 ）
      - from URL
      - from Diskt
      - Drag & Drop
    - save to draft （ P0 ）
    - adjust Dialog style
    - write new article （ P1 ）
    - import / export
      - import:
        -  from online ?  （ P1 )
        -  from disk （ ok ）
      - export :
        - to disk (MD / Plain HTML / Plain Text)
          - TODO : 样式调整
          -

    - md systax help （ P0 ）
vuex :


  |->  View (Vue component) -> dispatch
  |    Action -> commit
  |    Mutation -> mutate
  |      -> State ->
  |  <----- render

 - Action 类似于 mutation，不同在于：
   - Action 提交的是 mutation，而不是直接变更状态。
   - Action 可以包含任意**异步**操作。



---
博客写作平台对比
  - WordPress
  - Medium
  - Tumblr
  - Ghost
    - 使用体验

---
#### logdown Features:

 - with in-editor Preview
 - Drag & Drop in-line image uploading
 - Control your content with Public / Private / Draft options
 - Github Flavored Markdown, LaTex ( MathJax )
 - Octopres / Wordpress / Tumblr / Blogger / MT easy import/export
 - Custom Domain & Custom URL. Keep it compatible with old blogs
 - Choose from Themes or custom HTML





---
### Vue 入坑指南

```js
var vm = new Vue({
    el: '#example',
    data: {
      message: 'Hello'
    },
    computed: {
      // a computed getter
      reversedMessage: function () {
        // `this` points to the vm instance
        return this.message.split('').reverse().join('')
      }
    }
})
```js


====>

<h3>Vue 入坑指南</h3>

<code>
        var vm = new Vue({
            el: '#example',
            data: {
              message: 'Hello'
            },
            computed: {
              // a computed getter
              reversedMessage: function () {
                // `this` points to the vm instance
                return this.message.split('').reverse().join('')
              }
            }
        })
</code>


Systax highlight plugin : Prismjs
    - wordpress
    - medium
