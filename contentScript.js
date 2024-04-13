const wikiRegex = /^https?:\/\/en\.wikipedia\.org\/wiki\/.*/;

const regexDict = {
  wikiRegex: wikiRegex
}

function makeBionic(textContent) {
  textContent = textContent.replace(/<\/a>/g, " </a>");
  textContent = textContent.replace(/<a/g, " <a");
  textContent = textContent.replace(/<sup/g, " <sup");
  textContent = textContent.replace(/<\/sup>/g, " </sup>");
  textContent = textContent.replace(/<span/g, " <span");
  textContent = textContent.replace(/<\/span>/g, " </span>");
  textContent = textContent.replace(/<i>/g, " <i>");
  textContent = textContent.replace(/<\/i>/g, " </i>");
  textContent = textContent.replace(/<b>/g, " <b>");
  textContent = textContent.replace(/<\/b>/g, " </b>");
  textContent = textContent.replace(/>/g, "> ")
  textContent = textContent.replace("&nbsp;", "")
  let inTag = false;
  const openingTagPattern = /^<[^/].*/;
  const words = textContent.trim().split(/\s+/);
  const boldWords = words.map(word => {
    if (openingTagPattern.test(word)) {
      inTag = true
      return word;
    }

    if (inTag == true && word.includes(">")) {
      inTag = false
      return word
    }

    const targetWords = ["<i>", "<b>", "</a>", "</sup>", "</span>", "</i>", "</b>"];
    if (targetWords.includes(word) || inTag) {
      return word;
    }

    const lettersToBold = word.substr(0, word.length / 2);
    const remainingLetters = word.substr(word.length / 2);
    return `<strong>${lettersToBold}</strong>${remainingLetters}`;
  });

  return boldWords.join(' ');
}

function onUrlChange() {
  for (let key in regexDict) {
    let regex = regexDict[key];
    if (regex.test(window.location.href)) {
      switch (key) {
        case "wikiRegex":
          document.querySelectorAll('p').forEach(x => {
            const boldText = makeBionic(x.innerHTML);
            x.innerHTML = boldText;
          });

          break;
        // more cases
        default:
          break;
      }

      break;
    }
  }
}

window.addEventListener('hashchange', onUrlChange);

onUrlChange();
