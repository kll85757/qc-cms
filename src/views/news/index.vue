<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter" class="filter-item">Search</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate" class="filter-item" style="margin-left: 10px;">Add</el-button>
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
          <el-button type="primary" size="mini" @click="handleEdit(row)">Edit</el-button>
          <el-button v-if="row.status !== 'published'" size="mini" type="success" @click="handlePublish(row)">Publish</el-button>
          <el-button v-if="row.status === 'published'" size="mini" @click="handleUnpublish(row)">Unpublish</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" title="新闻管理">
      <el-form :model="currentNews" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="currentNews.title" />
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker v-model="currentNews.date" type="datetime" />
        </el-form-item>
        <el-form-item label="今日点击数">
          <el-input v-model="currentNews.todayClicks" type="number" />
        </el-form-item>
        <el-form-item label="历史点击数">
          <el-input v-model="currentNews.totalClicks" type="number" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listQuery: {
        title: '',
      },
      newsList: [
        { id: 1, title: '新闻标题一', date: '2023-09-01 10:00', todayClicks: 123, totalClicks: 1024, status: 'published' },
        { id: 2, title: '新闻标题二', date: '2023-09-02 11:00', todayClicks: 456, totalClicks: 2048, status: 'draft' },
        { id: 3, title: '新闻标题三', date: '2023-09-03 12:00', todayClicks: 789, totalClicks: 3072, status: 'published' },
      ],
      dialogVisible: false,
      currentNews: { id: null, title: '', date: '', todayClicks: 0, totalClicks: 0, status: 'draft' },
    };
  },
  methods: {
    handleFilter() {
      console.log('过滤条件:', this.listQuery);
      // 添加过滤逻辑
    },
    handleCreate() {
      this.currentNews = { id: null, title: '', date: '', todayClicks: 0, totalClicks: 0, status: 'draft' };
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.currentNews = { ...row };
      this.dialogVisible = true;
    },
    handleSave() {
      if (this.currentNews.id) {
        const index = this.newsList.findIndex(item => item.id === this.currentNews.id);
        if (index !== -1) {
          this.newsList.splice(index, 1, this.currentNews);
        }
      } else {
        this.currentNews.id = Date.now();
        this.newsList.push(this.currentNews);
      }
      this.dialogVisible = false;
    },
    handlePublish(row) {
      row.status = 'published';
    },
    handleUnpublish(row) {
      row.status = 'draft';
    },
    handleDelete(row) {
      this.newsList = this.newsList.filter(item => item.id !== row.id);
    }
  }
};
</script>
