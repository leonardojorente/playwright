import { APIRequestContext } from '@playwright/test';
import  RelativePath  from '../../data/endpoint-relative-path.json';

export class ResetRequests{
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async resetAppData(){
        const response = await this.request.get(`${process.env.BASE_URL_API}${RelativePath.RESET}`,
            {
                headers:{
                    authorization: `JWT ${process.env.API_TOKEN}`
                }
            })
        return response
    }
}