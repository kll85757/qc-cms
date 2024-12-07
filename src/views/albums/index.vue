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
          <el-button size="mini" @click="viewAlbumImages(row)"
            >查看图片</el-button
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
          <el-input
            v-model="currentAlbum.description"
            type="textarea"
            rows="6"
          />
        </el-form-item>
        <el-form-item label="排序编号">
          <el-input v-model="currentAlbum.sortNo" />
        </el-form-item>
        <el-form-item label="相册图片">
          <el-upload
            :file-list="fileList"
            :auto-upload="false"
            action=""
            accept="image/*"
            :on-change="handleFileChange"
            :http-request="uploadFile"
            multiple
          >
            <el-button type="primary">选择图片</el-button>
          </el-upload>
          <div
            v-if="albumImages.length"
            style="margin-top: 10px; display: flex; flex-wrap: wrap"
          >
            <div
              v-for="(image, index) in albumImages"
              :key="index"
              style="
                position: relative;
                margin-right: 10px;
                margin-bottom: 10px;
              "
            >
              <img
                :src="image"
                alt="Album Image"
                style="
                  width: 100px;
                  height: 60px;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
                "
              />
              <el-button
                type="danger"
                size="mini"
                @click="deleteImage(index)"
                style="
                  position: absolute;
                  top: 0;
                  right: 0;
                  border-radius: 50%;
                  padding: 0;
                  width: 20px;
                  height: 20px;
                "
              >
                <i class="el-icon-delete" style="font-size: 12px"></i>
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
import {
  getAlbumList,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  uploadAlbumFile,
  getAlbumImages,
} from "@/utils/api";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      listQuery: {
        name: "",
        pageNo: 1,
        pageSize: 10,
      },
      albumList: [],
      total: 0,
      dialogVisible: false,
      fileList: [], // 用户选择的文件列表
      albumImages: [], // 当前相册的图片列表
      currentAlbum: {
        id: null,
        name: "",
        description: "",
        sortNo: 0,
        picture: "", // 图片存储为字符串
      },
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
        condition: { name: this.listQuery.name },
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
        sortNo: 0,
        picture: "",
      };
      this.fileList = [];
      this.albumImages = [];
      this.dialogVisible = true;
    },
    async handleSave() {
      this.currentAlbum.picture = this.albumImages.join(","); // 转换为字符串
      this.currentAlbum.picNum = this.albumImages.length; // 更新图片数量

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
      this.albumImages = row.picture ? row.picture.split(",") : [];
      this.fileList = this.albumImages.map((url) => ({
        name: url.split("/").pop(),
        url,
      }));
      this.dialogVisible = true;
    },
    confirmDelete(row) {
      MessageBox.confirm("确定要删除这个相册吗？", "提示", {
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
    async handleFileChange(file, fileList) {
      const newFiles = fileList.filter(
        (f) => !this.fileList.some((existingFile) => existingFile.url === f.url)
      );
      for (const newFile of newFiles) {
        await this.uploadFile(newFile);
      }
    },
    async uploadFile(fileData) {
      try {
        console.log("Uploading file for album:", fileData);

        // 使用新的上传方法
        const { id, url } = await uploadAlbumFile(fileData.raw);

        console.log("Uploaded file for album:", { id, url });

        // 更新 fileList 和 albumImages
        const image = { name: fileData.name, url };
        this.fileList.push(image);
        this.albumImages.push(url);

        console.log("Album images updated successfully:", this.albumImages);
      } catch (error) {
        console.error("相册图片上传失败:", error);
      }
    },
    deleteImage(index) {
      this.albumImages.splice(index, 1);
      this.fileList.splice(index, 1);
    },
  },
};
</script>
