const request=require("request");
const cheerio=require("cheerio");
const scoreCardObj=require("./scorecard");

function getAllMatches(url)
{
    request(url,function(err,response,html){
        if(err)
        {
            console.log(err);
        }
        else{
            //console.log(html);
            getScoreCardLinks(html);
        }
    });
}

function getScoreCardLinks(html)
{
    let $=cheerio.load(html);
    let scorecardsElement= $("a[data-hover='Scorecard']");
    for(let i=0;i<scorecardsElement.length;i++)
    {
        let element=scorecardsElement[i];
        let link=$(element).attr("href");
        let fullLink="https://www.espncricinfo.com/"+link;
        //console.log(fullLink);
        scoreCardObj.ps(fullLink);

        
    }
}


module.exports={
    getAllMatchesLinks:  getAllMatches
};

