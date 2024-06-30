import axios from "axios";
import { createClient } from "contentful";

export async function getEntries(contentType: string): Promise<any[]> {
    const CONTENTFUL_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
    const CONTENTFUL_MANAGEMENT_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN
    const CONTENTFUL_ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
    if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_ENVIRONMENT) {
        return [];
    }
    const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
        host: 'api.contentful.com',
        environment: CONTENTFUL_ENVIRONMENT,
    })
    const response  = await client.getEntries(contentType)

    return response.items;
}