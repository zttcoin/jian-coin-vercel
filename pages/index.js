
import React, { useState } from "react";
import { WagmiConfig, createConfig, configureChains, useAccount, useDisconnect } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

const projectId = "demo";
const chains = [mainnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId }), publicProvider()]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  if (!isConnected) return null;
  return (
    <div className="text-center mt-2">
      <p className="text-sm text-gray-400">钱包：{address?.slice(0, 6)}...{address?.slice(-4)}</p>
      <button onClick={() => disconnect()} className="text-red-400 text-xs">断开连接</button>
    </div>
  );
}

export default function HomePage() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'sans-serif',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>健元</h1>
        <p style={{ marginTop: '0.5rem', color: '#999' }}>为信仰牺牲，才配拥有未来</p>
        <div style={{ marginTop: '1.5rem' }}><w3m-button /></div>
        <WalletInfo />
        <div style={{
          marginTop: '2rem',
          backgroundColor: '#1f2937',
          padding: '1.5rem',
          borderRadius: '1rem',
          maxWidth: '24rem',
          width: '100%'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>🔥 爱心值排行榜</h2>
          <ul>
            <li>0x1234...abcd - 500❤️</li>
            <li>0x5678...efgh - 420❤️</li>
            <li>0x9abc...ijkl - 380❤️</li>
          </ul>
        </div>
        <div style={{ marginTop: '2rem', fontStyle: 'italic', color: '#888' }}>
          张建说：“烧掉的不是币，是你对旧世界最后的留恋。”
        </div>
      </div>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
}
