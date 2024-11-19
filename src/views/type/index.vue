<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="分类名称" style="width: 200px" class="filter-item"
        @keyup.enter.native="handleFilter" />
      <el-button type="primary" icon="el-icon-search" @click="handleFilter" class="filter-item">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="handleCreate" class="filter-item"
        style="margin-left: 10px">新增分类</el-button>
    </div>

    <el-tree :data="treeData" :props="defaultProps" :default-expand-all="true" @node-click="handleNodeClick"
      style="max-height: 600px; overflow: auto;padding:5px;">
      <span slot-scope="{ node }" :class="['tree-node', { 'selected': selectedNode && selectedNode.id === node.id }]">
        <span>{{ node.label }}</span>
        <div class="button-group">
          <el-button size="mini" type="danger" @click.stop="confirmDelete(node)">删除</el-button>
          <el-button size="mini" type="primary" @click.stop="handleEdit(node)">编辑</el-button>
        </div>
      </span>
    </el-tree>

    <el-dialog :visible.sync="dialogVisible" title="分类管理">
      <el-form :model="currentCategory" label-width="80px">
        <el-form-item label="分类编码">
          <el-input v-model="currentCategory.code" />
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="currentCategory.name" />
        </el-form-item>
        <el-form-item label="父级分类编码">
          <el-input v-model="currentCategory.parentCode" disabled />
        </el-form-item>
        <el-form-item label="分组编码">
          <el-input v-model="currentCategory.groupCode" />
        </el-form-item>
        <el-form-item label="排序号">
          <el-input type="number" v-model="currentCategory.sortNo" />
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
import { getCategoryPage, createCategory, updateCategory, deleteCategory } from "@/utils/api";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      listQuery: { name: "", pageNo: 1, pageSize: 100 },
      treeData: [],
      total: 0,
      dialogVisible: false,
      currentCategory: { id: null, code: "", name: "", parentCode: "", groupCode: "", sortNo: 0 },
      selectedNode: null, // 用于存储当前选中的节点
    };
  },
  created() {
    this.fetchCategoryList();
  },
  methods: {
    async fetchCategoryList() {
      const response = await getCategoryPage({
        pageNo: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        condition: {
          name: this.listQuery.name
        }
      });
      this.treeData = this.formatTreeData(response.data.records);
      this.total = response.data.total;
    },
    formatTreeData(records) {
      const tree = [];
      const map = {};
      records.forEach(record => {
        map[record.id] = { ...record, children: [] };
      });
      records.forEach(record => {
        if (record.parentCode) {
          const parentNode = Object.values(map).find(node => node.code === record.parentCode);
          if (parentNode) {
            parentNode.children.push(map[record.id]);
          }
        } else {
          tree.push(map[record.id]);
        }
      });
      return tree;
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.fetchCategoryList();
    },
    handleCreate() {
      const parentCode = this.selectedNode ? this.selectedNode.code : null;

      let newCode = '';
      if (parentCode) {
        const siblings = this.selectedNode.children || [];
        const existingCodes = siblings.map(node => node.code);
        let index = 1;

        while (true) {
          newCode = `${parentCode}.${index}`;
          if (!existingCodes.includes(newCode)) {
            break;
          }
          index++;
        }
      }

      this.currentCategory = {
        id: null,
        code: newCode,
        name: '',
        parentCode: parentCode,
        groupCode: '',
        sortNo: 0
      };
      this.dialogVisible = true;
    },
    async handleEdit(node) {
      this.currentCategory = { ...node.data };
      this.dialogVisible = true;
    },
    async handleSave() {
      if (this.currentCategory.id) {
        await updateCategory(this.currentCategory);
      } else {
        await createCategory(this.currentCategory);
      }
      this.dialogVisible = false;
      this.fetchCategoryList();
    },
    confirmDelete(node) {
      MessageBox.confirm('确定要删除该分类吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteCategory(node.id);
        this.fetchCategoryList();
      });
    },
    handleNodeClick(node) {
      this.selectedNode = node; // 更新选中节点
    }
  },
  computed: {
    defaultProps() {
      return {
        children: 'children',
        label: 'name'
      };
    }
  }
};
</script>

<style scoped>
.app-container {
  padding: 20px;
}

.filter-container {
  margin-bottom: 20px;
}

.tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  /* 添加边框 */
  /* 添加内边距 */
  margin-bottom: 5px;
  /* 添加底部间距 */
  /* 圆角边框 */
  /* background-color: #f9f9f9; */
  width: 100%;
  /* 背景颜色 */
  transition: background-color 0.3s;
  /* 添加过渡效果 */
}

.tree-node.selected {
  background-color: #147aff;
  /* 选中时的背景颜色 */
}

.app-container ::v-deep .el-tree-node:focus>.el-tree-node__content {
  background-color: #69aaff !important;
}

.button-group {
  display: flex;
  gap: 5px;
  /* Adjusts spacing between buttons */
}

.edit-button,
.delete-button {
  color: #409EFF;
  /* Soft blue color for buttons */
  transition: color 0.3s;
}

.edit-button:hover,
.delete-button:hover {
  color: #66b1ff;
  /* Lighter blue on hover */
}

.el-tree-node {
  border: 1px solid #eee !important;
}

.el-button--mini {
  height: 25px;
  padding: 0;
}
</style>