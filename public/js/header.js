window.onload = getFocus();

function getFocus() {
    document.getElementById("searchbar").focus();
}

function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}