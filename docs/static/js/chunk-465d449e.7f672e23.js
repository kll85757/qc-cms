(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-465d449e"],{4044:function(e,t,n){"use strict";n("dd96")},"7c15":function(e,t,n){"use strict";n.d(t,"r",(function(){return c})),n.d(t,"y",(function(){return s})),n.d(t,"k",(function(){return u})),n.d(t,"l",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"t",(function(){return p})),n.d(t,"f",(function(){return b})),n.d(t,"s",(function(){return f})),n.d(t,"p",(function(){return m})),n.d(t,"i",(function(){return h})),n.d(t,"o",(function(){return g})),n.d(t,"w",(function(){return w})),n.d(t,"d",(function(){return y})),n.d(t,"n",(function(){return N})),n.d(t,"c",(function(){return k})),n.d(t,"v",(function(){return v})),n.d(t,"h",(function(){return O})),n.d(t,"b",(function(){return j})),n.d(t,"u",(function(){return C})),n.d(t,"g",(function(){return x})),n.d(t,"m",(function(){return S})),n.d(t,"e",(function(){return _})),n.d(t,"x",(function(){return D})),n.d(t,"j",(function(){return T})),n.d(t,"q",(function(){return z})),n.d(t,"A",(function(){return W})),n.d(t,"z",(function(){return F}));var r=n("c7eb"),a=n("1da1"),o=(n("a4d3"),n("e01a"),n("b0c0"),n("b775")),i=n("5f87");function c(e){return Object(o["a"])({url:"/user/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||10,condition:{title:e.title||"",categoryCode:e.categoryCode||"",status:e.status||"1"}}})}function s(e){return Object(o["a"])({url:"/user",method:"put",data:{userId:e.userId,nickName:e.nickName,avatar:e.avatar,sex:e.sex}})}function u(e){return Object(o["a"])({url:"/user/".concat(e),method:"delete"})}function l(e){return Object(o["a"])({url:"/album/page",method:"post",data:{pageNo:0,pageSize:10,condition:{name:""}}})}function d(e){return Object(o["a"])({url:"/album",method:"post",data:{name:e.name,picNum:e.picNum,sortNo:e.sortNo,description:e.description,picture:e.picture}})}function p(e){return Object(o["a"])({url:"/album",method:"put",data:{id:e.id,name:e.name,picNum:e.picNum,sortNo:e.sortNo,description:e.description,picture:e.picture}})}function b(e){return Object(o["a"])({url:"/album/".concat(e),method:"delete"})}function f(e){return Object(o["a"])({url:"/auth/login",method:"post",data:e})}function m(e){return Object(o["a"])({url:"/news/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||10,condition:{title:e.title||null,categoryCode:e.categoryCode||null,status:e.status||null}}})}function h(e){return Object(o["a"])({url:"/news/".concat(e),method:"delete"})}function g(e){return Object(o["a"])({url:"/news/".concat(e),method:"get"})}function w(e){return Object(o["a"])({url:"/news",method:"put",data:{id:e.id,title:e.title,categoryCode:e.categoryCode,pictures:e.pictures||[],keyWords:e.keyWords||[],sortNo:e.sortNo||0,productIds:e.productIds||[],status:e.status,releaseTime:e.releaseTime,newsDetail:e.newsDetail}})}function y(e){return Object(o["a"])({url:"/news",method:"post",data:{title:e.title,categoryCode:e.categoryCode,pictures:e.pictures||[],keyWords:e.keyWords||[],sortNo:e.sortNo||0,productIds:e.productIds||[],status:e.status,releaseTime:e.releaseTime,newsDetail:e.newsDetail}})}function N(e){var t,n,r,a;return Object(o["a"])({url:"/category/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||100,condition:{code:(null===(t=e.condition)||void 0===t?void 0:t.code)||null,name:(null===(n=e.condition)||void 0===n?void 0:n.name)||null,parentCode:(null===(r=e.condition)||void 0===r?void 0:r.parentCode)||null,groupCode:(null===(a=e.condition)||void 0===a?void 0:a.groupCode)||null}}})}function k(e){return Object(o["a"])({url:"/category",method:"post",data:{code:e.code,name:e.name,parentCode:e.parentCode,groupCode:e.groupCode,sortNo:e.sortNo}})}function v(e){return Object(o["a"])({url:"/category",method:"put",data:{id:e.id,code:e.code,name:e.name,parentCode:e.parentCode,groupCode:e.groupCode,sortNo:e.sortNo}})}function O(e){return Object(o["a"])({url:"/category/".concat(e),method:"delete"})}function j(e){return Object(o["a"])({url:"/brand",method:"post",data:{code:e.code,name:e.name,sortNo:e.sortNo}})}function C(e){return Object(o["a"])({url:"/brand",method:"put",data:{id:e.id,code:e.code,name:e.name,sortNo:e.sortNo}})}function x(e){return Object(o["a"])({url:"/brand/".concat(e),method:"delete"})}function S(e){return Object(o["a"])({url:"/brand/page",method:"post",data:{pageNo:e.pageNo||1,pageSize:e.pageSize||10,condition:{title:e.title||"",categoryCode:e.categoryCode||"",status:e.status||"1"}}})}function _(e){return Object(o["a"])({url:"/product",method:"post",data:{categoryCode:e.categoryCode,brandCode:e.brandCode,title:e.title,description:e.description,keyWords:e.keyWords,pictures:e.pictures,productDetail:e.productDetail,sortNo:e.sortNo,releaseTime:e.releaseTime,status:"1"}})}function D(e){return Object(o["a"])({url:"/product",method:"put",data:{id:e.id,categoryCode:e.categoryCode,brandCode:e.brandCode,title:e.title,description:e.description,keyWords:e.keyWords,pictures:e.pictures,productDetail:e.productDetail,sortNo:e.sortNo,releaseTime:e.releaseTime,status:"1"}})}function T(e){return Object(o["a"])({url:"/product/".concat(e),method:"delete"})}function z(e){return Object(o["a"])({url:"/product/page",method:"post",data:{pageNo:e.pageNo,pageSize:e.pageSize,condition:{categoryCode:e.condition.categoryCode,brandCode:e.condition.brandCode,title:e.condition.title,status:e.condition.status||"1"}}})}function W(e){return L.apply(this,arguments)}function L(){return L=Object(a["a"])(Object(r["a"])().mark((function e(t){var n,a,c,s;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new FormData,n.append("file",t),a=Object(i["a"])(),console.log("Token in uploadFile method:",a),e.next=6,Object(o["a"])({url:"/file/upload",method:"post",headers:{"Content-Type":"multipart/form-data"},data:n});case 6:if(c=e.sent,!c.success){e.next=12;break}return s=c.data.fileName,e.abrupt("return",{id:s,url:s});case 12:throw console.error("图片上传失败:",c.msg),new Error("图片上传失败");case 14:case"end":return e.stop()}}),e)}))),L.apply(this,arguments)}function F(e){return E.apply(this,arguments)}function E(){return E=Object(a["a"])(Object(r["a"])().mark((function e(t){var n,a,c,s;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new FormData,n.append("file",t),a=Object(i["a"])(),console.log("Token in uploadAlbumFile method:",a),e.prev=4,e.next=7,Object(o["a"])({url:"/file/upload",method:"post",headers:{"Content-Type":"multipart/form-data"},data:n});case 7:if(c=e.sent,console.log("Upload response in album method:",c),!c.success||"0"!==c.code){e.next=14;break}return s=c.data.fileName,e.abrupt("return",{id:s,url:s});case 14:throw console.error("相册图片上传失败:",c.msg),new Error(c.msg||"相册图片上传失败");case 16:e.next=22;break;case 18:throw e.prev=18,e.t0=e["catch"](4),console.error("相册上传文件过程中发生错误:",e.t0),e.t0;case 22:case"end":return e.stop()}}),e,null,[[4,18]])}))),E.apply(this,arguments)}},"7c64":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"标题"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.title,callback:function(t){e.$set(e.listQuery,"title",t)},expression:"listQuery.title"}}),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("新增")])],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.newsList,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{label:"ID",prop:"id",width:"80px",align:"center"}}),n("el-table-column",{attrs:{label:"标题",prop:"title","min-width":"150px"}}),n("el-table-column",{attrs:{label:"发布时间",prop:"releaseTime",width:"180px",align:"center"}}),n("el-table-column",{attrs:{label:"今日点击数",prop:"todayClicks",width:"130px",align:"center"}}),n("el-table-column",{attrs:{label:"历史点击数",prop:"totalClicks",width:"130px",align:"center"}}),n("el-table-column",{attrs:{label:"状态",prop:"status",width:"100px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("el-tag",{attrs:{type:"published"===r.status?"success":"info"}},[e._v(e._s(r.status))])]}}])}),n("el-table-column",{attrs:{label:"操作",width:"300px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var r=t.row;return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleEdit(r)}}},[e._v("编辑")]),"published"!==r.status?n("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(t){return e.handlePublish(r)}}},[e._v("发布")]):e._e(),"published"===r.status?n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleUnpublish(r)}}},[e._v("下架")]):e._e(),n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(r)}}},[e._v("删除")])]}}])})],1),n("el-dialog",{attrs:{visible:e.dialogVisible,title:"新闻管理",width:"70%",top:"10vh"},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("el-form",{attrs:{model:e.currentNews,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"标题"}},[n("el-input",{model:{value:e.currentNews.title,callback:function(t){e.$set(e.currentNews,"title",t)},expression:"currentNews.title"}})],1),n("el-form-item",{attrs:{label:"发布时间"}},[n("el-date-picker",{attrs:{type:"datetime"},model:{value:e.currentNews.releaseTime,callback:function(t){e.$set(e.currentNews,"releaseTime",t)},expression:"currentNews.releaseTime"}})],1),n("el-form-item",{attrs:{label:"关键词"}},[n("el-checkbox-group",{model:{value:e.currentNews.keyWords,callback:function(t){e.$set(e.currentNews,"keyWords",t)},expression:"currentNews.keyWords"}},[n("el-checkbox",{attrs:{label:"01"}},[e._v("产品咨询")]),n("el-checkbox",{attrs:{label:"02"}},[e._v("新闻资讯")]),n("el-checkbox",{attrs:{label:"03"}},[e._v("公司公告")]),n("el-checkbox",{attrs:{label:"04"}},[e._v("出货记录")])],1)],1),n("el-form-item",{attrs:{label:"新闻详情"}},[n("quill-editor",{staticStyle:{height:"270px",width:"100%"},attrs:{options:e.editorOptions},model:{value:e.currentNews.newsDetail,callback:function(t){e.$set(e.currentNews,"newsDetail",t)},expression:"currentNews.newsDetail"}})],1)],1),n("div",{staticClass:"dialog-footer",staticStyle:{"padding-top":"40px"},attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.handleSave}},[e._v("保存")])],1)],1)],1)},a=[],o=n("5530"),i=n("c7eb"),c=n("1da1"),s=(n("99af"),n("d81d"),n("4d90"),n("7c15")),u=(n("a7539"),n("8096"),n("14e1"),n("953d"));function l(e){var t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0"),a=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0"),i=String(e.getSeconds()).padStart(2,"0");return"".concat(t,"-").concat(n,"-").concat(r," ").concat(a,":").concat(o,":").concat(i)}var d={components:{quillEditor:u["quillEditor"]},data:function(){return{listQuery:{title:"",pageNo:1,pageSize:10},newsList:[],total:0,dialogVisible:!1,currentNews:{id:null,title:"",releaseTime:"",newsDetail:"",keyWords:[]},editorOptions:{theme:"snow",placeholder:"请输入新闻内容"}}},created:function(){this.fetchNewsList()},methods:{fetchNewsList:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(s["p"])(e.listQuery);case 2:n=t.sent,n.success&&n.data?(e.newsList=n.data.records.map((function(e){return{id:e.id,title:e.title,releaseTime:e.releaseTime,todayClicks:e.todayClicks||0,totalClicks:e.totalClicks||0,status:1===e.status?"published":"draft"}})),e.total=n.data.total):e.$message.error(n.msg||"Failed to fetch news list");case 4:case"end":return t.stop()}}),t)})))()},handleFilter:function(){this.listQuery.pageNo=1,this.fetchNewsList()},handleCreate:function(){this.currentNews={id:null,title:"",releaseTime:l(new Date),newsDetail:"",keyWords:[],status:"1"},this.dialogVisible=!0},handleSave:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.currentNews.id){t.next=5;break}return t.next=3,Object(s["w"])(e.currentNews);case 3:t.next=7;break;case 5:return t.next=7,Object(s["d"])(e.currentNews);case 7:e.dialogVisible=!1,e.fetchNewsList();case 9:case"end":return t.stop()}}),t)})))()},handleEdit:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){var r;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(s["o"])(e.id);case 2:r=n.sent,r.success&&r.data&&(t.currentNews=Object(o["a"])({},r.data),t.dialogVisible=!0);case 4:case"end":return n.stop()}}),n)})))()},handleDelete:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(s["i"])(e.id);case 2:t.fetchNewsList();case 3:case"end":return n.stop()}}),n)})))()},handlePublish:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.status="published",n.next=3,Object(s["w"])(e);case 3:t.fetchNewsList();case 4:case"end":return n.stop()}}),n)})))()},handleUnpublish:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.status="draft",n.next=3,Object(s["w"])(e);case 3:t.fetchNewsList();case 4:case"end":return n.stop()}}),n)})))()}}},p=d,b=(n("4044"),n("2877")),f=Object(b["a"])(p,r,a,!1,null,"a8b987e2",null);t["default"]=f.exports},dd96:function(e,t,n){}}]);