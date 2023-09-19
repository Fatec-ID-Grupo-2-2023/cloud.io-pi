export type ILanguage = 'en' | 'pt';

export interface IToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    account_id: string;
}