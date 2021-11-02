import { texts } from "../data/texts.js";



export function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    // font https://newbedev.com/javascript-queryselector-find-div-by-innertext
    // resuta que son la cadena de divs, a mi minteressa l'ultim
    let allDivs = Array.prototype.filter.call(elements, function (element) {
        return RegExp(text).test(element.textContent);
    });
    return allDivs[allDivs.length - 1];
}



export function introTxt() {

    let newsletter_intro_elem = contains('div', 'newsletter_intro');
    console.log('newsletter_intro_elem:', newsletter_intro_elem)

    newsletter_intro_elem.innerHTML = texts.find(Z => Z.key == 'newsletter_intro').val;

}

export function htmlTxtChnge_getElementbyHtmlTxt(dataItem) {
    let elem = contains('div', dataItem.key);
    elem.innerHTML = dataItem.val;
}

export function generalTextsInsert() {
    texts.forEach(Z => {
        try { 
            console.log('Z.key:', Z.key)
            htmlTxtChnge_getElementbyHtmlTxt(Z) 
        } catch (error) { }
    }) 
}

