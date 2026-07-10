import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
const NETWORK = 'devnet';
const RPC_URL = NETWORK === 'devnet' ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com';
export const connection = new Connection(RPC_URL, 'confirmed');

export interface EscrowState {
  escrowPDA: string; seller: string; buyer: string | null;
  amount: number; status: 'pending' | 'funded' | 'delivered' | 'disputed' | 'released' | 'refunded';
  createdAt: number; timeoutDays: number; orderId: string;
}
export async function createEscrow(sellerPubkey: PublicKey, amount: number, orderId: string, timeoutDays = 14): Promise<EscrowState> {
  const seed = `escrow_${orderId}`;
  const escrowPDA = await PublicKey.createWithSeed(sellerPubkey, seed, SystemProgram.programId);
  return { escrowPDA: escrowPDA.toString(), seller: sellerPubkey.toString(), buyer: null, amount, status: 'pending', createdAt: Date.now(), timeoutDays, orderId };
}
export async function fundEscrow(escrow: EscrowState, buyerPubkey: PublicKey): Promise<EscrowState> {
  return { ...escrow, buyer: buyerPubkey.toString(), status: 'funded' };
}
export async function confirmDelivery(escrow: EscrowState): Promise<EscrowState> {
  return { ...escrow, status: 'released' };
}
export async function disputeEscrow(escrow: EscrowState): Promise<EscrowState> {
  return { ...escrow, status: 'disputed' };
}
export function isEscrowExpired(escrow: EscrowState): boolean {
  return Date.now() - escrow.createdAt > escrow.timeoutDays * 24 * 60 * 60 * 1000;
}
export async function sendSOL(fromPubkey: PublicKey, toPubkey: PublicKey, amount: number): Promise<string> {
  const tx = new Transaction().add(SystemProgram.transfer({ fromPubkey, toPubkey, lamports: amount * LAMPORTS_PER_SOL }));
  return tx.signature?.toString() || '';
}
export async function getBalance(pubkey: PublicKey): Promise<number> {
  try { const bal = await connection.getBalance(pubkey); return bal / LAMPORTS_PER_SOL; } catch { return 0; }
}
export function formatAddress(address: string): string {
  return address.length <= 12 ? address : `${address.slice(0, 4)}...${address.slice(-4)}`;
}
export function getExplorerUrl(signature: string, type: 'tx' | 'address' = 'tx'): string {
  return `https://explorer.solana.com/${type}/${signature}?cluster=${NETWORK}`;
}
export interface MockWallet {
  publicKey: PublicKey | null; connected: boolean;
  connect: () => Promise<void>; disconnect: () => Promise<void>;
}
export function createMockWallet(): MockWallet {
  let _pk: PublicKey | null = null, _conn = false;
  return { get publicKey() { return _pk; }, get connected() { return _conn; }, async connect() { _pk = new PublicKey('Archemist1111111111111111111111111111111111'); _conn = true; }, async disconnect() { _pk = null; _conn = false; } };
}
export interface FiatPaymentIntent {
  id: string; amount: number; usdEquivalent: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  solConversionRate: number;
}
export async function createFiatPaymentIntent(solAmount: number): Promise<FiatPaymentIntent> {
  const mockRate = 145.50;
  return { id: `pi_${Math.random().toString(36).slice(2, 14)}`, amount: solAmount, usdEquivalent: solAmount * mockRate, status: 'pending', solConversionRate: mockRate };
}