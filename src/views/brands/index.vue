<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="品牌名称"
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
        >新增品牌</el-button
      >
    </div>

    <el-table
      :data="brandList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" width="80px" align="center" />
      <el-table-column label="品牌编码" prop="code" width="150px" />
      <el-table-column label="品牌名称" prop="name" min-width="150px" />
      <el-table-column label="排序编号" prop="sortNo" width="150px" align="center" />
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

    <el-dialog :visible.sync="dialogVisible" title="品牌管理">
      <el-form :model="currentBrand" label-width="80px">
        <el-form-item label="品牌编码">
          <el-input v-model="currentBrand.code" />
        </el-form-item>
        <el-form-item label="品牌名称">
          <el-input v-model="currentBrand.name" />
        </el-form-item>
        <el-form-item label="排序编号">
          <el-input v-model="currentBrand.sortNo" />
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
  getBrandList,
  createBrand,
  updateBrand,
  deleteBrand
} from "@/utils/api";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      listQuery: {
        title: "",  // 使用title作为搜索条件
        pageNo: 1,  // 初始化页码为1
        pageSize: 10 // 每页显示10条
      },
      brandList: [],
      total: 0,
      dialogVisible: false,
      currentBrand: {
        id: null,
        code: "", // 品牌编码
        name: "", // 品牌名称
        sortNo: 0 // 排序编号
      }
    };
  },
  created() {
    this.fetchBrandList(); // 页面初始化时获取品牌列表
  },
  methods: {
    async fetchBrandList() {
      const response = await getBrandList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        title: this.listQuery.title, // 传递title参数
        categoryCode: '', // 如果需要，可以增加类别筛选
        status: '1' // 传递status默认值
      });
      this.brandList = response.data.records; // 设置品牌列表
      this.total = response.data.total; // 设置总条目数，用于分页
    },
    handleFilter() {
      this.listQuery.pageNo = 1; // 重新搜索时重置页码
      this.fetchBrandList(); // 根据搜索条件更新列表
    },
    handleCreate() {
      this.currentBrand = {
        id: null,
        code: "",
        name: "",
        sortNo: 0
      };
      this.dialogVisible = true; // 打开创建对话框
    },
    async handleSave() {
      if (this.currentBrand.id) {
        await updateBrand(this.currentBrand); // 更新品牌
      } else {
        await createBrand(this.currentBrand); // 新建品牌
      }
      this.dialogVisible = false;
      this.fetchBrandList(); // 保存成功后刷新品牌列表
    },
    async handleEdit(row) {
      this.currentBrand = { ...row }; // 编辑时载入品牌数据
      this.dialogVisible = true;
    },
    confirmDelete(row) {
      MessageBox.confirm("确定要删除这个品牌吗？", "提示", {
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
      await deleteBrand(row.id); // 删除选中的品牌
      this.fetchBrandList(); // 删除成功后刷新品牌列表
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val; // 更新分页大小
      this.fetchBrandList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val; // 更新页码
      this.fetchBrandList();
    }
  }
};
</script>
