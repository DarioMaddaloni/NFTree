import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { ORANGE } from "@/shared/constants";

interface Props {
  txsHistory: AccountTxResponse | null;
  text: string;
}

const Split = ({ txsHistory, text }: Props) => {
  console.log(txsHistory);
  return (
    <div>
      <NFTPapers
        txsHistory={txsHistory}
        text={text}
        clickablePaper={true}
        myColor={ORANGE}
      />
    </div>
  );
};

export default Split;
