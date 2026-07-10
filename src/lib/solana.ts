import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

const NETWORK = 'devnet';
const RPC_URL = NETWORK === 'devnet' ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com';
export const connection = new Connection(RPC_URL, 'confirmed');

export const SUPPORTED_WALLETS = [
  { name: 'Phantom', icon: 'phantom' },
  { name: 'Solflare', icon: 'solflare' },
  { name: 'Backpack', icon: 'backpack' },
  { name: 'Glow', icon: 'glow' },
];

export async function sendSOL(fromPubkey: PublicKey, toPubkey: PublicKey, amount: number): Promise<string> {
  const transaction = new Transaction().add(
    SystemProgram.transfer({ fromPubkey, toPubkey, lamports: amount * LAMPORTS_PER_SOL })
  );
  return transaction.signature?.toString() || '';
}

export async function getBalance(pubkey: PublicKey): Promise<number> {
  try { const balance = await connection.getBalance(pubkey); return balance / LAMPORTS_PER_SOL; }
  catch { return 0; }
}

export interface MockWallet {
  publicKey: PublicKey | null; connected: boolean;
  connect: () => Promise<void>; disconnect: () => Promise<void>;
}

export function createMockWallet(): MockWallet {
  let _publicKey: PublicKey | null = null; let _connected = false;
  return {
    get publicKey() { return _publicKey; }, get connected() { return _connected; },
    async connect() { _publicKey = new PublicKey('Archemist1111111111111111111111111111111111'); _connected = true; },
    async disconnect() { _publicKey = null; _connected = false; },
  };
}

export function formatAddress(address: string): string {
  return address.length <= 12 ? address : `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function getExplorerUrl(signature: string, type: 'tx' | 'address' = 'tx'): string {
  return `https://explorer.solana.com/${type}/${signature}?cluster=${NETWORK}`;
}