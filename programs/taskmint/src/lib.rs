use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};


declare_id!("ZJaaqFTUwVYj6Yit6yhpKbtNZXAvgdZMPuL6Lgf9PNF");

#[program]
pub mod taskmint {
    use super::*;

    pub fn task_mint_to(ctx: Context<TaskMintTo>, authority_account_bump: u8, amount: u64) -> ProgramResult {
        let receiver = &mut ctx.accounts.token_receiver;
        let mint = &mut ctx.accounts.mint;
        let pda_authority = & ctx.accounts.pda_authority;
        let token_program = & ctx.accounts.token_program;
        msg!(receiver.amount, 0, 0, 0, 0);
        let cpi_accounts = token::MintTo{
            mint: mint.to_account_info(),
            to: receiver.to_account_info(),
            authority: pda_authority.to_account_info(),
        };
        let authority_seeds = &[&b"protocoppia"[..], &[authority_account_bump]];
        token::mint_to(
            CpiContext::new_with_signer(
                token_program.to_account_info(), cpi_accounts, 
                &[&authority_seeds[..]]
            ), 
            amount
        )?;
        msg!(receiver.amount, 0, 0, 0, 0);
        Ok(())
    }
}

// Transaction instructions
#[derive(Accounts)]
#[instruction(authority_account_bump: u8, amount: u64)]
pub struct TaskMintTo<'info> {
    #[account(mut, signer)]
    pub requester: AccountInfo<'info>,
    #[account(mut)]
    pub token_receiver: Account<'info, TokenAccount>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        seeds = [b"protocoppia".as_ref()],
        bump = authority_account_bump,
        payer = requester,
        token::mint = mint,
        token::authority = pda_authority,
    )]
    pub pda_authority: Account<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    #[account(executable)]
    pub token_program: Program<'info, Token>,
}
