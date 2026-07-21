# Privacy Cash Groth16 GPU Benchmark

**Circuit:** transaction2 (Privacy Cash official artifacts)  
**Framework:** snarkjs groth16 + bn128  
**GPU:** NVIDIA GeForce RTX 4090 (CUDA 12.8.1)  
**Date:** 2026-07-21

## Result

| Metric | Value |
|--------|-------|
| Prove time | **1,098ms** |
| Total time | 1,151ms |
| Proof valid | ✅ true |

## vs Browser WASM

| Environment | Time |
|-------------|------|
| Browser WASM (client-side) | 3,000–8,000ms |
| GPU server-side (this) | **1,098ms** |
| Speedup | **3–7x faster** |

Proved using Privacy Cash's official `.zkey` and `.wasm` artifacts from their public repo.
