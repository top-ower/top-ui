<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="mini" type="primary" round @click="openDialog">{{ btnText }}
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" title="上传文件">
      <el-upload
        :multiple="multiple"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="onError"
        :before-upload="beforeUpload"
        :data="reqData"
        :headers="headers"
        :action="action"
        :accept="accept"
        class="editor-slide-upload"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <!--  <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button> -->
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'EditorSlideUpload',
  computed: {
    ...mapGetters([
      'companyId',
      'baseUploadUrl'
    ])

  },
  props: {
    accept: {
      type: String,
      default: '.png,.jpg,jpeg,.gif'
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    reqData: {
      type: Object
    },
    multiple: {
      type: Boolean,
      default: true
    },
    action: {
      type: String,
      default: 'http://httpbin.org/post'
    },
    index: {
      type: Number,
      default: 0
    },
    btnText: {
      type: String,
      default: '上传图片'
    },
    filePach: {
      type: String,
      default: 'imagePath'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      headers: {
        Authorization: getToken()
      }
    }
  },
  mounted() {
    console.log(this.headers)
  },
  methods: {
    openDialog() {
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = true
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr, this.index)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(res, file) {
      console.log(res)
      if(res && res.status !== 0){
        this.$message({
          message: res && res.message,
          type: 'error',
          center: true
        })
        this.fileList = []
        return
      }
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      // console.log(objKeyArr)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = `${this.baseUploadUrl}${res && res.data[this.filePach]}`
          this.listObj[objKeyArr[i]].path = res && res.data[this.filePach]
          this.listObj[objKeyArr[i]].id = res && res.data.id
          this.listObj[objKeyArr[i]].msg = res && res.message
          this.listObj[objKeyArr[i]].hasSuccess = true
          this.handleSubmit()
          return
        }
      }
    },
    onError(err, file, fileList) {
      console.log(err)
      this.fileList = []
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      // console.log(file)
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;

  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}

.el-dialog__wrapper .el-dialog .el-dialog__header {
  border-bottom: none !important;
}

</style>
