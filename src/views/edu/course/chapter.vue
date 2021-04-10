<template>
  <div class="app-container">

    <h2 style="text-align: center">发布新课程</h2>

    <el-steps :active="2" process-status="wait" finish-status="success">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="发布课程"></el-step>
    </el-steps>

    <el-button type="text" icon="el-icon-plus" @click="dialogChapter = true">添加章节</el-button>

    <!--  ======章节弹框表单=========  -->
    <el-dialog title="添加章节" :visible.sync="dialogChapter">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title"></el-input>
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapter = false">取 消</el-button>
        <el-button type="primary" @click="buttonSave">确 定</el-button>
      </div>
    </el-dialog>

    <!--  ======小节弹框表单=========  -->
    <el-dialog title="添加小节" :visible.sync="dialogVideo">
      <el-form :model="video" label-width="120px">
        <el-form-item label="小节标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video.sort" :min="0"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">收费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
      <!--    TODO      -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideo = false">取 消</el-button>
        <el-button type="primary" @click="buttonSaveVideo">确 定</el-button>
      </div>
    </el-dialog>

    <el-tree ref="tree" :data="chapterVideoList" :props="defaultProps" show-checkbox>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="custom-tree-button">
          <!-- 如果是章节，就加一个添加小节按钮  -->
          <el-button
            v-if="!data.mark"
            circle
            size="mini"
            type="success"
            icon="el-icon-plus"
            @click="videoOpenAdd(data)"
          >
          </el-button>

          <!-- 章节修改按钮 -->
          <el-button
            circle
            v-if="!data.mark"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="chapterOpenEdit(data)"
          >
          </el-button>

          <!-- 小节修改按钮 -->
          <el-button
            circle
            v-else
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="videoOpenEdit(data)"
          >
          </el-button>

          <!-- 章节删除按钮 -->
          <el-popconfirm title="此操作将永久此章节以及所有小节记录，确定吗？"
                         icon="el-icon-info"
                         v-if="!data.mark"
                         icon-color="red" @onConfirm="() => chapterOpenRemove(data)">
            <el-button
              slot="reference"
              circle
              size="mini"
              type="danger"
              icon="el-icon-delete">
            </el-button>
          </el-popconfirm>

          <!-- 小节删除按钮 -->
          <el-popconfirm title="此操作将永久此小节记录，确定吗？"
                         icon="el-icon-info"
                         v-else
                         icon-color="red" @onConfirm="() => videoDelete(data)">
            <el-button
              slot="reference"
              circle
              size="mini"
              type="danger"
              icon="el-icon-delete">
            </el-button>
          </el-popconfirm>
        </span>
      </span>
    </el-tree>

    <el-form label-width="200px">
      <el-form-item>
        <el-button style="margin-top: 12px;" type="primary" icon="el-icon-back" :disabled="disabledSaveButton"
                   @click="previous"
        >上一步
        </el-button>
        <el-button style="margin-top: 12px;" type="primary" icon="el-icon-right" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import chapter from '@/api/education/chapter'
import video from '@/api/education/video'

export default {
  data() {
    return {
      disabledSaveButton: false,
      chapterVideoList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      chapter: {
        sort: 0
      },
      video: {
        sort: 0,
        isFree: true
      },
      dialogChapter: false,
      dialogVideo: false
    }
  },
  created() {
    this.chapter.courseId = this.$route.params.id
    this.video.courseId = this.$route.params.id
    this.getChapterVideo(this.chapter.courseId)
  },
  methods: {
    // 查询章节和小节
    getChapterVideo(courseId) {
      chapter.getChapterVideo(courseId)
        .then(result => {
          this.chapterVideoList = result.data.items
          for (let i = 0; i < this.chapterVideoList.length; i++) {
            for (let j = 0; j < this.chapterVideoList[i].children.length; j++) {
              // 给子节点加个标识
              this.chapterVideoList[i].children[j].mark = true
            }
          }
        })
    },
    // 跳转到下一步
    next() {
      this.$router.push({
        path: '/course/publish/' + this.chapter.courseId
      })
    },
    // 返回上一步
    previous() {
      this.$router.push({
        path: '/course/info/' + this.chapter.courseId
      })
    },
    /* =================对于小节的操作=========================== */
    // 小节保存或更新按钮点击后
    buttonSaveVideo() {
      if (this.video.id) {
        this.updateVideo()
      } else {
        this.saveVideo()
      }
      // 置空
      this.video.title = ''
      this.video.sort = 1
      this.video.isFree = 1
    },
    // 添加小节
    saveVideo() {
      video.saveVideo(this.video)
        .then(() => {
          // 关闭弹框
          this.dialogVideo = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加小节成功'
          })
          // 重新获取章节和小节
          this.getChapterVideo(this.chapter.courseId)
        })
    },
    // 更新小节
    updateVideo() {
      this.video.gmtCreate = null
      this.video.gmtModified = null
      video.updateVideo(this.video)
        .then(() => {
          // 关闭弹框
          this.dialogVideo = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改小节成功'
          })
          // 重新获取章节和小节
          this.getChapterVideo(this.chapter.courseId)
        })
    },
    // 修改小节按钮点击后，回显数据
    videoOpenEdit(data) {
      this.dialogVideo = true
      video.getVideo(data.id)
        .then(result => {
          this.video = result.data.items
        })
    },
    // 添加小节按钮点击后
    videoOpenAdd(data) {
      this.dialogVideo = true
      // 初始化
      this.video.id = ''

      this.video.chapterId = data.id
    },
    // 删除小节
    videoDelete(data) {
      video.deleteVideo(data.id)
        .then(() => {
          this.getChapterVideo(this.chapter.courseId)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
    },

    /* =================对于章节的操作=========================== */
    // 添加章节
    saveChapter() {
      chapter.saveChapter(this.chapter)
        .then(() => {
          // 关闭弹框
          this.dialogChapter = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加章节成功'
          })
          // 重新获取章节和小节
          this.getChapterVideo(this.chapter.courseId)
        })
    },
    // 修改章节
    updateChapter() {
      this.chapter.gmtCreate = null
      this.chapter.gmtModified = null
      chapter.updateChapter(this.chapter)
        .then(() => {
          // 关闭弹框
          this.dialogChapter = false
          // 提示信息
          this.$message({
            type: 'success',
            message: '修改章节成功'
          })
          // 重新获取章节和小节
          this.getChapterVideo(this.chapter.courseId)
        })
    },
    // 章节保存或更新按钮点击后
    buttonSave() {
      if (this.chapter.id) {
        this.updateChapter()
      } else {
        this.saveChapter()
      }
      // 清空数据
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    // 修改章节按钮点击后，回显数据
    chapterOpenEdit(data) {
      // 弹框
      this.dialogChapter = true
      // 调用接口回显数据
      chapter.getChapter(data.id)
        .then(result => {
          this.chapter = result.data.items
        })
    },
    // 删除章节按钮点击后
    chapterOpenRemove(data) {
      chapter.removeChapter(data.id)
        .then(() => {
          this.getChapterVideo(this.chapter.courseId)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding-right: 1200px;
  }
</style>
