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
          <el-transfer
            :data="keywordOptions"
            v-model="currentProduct.keyWords"
            filterable
            :titles="['可选关键词', '已选关键词']"
            :props="{ key: 'value', label: 'label' }"
            @change="handleKeywordsChange"
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload :file-list="fileList" :auto-upload="true" action="" accept="image/*" :on-change="handleFileChange"
            :http-request="uploadFile" multiple>
            <el-button type="primary">选择图片</el-button>
          </el-upload>
          <div v-if="currentProduct.pictures.length || fileList.length"
            style="margin-top: 10px; display: flex; flex-wrap: wrap;">
            <div v-for="(picture, index) in uniquePictures" :key="index"
              style="position: relative; margin-right: 10px; margin-bottom: 10px;">
              <img :src="picture.url || picture" alt="Product Image"
 style="width: 100px; height: 60px; border-radius: 5px; border: 1px solid #e0e0e0;" />
              <el-button type="danger" size="mini" @click="deleteImage(index)"
                style="position: absolute; top: 0; right: 0; border-radius: 50%; padding: 0; width: 20px; height: 20px;">
                <i class="el-icon-delete" style="font-size: 12px;"></i>
              </el-button>
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
      keywordOptions: [], // 关键词选项列表
      currentProduct: { id: null, categoryCode: "", brandCode: "", title: "", description: "", keyWords: [], pictures: [], productDetail: "", releaseTime: formatDateTime(new Date()), status: "1" },
      fileList: [], // 文件列表
    };
  },
  created() {
    this.fetchProductList();
    this.fetchBrandList();
    this.fetchKeywordOptions(); // 获取关键词选项
  },
  computed: {
    uniquePictures() {
      const pictureSet = new Set();
      this.currentProduct.pictures.forEach(picture => {
        pictureSet.add(picture);
      });
      this.fileList.forEach(file => {
        pictureSet.add(file.url || file);
      });
      return Array.from(pictureSet).map(url => ({ url }));
    }
  },
  methods: {
    async fetchBrandList() {
      const response = await getBrandList({ pageNo: 1, pageSize: 20, title: "" });
      this.brandList = response.data.records;
    },
    async fetchKeywordOptions() {
      // 假设你有一个 API 来获取关键词选项
      this.keywordOptions = [
        { value: 'keyword1', label: '关键词1' },
        { value: 'keyword2', label: '关键词2' },
        { value: 'keyword3', label: '关键词3' },
        // 添加更多关键词选项
      ];
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
      this.currentProduct = { id: null, categoryCode: "", brandCode: "", title: "", description: "", keyWords: [], pictures: [], productDetail: "", releaseTime: formatDateTime(new Date()), status: "1" };
      this.fileList = [];
      this.dialogVisible = true;
    },
    async handleSave() {
      this.fileList = this.fileList.filter(file => file && file.url);
      this.currentProduct.pictures = this.fileList.map(file => file.url).filter(url => url);
      if (this.currentProduct.id) {
        await updateProduct(this.currentProduct);
      } else {
        await createProduct(this.currentProduct);
      }
      this.dialogVisible = false;
      this.fetchProductList();
    },
    async handleEdit(row) {
      this.fileList = [];
      this.currentProduct = { ...row }; 
      this.currentProduct.pictures = row.pictures || []; 
      this.fileList = this.currentProduct.pictures.map(picture => ({ name: picture.split('/').pop(), url: picture })); 
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
    async handleFileChange(file, fileList) {
      const newFiles = fileList.filter(f => !this.fileList.some(existingFile => existingFile.url === f.url));
      this.fileList.push(...newFiles);
    },
    async uploadFile(fileData) {
      try {
        const uploadedFile = await uploadFile(fileData.file);
        this.fileList.push(uploadedFile);
      } catch (error) {
        console.error("图片上传失败:", error);
      }
      return false; 
    },
    deleteImage(index) {
      if (index < this.fileList.length) {
        this.fileList.splice(index, 1);
      } else {
        const pictureIndex = index - this.fileList.length;
        this.currentProduct.pictures.splice(pictureIndex, 1);
      }
    },
    handleKeywordsChange(newKeywords) {
      this.currentProduct.keyWords = newKeywords; // 更新当前产品的关键词
    },
  },
};
</script>