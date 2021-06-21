let fs=require("fs");
let xlsx=require("xlsx");
let data=require("")
function excelWriter(filePath,json,sheetName)
{
let newWb=xlsx.utils.book_new();
let newWS=xlsx.utils.json_to_sheet(json);
xlsx.utils.book_append_sheet(newWb,newWS,sheetName);
xlsx.writeFile(newWb,filePath);
}




function excelReader(filePath,sheetName)
{
    if(fs.readFileSync(filePath)==false)
    {
        return [];
    }
    let wb=xlsx.readFile(filePath);
    let excelData=wb.sheet[sheetName];
    let ans=xlsx.utils.sheet_to_json(excelData);
    return;
    console.log(ans);
}