(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c9cc672"],{"59ad":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"品牌名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}}),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("新增品牌")])],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.brandList,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"ID",prop:"id",width:"80px",align:"center"}}),n("el-table-column",{attrs:{label:"品牌编码",prop:"code",width:"150px"}}),n("el-table-column",{attrs:{label:"品牌名称",prop:"name","min-width":"150px"}}),n("el-table-column",{attrs:{label:"排序编号",prop:"sortNo",width:"150px",align:"center"}}),n("el-table-column",{attrs:{label:"操作",width:"300px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleEdit(r)}}},[e._v("编辑")]),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.confirmDelete(r)}}},[e._v("删除")])]}}])})],1),n("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.listQuery.pageNo,"page-sizes":[10,20,50,100],"page-size":e.listQuery.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),n("el-dialog",{attrs:{visible:e.dialogVisible,title:"品牌管理"},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-form",{attrs:{model:e.currentBrand,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"品牌编码"}},[n("el-input",{model:{value:e.currentBrand.code,callback:function(t){e.$set(e.currentBrand,"code",t)},expression:"currentBrand.code"}})],1),n("el-form-item",{attrs:{label:"品牌名称"}},[n("el-input",{model:{value:e.currentBrand.name,callback:function(t){e.$set(e.currentBrand,"name",t)},expression:"currentBrand.name"}})],1),n("el-form-item",{attrs:{label:"排序编号"}},[n("el-input",{model:{value:e.currentBrand.sortNo,callback:function(t){e.$set(e.currentBrand,"sortNo",t)},expression:"currentBrand.sortNo"}})],1)],1),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v("保存")])],1)],1)],1)},a=[],o=n("5530"),i=n("c7eb"),c=n("1da1"),u=n("7c15"),d=n("5c96"),l={data:function(){return{listQuery:{title:"",pageNo:1,pageSize:10},brandList:[],total:0,dialogVisible:!1,currentBrand:{id:null,code:"",name:"",sortNo:0}}},created:function(){this.fetchBrandList()},methods:{fetchBrandList:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["m"])({pageNo:e.listQuery.pageNo,pageSize:e.listQuery.pageSize,title:e.listQuery.title,categoryCode:"",status:"1"});case 2:n=t.sent,e.brandList=n.data.records,e.total=n.data.total;case 5:case"end":return t.stop()}}),t)})))()},handleFilter:function(){this.listQuery.pageNo=1,this.fetchBrandList()},handleCreate:function(){this.currentBrand={id:null,code:"",name:"",sortNo:0},this.dialogVisible=!0},handleSave:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.currentBrand.id){t.next=5;break}return t.next=3,Object(u["u"])(e.currentBrand);case 3:t.next=7;break;case 5:return t.next=7,Object(u["b"])(e.currentBrand);case 7:e.dialogVisible=!1,e.fetchBrandList();case 9:case"end":return t.stop()}}),t)})))()},handleEdit:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.currentBrand=Object(o["a"])({},e),t.dialogVisible=!0;case 2:case"end":return n.stop()}}),n)})))()},confirmDelete:function(e){var t=this;d["MessageBox"].confirm("确定要删除这个品牌吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.handleDelete(e)})).catch((function(){console.log("删除操作取消")}))},handleDelete:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["g"])(e.id);case 2:t.fetchBrandList();case 3:case"end":return n.stop()}}),n)})))()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.fetchBrandList()},handleCurrentChange:function(e){this.listQuery.pageNo=e,this.fetchBrandList()}}},s=l,p=n("2877"),f=Object(p["a"])(s,r,a,!1,null,null,null);t["default"]=f.exports},"7c15":function(e,t,n){"use strict";n.d(t,"r",(function(){return c})),n.d(t,"y",(function(){return u})),n.d(t,"k",(function(){return d})),n.d(t,"l",(function(){return l})),n.d(t,"a",(function(){return s})),n.d(t,"t",(function(){return p})),n.d(t,"f",(function(){return f})),n.d(t,"s",(function(){return m})),n.d(t,"p",(function(){return b})),n.d(t,"i",(function(){return h})),n.d(t,"o",(function(){return g})),n.d(t,"w",(function(){return y})),n.d(t,"d",(function(){return j})),n.d(t,"n",(function(){return O})),n.d(t,"c",(function(){return w})),n.d(t,"v",(function(){return C})),n.d(t,"h",(function(){return v})),n.d(t,"b",(function(){return N})),n.d(t,"u",(function(){return k})),n.d(t,"g",(function(){return x})),n.d(t,"m",(function(){return B})),n.d(t,"e",(function(){return z})),n.d(t,"x",(function(){return S})),n.d(t,"j",(function(){return D})),n.d(t,"q",(function(){return T})),n.d(t,"A",(function(){return Q})),n.d(t,"z",(function(){return _}));var r=n("c7eb"),a=n("1da1"),o=(n("a4d3"),n("e01a"),n("b0c0"),n("b775")),i=n("5f87");function c(e){return Object(o["a"])({url:"/user/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||10,condition:{title:e.title||"",categoryCode:e.categoryCode||"",status:e.status||"1"}}})}function u(e){return Object(o["a"])({url:"/user",method:"put",data:{userId:e.userId,nickName:e.nickName,avatar:e.avatar,sex:e.sex}})}function d(e){return Object(o["a"])({url:"/user/".concat(e),method:"delete"})}function l(e){return Object(o["a"])({url:"/album/page",method:"post",data:{pageNo:0,pageSize:10,condition:{name:""}}})}function s(e){return Object(o["a"])({url:"/album",method:"post",data:{name:e.name,picNum:e.picNum,sortNo:e.sortNo,description:e.description,picture:e.picture}})}function p(e){return Object(o["a"])({url:"/album",method:"put",data:{id:e.id,name:e.name,picNum:e.picNum,sortNo:e.sortNo,description:e.description,picture:e.picture}})}function f(e){return Object(o["a"])({url:"/album/".concat(e),method:"delete"})}function m(e){return Object(o["a"])({url:"/auth/login",method:"post",data:e})}function b(e){return Object(o["a"])({url:"/news/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||10,condition:{title:e.title||null,categoryCode:e.categoryCode||null,status:e.status||null}}})}function h(e){return Object(o["a"])({url:"/news/".concat(e),method:"delete"})}function g(e){return Object(o["a"])({url:"/news/".concat(e),method:"get"})}function y(e){return Object(o["a"])({url:"/news",method:"put",data:{id:e.id,title:e.title,categoryCode:e.categoryCode,pictures:e.pictures||[],keyWords:e.keyWords||[],sortNo:e.sortNo||0,productIds:e.productIds||[],status:e.status,releaseTime:e.releaseTime,newsDetail:e.newsDetail}})}function j(e){return Object(o["a"])({url:"/news",method:"post",data:{title:e.title,categoryCode:e.categoryCode,pictures:e.pictures||[],keyWords:e.keyWords||[],sortNo:e.sortNo||0,productIds:e.productIds||[],status:e.status,releaseTime:e.releaseTime,newsDetail:e.newsDetail}})}function O(e){var t,n,r,a;return Object(o["a"])({url:"/category/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||100,condition:{code:(null===(t=e.condition)||void 0===t?void 0:t.code)||null,name:(null===(n=e.condition)||void 0===n?void 0:n.name)||null,parentCode:(null===(r=e.condition)||void 0===r?void 0:r.parentCode)||null,groupCode:(null===(a=e.condition)||void 0===a?void 0:a.groupCode)||null}}})}function w(e){return Object(o["a"])({url:"/category",method:"post",data:{code:e.code,name:e.name,parentCode:e.parentCode,groupCode:e.groupCode,sortNo:e.sortNo}})}function C(e){return Object(o["a"])({url:"/category",method:"put",data:{id:e.id,code:e.code,name:e.name,parentCode:e.parentCode,groupCode:e.groupCode,sortNo:e.sortNo}})}function v(e){return Object(o["a"])({url:"/category/".concat(e),method:"delete"})}function N(e){return Object(o["a"])({url:"/brand",method:"post",data:{code:e.code,name:e.name,sortNo:e.sortNo}})}function k(e){return Object(o["a"])({url:"/brand",method:"put",data:{id:e.id,code:e.code,name:e.name,sortNo:e.sortNo}})}function x(e){return Object(o["a"])({url:"/brand/".concat(e),method:"delete"})}function B(e){return Object(o["a"])({url:"/brand/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||10,condition:{title:e.title||"",categoryCode:e.categoryCode||"",status:e.status||"1"}}})}function z(e){return Object(o["a"])({url:"/product",method:"post",data:{categoryCode:e.categoryCode,brandCode:e.brandCode,title:e.title,description:e.description,keyWords:e.keyWords,pictures:e.pictures,productDetail:e.productDetail,sortNo:e.sortNo,releaseTime:e.releaseTime,status:"1"}})}function S(e){return Object(o["a"])({url:"/product",method:"put",data:{id:e.id,categoryCode:e.categoryCode,brandCode:e.brandCode,title:e.title,description:e.description,keyWords:e.keyWords,pictures:e.pictures,productDetail:e.productDetail,sortNo:e.sortNo,releaseTime:e.releaseTime,status:"1"}})}function D(e){return Object(o["a"])({url:"/product/".concat(e),method:"delete"})}function T(e){return Object(o["a"])({url:"/product/page",method:"post",data:{pageNo:e.pageNo,pageSize:e.pageSize,condition:{categoryCode:e.condition.categoryCode,brandCode:e.condition.brandCode,title:e.condition.title,status:e.condition.status||"1"}}})}function Q(e){return L.apply(this,arguments)}function L(){return L=Object(a["a"])(Object(r["a"])().mark((function e(t){var n,a,c,u;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new FormData,n.append("file",t),a=Object(i["a"])(),console.log("Token in uploadFile method:",a),e.next=6,Object(o["a"])({url:"/file/upload",method:"post",headers:{"Content-Type":"multipart/form-data"},data:n});case 6:if(c=e.sent,!c.success){e.next=12;break}return u=c.data.fileName,e.abrupt("return",{id:u,url:u});case 12:throw console.error("图片上传失败:",c.msg),new Error("图片上传失败");case 14:case"end":return e.stop()}}),e)}))),L.apply(this,arguments)}function _(e){return W.apply(this,arguments)}function W(){return W=Object(a["a"])(Object(r["a"])().mark((function e(t){var n,a,c,u;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new FormData,n.append("file",t),a=Object(i["a"])(),console.log("Token in uploadAlbumFile method:",a),e.prev=4,e.next=7,Object(o["a"])({url:"/file/upload",method:"post",headers:{"Content-Type":"multipart/form-data"},data:n});case 7:if(c=e.sent,console.log("Upload response in album method:",c),!c.success||"0"!==c.code){e.next=14;break}return u=c.data.fileName,e.abrupt("return",{id:u,url:u});case 14:throw console.error("相册图片上传失败:",c.msg),new Error(c.msg||"相册图片上传失败");case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e["catch"](4),console.error("相册上传文件过程中发生错误:",e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[4,18]])}))),W.apply(this,arguments)}}}]);