var searchInput = document.getElementById("searchbar");
var cards = document.querySelectorAll(".card,.card2");

searchInput.addEventListener("keyup", function (e) {
  const value = e.target.value.toLowerCase().replace(/ /g, "");
  cards.forEach((card) => {
    const modCard =
      card.querySelector("h3").innerHTML.toLowerCase().replace(/ /g, "") +
      card.querySelector("h1").innerHTML.toLowerCase().replace(/ /g, "");

    const price = card.querySelector("price").innerHTML;
    var l = check(modCard, value);
    var l2 = checkPriceBounds(price, value);
    if (l && l2) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

function check(modCard, value) {
  var valueLength = value.length;
  var index = value.lastIndexOf(":");
  var names = value.substring(0, !(index + 1) ? valueLength : index);
  var price = value;
  var namesArray = names.split(",");
  var ans = false;
  namesArray.forEach((name) => {
    if (
      modCard.includes(name) ||
      levenshtein(name, modCard) < modCard.length / 3
    ) {
      ans = true;
    }
  });
  return ans;
}

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
