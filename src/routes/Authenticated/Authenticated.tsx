import { useContext, useEffect, useState } from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AuthenticationContext from "@/components/AuthenticationContext";

import { AccountTxResponse, Wallet } from "xrpl";
import { useActiveActivity } from "@/shared/hooks";
import MyInfos from "@/xrpl/MyInfos";
import MyClient from "@/xrpl/MyClient";
import MyAppBar from "@/components/MyAppBar";
import SaleTransaction from "@/components/SaleTransaction";
import Inheritance from "@/components/Inheritance";
import Merge from "@/components/Merge";
import Split from "@/components/Split";
import {
  INHERIT,
  MERGE,
  PAPERDIMENSION,
  SPLIT,
  TRADE,
} from "@/shared/constants";
import NFTPapers from "@/components/NFTPapers";

const Authenticated = () => {
  // const isConnected = useIsConnected();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const { secret } = useContext(AuthenticationContext);
  const wallet = Wallet.fromSeed(secret);
  const { activeActivity } = useContext(AuthenticationContext);
  const { setActiveActivity } = useActiveActivity();

  const handleOpenDrawer = () => {
    setIsOpenDrawer((isOpenDrawer) => !isOpenDrawer);
  };

  const [infos, setInfos] = useState<{
    balance: number;
    transactionHistory: AccountTxResponse | null;
  }>({ balance: 0, transactionHistory: null });

  const actions = ["SaleTransaction", "Inheritance", "Merge", "Split"];
  const handleChoice = (text: string) => {
    let flag = false;
    for (let i = 0; i < actions.length; i++) {
      if (text == actions[i]) {
        setActiveActivity(actions[i]);
        flag = true;
        break;
      }
    }
    if (!flag) {
      setActiveActivity("");
    }
  };

  useEffect(() => {
    const updateInfos = async () => {
      // balance
      // buyOffers
      // currencies
      // sellOffers
      // tokens
      // transactions
      const client = MyClient();
      await client.connect();
      console.log("Waiting for wallet's infos");
      const myInfos = await MyInfos(wallet.address, client);
      // myInfos
      console.log("infos");
      console.log(myInfos);
      // setInfos
      setInfos({
        balance: myInfos.balance,
        transactionHistory: myInfos.transactionHistory,
      });
      await client.disconnect();
    };
    updateInfos();
    console.log("useEffect");
  }, []);

  const DrawerList = (
    <Box sx={{ width: 375 }} role="presentation" onClick={handleOpenDrawer}>
      <List>
        {actions.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleChoice(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <MyAppBar
          myBalance={infos?.balance}
          myAddress={wallet.address}
          drawerOpen={isOpenDrawer}
          toggleSettingsOpen={handleOpenDrawer}
        ></MyAppBar>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            height: "100%",
          }}
        >
          {typeof activeActivity == "string" &&
            (activeActivity == actions[0] ? (
              <SaleTransaction
                txsHistory={infos.transactionHistory}
                text={TRADE}
              />
            ) : activeActivity == actions[1] ? (
              <Inheritance
                txsHistory={infos.transactionHistory}
                text={INHERIT}
              />
            ) : activeActivity == actions[2] ? (
              <Merge txsHistory={infos.transactionHistory} text={MERGE} />
            ) : activeActivity == actions[3] ? (
              <Split txsHistory={infos.transactionHistory} text={SPLIT} />
            ) : infos.transactionHistory ? (
              <NFTPapers
                txsHistory={infos.transactionHistory}
                text={"Choose from menu which action you want to perform"}
                clickablePaper={false}
                myColor={"black"}
              />
            ) : (
              <div>Looking for your nfts...</div>
            ))}
          {typeof activeActivity != "string" && (
            <Stack
              display="flex"
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography component={"span"} variant={"body2"}>
                Choose from menu which action you want to perform
              </Typography>
              <div>
                {infos.transactionHistory ? (
                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        p: 2,
                        maxWidth: 6 * PAPERDIMENSION,
                        overflowX: "auto",
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <NFTPapers
                          txsHistory={infos.transactionHistory}
                          text={"DEL TESTO"}
                          clickablePaper={false}
                          myColor={"black"}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                ) : (
                  <div>Looking for your nfts...</div>
                )}
              </div>
            </Stack>
          )}
        </div>

        <Drawer open={isOpenDrawer} onClose={handleOpenDrawer}>
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};

export default Authenticated;
