import { useParams } from "react-router-dom";
import {
  Footer,
  LoadingOverlay,
  NavBar,
  ResponsiveBlocker,
} from "../../components";
import roundToNearestHour from "../../helpers/round";
import CoinHeader from "./CoinHeader";
import HistoricChart from "./HistoricChart";

let nowDate = new Date();
nowDate = roundToNearestHour(nowDate);
const now = Math.floor(nowDate.getTime() / 1000);

const oneWeekAgo = now - 7 * 24 * 60 * 60;
const oneMonthAgo = now - 30 * 24 * 60 * 60;
const oneYearAgo = now - 365 * 24 * 60 * 60;

export default function Coin() {
  const { id } = useParams();

  if (typeof id !== "string" || id.length === 0) return <LoadingOverlay />;

  return (
    <main className="min-h-screen">
      <ResponsiveBlocker />
      <NavBar />
      <div className="container mx-auto">
        <CoinHeader coinId={id} />
        <HistoricChart
          coinId1={id}
          from={oneWeekAgo}
          to={now}
          title="Last Week"
        />
        <HistoricChart
          coinId1={id}
          from={oneMonthAgo}
          to={now}
          title="Last Month"
        />
        <HistoricChart
          coinId1={id}
          from={oneYearAgo}
          to={now}
          title="Last Year"
        />
      </div>
      <Footer />
    </main>
  );
}
