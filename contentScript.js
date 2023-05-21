const gmailMessageRegex = /^https?:\/\/mail\.google\.com\/mail\/u\/0\/#inbox\/.*/;

const regexDict = {
  gmailMessage : gmailMessageRegex
}

function makeFirst3LettersBold(textContent) {
  const words = textContent.trim().split(/\s+/);
  const boldWords = words.map(word => {
    if (word.startsWith('<') && word.endsWith('>')) {
      return word;
    }

    const first3Letters = word.substr(0, 3);
    const remainingLetters = word.substr(3);
    return `<span style="font-weight: bold">${first3Letters}</span>${remainingLetters}`;
  });

  return boldWords.join(' ');
}

function onUrlChange() {
  for (let key in regexDict) {
    let regex = regexDict[key];
    if (regex.test(window.location.href)) {
      switch (key) {
        case "gmailMessage":
          document.querySelectorAll('table p').forEach(x => {
            const originalText = x.textContent;
            const boldText = makeFirst3LettersBold(originalText);
            x.innerHTML = boldText;
          });

          break;
        case value2:
          // code to execute when expression matches value2
          break;
        // more cases
        default:
          // code to execute when none of the cases match expression
          break;
      }

      break; // Break out of the loop
    }
  }
}

window.addEventListener('hashchange', onUrlChange);

onUrlChange();
