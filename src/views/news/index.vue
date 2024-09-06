<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter" class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate" class="filter-item" style="margin-left: 10px;">新增</el-button>
    </div>

    <el-table
      :data="newsList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" width="80px" align="center" />
      <el-table-column label="标题" prop="title" min-width="150px" />
      <el-table-column label="发布时间" prop="date" width="180px" align="center" />
      <el-table-column label="今日点击数" prop="todayClicks" width="130px" align="center" />
      <el-table-column label="历史点击数" prop="totalClicks" width="130px" align="center" />
      <el-table-column label="状态" prop="status" width="100px" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status === 'published' ? 'success' : 'info'">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
          <el-button v-if="row.status !== 'published'" size="mini" type="success" @click="handlePublish(row)">发布</el-button>
          <el-button v-if="row.status === 'published'" size="mini" @click="handleUnpublish(row)">下架</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
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
import { getNewsList, updateNews, deleteNews, createNews } from '@/utils/api';

export default {
  data() {
    return {
      listQuery: {
        title: '',
        pageNo: 1,
        pageSize: 10,
      },
      newsList: [],
      total: 0,
      dialogVisible: false,
      currentNews: {
        id: null,
        title: '',
        releaseTime: '',
        newsDetail: '',
        status: 'draft',
      },
    };
  },
  created() {
    this.fetchNewsList();
  },
  methods: {
    async fetchNewsList() {
      const response = await getNewsList(this.listQuery);
      this.newsList = response.data.items;
      this.total = response.data.total;
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchNewsList();
    },
    handleCreate() {
      this.currentNews = { id: null, title: '', releaseTime: new Date(), newsDetail: '', status: 'draft' };
      this.dialogVisible = true;
    },
    async handleSave() {
      if (this.currentNews.id) {
        await updateNews(this.currentNews);
      } else {
        await createNews(this.currentNews);
      }
      this.dialogVisible = false;
      this.fetchNewsList();
    },
    async handleEdit(row) {
      this.currentNews = { ...row };
      this.dialogVisible = true;
    },
    async handleDelete(row) {
      await deleteNews(row.id);
      this.fetchNewsList();
    },
    async handlePublish(row) {
      row.status = 'published';
      await updateNews(row);
      this.fetchNewsList();
    },
    async handleUnpublish(row) {
      row.status = 'draft';
      await updateNews(row);
      this.fetchNewsList();
    }
  }
};
</script>
