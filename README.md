# GhostProver — Public Benchmark Ledger

Verified GPU proving benchmarks for ZK programs. Every run is real hardware,
real receipts, raw logs attached. No Bonsai, no emulation.

**Infrastructure:** RTX 4090 · CUDA 12.8 · Ubuntu 22.04 · x86_64
**Backends:** RISC Zero · SP1 (available on request)
**Operator:** [GhostProver / NTH MOMENT](https://fouriers.xyz/ghostprover) · [@0xfourier](https://x.com/0xfourier)

---

## Benchmark Index

| Program | Client | Date | Hardware | Backend | Total (mean) | Repo |
|---------|--------|------|----------|---------|-------------|------|
| SLH-DSA-128s (FIPS-205) | [Kaspa Kii](https://github.com/KaspaKii/Portrait) | Jul 16, 2026 | RTX 4090 · CUDA 12.8 | RISC Zero 3.0.5 | 16.22s | [kaspa-pq-zk/initial-run-july-16](./kaspa-pq-zk/initial-run-july-16/) |
| FN-DSA Falcon-512 (FIPS-206) | [Kaspa Kii](https://github.com/KaspaKii/Portrait) | Jul 16, 2026 | RTX 4090 · CUDA 12.8 | RISC Zero 3.0.5 | 2.47s | [kaspa-pq-zk/initial-run-july-16](./kaspa-pq-zk/initial-run-july-16/) |
| ML-DSA-44 (FIPS-204) | [Kaspa Kii](https://github.com/KaspaKii/Portrait) | Jul 16, 2026 | RTX 4090 · CUDA 12.8 | RISC Zero 3.0.5 | 5.89s | [kaspa-pq-zk/initial-run-july-16](./kaspa-pq-zk/initial-run-july-16/) |
| SLH-DSA-128s (FIPS-205) · 5-run variance | [Kaspa Kii](https://github.com/KaspaKii/Portrait) | Jul 20, 2026 | RTX 4090 · CUDA 12.8 | RISC Zero 3.0.6 | 16.33s ± 0.55s | [kaspa-pq-zk/variance-run-july-20](./kaspa-pq-zk/variance-run-july-20/) |
| FN-DSA Falcon-512 (FIPS-206) · 5-run variance | [Kaspa Kii](https://github.com/KaspaKii/Portrait) | Jul 20, 2026 | RTX 4090 · CUDA 12.8 | RISC Zero 3.0.6 | 1.91s ± 0.05s | [kaspa-pq-zk/variance-run-july-20](./kaspa-pq-zk/variance-run-july-20/) |
| ML-DSA-44 (FIPS-204) · 5-run variance | [Kaspa Kii](https://github.com/KaspaKii/Portrait) | Jul 20, 2026 | RTX 4090 · CUDA 12.8 | RISC Zero 3.0.6 | 5.35s ± 0.06s | [kaspa-pq-zk/variance-run-july-20](./kaspa-pq-zk/variance-run-july-20/) |

---

## Headline Result

**SLH-DSA-128s (FIPS-205) CPU vs GPU**

| Environment | Total Proving Time | Speedup |
|-------------|-------------------|---------|
| CPU (cloud baseline) | 1,731.67s (28m 51s) | 1× |
| RTX 4090 · initial run (RISC Zero 3.0.5) | 16.22s | **106×** |
| RTX 4090 · variance mean (RISC Zero 3.0.6) | 16.33s ± 0.55s | **106×** |

---

## kaspa-pq-zk

NIST post-quantum signature schemes verified inside RISC Zero zkVM.
Source: [KaspaKii/Portrait](https://github.com/KaspaKii/Portrait) —
Toccata KIP-16 tag-0x21 ZK opcode research.

### [initial-run-july-16](./kaspa-pq-zk/initial-run-july-16/)

First GPU proving run. RISC Zero 3.0.5.

| Scheme | Composite STARK | Succinct Compress | Total |
|--------|----------------|-------------------|-------|
| SLH-DSA-128s | 11.33s | 4.89s | **16.22s** |
| ML-DSA-44 | 4.12s | 1.77s | **5.89s** |
| FN-DSA Falcon-512 | 1.56s | 0.91s | **2.47s** |

### [variance-run-july-20](./kaspa-pq-zk/variance-run-july-20/)

5-run variance study. RISC Zero 3.0.6. Proof artifacts included.

| Scheme | Min | Max | Mean | σ |
|--------|-----|-----|------|---|
| SLH-DSA-128s | 15.64s | 16.91s | **16.33s** | ±0.55s |
| FN-DSA Falcon-512 | 1.86s | 1.99s | **1.91s** | ±0.05s |
| ML-DSA-44 | 5.25s | 5.41s | **5.35s** | ±0.06s |

Proof artifacts (`seal.hex`, `journal.hex`, `image.hex`, `control_id.hex`,
`claim.hex`, `control_digests.hex`, `control_index.hex`, `hashfn.hex`)
exported for all three schemes — ready for `anchor_tn10`.

---

## Methodology

- Each run generates a fresh ephemeral keypair, signs an in-memory message,
  proves the verification inside the RISC Zero zkVM, and exits
- No network, no persistent keys, no production claims
- The zkVM proves **verification only** keygen and signing are host-side
- GPU acceleration via `--features cuda` flag, `RUSTFLAGS="-C target-cpu=native"`
- All raw terminal logs retained and attached per run

---

## Run Your Program

Send your RISC Zero guest ELF or SP1 program for an independent GPU benchmark.
Free for M0 cost baselines. Ongoing proving arrangements available.

Contact: [rmsc@fouriers.xyz](mailto:rmsc@fouriers.xyz) ·
[fouriers.xyz/ghostprover](https://fouriers.xyz/ghostprover) ·
[@0xfourier](https://x.com/0xfourier)

---

*GhostProver · Part of [NTH MOMENT](https://fouriers.xyz)*
