import {collaboradors} from '../data/collaboradors.js';
import { projectsJson  } from "../data/projects.js";
import { tiposDeProjecte  } from "../data/tiposProjecte.js";

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    // font https://newbedev.com/javascript-queryselector-find-div-by-innertext
    // resuta que son la cadena de divs, a mi minteressa l'ultim
    let allDivs = Array.prototype.filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
    return allDivs[allDivs.length - 1];
}

function changeThings(htmlObjText) {

    let objJson = projectsJson.find(j => j.name == htmlObjText);

    // titol
    // OLD WAY
    let titol_htmlObj =
        Array.from(document.getElementsByClassName('wsite-content-title'))
            // [1]
            .find(Z => Z.innerHTML.includes(htmlObjText + "_title"));
    // console.log('titol_htmlObj:', titol_htmlObj)
    titol_htmlObj.innerText = objJson.title;

    //NEW WAY
    // let titol_htmlObj = contains('div', `${htmlObjText}_title`);
    // titol_htmlObj.innerText = objJson.title;


    //text
    //OLD WAY
    let text_htmlObj =
        Array.from(document.getElementsByClassName('paragraph'))
            // [1]
            .find(Z => Z.innerHTML.includes(htmlObjText + "_text"));
    text_htmlObj.innerText = objJson.text;

    //NEW WAY
    // let text_htmlObj = contains('div', `${htmlObjText}_text`);
    // text_htmlObj.innerText = objJson.text;

    //IMG
    var image = Array.from(document.images)
        .find(Z => Z.alt.includes(`${htmlObjText}_picture`));

    // image.src = 'https://www.ikea.com/es/en/images/products/smycka-artificial-flower-rose-red__0903311_pe596728_s5.jpg'

    image.src = '/files/theme/projectes_img/sim.jpg';


    //div copy
    let sectionDiv =
        Array.from(document.getElementsByClassName('wsite-section-wrap'))
        [1]; // recorda que hi ha ina seccio 0...

    let clone_ = sectionDiv.cloneNode(true);
    // console.log('clone_:', clone_)

    let doDiv = document.getElementById('wsite-content')
        .appendChild(clone_);
    // console.log('doDiv:', doDiv)


}

