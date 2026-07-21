import { groth16 } from 'snarkjs';
import { WasmFactory } from '@lightprotocol/hasher.rs';
import BN from 'bn.js';

const WASM = '/workspace/privacy-cash/artifacts/circuits/transaction2_js/transaction2.wasm';
const ZKEY = '/workspace/privacy-cash/artifacts/circuits/transaction2.zkey';
const VKEY = '/workspace/privacy-cash/artifacts/circuits/verifyingkey2.json';

async function main() {
  console.time('total');

  // Init Poseidon hasher
  const lightWasm = await WasmFactory.getInstance();

  // Generate two zero-value input UTXOs (deposit scenario)
  const privKey0 = new BN('123456789012345678901234567890');
  const privKey1 = new BN('987654321098765432109876543210');

  const pubKey0 = lightWasm.poseidonHashString([privKey0.toString()]);
  const pubKey1 = lightWasm.poseidonHashString([privKey1.toString()]);

  const blinding0 = new BN('111111111');
  const blinding1 = new BN('222222222');

  // SOL mint address field
  const mintField = '0';

  // Zero amount inputs — commitment and nullifier for zero UTXOs
  const commit0 = lightWasm.poseidonHashString(['0', pubKey0, blinding0.toString(), mintField]);
  const commit1 = lightWasm.poseidonHashString(['0', pubKey1, blinding1.toString(), mintField]);

  const sig0 = lightWasm.poseidonHashString([privKey0.toString(), commit0, '0']);
  const sig1 = lightWasm.poseidonHashString([privKey1.toString(), commit1, '0']);

  const nullifier0 = lightWasm.poseidonHashString([commit0, '0', sig0]);
  const nullifier1 = lightWasm.poseidonHashString([commit1, '0', sig1]);

  // Output UTXOs — recipient gets 1 SOL (1e9 lamports), change = 0
  const outPrivKey0 = new BN('555555555');
  const outPubKey0 = lightWasm.poseidonHashString([outPrivKey0.toString()]);
  const outBlinding0 = new BN('333333333');
  const outBlinding1 = new BN('444444444');

  const outCommit0 = lightWasm.poseidonHashString(['1000000000', outPubKey0, outBlinding0.toString(), mintField]);
  const outCommit1 = lightWasm.poseidonHashString(['0', pubKey0, outBlinding1.toString(), mintField]);

  // Merkle path — all zeros (valid for zero-amount inputs, ForceEqualIfEnabled skips check)
  const zeroPath = Array(26).fill('0');

  const input = {
    root: '0',
    publicAmount: '1000000000',
    extDataHash: '1234567890',
    mintAddress: mintField,
    inputNullifier: [nullifier0, nullifier1],
    inAmount: ['0', '0'],
    inPrivateKey: [privKey0.toString(), privKey1.toString()],
    inBlinding: [blinding0.toString(), blinding1.toString()],
    inPathIndices: ['0', '0'],
    inPathElements: [zeroPath, zeroPath],
    outputCommitment: [outCommit0, outCommit1],
    outAmount: ['1000000000', '0'],
    outPubkey: [outPubKey0, pubKey0],
    outBlinding: [outBlinding0.toString(), outBlinding1.toString()],
  };

  console.log('Generating proof...');
  console.time('prove');
  const { proof, publicSignals } = await groth16.fullProve(input, WASM, ZKEY);
  console.timeEnd('prove');

  // Verify
  const { default: vkey } = await import(VKEY, { assert: { type: 'json' } });
  const valid = await groth16.verify(vkey, publicSignals, proof);
  console.log('Proof valid:', valid);
  console.timeEnd('total');

  console.log('\nProof:', JSON.stringify(proof, null, 2));
}

main().catch(console.error);
