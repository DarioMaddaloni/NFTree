import { AccountTxTransaction } from "xrpl";
import { INHERIT, MERGE, SPLIT, TRADE } from "./constants";

export const hexToASCII = (hex: string) => {
  var ascii = "";

  for (var i = 0; i < hex.length; i += 2) {
    var part = hex.substring(i, i + 2);

    var ch = String.fromCharCode(parseInt(part, 16));

    ascii = ascii + ch;
  }
  return ascii;
};

interface CheckConditionProps {
  selectedNFTs: AccountTxTransaction[] | null;
  selectedElement: AccountTxTransaction;
  text: string
}

export const checkCondition = ({selectedElement, selectedNFTs, text}: CheckConditionProps)  => {
  let flag = true;
  //IN QUESTI TODO DEVO CONTROLLARE CHE IL selectedElement soddisfa le proprietà per essere aggiunto alla selectedNFTs
  if (text == TRADE) {
    //TODO 
  } else if (text == MERGE){
    //TODO
  } else if (text == INHERIT) {
    //TODO
  } else if (text == SPLIT){
    //TODO
  }
  return flag;
}