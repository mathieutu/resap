import axios from "axios";
import { createClient } from "contentful";
import path from "path";
import { config } from "process";

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
    return response
}

export async function patchEntry(id: string, payload: Record<string, any>, version: number): Promise<any> {
    
    const CONTENTFUL_SPACE_ID = "9u74ojeq10qz";
    const CONTENTFUL_MANAGEMENT_TOKEN = "CFPAT-VKSKtnR5wGLpNCDwEQLwVpav-pJb7XpBR34CMujwT8k";
    const CONTENTFUL_ENVIRONMENT = "dev";

    const operations = []
    for (let key in payload) {
        operations.push({
            op: 'add',
            path: `/fields/${key}/fr`,
            value: payload[key]
        })
    }

    const config = {
        headers: {
            'Content-Type': 'application/json-patch+json',
            'X-Contentful-Version': version,
            'Authorization': `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
        }
    }

    const response = await axios.patch(`https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${id}`,
        operations,
        config,
    )
}