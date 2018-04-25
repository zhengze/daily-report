<template>
  <el-row class="container">
    <headerComponent :activeIndex="activeIndex"></headerComponent>
  <el-main>
    <el-row>
    <el-col :span="24" class="toolbar">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
		  <el-button type="primary">提交</el-button>
		  <el-button>重置</el-button>
		</el-form-item>
        <el-form-item>
        <quill-editor ref="myTextEditor"
              v-model="content"
              :config="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
        </quill-editor>
		</el-form-item>
      </el-form>
    </el-col>
    </el-row>
  </el-main>
  </el-row>
</template>
<script>
import headerComponent from '../components/header'
export default {
  data () {
    return {
      activeIndex: '3',
 	  ruleForm: {},
      rules: {},
      content: '日报',
      editorOption: {
      }
    }
  },
  components: {
    headerComponent
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onEditorBlur(editor){
    },
    onEditorFocus(editor){
    },
    onEditorReady(editor){
    },
    onEditorChange(editor){
    }
  },
  mounted () {
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  watch: {
  }
}
</script>
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    .el-main {
      top: 60px;
      bottom: 0px;
      .el-row {
        height: 500px;
        padding-left: 200px;
        padding-right: 200px;
        .myreport {
          text-align: left;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
