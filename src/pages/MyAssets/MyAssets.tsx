import { Footer, NavBar, ResponsiveBlocker } from "../../components";
import roundToNearestHour from "../../helpers/round";
import { useWallet } from "../../hooks";
import CoinHeader from "../Coin/CoinHeader";
import HistoricChart from "../Coin/HistoricChart";
import BalanceHeader from "./BalanceHeader";

let nowDate = new Date();
nowDate = roundToNearestHour(nowDate);
const now = Math.floor(nowDate.getTime() / 1000);

const oneWeekAgo = now - 7 * 24 * 60 * 60;

export default function MyAssets() {
  const { isWalletConnected, connectWallet } = useWallet();

  return (
    <main className="min-h-screen">
      <ResponsiveBlocker />
      <NavBar />
      <div className="container mx-auto">
        {isWalletConnected && <BalanceHeader />}
        {!isWalletConnected && (
          <div className="m-8 flex items-center rounded-lg bg-white p-4 shadow-md">
            <button
              className={`mr-4 rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-green-900 hover:text-white`}
              onClick={() => {
                connectWallet();
              }}
            >
              Connect Wallet
            </button>
          </div>
        )}
        <CoinHeader coinId="ethereum" />
        <HistoricChart
          coinId1="ethereum"
          from={oneWeekAgo}
          to={now}
          title="Ethereum Performance Last Week"
        />
      </div>
      <Footer />
    </main>
  );
}
