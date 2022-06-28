/**
 * runs getFocus() when the page loads
 */
window.onload = getFocus();

/**
 * gets the focus on the search bar
 */
function getFocus() {
    document.getElementById("searchbar").focus();
}

/**
 * google api. for translating the text.
 */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}