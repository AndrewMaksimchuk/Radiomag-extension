//Глобальні змінні
var strip_color = ['#000000', '#993300', '#ff0000', '#ff6600', '#ffff00', '#00ff00', '#0000ff', '#cc00cc', '#4d4d4d', '#ffffff']; //Кольори для 1-ї і 2-ї полосок
// var strip_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var multiplier_color = ['#bfbfbf', '#ffd700', '#000000', '#993300', '#ff0000', '#ff6600', '#ffff00', '#00ff00', '#0000ff', '#cc00cc', '#4d4d4d', '#ffffff']; //Кольори для множителя
//Степені для множителя
var multiplier_number = ['0.01', '0.1', '1', '10', '100', '1000', '10000', '100000', '1000000', '10000000', '100000000', '1000000000'];
var tolerance_color = ['#ffd700', '#bfbfbf', '#993300', '#ff0000', '#00ff00', '#0000ff', '#cc00cc', '#4d4d4d']; //Кольори 4-ї полоски, точність
var tolerance_number = ['±5','±10', '±1', '±2', '±0,5', '±0,25', '±0,1', '±0,05']; //Точність у відсотках
//Лічильники
var number_counter_first_strip = 0;
var number_counter_second_strip = 0;
var multiplier_counter = 0;
var tolerance_counter = 0;
var resistor_resistance; 
var	power_res_nominal = "";
var input_length;

//Очікування подій, в даному випадку натискання кнопки мишки на полосках
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("rect3796").addEventListener("click", color_change_first_strip);
  document.getElementById("rect3798").addEventListener("click", color_change_second_strip);
  document.getElementById("rect3800").addEventListener("click", multiplier);
  document.getElementById("rect3819").addEventListener("click", tolerance);
});
//Функція зміни кольорів для 1-ї полоски
function color_change_first_strip(){
	
		if (number_counter_first_strip == 9) {
			number_counter_first_strip = 0
		}
		else {number_counter_first_strip ++
		}

	document.getElementById('rect3796').style.fill=strip_color[number_counter_first_strip];
	power_res();
	output_resistor_value();
	input_resistance();
}
//Функція зміни кольорів для 2-ї полоски
function color_change_second_strip(){
	
		if (number_counter_second_strip == 9) {
			number_counter_second_strip = 0
		}
		else {number_counter_second_strip ++
		}

	document.getElementById('rect3798').style.fill=strip_color[number_counter_second_strip];
	power_res();
	output_resistor_value();
	input_resistance();
}
//Функція зміни кольорів для 3-ї полоски, множник
function multiplier() {

	if (multiplier_counter == 11) {
		multiplier_counter = 0
	}
	else {
		multiplier_counter ++
	}

	document.getElementById('rect3800').style.fill=multiplier_color[multiplier_counter];
	power_res();
	output_resistor_value();
	input_resistance();
}
//Функція зміни кольорів для 4-ї полоски, точність
function tolerance() {
	if (tolerance_counter == 7) {
		tolerance_counter = 0
	}
	else {
		tolerance_counter ++
	}
	document.getElementById('rect3819').style.fill=tolerance_color[tolerance_counter];
	power_res();
	output_resistor_value();
	input_resistance();
}

//Функція виведення результату
function output_resistor_value() {
var nominal_in_ohm = (number_counter_first_strip + "" + number_counter_second_strip) * (multiplier_number[multiplier_counter]);

	if (nominal_in_ohm < 1) {
		resistor_resistance = ((number_counter_first_strip + "" + number_counter_second_strip) / 100) + " Ohm" + " " + tolerance_number[tolerance_counter] + "%"
	}
	else if (nominal_in_ohm >= 1 && nominal_in_ohm < 10) {
		resistor_resistance = ((number_counter_first_strip + "" + number_counter_second_strip) / 10) + " Ohm" + " " + tolerance_number[tolerance_counter] + "%"
	}
		if (nominal_in_ohm >= 10 && nominal_in_ohm <= 999) {
		resistor_resistance = nominal_in_ohm + " Ohm" + " " + tolerance_number[tolerance_counter] + "%"
	}
	else if (nominal_in_ohm >= 1000 && nominal_in_ohm < 1000000) {
		resistor_resistance = (nominal_in_ohm / 1000) + " kOhm" + " " + tolerance_number[tolerance_counter] + "%"
	}
	else if (nominal_in_ohm >= 1000000) {
		resistor_resistance = (nominal_in_ohm / 1000000) + " MOhm" + " " + tolerance_number[tolerance_counter] + "%"
	}
		document.getElementById('resistor_resistance_output').innerHTML = resistor_resistance + " " + power_res_nominal;
}

//Функція визначення потіжності резистора
function power_res() {
	input_length = document.getElementById('length_power').value;
	if (input_length == null) {
		power_res_nominal = ""
	}
	else if (input_length > 0 && input_length < 6) {
		power_res_nominal = "0,25 W"
	}
	else if (input_length >= 6 && input_length < 8.5) {
		power_res_nominal = "0,5 W"
	}
	else if (input_length >= 8.5 && input_length < 10) {
		power_res_nominal = "1 W"
	}
	else if (input_length >= 10 && input_length < 14) {
		power_res_nominal = "2 W"
	}
	else if (input_length >= 14 && input_length < 16) {
		power_res_nominal = "3 W"
	}
	else if (input_length >= 16 && input_length < 18) {
		power_res_nominal = "5 W"
	}
	else if (input_length >= 18) {
		power_res_nominal = ""
	}
}

//Функція вставки номінала резистора для пошуку
function input_resistance() {
	document.getElementById('input_resistor_resistance').value = resistor_resistance + " " + power_res_nominal;
}