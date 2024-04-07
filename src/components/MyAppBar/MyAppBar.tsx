import {
  BLUE,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  WIDTHDRAWER,
} from "@/shared/constants";
import { useSecret } from "@/shared/hooks";
import {
  AppBar,
  AppBarProps,
  Button,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../AuthenticationContext";

interface StyledAppBarProps extends AppBarProps {
  drawerOpen: boolean;
  myActiveActivity: string;
}

interface Props {
  myBalance: number | undefined;
  myAddress: string;
  drawerOpen: boolean;
  toggleSettingsOpen: () => void;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})<StyledAppBarProps>(({ theme, drawerOpen, myActiveActivity }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor:
    myActiveActivity === "SaleTransaction"
      ? RED
      : myActiveActivity === "Merge"
      ? GREEN
      : myActiveActivity === "Inheritance"
      ? PURPLE
      : myActiveActivity === "Split"
      ? ORANGE
      : BLUE,
  ...(drawerOpen && {
    width: `calc(100% - ${WIDTHDRAWER}px)`,
    marginLeft: `${WIDTHDRAWER}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MyAppBar = ({
  myBalance,
  myAddress,
  drawerOpen,
  toggleSettingsOpen,
}: Props) => {
  const { setSecret } = useSecret();
  const navigate = useNavigate();
  const { activeActivity } = useContext(AuthenticationContext);

  const logOut = () => {
    setSecret("");
    navigate("/");
  };

  return (
    <StyledAppBar
      position="sticky"
      drawerOpen={drawerOpen}
      myActiveActivity={activeActivity}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        style={{
          height: 64,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 8,
          alignItems: "center",
          paddingLeft: 12,
          paddingRight: 8,
        }}
      >
        <Button sx={{ color: "white" }} onClick={toggleSettingsOpen}>
          Menu
        </Button>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h6" component="h2" sx={{ flex: 2 }}>
            {myAddress}
          </Typography>
          {myBalance ? (
            <Typography variant="h6" component="h2">
              Balance: {myBalance} XRP
            </Typography>
          ) : (
            <Typography variant="h6" component="h2">
              Looking in the net for your balance...
            </Typography>
          )}
        </Stack>
        <Button sx={{ color: "white" }} onClick={() => logOut()}>
          Log out
        </Button>
      </Stack>
    </StyledAppBar>
  );
};

export default MyAppBar;
