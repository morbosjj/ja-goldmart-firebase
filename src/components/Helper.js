export function TextUppercase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function removeUnderscore(value) {
  const regex = /[\W_]+/g;
  const output = value.replace(regex, ' ');

  return output;
}

export function textBold(value) {
  const output = value.bold();
  return output;
}

export function handleData(record) {
  return record;
}

export function convertToString(text) {
  return text.toString();
}

export function convertStringToBoolean(string) {
  let isTrueSet = string === 'true';
  return isTrueSet;
}

export function replaceToDash(string) {
  const regex = /[ ]/g;
  const output = string.replace(regex, '-');
  return output;
}
export function replaceToSpace(string) {
  const regex = /[-]/g;
  const output = string.replace(regex, ' ');
  return output;
}

export function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
