import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { getHomeworldsWithCharacters } from './characters';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const homeworlds = await getHomeworldsWithCharacters();
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: homeworlds
    };
};

export default httpTrigger;