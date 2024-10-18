import { APIRequestContext } from '@playwright/test';
import  RelativePath  from '../../data/endpoint-relative-path.json';

export class LoginRequests{
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async doLogin(body: any){
        const response = await this.request.post(`${process.env.BASE_URL_API}${RelativePath.LOGIN}`,
            {
                data: body
            })
        return response
    }
}