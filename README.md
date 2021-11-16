# taskmint-solana
Task to Mint a token with Solana using Anchor

This software require an installation of [Solana](https://docs.solana.com/cli/install-solana-cli-tools) on a Linux system, expecially with `solana-test-validator` in the PATH.

This software use [Anchor](https://github.com/project-serum/anchor) to manage serialization and constrain on the Solana program and as helper for the Javascript client.
In particular here the client-side part of the task is done as test launched by the Anchor routine. 

The library can be used client-side exporting some of the compilation file that Anchor generate, in particular the standard IDL of the compiled Solana, and a TypeScript interface
in `target/types/` after the compilation.

After Anchor and Solana are installed in the system (so you have in PATH the solana-cli and the anchor-cli) you simply need to:
1. Modify the `Anchor.toml` to insert the keypair you use with the local validator in `wallet=`
2. Run `npm install` in the root folder to install the dependencies
3. Run `anchor test` to build the Solana program and all the IDL/extra typescript. After the build is completed Anchor will launch a `solana-test-validator` 
(you need to not have the local validator running!). After the compilation automatically the system will run the tests in `tests/`.

The most important files are:
1. `programs/taskmint/src/lib.rs` that containis the Solana program
2. `tests/taskmint.js` that contains the testcode with the client-side part of the task

Anchor is very very powerfull but it's not well documented as library, so almost all the information needed to implement the task were recovered from reading the code and using examples. Here the documentation I've used to understand better the library and Solana:
- https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291 Base Anchor example
- https://hackmd.io/@ironaddicteddog/anchor_example_escrow Escrow Anchor example
- https://github.com/ironaddicteddog/anchor-escrow/blob/master/programs/escrow/src/lib.rs Src for Escrow Anchor
- https://github.com/ironaddicteddog/anchor-escrow/blob/master/tests/escrow.ts Test (client) for Escrow Anchor
- https://paulx.dev/blog/2021/01/14/programming-on-solana-an-introduction/#processor-part-3-pdas-part-3 Classic Solana Escrow
- https://docs.rs/anchor-lang/0.18.2/anchor_lang/index.html Rust doc for Anchor Solana-side
- https://project-serum.github.io/anchor/ts/index.html TS/JS doc for Anchor client-side
- https://docs.rs/anchor-spl/0.18.2/anchor_spl/ SPL Token classes for Anchor Solana-side
I have omitted obvious documentation like the official ones from Solana and SPLToken.
