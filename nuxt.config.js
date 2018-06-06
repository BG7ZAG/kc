  module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '康诚机电',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0' },
      { hid: 'description', name: 'description', content: '康诚机电' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  styleResources: {
    scss: ' ./ assets / variables.scss ',
    less: ' ./assets /* . less ',
    // sass：...，
    // scss：...
    options : {
      //参见https://github.com/yenshih/style-resources-loader#options
      //除`patterns`属性外
    }
  },

  vender:[
    'element-ui'
  ],
  babel:{
    "plugins": [["component", [
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-default"
      },
      'transform-async-to-generator',
      'transform-runtime'
    ]]],
    comments: true
  },
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
  ],

}
