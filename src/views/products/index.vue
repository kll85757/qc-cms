<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="产品标题" style="width: 200px" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter" class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate" class="filter-item"
        style="margin-left: 10px">新增产品</el-button>
    </div>

    <el-table :data="productList" border fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" prop="id" width="80px" align="center" />
      <el-table-column label="标题" prop="title" min-width="150px" />
      <el-table-column label="发布时间" prop="releaseTime" width="180px" align="center" />
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

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 20px"></el-pagination>

    <el-dialog :visible.sync="dialogVisible" title="产品管理">
      <el-form :model="currentProduct" label-width="80px">
        <el-form-item label="品牌">
          <el-select v-model="currentProduct.brandCode" placeholder="选择品牌">
            <el-option v-for="brand in brandList" :key="brand.id" :label="brand.name" :value="brand.code" />
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="currentProduct.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="currentProduct.description" type="textarea" />
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="currentProduct.keyWords" type="textarea" @input="handleKeyWordsInput"
            placeholder="输入关键词，用逗号分隔" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload :file-list="fileList" :auto-upload="true" action="" accept="image/*" :on-change="handleFileChange"
            :http-request="uploadFile" multiple>
            <el-button type="primary">选择图片</el-button>
          </el-upload>
          <div v-if="currentProduct.pictures.length" style="margin-top: 10px;">
            <div v-for="(picture, index) in currentProduct.pictures" :key="index"
              style="display: inline-block; margin-right: 10px;">
              <img :src="picture" alt="Product Image" style="width: 100px; height: 60px;" />
              <el-button type="danger" size="mini" @click="deleteImage(index)">删除</el-button>
            </div>
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
import { getProductList, createProduct, updateProduct, deleteProduct, uploadFile, getBrandList } from "@/utils/api";
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
      listQuery: { title: "", pageNo: 1, pageSize: 10 },
      productList: [],
      total: 0,
      dialogVisible: false,
      brandList: [],
      currentProduct: { id: null, categoryCode: "", brandCode: "", title: "", description: "", keyWords: [], pictures: [], productDetail: "", releaseTime: formatDateTime(new Date()), status: "1" },
      fileList: [], // 文件列表
    };
  },
  created() {
    this.fetchProductList();
    this.fetchBrandList();
  },
  methods: {
    async fetchBrandList() {
      const response = await getBrandList({ pageNo: 1, pageSize: 20, title: "" });
      this.brandList = response.data.records;
    },
    async fetchProductList() {
      const response = await getProductList({ pageNo: this.listQuery.pageNo, pageSize: this.listQuery.pageSize, condition: { title: this.listQuery.title, status: "1" } });
      this.productList = response.data.records;
      this.total = response.data.total;
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchProductList();
    },
    handleCreate() {
      // 创建新产品时清空表单和文件列表
      this.currentProduct = { id: null, categoryCode: "", brandCode: "", title: "", description: "", keyWords: [], pictures: [], productDetail: "", releaseTime: formatDateTime(new Date()), status: "1" };
      this.fileList = [];
      this.dialogVisible = true;
    },
    async handleSave() {
      // 上传保存时处理图片
      this.currentProduct.pictures = this.fileList.map(file => file.url);
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
      this.currentProduct.pictures = row.pictures || []; // 如果 pictures 为 null，则设置为一个空数组
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
    async handleFileChange(file, fileList) {
      // 更新 fileList 以预览选择的文件
      this.fileList = fileList;

    },
    async uploadFile(fileData) {
      try {
        // 调用你提供的 uploadFile API 方法
        const uploadedFile = await uploadFile(fileData.file);

        // 将上传成功的图片 URL 添加到 fileList 中
        this.fileList.push(uploadedFile); // uploadedFile 应包含 { id, url }

      } catch (error) {
        console.error("图片上传失败:", error);
      }
      return false; // 返回 false 以防止默认上传行为
    },
    deleteImage(index) {
      // 从文件列表中删除图片
      this.fileList.splice(index, 1);
    },
  },
};
</script>
