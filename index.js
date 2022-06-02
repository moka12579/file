const http = require('http');
const koa = require('koa')
const route = require('koa-router')
const router = new route()
const fs = require('fs')

const app = new koa();


router.post('/msg',async (ctx) => {
    ctx.req.on('data',d => {
        let c = JSON.parse(d.toString())
        if (c.post_type == 'message'){
            if (c.group_id == 901402496 && c.raw_message == "安装准备工作"){
                fs.readdir('/Users/cuihaolin/Desktop/安装准备工作',(err,files) => {
                    for (let i = 0; i < files.length; i++) {
                        //需要上传的文件绝对路径
                        let filePath = '/Users/cuihaolin/Desktop/安装准备工作/'+files[i]
                        //需要上传的文件名
                        // let fileName = filesKey
                        http.get('http://127.0.0.1:5700/upload_group_file?group_id=901402496&file='+filePath+'&name='+files[i],res => {
                            res.on('data',chunk => {
                                console.log(chunk.toString())
                            })
                        })
                    }

                })
            }
        }
    })
} )


app.use(router.routes())


app.listen(3000)