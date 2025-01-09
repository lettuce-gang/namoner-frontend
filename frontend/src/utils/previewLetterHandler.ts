export function previewLetterHandler(fontType: string, paperType: string) {
  switch (paperType) {
    case "GRAPH_PAPER":
      return `/img/previewLetter/graph-${fontType}.svg`;
      break;
    case "BASIC_NOTE":
      return `/img/previewLetter/note-${fontType}.svg`;
      break;
    case "PHOTO_POSTCARD":
      return `/img/previewLetter/postcard-${fontType}.svg`;
      break;
    case "POLAROID":
      return `/img/previewLetter/polaroid-${fontType}.svg`;
      break;
    case "CHECK_PAPER":
      return `/img/previewLetter/check-${fontType}.svg`;
      break;
  }
}
