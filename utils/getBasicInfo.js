import * as cheerio from 'cheerio';

export function getBasicInfo(html,rawInfo) {
    // 获取到所有的td
    const $ = cheerio.load(html);
    const tds = $("td");
    // 填充副标题
    const subtitleTd = tds.filter((i)=>$(tds[i]).text() ==='副标题')
    const subtitleValueTd = subtitleTd.next();
    rawInfo.small_descr=subtitleValueTd.text();
    const basicInfoTd = tds.filter((i)=>$(tds[i]).text() ==='基本信息')
    const basicInfoValueTd = basicInfoTd.next();
    const a = basicInfoValueTd.children()
    const map = {}
    for (const aElement of a) {
        const c = $(aElement);
        const type = $(aElement).text().trim();
        const value=aElement.next.data.trim();
        // console.log(type,value)
        if(type === '大小:'){
            // 大小好像不用传递
        }else if(type === '类型:'){
            rawInfo.type=value;
        }else if(type === '媒介:'){
            rawInfo.medium_sel=value;
        }else if(type === '编码:'){
            rawInfo.codec_sel=value;
        }else if(type === '制作组:'){
            rawInfo.team_sel=value;
        }else if(type === '分辨率:'){
            rawInfo.standard_sel=value;
        }
    }
    //
}
