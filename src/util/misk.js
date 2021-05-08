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

export function getAgeGroups(maxAge) {
  const registrationAges = Array.apply(null, {length: maxAge + 1}).map(Number.call, Number);
  const ageGroupsMinAge = registrationAges.filter(age => age%10 === 0);
  return ageGroupsMinAge.map(age => `${age}-${age+10}`)
}