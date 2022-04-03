const express = require("express");
const req = require("request");
const cheerio = require("cheerio");

//fs is not needed for the given assignment..
const fs = require("fs");

const url = "https://time.com";

const app = express();


//scraping the required data from time.com using request and cheerio..!!
req(url, (err, res, html)=> {
    if(!err) {

        const $ = cheerio.load(html);
        
        const items = [];

        const allitems = $('div[class="partial latest-stories"]').children();

        allitems.each((index)=> {

            items.push({

                title: $('div[class="partial latest-stories"]').children().eq(1).children().eq(index).children().eq(0).children().eq(0).text(),
                link: "https://time.com" + $('div[class="partial latest-stories"]').children().eq(1).children().eq(index).children().eq(0).attr("href")

        })

        })

        console.log(items)


        //fs is not needed for the given assignment..
        fs.writeFileSync("output.json", JSON.stringify(items), (err)=> {
            if(err) {
                console.log(err);
            }
            else {
                console.log("data has been added to a file")
            }
        })

        //get request to show scraped data in localhost 
        app.get("/getTimeStories", (req,res)=> {
    
            res.end(JSON.stringify(items));
            
            })
       
    }

})



app.listen(8080);