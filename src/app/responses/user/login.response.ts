export class LoginResponse {
    token_type: string;
    token: string;
    refresh_token: string;

    constructor(token_type: string, token: string, refresh_token: string) {
        this.refresh_token = refresh_token;
        this.token = token;
        this.token_type = token_type;
    }
}


