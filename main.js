const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request=require("request");
const cheerio=require("cheerio");
const getAllMatchObj=require("./allMatch");

request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
        //console.log(html);
        extractLink(html);
    }
}

function extractLink(html)
{
    const $=cheerio.load(html);
    let anchorElement=$("a[data-hover='View All Results']");
    let link=anchorElement.attr("href");
    let finalLink="https://www.espncricinfo.com/"+link;
   // console.log(finalLink);
    getAllMatchObj.getAllMatchesLinks(finalLink);
}








