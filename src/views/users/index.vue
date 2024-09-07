<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="用户名"
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
    </div>

    <el-table
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="userId" width="80px" align="center" />
      <el-table-column label="昵称" prop="nickName" min-width="150px" />
      <el-table-column label="性别" prop="sex" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sex === '1' ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像" prop="avatar" width="120px" align="center">
        <template slot-scope="{ row }">
          <img :src="row.avatar" alt="头像" style="width: 40px; height: 40px; border-radius: 50%;" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="confirmDelete(row)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" title="用户管理">
      <el-form :model="currentUser" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="currentUser.nickName" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="currentUser.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="currentUser.avatar" />
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
  getUserList,
  updateUser,
  deleteUser
} from "@/utils/api";
import { MessageBox } from "element-ui"; // 导入 MessageBox 组件

export default {
  data() {
    return {
      listQuery: {
        title: "",
        pageNo: 1,
        pageSize: 10,
      },
      userList: [], // 用户列表
      total: 0,
      dialogVisible: false,
      currentUser: {
        userId: null,
        nickName: "",
        avatar: "",
        sex: "1", // 默认性别为男
      },
    };
  },
  created() {
    this.fetchUserList(); // 页面加载时获取用户列表
  },
  methods: {
    // 获取用户列表
    async fetchUserList() {
      const response = await getUserList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        title: this.listQuery.title,
      });

      this.userList = response.data.records;
      this.total = response.data.total;
    },
    // 筛选用户列表
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchUserList();
    },
    // 编辑用户
    async handleEdit(row) {
      this.currentUser = { ...row };
      this.dialogVisible = true;
    },
    // 保存用户
    async handleSave() {
      try {
        await updateUser(this.currentUser);
        this.dialogVisible = false;
        this.fetchUserList();
      } catch (error) {
        console.error(error);
      }
    },
    // 删除前弹窗确认
    confirmDelete(row) {
      MessageBox.confirm("确定要删除这个用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(row);
        })
        .catch(() => {
          console.log("删除操作取消");
        });
    },
    // 删除用户
    async handleDelete(row) {
      try {
        await deleteUser(row.userId);
        this.fetchUserList();
      } catch (error) {
        console.error(error);
      }
    },
    // 更改每页显示条目数
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.fetchUserList();
    },
    // 分页页码切换
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.fetchUserList();
    },
  },
};
</script>
