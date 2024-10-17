import { NavBar, ResponsiveBlocker } from "../../components";
import CoinTable from "./CoinTable";

export default function Home() {
  return (
    <main>
      <ResponsiveBlocker />
      <NavBar />
      <CoinTable />
    </main>
  );
}
