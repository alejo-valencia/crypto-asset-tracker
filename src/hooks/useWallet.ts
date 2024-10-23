import { BrowserProvider, formatEther, Network } from "ethers";
import { create } from "zustand";

let provider: BrowserProvider | null = null;

if (typeof window !== "undefined" && window.ethereum) {
  provider = new BrowserProvider(window.ethereum);
}

const useWalletStore = create<{
  walletAddress: string;
  isWalletConnected: boolean;
  walletBalance: string;
  chainId: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkWalletConnection: () => Promise<void>;
}>((set) => ({
  walletAddress: "",
  isWalletConnected: false,
  walletBalance: "",
  chainId: "",

  connectWallet: async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];

        if (!provider) {
          return;
        }

        const balance = await provider.getBalance(address);
        const ethBalance = formatEther(balance);
        const network: Network = await provider.getNetwork();
        const chainId = network.chainId.toString();

        set({
          walletAddress: address,
          isWalletConnected: true,
          walletBalance: ethBalance,
          chainId: chainId,
        });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  },

  disconnectWallet: () => {
    set({
      walletAddress: "",
      isWalletConnected: false,
      walletBalance: "",
      chainId: "",
    });
  },

  checkWalletConnection: async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const address = accounts[0];

          if (!provider) {
            provider = new BrowserProvider(window.ethereum);
          }

          const balance = await provider.getBalance(address);
          const ethBalance = formatEther(balance);
          const network: Network = await provider.getNetwork();
          const chainId = network.chainId.toString();

          set({
            walletAddress: address,
            isWalletConnected: true,
            walletBalance: ethBalance,
            chainId: chainId,
          });
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  },
}));

export default useWalletStore;
