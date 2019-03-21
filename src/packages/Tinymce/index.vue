<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea"/>
    <div class="editor-custom-btn-container">
      <editorImage :req-data="{id: 'add'}" :action="action" :file-pach="filePach" color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
    </div>
  </div>
</template>

<script>
// import tinymceJs from '/static/tinymce4.7.5/tinymce.min.js'
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      // default: 'file edit insert view format table'
      default: 'view'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    action: {
      type: String,
      default: 'http://httpbin.org/post'
    },
    filePach: {
      type: String,
      default: 'imagePath'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['zh']
    }
  },
  watch: {
    // value(val) {
    //   if (!this.hasChange && this.hasInit) {
    //     this.$nextTick(() =>
    //       window.tinymce.get(this.tinymceId).setContent(val || ''))
    //   }
    // },
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => {
          window.tinymce.get(this.tinymceId).setContent(val || '')
          if (this.getContent() && this.getContent().length === 0) {
            this.$emit('showError', '请编辑显示内容');
          } else {
            this.$emit('showError', '');
          }
        })
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    }
  },
  mounted() {
    this.initTinymce()
  },
  activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        language: this.language,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        // valid_elements : 'img[@error=loadError()|src|class]',
        extended_valid_elements: 'img[@error=loadError()|path|class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]',
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            _this.hasChange = true
            _this.$emit('input', editor.getContent())
          })
          if (editor.getContent().length === 0){
            _this.$emit('showError', '编辑内容不能为空1');
          } else {
            _this.$emit('showError', '');
          }
          return _this.$emit('showError', '');
        },
        setup(editor) {
          editor.on('keydown', function (evt) {
            let wordCount = editor.plugins.wordcount.getCount();
            if(evt.keyCode === 8 || evt.keyCode === 46) return
            if (wordCount >= 100000) {
              evt.preventDefault();
              evt.stopPropagation();
            }
          });
          editor.on('NodeChange Change KeyUp', (evt) => {
            console.log(editor.plugins.wordcount)
            let wordCount = editor.plugins.wordcount.getCount();
            if (wordCount > 100000) {
              return _this.$emit('showError', '请输入文字1~100000字');
            } 
            if (editor.getContent().length === 0){
              return _this.$emit('showError', '编辑内容不能为空！')
            }
            return _this.$emit('showError', '');
          });
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }

      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      // console.log(this.tinymceId)
      this.$emit('imageSuccessCBK', arr, this.tinymceId)
      // const _this = this
      // arr.forEach(v => {
      //   window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      // })
    }
  }
}
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
