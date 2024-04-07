import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { PURPLE } from "@/shared/constants";

interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const Inheritance = ({ txsHistory, text }: Props) => {
  const nfts = txsHistory?.result.transactions;

  console.log("nfts");
  console.log(nfts);

  return (
    <div>
      <NFTPapers
        txsHistory={txsHistory}
        text={text}
        clickablePaper={true}
        myColor={PURPLE}
      />
    </div>
  );
};

export default Inheritance;
