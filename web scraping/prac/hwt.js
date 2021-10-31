const request = require("request");
const cheerio = require("cheerio");
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";

console.log("before");

request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}

function extractHTML(html) {
    let $ = cheerio.load(html);
    let teamsArr = $(".match-info.match-info-MATCH .team");
    let wTeamName;
    for (let i = 0; i < teamsArr.length; i++) {
        let hasclass = $(teamsArr[i]).hasClass("team-gray");
        if (hasclass == false) {
            let teamNameEle = $(teamsArr[i]).find(".name");
            wTeamName = teamNameEle.text().trim();
            //console.log(wTeamName);
        }
    }

    let innigsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
    //let htmlStr = "";
    for (let i = 0; i < innigsArr.length; i++) {
        //let cHtml = $(innigsArr[i]).html();
        //htmlStr += cHtml;

        let teamNameElem = $(innigsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();

        //console.log(teamName);
        let hwtName = "";
        let hwt = 0;
        if (wTeamName == teamName) {
            console.log(teamName);

            let tableEle = $(innigsArr[i]).find(".table.bowler");
            let allBowlers = $(tableEle).find("tr");
            for (let j = 0; j < allBowlers.length; j++) {
                let allColsOfPlayer = $(allBowlers[j]).find("td");

                let playerName = $(allColsOfPlayer[0]).text();
                let wickets = $(allColsOfPlayer[4]).text();

                if (wickets >= hwt) {
                    hwt = wickets;
                    hwtName = playerName;
                }
            }
            console.log(`Winning Team ${wTeamName} playerName: ${hwtName} wickets: ${hwt}`);
        }

    }
    //console.log(htmlStr);
}


