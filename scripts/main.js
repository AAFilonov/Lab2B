var cssStyle = document.getElementById('style');

window.onload = function() {
    if (localStorage && localStorage.getItem("style"))
        cssStyle.href = localStorage.getItem("style");
};

function setStyle(newStyle) {
    cssStyle.href = newStyle;

    if (localStorage)
        localStorage.setItem("style", newStyle);
};



/*

$(document).ready(function() {

    $('#filters input').change(function() {
        // событие на изменение чекбокса
        $('article').each(function(index, elem) { // перебрать все элементы
            $(elem).show(); // включаем отображение элемента
            let data = $(elem).data(); // получаем все data-атрибуты элемента
            for (let prop in data) { // перебрать все характеристики элемента
                if ($("#filters input[name='" + prop + "']:checkbox:checked").val() != undefined && // есть установленные чекбоксы
                    $("#filters input[name='" + prop + "'][value='" + data[prop] + "']:checkbox:checked").val() == undefined) { // нет установленного чекбокса как атрибут элемента
                    $(elem).hide(); // выключаем отображение элемента
                }
            }
        });

    });


});

$(function() {
    $('#filters input').change(function(event) {
        if (event.target.value == "September" || event.target.value == "Article") {
            ($("#ch_content_type_article").prop('checked') || $("#ch_month_sep").prop('checked')) ?
            $("#ch_topic_printers").prop('disabled', true) = "": $("#ch_topic_printers").prop('disabled', false);

        }

        if (event.target.value == "Note") {
            event.target.checked ? $("#ch_topic_software").prop('disabled', true) = "" : $("#ch_topic_software").prop('disabled', false);

        }

    });

});
*/