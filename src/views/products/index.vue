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
        <el-form-item label="关键词">
          <el-input v-model="currentProduct.keyWords" type="textarea" @input="handleKeyWordsInput" placeholder="输入关键词，用逗号分隔" />
          <!-- <div v-if="currentProduct.keyWords.length > 0" style="margin-top: 10px;">
            <el-button size="mini" type="danger" @click="handleClearKeywords">清空关键词</el-button>
          </div> -->
        </el-form-item>
        <el-form-item label="产品图片">
          <el-upload
            class="upload-demo"
            action="your-upload-endpoint"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemoveImage"
            :before-remove="beforeRemoveImage"
            multiple
            :limit="5"
            accept="image/*"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div v-if="fileList.length > 0" style="margin-top: 10px;">
            <el-button size="mini" type="danger" @click="handleClearImages">清空图片</el-button>
          </div>
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
  const month = String(date.getMonth() + 1).padStart(2, "0");
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
      brandList: [],
      currentProduct: {
        id: null,
        categoryCode: "",
        brandCode: "",
        title: "",
        description: "",
        keyWords: [],
        pictures: [],
        productDetail: "",
        releaseTime: formatDateTime(new Date()),
        status: "1",
      },
      fileList: [],
    };
  },
  created() {
    this.fetchProductList();
    this.fetchBrandList();
  },
  methods: {
    async fetchBrandList() {
      const response = await getBrandList({
        pageNo: 1,
        pageSize: 20,
        title: "",
      });
      this.brandList = response.data.records;
    },
    async fetchProductList() {
      const response = await getProductList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        condition: { title: this.listQuery.title, status: "1" },
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
        brandCode: "",
        title: "",
        description: "",
        keyWords: [],
        pictures: [],
        productDetail: "",
        releaseTime: formatDateTime(new Date()),
        status: "1",
      };
      this.fileList = [];
      this.dialogVisible = true;
    },
    async handleSave() {
      this.currentProduct.pictures = this.fileList.map(file => file.url); // Assuming 'file.url' is the file URL after upload.
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
      this.fileList = row.pictures ? row.pictures.map(pic => ({ url: pic })) : [];
      this.dialogVisible = true;
    },
    confirmDelete(row) {
      MessageBox.confirm("确定要删除这个产品吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.handleDelete(row);
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
    handleKeyWordsInput(value) {
      this.currentProduct.keyWords = value.split(",");
    },
    handleClearKeywords() {
      this.currentProduct.keyWords = [];
    },
    handleUploadSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    handleRemoveImage(file, fileList) {
      this.fileList = fileList;
    },
    beforeRemoveImage(file) {
      return this.$confirm(`确定要删除此图片吗?`);
    },
    handleClearImages() {
      this.fileList = [];
    },
  },
};
</script>

