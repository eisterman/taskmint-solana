const assert = require("assert");
const anchor = require('@project-serum/anchor');
const splToken = require("@solana/spl-token");

describe('Taskmint', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program_taskmint = anchor.workspace.Taskmint;

  it('Create mint', async () => {
    // Generate a new wallet keypair and airdrop 2 SOL
    const baseAccount = anchor.web3.Keypair.generate();
    var fromAirdropSignature = await provider.connection.requestAirdrop(
      baseAccount.publicKey,
      anchor.web3.LAMPORTS_PER_SOL * 2,
    );
    // Wait for airdrop confirmation
    await provider.connection.confirmTransaction(fromAirdropSignature);

    // Create Mint Authority
    const [mint_authority_pda, mint_authority_bump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("protocoppia"))],
      program_taskmint.programId
    );

    // Create new token mint
    const mint = await splToken.Token.createMint(
      provider.connection,
      baseAccount,
      mint_authority_pda,
      null,
      9,
      splToken.TOKEN_PROGRAM_ID,
    );

    // Get the token account of the requester Solana address, if it does not exist, create it
    var receiverAccount = await mint.getOrCreateAssociatedAccountInfo(
      baseAccount.publicKey,
    );

    console.log('Token Quantity before: ', receiverAccount.amount.toNumber());

    await program_taskmint.rpc.taskMintTo(
      mint_authority_bump,
      new anchor.BN(150),
      {
        accounts: {
          requester: baseAccount.publicKey,
          tokenReceiver: receiverAccount.address,
          mint: mint.publicKey,
          pdaAuthority: mint_authority_pda,
          systemProgram: anchor.web3.SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: splToken.TOKEN_PROGRAM_ID,
        },
        signers: [baseAccount],
      }
    );
    
    var receiverAccount = await mint.getOrCreateAssociatedAccountInfo(
      baseAccount.publicKey,
    );
    console.log('Token Quantity after: ', receiverAccount.amount.toNumber());
  });
});
