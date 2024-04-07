import { AccountTxResponse } from "xrpl";
import NFTPapers from "../NFTPapers";
import { Fab } from "@mui/material";
import { GREEN, PANNA } from "@/shared/constants";

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
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: GREEN,
          color: PANNA,
        }}
      >
        Merge
      </Fab>
    </div>
  );
};

export default Merge;
