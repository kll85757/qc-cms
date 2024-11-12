<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="相册名称" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter" class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate" class="filter-item" style="margin-left: 10px">新增相册</el-button>
    </div>

    <el-table :data="albumList" border fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" prop="id" width="80px" align="center" />
      <el-table-column label="相册名称" prop="name" min-width="150px" />
      <el-table-column label="排序编号" prop="sortNo" width="150px" align="center" />
      <el-table-column label="描述" prop="description" min-width="150px" />
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="confirmDelete(row)">删除</el-button>
          <el-button size="mini" @click="viewAlbumImages(row)">查看图片</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="margin-top: 20px"></el-pagination>

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
        <el-form-item label="相册图片">
          <el-upload :file-list="fileList" :auto-upload="true" action="" accept="image/*" :on-change="handleFileChange" :http-request="uploadFile" multiple>
            <el-button type="primary">选择图片</el-button>
          </el-upload>
          <div v-if="albumImages.length" style="margin-top: 10px;">
            <div v-for="(img, index) in albumImages" :key="index" style="display: inline-block; margin-right: 10px;">
              <img :src="img.url" alt="Album Image" style="width: 100px; height: 60px;" />
              <el-button type="danger" size="mini" @click="deleteImage(img.id)">删除</el-button>
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
import {
  getAlbumList,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  uploadFile,
  getFileAccessUrl,
  getAlbumImages // New API call for fetching album images
} from "@/utils/api";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      listQuery: {
        name: "",
        pageNo: 1,
        pageSize: 10
      },
      albumList: [],
      total: 0,
      dialogVisible: false,
      fileList: [],
      albumImages: [], // Array to store images for the current album
      currentAlbum: {
        id: null,
        name: "",
        description: "",
        sortNo: 0
      }
    };
  },
  created() {
    this.fetchAlbumList();
  },
  methods: {
    async fetchAlbumList() {
      const response = await getAlbumList({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        condition: { name: this.listQuery.name }
      });
      this.albumList = response.data.records;
      this.total = response.data.total;
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchAlbumList();
    },
    handleCreate() {
      this.currentAlbum = {
        id: null,
        name: "",
        description: "",
        sortNo: 0
      };
      this.albumImages = [];
      this.dialogVisible = true;
    },
    async handleSave() {
      if (this.currentAlbum.id) {
        await updateAlbum(this.currentAlbum);
      } else {
        await createAlbum(this.currentAlbum);
      }
      this.dialogVisible = false;
      this.fetchAlbumList();
    },
    async handleEdit(row) {
      this.currentAlbum = { ...row };
      await this.fetchAlbumImages(row.id);
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
      await deleteAlbum(row.id);
      this.fetchAlbumList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.fetchAlbumList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.fetchAlbumList();
    },
    handleFileChange(file, fileList) {
      // 获取文件数据
      const fileData = file.raw;

      // 添加到 fileList
      this.fileList = fileList;

      // 调用 uploadFile 函数上传文件
      this.uploadFile(fileData);
    },
    async uploadFile(fileData) {
      try {
        const uploadResponse = await uploadFile(fileData);
        const fileName = uploadResponse.data.fileName;
        const accessResponse = await getFileAccessUrl(fileName);
        this.albumImages.push({ id: fileName, url: accessResponse.data.accessUrl });
      } catch (error) {
        console.error("图片上传失败:", error);
      }
      return false;
    },
    async fetchAlbumImages(albumId) {
      try {
        const response = await getAlbumImages(albumId);
        this.albumImages = response.data.images.map(image => ({ id: image.id, url: image.url }));
      } catch (error) {
        console.error("获取相册图片失败:", error);
      }
    },
    async deleteImage(imageId) {
      // Placeholder for an API call to delete the image by its ID
      this.albumImages = this.albumImages.filter(img => img.id !== imageId);
    },
    async viewAlbumImages(row) {
      await this.fetchAlbumImages(row.id);
      this.dialogVisible = true;
    }
  }
};
</script>
