<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="产品标题"
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
        >新增产品</el-button
      >
    </div>

    <el-table
      :data="productList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="ID" prop="id" width="80px" align="center" />
      <el-table-column label="标题" prop="title" min-width="150px" />
      <el-table-column
        label="发布时间"
        prop="releaseTime"
        width="180px"
        align="center"
      />
      <el-table-column label="状态" prop="status" width="100px" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'info'">{{ row.status === 1 ? "已发布" : "草稿" }}</el-tag>
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

    <el-dialog :visible.sync="dialogVisible" title="产品管理">
      <el-form :model="currentProduct" label-width="80px">
        <el-form-item label="品牌">
          <el-select v-model="currentProduct.brandCode" placeholder="选择品牌">
            <el-option
              v-for="brand in brandList"
              :key="brand.id"
              :label="brand.name"
              :value="brand.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="currentProduct.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="currentProduct.description" type="textarea" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="currentProduct.releaseTime"
            type="datetime"
          />
        </el-form-item>
        <el-form-item label="产品详情">
          <el-input
            v-model="currentProduct.productDetail"
            type="textarea"
            rows="6"
          />
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
  getProductList,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrandList,
} from "@/utils/api";
import { MessageBox } from "element-ui";

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要+1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default {
  data() {
    return {
      listQuery: {
        title: "",
        pageNo: 1,
        pageSize: 10,
      },
      productList: [],
      total: 0,
      dialogVisible: false,
      brandList: [], // 用于存储品牌列表
      currentProduct: {
        id: null,
        categoryCode: "",
        brandCode: "", // 绑定品牌选项
        title: "",
        description: "",
        keyWords: [],
        pictures: [],
        productDetail: "",
        releaseTime: "",
        status: "1", // 永远为 '1'
      },
    };
  },
  created() {
    this.fetchProductList();
    this.fetchBrandList(); // 页面加载时获取品牌列表
  },
  methods: {
    // 获取品牌列表，拉取所有数据
    async fetchBrandList() {
      const response = await getBrandList({
        pageNo: 1,
        pageSize: 20, // 拉取20条数据
        title: "",
      });
      this.brandList = response.data.records; // 存储品牌列表
    },
    // 获取产品列表
    async fetchProductList() {
      const response = await getProductList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        condition: {
          title: this.listQuery.title,
          status: "1",
        },
      });

      this.productList = response.data.records;
      this.total = response.data.total;
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchProductList();
    },
    handleCreate() {
      this.currentProduct = {
        id: null,
        categoryCode: "",
        brandCode: "", // 绑定品牌选择的值
        title: "",
        description: "",
        keyWords: ["1", "222"],
        pictures: [],
        productDetail: "",
        releaseTime: formatDateTime(new Date()),
        status: "1",
      };
      this.dialogVisible = true;
    },
    async handleSave() {
      this.currentProduct.status = "1"; // 保证保存时 status 为 '1'
      if (this.currentProduct.id) {
        await updateProduct(this.currentProduct);
      } else {
        await createProduct(this.currentProduct);
      }
      this.dialogVisible = false;
      this.fetchProductList();
    },
    async handleEdit(row) {
      this.currentProduct = { ...row };
      this.dialogVisible = true;
    },
    confirmDelete(row) {
      MessageBox.confirm("确定要删除这个产品吗？", "提示", {
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
    async handleDelete(row) {
      await deleteProduct(row.id);
      this.fetchProductList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.fetchProductList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.fetchProductList();
    },
  },
};
</script>
