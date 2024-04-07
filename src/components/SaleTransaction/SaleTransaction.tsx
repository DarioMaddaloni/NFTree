import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { RED } from "@/shared/constants";
interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const SaleTransaction = ({ txsHistory, text }: Props) => {
  console.log("txsHistory");
  console.log(txsHistory);

  return (
    <div>
      <NFTPapers
        txsHistory={txsHistory}
        text={text}
        clickablePaper={true}
        myColor={RED}
      />
    </div>
  );
};

export default SaleTransaction;
