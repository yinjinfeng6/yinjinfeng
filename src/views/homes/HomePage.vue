<template>
  <div>
    <div class="control">
      <div class="btn">
        <el-button type="primary">编辑添加，字段各种规则验证示例</el-button>
        <el-button type="primary">本地导出表格</el-button>
      </div>
      <div class="input">
        <el-input type="text" placeholder="请输入文章标题"></el-input>
        <el-input placeholder="请选择类型"></el-input>
        <el-button type="success">查询</el-button>
        <el-button type="warning">重置</el-button>
      </div>
    </div>
    <el-table :data="arrs" style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="title" label="文章标题" width="180">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="180">
      </el-table-column>
      <el-table-column prop="count" label="浏览量" width="180">
      </el-table-column>
      <el-table-column prop="huifu" label="回复" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户 -->
    <el-button type="primary" @click="add">添加用户</el-button>
    <!--  -->
    <!-- 对话框 -->
    <el-dialog
      :title="i == 1 ? '添加用户' : '编辑'"
      :visible.sync="dialogTableVisible"
    >
      <el-form :model="tableData">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="tableData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="tableData.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="浏览量" :label-width="formLabelWidth">
          <el-input v-model="tableData.count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回复" :label-width="formLabelWidth">
          <el-input v-model="tableData.huifu" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
    <!--  -->
  </div>
</template>

<script>
import instance from "../../api/index";
export default {
  name: "HomeIndex",
  data() {
    return {
      arrs: null,
      dialogTableVisible: false,
      tableData: {
        id: 0,
        title: "标题",
        author: "作者",
        count: "浏览量",
        huifu: "回复",
      },
      formLabelWidth: "120px",
      i: 0,
    };
  },
  methods: {
    add() {
      this.i = 1;
      this.tableData.name = "";
      this.tableData.text = "";
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    sure() {
      this.dialogTableVisible = false;
      this.getedit();
    },
    // 编辑
    handleEdit(a, b) {
      //   console.log(a, b);
      this.i = 0;
      this.dialogTableVisible = !this.dialogTableVisible;
      this.tableData.title = b.title;
      this.tableData.author = b.author;
      this.tableData.count = b.count;
      this.tableData.huifu = b.huifu;
      this.tableData.id = b.id;
    },
    // 删除
    handleDelete(a, b) {
      // console.log(a, b);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(a),
            this.$message({
              type: "success",
              message: "删除成功!",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async gethomeindex() {
      let { data } = await instance.get("/homeindex");
      // console.log(data);
      this.arrs = data;
    },
    // 修改
    async getedit() {
      let title = this.tableData.title;
      let author = this.tableData.author;
      let count = this.tableData.count;
      let huifu = this.tableData.huifu;
      let id = this.tableData.id;
      let { data } = await instance.put("/homeindex/edit/" + id, {
        title,
        author,
        count,
        huifu,
      });
      //   console.log(data);
      this.gethomeindex();
    },
    // 删除
    async del(index) {
      let { data } = await instance.delete("/homeindex/del/" + index);
      // console.log(data);
      this.gethomeindex();
    },
  },
  created() {
    this.gethomeindex();
  },
};
</script>

<style scoped>
.bg {
  background: #222d32;
}
.control {
  padding: 0 40px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input {
  display: flex;
}
</style>