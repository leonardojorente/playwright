import { APIRequestContext } from '@playwright/test';
import  RelativePath  from '../../data/endpoint-relative-path.json';

export class TransactionRequests{
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createNewTransaction(body: any){
        const response = await this.request.post(`${process.env.BASE_URL_API}${RelativePath.TRANSACTION}`,
            {   
                headers:{
                    authorization: `JWT ${process.env.API_TOKEN}`
                },
                data: body
            })
            console.log(`${response.headers}`)
        return response
    }
}