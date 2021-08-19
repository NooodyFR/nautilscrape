const axios = require('axios').default;
const jsdom = require('jsdom')
const { JSDOM } = jsdom;
const fs = require('fs')
async function getBooksById(id, number) {

    let req = await axios.get(`https://www.nautiljon.com/mangas/${id}.html`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
            }
        })    
    let { document } = new JSDOM(req.data).window; 

    let books = document.getElementById("edition_0-1")

    let url;

    for (let i = 0; i < books.childNodes.length; i++) {
        const element = books.childNodes[i];
        if (element.classList.contains('unVol')) {
            if (element.textContent === ` Vol. ${number}`) {
                url = `https://www.nautiljon.com${element.firstChild.href}`
            }
        }
    }

    if (url === undefined) {
        return {status: false}
    }

    // for (let i = 0; i < urlList.length; i++) {
    //     const element = urlList[i];



        async function newdata(data) {
            let book = {
                vfdate: "",
                vodate: "",
                price: "",
                pages: "",
                ean: "",
                image: "",
                scenario: "",
                chapters: []
            }
    
            let {document} = new JSDOM(data).window;
    
            document.querySelector("#onglets_1_information > div.infosFicheTop > div.liste_infos > ul:nth-child(2)").childNodes.forEach(o => {
                if (o.textContent.includes("Code EAN")) {
                    book.ean = o.textContent.replace("Code EAN :  ", "")
                }
                if (o.textContent.includes("Date de parution VO")) {
                    book.vodate = o.textContent.replace("Date de parution VO :  ", "")
                }
                if (o.textContent.includes("Date de parution VF")) {
                    book.vfdate = o.textContent.replace("Date de parution VF :  ", "")
                }
                if (o.textContent.includes("Prix")) {
                    book.price = o.textContent.replace("Prix :  ", "")
                }
                if (o.textContent.includes("Nombre de pages")) {
                    book.pages = o.textContent.replace("Nombre de pages :  ", "")
                }
                if (o.textContent.includes("Code EAN")) {
                    book.ean = o.textContent.replace("Code EAN :  ", "")
                }
            })
    
            book.image = document.querySelector("#onglets_3_couverture").firstChild.src;
            book.scenario = document.querySelector("#onglets_1_information > div:nth-child(2) > div > div.description").textContent;
            let chapters = [] 
            if (document.querySelector("#onglets_1_information > div:nth-child(2) > div > div.chapitres")) {
                document.querySelector("#onglets_1_information > div:nth-child(2) > div > div.chapitres").textContent.split("\n").forEach(o => {
                    let currentchapter = {
                        name: "",
                        number:""
                    }
                    currentchapter.name = o.split(" : ")[1]
                    currentchapter.number = o.split(" : ")[0].replace("Chapitre ", "")
                    chapters.push(currentchapter)
                })    
            }
        
            book.chapters = chapters
        // }
        
        return book
    }
    req2 = await axios.get(url, {
         headers: {
             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
         }
     })

    return await newdata(req2.data)

    // fs.writeFileSync('./test.json', JSON.stringify(bookList))

}

module.exports = getBooksById;
// getBooksById("the+promised+neverland", 30)