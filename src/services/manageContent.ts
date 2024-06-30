import axios from "axios";
import { createClient } from "contentful";

function createContentManagementClient() {
    const CONTENTFUL_SPACE_ID = "9u74ojeq10qz";
    const CONTENTFUL_MANAGEMENT_TOKEN = "CFPAT-VKSKtnR5wGLpNCDwEQLwVpav-pJb7XpBR34CMujwT8k";
    const CONTENTFUL_ENVIRONMENT = "dev";
    if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_ENVIRONMENT) {
        return null;
    }
    const client = createClient({
        space: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
        host: 'api.contentful.com',
        environment: CONTENTFUL_ENVIRONMENT,
    })
    return client;
}

export async function getEntries(contentType: string): Promise<Array<Record<string, any>>> {
    const client = createContentManagementClient();
    if (!client) {
        // TODO throw error
        return []
    }

    const response  = await client.getEntries({
        content_type: contentType,
    })

    return response.items as Array<Record<string, any>>;
}

export async function getSingleEntry(id: string): Promise<Record<string, any>|null> {
    const client = createContentManagementClient();
    if (!client) {
        // TODO throw error
        return null
    }
    const response = await client.getEntry(id)
    console.log(response);
    return response
}