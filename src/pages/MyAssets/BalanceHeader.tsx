import React from "react";
import { LoadingOverlay } from "../../components";
import { useEthPrice, useWallet } from "../../hooks";

const BalanceHeader: React.FC = () => {
  const { walletBalance } = useWallet();
  const { price, loading } = useEthPrice();

  if (loading) return <LoadingOverlay />;

  const totalValueInUSD = price ? parseFloat(walletBalance) * price : 0;

  return (
    <div className="m-8 flex items-center rounded-lg bg-white p-4 shadow-md">
      <div className="flex w-full flex-col items-center justify-start">
        <h1 className="text-2xl font-bold">Your ETH Balance</h1>
        <div className="mt-2 flex w-full flex-row items-center justify-center text-lg">
          <span className="mx-4 flex flex-col justify-center">
            Total ETH: <br />
            <b className="rounded bg-slate-800 p-2 text-white">
              {walletBalance} ETH
            </b>
          </span>
          <span className="mx-4 flex flex-col justify-center">
            Value in USD: <br />
            <b className="rounded bg-slate-800 p-2 text-center text-white">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalValueInUSD)}
            </b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceHeader;
