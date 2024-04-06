import { useContext, useEffect, useState } from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AuthenticationContext from "@/components/AuthenticationContext";

import { AccountNFTsResponse, AccountTxResponse, Wallet } from "xrpl";
import { useActiveActivity } from "@/shared/hooks";
import MyInfos from "@/xrpl/MyInfos";
import MyClient from "@/xrpl/MyClient";
import MyAppBar from "@/components/MyAppBar";

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

  const [infos, setInfos] = useState<{
    balance: number;
    transactionHistory: AccountTxResponse | null;
    nftHistory: AccountNFTsResponse | null;
  }>({ balance: 0, transactionHistory: null, nftHistory: null });

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
        nftHistory: myInfos.nftsHistory,
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
              <div>{actions[0]}</div>
            ) : activeActivity == actions[1] ? (
              <div>{actions[1]}</div>
            ) : activeActivity == actions[2] ? (
              <div>{actions[2]}</div>
            ) : activeActivity == actions[3] ? (
              <div>{actions[3]}</div>
            ) : (
              <p>Choose from menu which action you want to perform</p>
            ))}
          {typeof activeActivity != "string" && (
            <p>Choose from menu which action you want to perform</p>
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
