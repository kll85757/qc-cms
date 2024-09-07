<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="相册名称"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        class="filter-item"
        >搜索</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
        class="filter-item"
        style="margin-left: 10px"
        >新增相册</el-button
      >
    </div>

    <el-table
      :data="albumList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" width="80px" align="center" />
      <el-table-column label="相册名称" prop="name" min-width="150px" />
      <el-table-column
        label="排序编号"
        prop="sortNo"
        width="150px"
        align="center"
      />
      <el-table-column label="描述" prop="description" min-width="150px" />
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="confirmDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
    ></el-pagination>

    <el-dialog :visible.sync="dialogVisible" title="相册管理">
      <el-form :model="currentAlbum" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="currentAlbum.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="currentAlbum.description" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item label="排序编号">
          <el-input v-model="currentAlbum.sortNo" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAlbumList,
  createAlbum,
  updateAlbum,
  deleteAlbum
} from "@/utils/api";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      listQuery: {
        name: "",  // 使用name来搜索
        pageNo: 1,  // 默认页码为1
        pageSize: 10 // 默认每页显示10条数据
      },
      albumList: [],
      total: 0,
      dialogVisible: false,
      currentAlbum: {
        id: null,
        name: "", // 显示的相册名称
        description: "",
        sortNo: 0
      }
    };
  },
  created() {
    this.fetchAlbumList(); // 初始化页面时获取相册列表
  },
  methods: {
    async fetchAlbumList() {
      const response = await getAlbumList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        condition: {
          name: this.listQuery.name // 搜索条件
        }
      });
      this.albumList = response.data.records; // 从返回的数据中获取相册列表
      this.total = response.data.total; // 设置总条目数以便分页显示
    },
    handleFilter() {
      this.listQuery.pageNo = 1; // 重置页码为第一页
      this.fetchAlbumList(); // 执行过滤操作，更新相册列表
    },
    handleCreate() {
      this.currentAlbum = {
        id: null,
        name: "",
        description: "",
        sortNo: 0
      };
      this.dialogVisible = true; // 打开新增对话框
    },
    async handleSave() {
      if (this.currentAlbum.id) {
        await updateAlbum(this.currentAlbum); // 如果有ID则是编辑操作
      } else {
        await createAlbum(this.currentAlbum); // 没有ID则是新增操作
      }
      this.dialogVisible = false;
      this.fetchAlbumList(); // 保存后刷新相册列表
    },
    async handleEdit(row) {
      this.currentAlbum = { ...row }; // 编辑时将选择的相册内容载入对话框
      this.dialogVisible = true;
    },
    confirmDelete(row) {
      MessageBox.confirm("确定要删除这个相册吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(row);
        })
        .catch(() => {
          console.log("删除操作取消");
        });
    },
    async handleDelete(row) {
      await deleteAlbum(row.id); // 删除选中的相册
      this.fetchAlbumList(); // 删除后刷新相册列表
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; // 设置每页显示条目数
      this.fetchAlbumList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val; // 切换页码时更新
      this.fetchAlbumList();
    }
  }
};
</script>
