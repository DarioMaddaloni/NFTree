import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { GREEN } from "@/shared/constants";

interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const Merge = ({ txsHistory, text }: Props) => {
  console.log(txsHistory);
  return (
    <div>
      <NFTPapers
        txsHistory={txsHistory}
        text={text}
        clickablePaper={true}
        myColor={GREEN}
      />
    </div>
  );
};

export default Merge;
