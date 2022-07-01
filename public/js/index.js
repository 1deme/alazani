/**
 * search bar object for attaching event listeners.
 */
var searchInput = document.getElementById("searchbar");
/**
 * array of all the cards in the page.
 */
var cards = document.querySelectorAll(".card,.card2");
/**
 * footer document for moving it to the bottom of the page.
 */
var footer = document.getElementById("footerId");
/**
 * main body for checking height of the screen.
 */
var main = document.getElementById("mainbody");
/**
 * length of the type of the product.
 */
var lengthOfType = 0;
/**
 * adjusts footer according to the screen size.
 */
main.scrollHeight > main.clientHeight
  ? footer.classList.remove("classfooter")
  : footer.classList.add("classfooter");
/**
 * function takes care of apperance of the cards. if the card is in the input or close to it the card is shown.
 * if not the card is hidden. it also moves footer according to the size of the screen.
 */

//add function on cntrl+enter
searchInput.addEventListener("keydown", function (e) {
  var priceOfFullInventory = 0;
  if (e.keyCode === 13 && e.ctrlKey) {
    const pdf = document.createElement("center");
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    tblBody.appendChild(generateTytleRow());

    cards.forEach((card) => {
      const row = document.createElement("tr");
      row.appendChild(generateTd(card, 0));
      row.appendChild(generateTd(card, 1));
      row.appendChild(generateTd(card, 2));
      tblBody.appendChild(row);
      priceOfFullInventory += parseInt(card.querySelector("price").innerHTML);
    });
    const fullPrice = document.createElement("h1");
    var tytlecellText = document.createTextNode("type");
    fullPrice.appendChild(tytlecellText);
    pdf.appendChild(fullPrice);
    tbl.appendChild(tblBody);
    tbl.setAttribute("border", "2");
    pdf.appendChild(tbl);
    newwin = window.open();
    newwin.document.write(pdf.outerHTML);
    newwin.print();
    newwin.close();
  }
});

function generateTd(card, index) {
  switch (index) {
    case 0:
      cellText = document.createTextNode(card.querySelector("h1").innerHTML);
      break;
    case 1:
      cellText = document.createTextNode(card.querySelector("h3").innerHTML);
      break;
    case 2:
      cellText = document.createTextNode(card.querySelector("price").innerHTML);
      break;
  }
  var cell = document.createElement("td");
  cell.appendChild(cellText);
  return cell;
}

function generateTytleRow() {
  var tytleRow = document.createElement("tr");

  var tytlecell = document.createElement("td");
  var tytlecellText = document.createTextNode("type");
  tytlecell.appendChild(tytlecellText);
  tytleRow.appendChild(tytlecell);

  tytlecell = document.createElement("td");
  tytlecellText = document.createTextNode("name");
  tytlecell.appendChild(tytlecellText);
  tytleRow.appendChild(tytlecell);

  tytlecell = document.createElement("td");
  tytlecellText = document.createTextNode("price");
  tytlecell.appendChild(tytlecellText);
  tytleRow.appendChild(tytlecell);

  return tytleRow;
}

searchInput.addEventListener("keyup", function (e) {
  const value = e.target.value.toLowerCase().replace(/ /g, "");
  cards.forEach((card) => {
    const modCard =
      card.querySelector("h3").innerHTML.toLowerCase().replace(/ /g, "") +
      card.querySelector("h1").innerHTML.toLowerCase().replace(/ /g, "");
    lengthOfType = card.querySelector("h1").innerHTML.replace(/ /g, "").length;

    const price = card.querySelector("price").innerHTML;
    checkKeyWords(modCard, value) && checkPriceBounds(price, value)
      ? (card.style.display = "block")
      : (card.style.display = "none");

    main.scrollHeight > main.clientHeight
      ? footer.classList.remove("classfooter")
      : footer.classList.add("classfooter");
  });
});
/**
 * Copmlete format of the search bar input is: item1,item2,...,itemn:(lowerBound-upperBound).
 * function extracts item and puts it in an array. if any of the item in the array is in input or
 * close to it(levenshtein distance) function returns true.
 * @param {string} modCard - card informatin name, price, type
 * @param {string} value  - search bar input
 * @returns {boolean} - true if item is in input or close to it.
 */
function checkKeyWords(modCard, value) {
  var valueLength = value.length;
  var index = value.lastIndexOf(":");
  var names = value.substring(0, !(index + 1) ? valueLength : index);
  var namesArray = names.split(",");
  var ans = false;
  console.log(lengthOfType);
  namesArray.forEach((name) => {
    if (
      modCard.includes(name) ||
      levenshtein(name, modCard) < modCard.length / 3 + lengthOfType
    ) {
      ans = true;
    }
  });
  return ans;
}
/**
 * Copmlete format of the search bar input is: item1,item2,...,itemn:(lowerBound-upperBound)
 * function extracts the lower and upper bound from the input. both if they are entered.
 * one if only one bound is entered. and none if no bound is entered.
 * if none of them are entered the function returns true. if one is ertered second is set to 0 or inf.
 * @param {int} price - price of the product
 * @param {string} boundString - search bar input
 * @returns {boolean} - true bound exists and price is in them.
 */
function checkPriceBounds(price, boundString) {
  var start = boundString.indexOf("(");
  var end = boundString.indexOf(")");
  if (start == -1 && end == -1 && start > end) {
    return true;
  }
  var parsedboundString = boundString.substring(start + 1, end);
  var lowBound = parsedboundString.substring(0, parsedboundString.indexOf("-"));
  var highBound = parsedboundString.substring(
    parsedboundString.indexOf("-") + 1,
    parsedboundString.length
  );
  if (highBound == "") {
    highBound = Number.MAX_SAFE_INTEGER;
  }
  if (lowBound == "") {
    lowBound = 0;
  }
  if (isNaN(lowBound) && isNaN(highBound)) {
    return true;
  }
  if (
    isNaN(lowBound) &&
    !isNaN(highBound) &&
    parseInt(price, 10) <= parseInt(highBound, 10)
  ) {
    return true;
  }
  if (
    !isNaN(lowBound) &&
    isNaN(highBound) &&
    parseInt(price, 10) >= parseInt(lowBound, 10)
  ) {
    return true;
  }
  if (
    !isNaN(lowBound) &&
    !isNaN(highBound) &&
    parseInt(price, 10) >= parseInt(lowBound, 10) &&
    parseInt(price, 10) <= parseInt(highBound, 10)
  ) {
    return true;
  }
  return false;
}
/**
 * See {@https://en.wikipedia.org/wiki/Levenshtein_distance}
 * @param {string} a - first string
 * @param {string} b - second string
 * @returns {int} - distance between a and b
 */
function levenshtein(a, b) {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  var matrix = [];

  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
