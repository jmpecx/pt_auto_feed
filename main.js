import {getList, parseTorrent} from './beitai.js'
import {publish} from "./pigo.js";
import {readdir, readFile} from 'node:fs/promises';
import pLimit from 'p-limit';


async function main() {
    console.log("hello")
    for (let i = 117; i >= 0; i--) {
        // 当前种子列表
        console.log(`当前操作：${i}页`)
        const torrents = await getList(i)
        const tasks = torrents.map((x) => {
            return parseTorrent(torrents[x])
        })
        const infos = await Promise.all(tasks);
        // console.log(infos)
        // const uploadResults = infos.map(x => {
        //     return publish(x)
        // })
        // // 对列表中的每个种子进行分步处理
        // const a =await  parseTorrent('/details.php?id=1100&hit=1')
        // console.log(a)
        // console.log('开始上传')
        try {
            // const bb = await Promise.all(uploadResults)
        } catch (e) {
            console.log(e.response.status)
        }
    }
}

async function step() {
    try {
        const limit = pLimit(30);
        const files = await readdir('./cache');
        const allTopic = files.sort((a, b) => {
            return Number(a.replace('.json', '')) - Number(b.replace('.json', ''))
        });
        let pool = [];
        for (const file of allTopic) {
            const currentId = Number(file.replace('.json', ''))
            const json = await readFile('./cache/'+file);
            try {
                pool.push(limit(async()=>{
                    try {
                        console.log(`doing...${currentId}`)
                        const result=  await publish(JSON.parse(json))
                        const resp = result.data
                        if(result.status === 302){
                            console.log(`success...${currentId}`)
                        }
                        if(resp.indexOf('该种子已存在！')>-1){
                            console.log(`ok...${currentId}`)
                        }else{
                            console.log(`error....${currentId}`)
                        }
                        // if(result.data)
                    }
                    catch (e){
                        console.log(e.message, currentId)
                    }
                }))
            } catch (e) {
                console.log(e.name, e.message)
            }
        }
        await Promise.all(pool);
        // console.log(file);
    } catch (err) {
        console.error(err);
    }
}

async function test() {
    const a = await parseTorrent('details.php?id=5941&hit=1')
    await publish(a);
}

const _ = step();

// test();
