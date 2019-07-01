import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import VueQuillEditor from 'vue-quill-editor'
// import { ImageResize } from 'quill-image-resize-module';
import md5 from 'js-md5';

import 'element-ui/lib/theme-chalk/index.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// VueQuillEditor.register('modules/imageResize', ImageResize);
Vue.use(ElementUI);
Vue.use(VueQuillEditor)
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
