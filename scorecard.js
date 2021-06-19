//const url="https://www.espncricinfo.com//series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
const request=require("request");
const cheerio=require("cheerio");

function processScoreCard(url)
{
    request(url,cb);
}

function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
        //console.log(html);
        extractMatchInfo(html);
    }
}

function extractMatchInfo(html)
{   // Venue    Date    Opponent    Result  Runs    Balls   Four    Sixes   Sr

    //Ipl folder
        //Team Folder
            //Player File
                //File---->Runs balls   fours   sizes   sr  opponent    vanue   date

    //For both teams,common things are --- > venue & Date(.event .description)  
    //                                       result (.event .status-text)

    let $ =cheerio.load(html);
    let description=$(".event .description");
    let result=$(".event .status-text");
    let descArr=description.text().split(",");
    let venue=descArr[1].trim();
    let date=descArr[2].trim();
    result=result.text();
    // console.log(venue);
    // console.log(date);
    // console.log(result.text());

    let innings=$(".card.content-block.match-scorecard-table .Collapsible");
   // let htmlString="";
    for(let i=0;i<innings.length;i++)
    {
        //htmlString+=$(innings[i]).html();
        //Team Folder
        let teamName=$(innings[i]).find("h5").text();
        teamName=teamName.split("INNINGS")[0].trim();
        


        let opponentIndex=i==0?1:0;
        let opponentTeamName=$(innings[opponentIndex]).find("h5").text();
        opponentTeamName=opponentTeamName.split("INNINGS")[0].trim();
        
      //  console.log(`${venue} |  ${date} | ${teamName} --- ${opponentTeamName} ---->>>>${result}`);
        let currInn=$(innings[i]);
        let rowsArr=currInn.find(".table.batsman tbody tr");

        for(let j=0;j<rowsArr.length;j++)
        {
           let allCols=$(rowsArr[j]).find("td");
           let isWorthy=$(allCols[0]).hasClass("batsman-cell");
           if(isWorthy==true)
           {
               //Player File
                //File---->Runs balls   fours   sizes   sr 
               let playerName= $(allCols[0]).text().trim();
               let runs= $(allCols[2]).text().trim();
               let balls= $(allCols[3]).text().trim();
               let fours= $(allCols[5]).text().trim();
               let sixes= $(allCols[6]).text().trim();
               let sr= $(allCols[7]).text().trim();

               console.log(`${playerName}        ${runs} ${balls} ${fours} ${sixes} ${sr}`);
           }
        }
            
    }
    //console.log(htmlString);
}

module.exports={
    ps:processScoreCard
}