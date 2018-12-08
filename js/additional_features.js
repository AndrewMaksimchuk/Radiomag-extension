var addSelText;

//Створення контекстного меню при виділеній області з текстом з назвою "Шукати на сайті rcscomponents.kiev.ua: "
var searchInTheStoreRadiomag = {
    "id": "searchInTheStore",
    "title": "Шукати на сайті rcscomponents.kiev.ua: ",
    "contexts": ["selection"]
};

chrome.contextMenus.create(searchInTheStoreRadiomag);

//Обробник натиску на створений пункт контекстного меню і виконання необхідної функції
chrome.contextMenus.onClicked.addListener(function () {
    window.open('https://www.rcscomponents.kiev.ua/modules.php?name=Asers_Shop&s_op=search&query=' + addSelText);
});

//Прийом повідомлення від контент скрипта і відповідь йому та оновлення контексного меню
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        addSelText = request.to_additional_features;

        chrome.contextMenus.update("searchInTheStore", {
            "title": 'Шукати "' + addSelText + '" на сайті rcscomponents.kiev.ua',
            "contexts": ["selection"]
        });

        sendResponse({
            vubranText: addSelText
        });
    });
