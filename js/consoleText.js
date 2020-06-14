//Функція для отримання виділеного тексту 
function selectText() {
    'use strict';
    // Збереження виділеного тексту в змінну
    let selText, selObj;
    selObj = window.getSelection();
    selText = selObj.toString();
    selText = selText.trim();

    // Відправка повідомлення background скрипту(additional_features.js) з виділенним текстом selText
    chrome.runtime.sendMessage({
        to_additional_features: selText
    }, function (response) {
        //  console.log(response.vubranText);
    });
}

//Функція розкриває список товара, кнопка "Розгорунти всі" та робить ціну червоного кольору
function list() {
    let i;
    $(".hidden_stocks").removeClass("hidden_stocks").addClass("showed_stocks");
    var x = document.getElementsByClassName("prices-table");
    for (i = 0; i < x.length; i++) {
        x[i].style.color = "red";
    }
}

//Функція для форматування колонки "В наявності/на замовлення" при пошуку товара через рядок пошуку
function stock() {
    //Колонку "В наявності/на замовлення" робить червоного кольору
    var kilkist_ryadkiv_svitli = document.getElementsByClassName("productlist-table-row-odd").length;
    var kilkist_ryadkiv_temni = document.getElementsByClassName("productlist-table-row-even").length;
    //    console.log('Кількість світлих рядків = ' + kilkist_ryadkiv_svitli);
    //    console.log('Кількість темних рядків = ' + kilkist_ryadkiv_temni);
    //Цикл для світлих рядків
    for (var a = 0; a < kilkist_ryadkiv_svitli; a++) {
        var nayavnist_ryadok_svitli = document.getElementsByClassName("productlist-table-row-odd").item(a);
        //        console.log('Світлий рядок №' + a + ' =');
        //        console.log(nayavnist_ryadok_svitli);
        var nayavnist_ryadok_dovguna_svitli = nayavnist_ryadok_svitli.getElementsByTagName("td").length;
        //        console.log('Кількість колонок(елементів) в рядку = ' + nayavnist_ryadok_dovguna_svitli);
        if (nayavnist_ryadok_dovguna_svitli > 7) {
            var newCol = nayavnist_ryadok_svitli.getElementsByTagName("td").item(5);
            newCol.style.color = "red";
        } else {
            var nayavnist_komirka_svitli = nayavnist_ryadok_svitli.getElementsByTagName("td").item(nayavnist_ryadok_dovguna_svitli - 2);
            //                console.log('Колонка в якій треба змінити колір тексту =');
            //                console.log(nayavnist_komirka_svitli);
            nayavnist_komirka_svitli.style.color = "red";
        }
    };
    //Цикл для темних рядків
    for (var b = 0; b < kilkist_ryadkiv_temni; b++) {
        var nayavnist_ryadok_temni = document.getElementsByClassName("productlist-table-row-even").item(b);
        //        console.log('Темний рядок №' + b + ' =');
        //        console.log(nayavnist_ryadok_temni);
        var nayavnist_ryadok_dovguna_temni = nayavnist_ryadok_temni.getElementsByTagName("td").length;
        //        console.log('Кількість колонок(елементів) в рядку = ' + nayavnist_ryadok_dovguna_temni);
        if (nayavnist_ryadok_dovguna_temni > 7 && nayavnist_ryadok_dovguna_temni <= 10) {
            var newCol1 = nayavnist_ryadok_temni.getElementsByTagName("td").item(2);
            newCol1.style.color = "red";
        }
        if (nayavnist_ryadok_dovguna_temni >= 11 || nayavnist_ryadok_dovguna_temni == 9) {
            var newCol1 = nayavnist_ryadok_temni.getElementsByTagName("td").item(5);
            newCol1.style.color = "red";
        } else {
            var nayavnist_komirka_temni = nayavnist_ryadok_temni.getElementsByTagName("td").item(nayavnist_ryadok_dovguna_temni - 2);
            //                console.log('Колонка в якій треба змінити колір тексту =');
            //                console.log(nayavnist_komirka_temni);
            nayavnist_komirka_temni.style.color = "red";
        }
    }
}

//Функція для отримання коду товара по натисканню на нього кнопкою миші
function getTarget(event) {
    let targetContent = event.target.innerText;
    let temp = targetContent.split(":");
    let productCode = parseInt(temp[1].trim());
    //Copi to clipboard
    const searchRow = temp[0].toLowerCase();
    if (searchRow.search("код товара") >= 0 || searchRow.search("код товару") >= 0) {
        navigator.clipboard.writeText(productCode)
            .then(() => {
                //Тут створити вікно з текстом "Код товара копійовано!" над місцем де натиснута клавіша мишки
                let x = event.pageX;
                let y = event.pageY;
                let xBox = x + 10;
                let yBox = y - 30;
                //console.log("X =", x, "Y =", y);
                let box = document.createElement("div");
                let textInBox = document.createTextNode("Код товара скопійовано!");
                box.appendChild(textInBox);
                let attBox = document.createAttribute("style");
                attBox.value = "background-color: #1a1a1a; color: #f2f2f2; height: 18px; border-radius: 4px 4px 4px 0; text-align: center; padding: 2px 10px; position: absolute;" + "top: " + yBox + "px; left: " + xBox + "px; z-index: 99";
                //att.value = "background-color: #1a1a1a; color: #f2f2f2; width: 100px; height: 18px; border-radius: 4px; text-align: center; padding-top: 2px; position: absolute;" + "top: " + yBox + "px; left: " + xBox + "px; z-index: 99";
                box.setAttributeNode(attBox);
                box.setAttribute("id", "DIYElement");
                document.body.appendChild(box);
            
                let triangle = document.createElement("div");
                let attTriangle = document.createAttribute("style");
                attTriangle.value = "border-width: 5px; border-style: solid; border-color: #1a1a1a transparent transparent #1a1a1a; position: absolute;" + "top: " + (y - 12) + "px; left: " + (x + 10)+ "px; z-index: 99";
                triangle.setAttributeNode(attTriangle);
                document.body.appendChild(triangle);
                //Видаляємо pop-up windows
                setTimeout(() => {
                    box.parentNode.removeChild(box);
                    triangle.parentNode.removeChild(triangle)
                }, 1000);
                console.log('Text copied to clipboard: ' + productCode);
            })
            .catch(err => {
                // This can happen if the user denies clipboard permissions:
                console.error('Could not copy text: ', err);
            });
    }
}

window.addEventListener("mouseup", selectText);
window.addEventListener("click", getTarget);
window.addEventListener("load", stock);
window.addEventListener("load", list);
window.addEventListener("load", setInterval(list, 3000));
//window.addEventListener("load", setTimeout(list, 5000));