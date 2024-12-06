<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="标题"
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
        >新增</el-button
      >
    </div>

    <el-table
      :data="newsList"
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
      <el-table-column
        label="今日点击数"
        prop="todayClicks"
        width="130px"
        align="center"
      />
      <el-table-column
        label="历史点击数"
        prop="totalClicks"
        width="130px"
        align="center"
      />
      <el-table-column label="状态" prop="status" width="100px" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'info'">{{
            row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)"
            >编辑</el-button
          >
          <el-button
            v-if="row.status !== 'published'"
            size="mini"
            type="success"
            @click="handlePublish(row)"
            >发布</el-button
          >
          <el-button
            v-if="row.status === 'published'"
            size="mini"
            @click="handleUnpublish(row)"
            >下架</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="新闻管理">
      <el-form :model="currentNews" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="currentNews.title" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker v-model="currentNews.releaseTime" type="datetime" />
        </el-form-item>
        <el-form-item label="关键词">
          <el-checkbox-group v-model="currentNews.keyWords">
            <el-checkbox label="01">产品咨询</el-checkbox>
            <el-checkbox label="02">新闻资讯</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="新闻详情">
          <el-input v-model="currentNews.newsDetail" type="textarea" rows="6" />
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
import { getNewsList, updateNews, deleteNews, createNews } from "@/utils/api";
import { getNews } from "@/utils/api";

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
      newsList: [],
      total: 0,
      dialogVisible: false,
      currentNews: {
        id: null,
        title: "",
        releaseTime: "",
        newsDetail: "",
        // status: "1",
      },
    };
  },
  created() {
    this.fetchNewsList();
  },
  methods: {
    async fetchNewsList() {
      const response = await getNewsList(this.listQuery);
      if (response.success && response.data) {
        this.newsList = response.data.records.map((item) => ({
          id: item.id,
          title: item.title,
          releaseTime: item.releaseTime,
          todayClicks: item.todayClicks || 0, // Default to 0 if not provided
          totalClicks: item.totalClicks || 0, // Default to 0 if not provided
          status: item.status === 1 ? "published" : "draft", // Map numeric status to string
        }));
        this.total = response.data.total;
      } else {
        this.$message.error(response.msg || "Failed to fetch news list");
      }
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchNewsList();
    },
    handleCreate() {
      this.currentNews = {
        id: null,
        title: "",
        releaseTime: formatDateTime(new Date()),
        newsDetail: "",
        keyWords: [], // 默认不选中
        status: "1",
      };
      this.dialogVisible = true;
    },
    async handleSave() {
      // Ensure keywords are stored correctly
      if (
        this.currentNews.keyWords.includes("01") ||
        this.currentNews.keyWords.includes("02")
      ) {
        this.currentNews.keyWords = [...this.currentNews.keyWords];
      }

      if (this.currentNews.id) {
        // Update existing news
        await updateNews(this.currentNews);
      } else {
        // Create new news
        await createNews(this.currentNews);
      }

      this.dialogVisible = false;
      this.fetchNewsList();
    },
    async handleEdit(row) {
      try {
        const response = await getNews(row.id);
        if (response.success && response.data) {
          this.currentNews = {
            id: response.data.id,
            title: response.data.title,
            releaseTime: response.data.releaseTime,
            newsDetail: response.data.newsDetail || "",
            keyWords: response.data.keyWords || [], // 保证 keyWords 存在
            status: response.data.status === 1 ? "published" : "draft",
          };
          this.dialogVisible = true;
        } else {
          this.$message.error(response.msg || "Failed to fetch news details");
        }
      } catch (error) {
        this.$message.error("An error occurred while fetching news details");
        console.error(error);
      }
    },
    async handleDelete(row) {
      await deleteNews(row.id);
      this.fetchNewsList();
    },
    async handlePublish(row) {
      row.status = "published";
      await updateNews(row);
      this.fetchNewsList();
    },
    async handleUnpublish(row) {
      row.status = "draft";
      await updateNews(row);
      this.fetchNewsList();
    },
  },
};
</script>
