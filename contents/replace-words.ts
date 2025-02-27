import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
	matches: ["https://www.facebook.com/*","https://www.tiktok.com/*", "https://www.youtube.com/*"],
	// matches: ["<all_urls>"]
};


const badWordsUrl = chrome.runtime.getURL("assets/bad_words.json");
console.log(badWordsUrl);

fetch(badWordsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log(response);
    return response.json();
  })
  .then((badWords) => {
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Handle changes in characterData (text nodes)
        if (mutation.type === "characterData" && mutation.target.nodeValue) {
          const originalText = mutation.target.nodeValue;
          // console.log(originalText);

          // Preserve selection range
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const startOffset = range.startOffset;
          const endOffset = range.endOffset;

          const newText = replaceWordsInText(originalText);
          // console.log(newText);

          if (originalText !== newText) {
            mutation.target.nodeValue = newText; // Update the actual DOM node with the new text

            // Restore selection range
            range.setStart(mutation.target, Math.min(startOffset, newText.length));
            range.setEnd(mutation.target, Math.min(endOffset, newText.length));
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }

        // Handle changes in child nodes (element nodes)
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.nodeType === Node.TEXT_NODE) {
              const originalText = addedNode.nodeValue;
              // console.log(originalText);

              const newText = replaceWordsInText(originalText);
              // console.log(newText);

              if (originalText !== newText) {
                addedNode.nodeValue = newText;
              }
            } else if (addedNode.nodeType === Node.ELEMENT_NODE) {
              // Handle newly added elements, you may need to traverse the subtree
              // and replace words in their text nodes as well
              replaceWordsInElement(addedNode);
            }
          });
        }
      });
    });

    // Start observing the document for changes
    mutationObserver.observe(document, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });

    console.log("MutationObserver is active!");

    // Function to replace words in a given text
    function replaceWordsInText(text) {
      for (const word in badWords) {
        if (badWords.hasOwnProperty(word)) {
          const regex = new RegExp(`(?<=^|[^\\p{Script=Latn}])${word}(?=[^\\p{Script=Latn}]|$)`, "giu");
          if (regex.test(text)) {
            text = text.replace(regex, badWords[word]);
          }
        }
      }
      return text;
    }

    // Function to replace words in the text nodes of an element and its descendants
    function replaceWordsInElement(element) {
      const walker = document.createTreeWalker(element,NodeFilter.SHOW_TEXT,{ acceptNode: (node) => NodeFilter.FILTER_ACCEPT });

      let textNode;
      while ((textNode = walker.nextNode())) {
        const originalText = textNode.nodeValue;
        // console.log(originalText);

        const newText = replaceWordsInText(originalText);
        // console.log(newText);

        if (originalText !== newText) {
          textNode.nodeValue = newText;
        }
      }
    }
  })
  .catch((error) => {
    console.error("Error fetching or parsing JSON:", error);
  });