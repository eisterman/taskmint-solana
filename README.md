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
