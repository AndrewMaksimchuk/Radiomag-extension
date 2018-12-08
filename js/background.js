let todayDate = new Date();
let month = todayDate.getMonth();
let newYearColor = "#4bb231";

window.onload = function() {
    if (month == 11 ||  month == 0) {
        document.body.style.backgroundImage = "url('img/backgroundNewYear.png')";
        let tempH5 = document.getElementsByTagName("h5");
        for (let i=0; i < tempH5.length; i++){
            tempH5[i].style.cssText = "color: " + newYearColor + ";"
        }
        let tempH4 = document.getElementsByTagName("h4");
        for (let i=0; i < tempH4.length; i++){
            tempH4[i].style.cssText = "color: " + newYearColor + ";"
        }
        let tempH3 = document.getElementsByTagName("h3");
        for (let i=0; i < tempH3.length; i++){
            tempH3[i].style.cssText = "color: " + newYearColor + ";"
        }
    } else {
        document.body.style.backgroundImage = "url('img/noise_2.png')";
    }
}

//Колір шрифта для тегів h4, h5, h6 на новорічні свята: color: #990000;
//Задній фон на новорічні свята для тегу body: background-image: url("backgroundNewYear.png");