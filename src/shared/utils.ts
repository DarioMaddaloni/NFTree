export const hexToASCII = (hex: string) => {
  var ascii = "";

  for (var i = 0; i < hex.length; i += 2) {
    var part = hex.substring(i, i + 2);

    var ch = String.fromCharCode(parseInt(part, 16));

    ascii = ascii + ch;
  }
  return ascii;
};
