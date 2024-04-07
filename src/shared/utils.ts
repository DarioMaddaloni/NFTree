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
    // One nft for xrps
    // Participants can trade only one nft a time
    console.log("checkConditionFirst");
    console.log(TRADE);
    console.log("selectedNFTs")
    console.log(selectedNFTs?.length)
    if (selectedNFTs && selectedNFTs?.length != 0) {
      return false;
    }  else {
      return true
    }
  } else if (text == INHERIT) {
    // one nft to multiple nfts to the same contract with different percentages
    // Participants can trade only one nft a time
    console.log("checkConditionFirst");
    console.log(INHERIT);
    console.log("selectedNFTs")
    console.log(selectedNFTs?.length)
    if (selectedNFTs && selectedNFTs?.length != 0) {
      return false;
    }  else {
      return true
    }
  } else if (text == MERGE) {
    // Participants can merge only nfts that point to the same 
  } else if (text == SPLIT){
    //TODO
  }
  return flag;
}