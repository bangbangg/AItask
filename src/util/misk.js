export function getReadableDate(date) {
  const normalFormatDate = date.slice(0, 10).split('-').reverse().join('.');
  return normalFormatDate;
}

export function changeSearchTextColor(searchingFor, backgroundColor='yellow') {
  if (window.find && window.getSelection) {
    document.designMode = "on";
    const select = window.getSelection();
    select.collapse(document.body, 0);

    while (window.find(searchingFor)) {
        document.execCommand("HiliteColor", false, backgroundColor);
        select.collapseToEnd();
    }
    document.designMode = "off";
  }
}