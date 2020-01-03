<template>
    <div>
         <!-- 按钮 -->
        <el-button size="small" type="success"  @click="toAddHandler">添加</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
         <!-- 按钮 -->
            <!--表格-->
        <el-table :data="product"> 
            <el-table-column   prop="id" label="编号"></el-table-column>
            <el-table-column   prop="name" label="产品名称"></el-table-column>
            <el-table-column   prop="price" label="价格"></el-table-column>
            <el-table-column   prop="description" label="描述"></el-table-column>
            <el-table-column   prop="categoryId" label="所属产品"></el-table-column>
            <el-table-column  fixed="right" label="操作">
                <template v-slot="slot">
                 <a href="" @click.prevent="toDeletHander(slot.row.id)">删除 </a>    
                 <a href="" @click.prevent="toUpdataHander(slot.row)">修改 </a>         
                 </template>
            </el-table-column>
        </el-table>
        <!--表格-->
        <!--分页-->
        <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
        <!--/分页-->
         <!--模态框-->
        <el-dialog
            title="添加产品信息"
            :visible.sync="visible"
            width="60%">
            <el-form :model="form" label-width="80px">
                
                 <el-form-item label="产品名称">
                    <el-input  v-model="form.name"></el-input>
                </el-form-item>
                 <el-form-item label="价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                 <el-form-item label="描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                 <el-form-item label="所属栏目">
                    <el-input v-model="form.categoryId"></el-input>
                </el-form-item>

            </el-form>  

            <span slot="footer" class="dialog-footer">
            <el-button @click="closeModelHandler" size="small">取 消</el-button>
            <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <!--/模态框-->
    </div>
</template>

<script>

import requset from '@/utils/request'
import querystring from 'querystring'
export default {
    //用于存放要向网页中存放的方法
    methods:{
        loadData(){
    let url = "http://localhost:6677/product/findAll"
        requset.get(url).then((response)=>{
            //将查询结果设置到category中,this指向外部函数的this
            this.product=response.data;
    })
        },
        
        submitHandler(){
            //this.form 对象---字符串-->后台
            //通过request与后台进行交互，并且要携带参数
            let url ="http://localhost:6677/product/saveOrUpdate"
            requset({
                url,
                method:"POST",
                headers:{
                    "Content-Tye":"application/x-www-form-urlencoded"
                },
                data:querystring.stringify(this.form)
            }).then((response)=>{
                //模态框关闭
                this.closeModelHandler();
                //提示消息
                this.loadData();
                this.$message({
                    type:"success",
                    message:response.message
                })
            })
        },
        toAddHandler(){
            this.visible=true;
        },
        closeModelHandler(){
            this.visible=false;
        },
        toUpdataHandler(){
            this.visible=true;
        },
        toDeleteHandler(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });          
            });
        }
    },
    //用于存放要向网页中存放的数据
    data(){
        return{
            visible:false,
            product:[],
            form:{
                type:"product"
            }
        }
    },
    created(){
        //this为当前vue实例对象
        // vue实例创建完毕
        this.loadData();

    }
}
</script>

<style scoped>

</style>>