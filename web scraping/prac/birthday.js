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

    let innigsArr = $(".card.content-block.match-scorecard-table>.Collapsible");

    for (let i = 0; i < innigsArr.length; i++) {

        let teamNameElem = $(innigsArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();


        let tableEle = $(innigsArr[i]).find(".table.batsman");
        let allBatsman = $(tableEle).find("tr");
        for (let j = 0; j < allBatsman.length; j++) {
            let allColsOfPlayer = $(allBatsman[j]).find("td");
            let isBatsmanCol = $(allColsOfPlayer[0]).hasClass("batsman-cell");
            if (isBatsmanCol == true) {
                let href = $(allColsOfPlayer[0]).find("a").attr("href");
                let name = $(allColsOfPlayer[0]).text();
                let fullLink = "https://www.espncricinfo.com" + href;
                //console.log(fullLink);
                getBirthdayPage(fullLink, name, teamName);
                // console.log(`teamName : ${teamName} playerName : ${playerName}`);

            }


        }

    }

}

function getBirthdayPage(url, name, teamName) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extraBirthday(html, name, teamName);
        }
    }
}

function extraBirthday(html, name, teamName) {
    let $ = cheerio.load(html);
    let detailsArr = $(".player-card-description");
    let birthday = $(detailsArr[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthday}`);
}