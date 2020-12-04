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