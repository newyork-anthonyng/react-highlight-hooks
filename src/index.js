import React from "react";
import { findAll } from "highlight-words-core";

export function useHighlighter(props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [searchTerms, setSearchTerms] = React.useState(props.searchTerms || "");
  const [textToSearch, setTextToSearch] = React.useState(props.textToSearch);

  const searchWords = searchTerms.split(" ");

  const chunks = findAll({
    searchWords,
    textToHighlight: textToSearch,
  });

  let highlightedIndex = 0;
  chunks.forEach((chunk) => {
    chunk.text = textToSearch.substr(chunk.start, chunk.end - chunk.start);
    chunk.active = false;

    if (chunk.highlight) {
      highlightedIndex++;

      if (highlightedIndex === activeIndex + 1) {
        chunk.active = true;
      }
    }
  });

  return {
    activeIndex,
    setActiveIndex,
    chunks,
    totalHighlights: highlightedIndex,
    searchTerms,
    setSearchTerms,
    textToSearch,
    setTextToSearch,
  };
}
