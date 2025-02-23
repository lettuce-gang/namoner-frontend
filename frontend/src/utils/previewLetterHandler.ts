export function previewLetterHandler(fontType: string, paperType: string) {
  switch (paperType) {
    case "GRAPH_PAPER":
      return `/img/previewLetter/graph-${fontType}.svg`;
    case "BASIC_NOTE":
      return `/img/previewLetter/note-${fontType}.svg`;
    case "PHOTO_POSTCARD":
      return `/img/previewLetter/postcard-${fontType}.svg`;
    case "POLAROID":
      return `/img/previewLetter/polaroid-${fontType}.svg`;
    case "CHECK_PAPER":
      return `/img/previewLetter/check-${fontType}.svg`;
  }
}
