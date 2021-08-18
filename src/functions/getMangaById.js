const axios = require('axios').default;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

async function getMangaById(id) {

    try {
        let req = await axios.get(`https://www.nautiljon.com/mangas/${id}.html`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
            }
        })    
        const { document } = new JSDOM(req.data).window;

        let result = {
            name:"",
            original_name:"",
            origin:"",
            anneevo: "",
            anneevf: "",
            genres: [],
            themes: [],
            author: "",
            editor: "",
            volumesvo: "",
            volumesvf: "",
            age: "",
            scenario: "",
            note: "",
            status: ""
        }
    
    
        document.querySelector("#onglets_1_information > div.infosFicheTop > div.liste_infos > ul").childNodes.forEach(o => {
            if (o.textContent.includes("Titre original")) {
                result.original_name = o.textContent.replace('Titre original :  ', '')
            }
            if (o.textContent.includes("Origine")) {
                result.origin = o.textContent.replace("Origine :   ", "").split(" -")[0]
                result.anneevo = o.textContent.replace("Origine :   ", "").split(" - ")[1]
            }
            if (o.textContent.includes("Année VF")) {
                result.anneevf = o.textContent.replace("Année VF :  ", "")
            }
            if (o.textContent.includes("Genres")) {
                result.genres = o.textContent.replace("Genres :  ", "").split(" - ")
            }
            if (o.textContent.includes("Thèmes")) {
                result.themes = o.textContent.replace("Thèmes :  ", "").split(" - ")
            }
            if (o.textContent.includes("Auteur")) {
                if (o.textContent.includes("Auteur Original")) {
                    result.author = o.textContent.replace("Auteur Original :  ", "")
                } else {
                    result.author = o.textContent.replace("Auteur :  ", "")
                }
            }
            if (o.textContent.includes("Éditeur VO")) {
                result.editor = o.textContent.replace("Éditeur VO :  ", "")
            }
            if (o.textContent.includes("Éditeur VF")) {
                result.editor = o.textContent.replace("Éditeur VF :  ", "")
            }
            if (o.textContent.includes("Nb volumes VO")) {
                result.volumesvo = o.textContent.replace("Nb volumes VO :  ", "").split(" (")[0]
            }
            if (o.textContent.includes("Nb volumes VF")) {
                result.volumesvf = o.textContent.replace("Nb volumes VF :  ", "").split(" (")[0]
                result.status = o.textContent.split("(").pop().split(")")[0];
            }
            if (o.textContent.includes("Âge conseillé")) {
                result.age = o.textContent.replace(" ans et +", "").replace("Âge conseillé :  ", "")
            }
        })
    
        result.name = document.querySelector("#content > div.frame_left > div.frame_left_top > h1 > span").textContent
        result.scenario = document.querySelector("#onglets_1_information > div:nth-child(2) > div > div.description").textContent
        try {
            result.note = document.querySelector("#moy_note_11 > div > span.moy_note.OpenSansCondensed").textContent
        } catch {}
    
        // console.log(result)
        return result
    
    } catch (e) {
        console.log(e)
        return false;
    }

}

module.exports = getMangaById
// getMangaById("neon+genesis+evangelion")