export function allItemsList() {

    //// 1er 
    // agafo l'objecte a replicar i l'elimino del div pare al final

    let sectionDiv =
        Array.from(document.getElementsByClassName('wsite-section-wrap'))
        [1]; // recorda que hi ha una seccio 0...

    let clone_ = sectionDiv.cloneNode(true);
    sectionDiv.remove();

    // 2on faig l'edició dels elements
    projectsJson
        .filter(Z => Z.display)
        .forEach(Z => {

            // s'ha de fer el clone cada cop , si no no funicona
            let newSection = clone_.cloneNode(true);

            // titol
            let tit = Array.from(newSection.getElementsByClassName('wsite-content-title'))
                .find(Z => Z.innerHTML.includes("general_title"));


                tit.style.fontSize = "25px" //4.25em"
                tit.innerText = Z.title;

            //text
            Array.from(newSection.getElementsByClassName('paragraph'))
                .find(Z => Z.innerHTML.includes("general_text"))
                .innerText = Z.text;

            //IMG
            Array.from(newSection.getElementsByTagName('img'))
                .find(Z => Z.alt.includes("general_picture"))
                .src = Z.img_1_src;

            //tipo
            //primer s'ha de trobar tipo a un altre objecte json
            //recorda que en projecte, el tipo es []

            let tipo_txt = Z.tipo
                .map(W => tiposDeProjecte.find(X => X.name == W))
                .map(W => W.title)
                .join(', ');

            Array.from(newSection.getElementsByClassName('paragraph'))
                .find(Z => Z.innerHTML.includes("general_tipo"))
                .innerText = `Tipus de projecte: ${tipo_txt}.`;


            //tipo IMG
            let tipoImage = Array.from(newSection.getElementsByTagName('img'))
                .find(Z => Z.alt.includes("general_tipo_picture"));
                let logosHeighStr = "45px";
                tipoImage.style.height = logosHeighStr;

            switch (Z.tipo.length) {
                case 1:
                    tipoImage.src = tiposDeProjecte.find(X => X.name == Z.tipo[0]).logo;
                    break;

                default:
                    //primera
                    tipoImage.src = tiposDeProjecte.find(X => X.name == Z.tipo[0]).logo;
                    // tipoImage.style.width = "47px";
                    // tipoImage.style.width = tipoImage.parentElement.parentElement.style.width;

                    // seguents
                    //new
                    for (let i = 1; i < Z.tipo.length; i++) {

                        let clone_logoTipo = tipoImage.cloneNode(true);
                        clone_logoTipo.style.marginLeft = "10px";
                        clone_logoTipo.src = tiposDeProjecte.find(X => X.name == Z.tipo[i]).logo;
                        tipoImage.parentElement.appendChild(clone_logoTipo);
                    }

                    break;
            }

            //collaboracio
            //primer s'ha de trobar collaboracio a un altre objecte json
            //recorda que en projecte, collaboracio es []

            let collab_txt = Z.collaboracio
                .map(W => collaboradors.find(X => X.name == W))
                .map(W => W.title)
                .join(', ');

            Array.from(newSection.getElementsByClassName('paragraph'))
                .find(Z => Z.innerHTML.includes("general_collaboracio"))
                .innerText = `Col·laboració amb: ${collab_txt}.`;


            //collab IMG
            let collabImage = Array.from(newSection.getElementsByTagName('img'))
                .find(Z => Z.alt.includes("general_collaboracio_picture"));
            collabImage.style.height = logosHeighStr;


            switch (Z.collaboracio.length) {
                case 1:
                    collabImage.src = collaboradors.find(X => X.name == Z.collaboracio[0]).logo;
                    break;

                default:
                    //primera
                    collabImage.src = collaboradors.find(X => X.name == Z.collaboracio[0]).logo;
                    // collabImage.style.width = collabImage.parentElement.parentElement.style.width;


                    // seguents
                    //new

                    for (let i = 1; i < Z.collaboracio.length; i++) {

                        let clone_logoCollab = collabImage.cloneNode(true);
                        clone_logoCollab.style.marginLeft = "10px";
                        clone_logoCollab.src = collaboradors.find(X => X.name == Z.collaboracio[i]).logo;
                        collabImage.parentElement.appendChild(clone_logoCollab);
                    }
                    break;
            }

            // links
            let links = Array.from(newSection.getElementsByTagName('a'))
                .filter(Z => Z.href.includes("general_link"))
            // .find(Z => Z.href.includes("general_link"));
            links.forEach(Z => Z.setAttribute('href', "http://www.google.com"));
            // console.log('links:', links)


            ////
            let containerDiv = document.getElementById('wsite-content');

            containerDiv.appendChild(newSection);
            // console.log('containerDiv:', containerDiv)

        })


    // faig mes estret l'espai entre containers
    estretarEspaiContainers();
    arreglarHeader();


}

function arreglarHeader() {
    let header = document.getElementById('logo');
    // console.log('header:', header)

    let strNewElement = '<img src="/files/theme/projectes_img/CARA-MCL.jpg" style="margin: 20px; border-width: 0px; width: 75px;" class="galleryImageBorder wsite-image">';
    header.insertAdjacentHTML('afterbegin', strNewElement);

    let titolWeb = header.getElementsByClassName('wsite-logo')[0];
    // console.log('titolWeb:', titolWeb)
    titolWeb.style.cssText = "position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);"

}

function estretarEspaiContainers() {
    // faig mes estret l'espai entre containers

    let containers = Array.from(document.getElementsByClassName('container'))
        .filter(Z => Z.className != 'content-wrap container');
    containers.forEach(Z => Z.style.padding = "5px");
    // s.log('containers:', containers)
}


function weebly_extra() {
    text1.innerHTML = "@@@@#kkk";
    console.log(document.getElementsByClassName('wsite-content-title')[0].innerHTML);//.innerHTML = "whatever";        


    let btn = document.getElementsByClassName('wsite-button wsite-button-small wsite-button-highlight')[0]
    btn.innerHTML = "@@@@#kkk";
    btn.removeAttribute("href");

    btn.addEventListener("click", myScript);

    function myScript() {
        let text2 = document.getElementsByClassName('wsite-content-title')[1]
        text2.innerHTML = "qqqqqqqqqq";
    }
}

