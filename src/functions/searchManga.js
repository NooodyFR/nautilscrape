const axios = require('axios').default;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs')

async function searchManga(name) {

    let req = await axios.get(`https://www.nautiljon.com/mangas/?q=${name}&tri=0`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
        }
    })

    const { document } = new JSDOM(req.data).window;

    let elements = document.querySelectorAll("tbody")[1]
    let len = elements.rows.length
    let results = []

    for (let i = 0; i < len; i++) {
        const element = elements.rows.item(i);
        let current = {
            name: "",
            alt_name: "",
            scenario: "",
            link: "",
            id: ""
        }

        current.name = element.cells.item(1).childNodes.item(1).textContent
        current.link = `https://www.nautiljon.com${element.cells.item(1).childNodes.item(1).href}`
        current.id = element.cells.item(1).childNodes.item(1).href.replace("/mangas/", "").replace(".html", "")
        // let name = element.cells.item(1).childNodes.item(1).textContent
        // let alt_name = element.cells.item(1).childNodes.item(3).class
        element.cells.item(1).childNodes.forEach(o => {
            if (o.nodeName === "SPAN" && o.classList.contains("infos_small")) {
                current.alt_name = o.textContent.replace('(', "").replace(')', "")
            }
            if (o.nodeName === "P") {
                current.scenario = o.textContent.replace(' Lire la suite', "")
            }
        })

        console.log(current)
        // console.log(name)
        // console.log(element.cells.item(1).innerHTML)
        results.push(current)
    }

    return results
    // console.log(elements.rows.item(0).cells.item(1).childNodes.item(0).textContent)
}

// searchManga("One piece")

module.exports = searchManga;