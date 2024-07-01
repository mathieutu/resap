import axios from "axios";
import { createClient } from "contentful";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT;

function createContentManagementClient() {
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

// update method seems to be absent from the entry object returned from the contentful client,
// so we're using an axios call. 
export async function createEntry(contentType: string, payload: Record<string, any>) {
    const body = {fields: {}} as Record<string, any>
    for (let key in payload) {
        body.fields[key] = { fr: payload[key]}
    }

    const config = {
        headers: {
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Content-Type': contentType,
            'Authorization': `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`
        }
    }

    const response = await axios.post(
        `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries`,
        body,
        config,
    )
    return(response)
}

// update method seems to be absent from the entry object returned from the contentful client,
// so we're using an axios call. 
export async function patchEntry(id: string, payload: Record<string, any>, version: number): Promise<Record<string, any>> {
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

    const response = await axios.patch(
        `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${id}`,
        operations,
        config,
    )

    return response;
}

export async function publishEntry(id: string, version: number): Promise<Record<string, any>>{
    const config = {
        headers: {
            'X-Contentful-Version': version,
            'Authorization': `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        }
    }

    const response = await axios.put(
        `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${id}/published`,
        {},
        config,
    );

    return response;
}

export async function unpublishEntry(id: string, version: number): Promise<Record<string, any>> {
    const config = {
        headers: {
            'X-Contentful-Version': version,
            'Authorization': `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        }
    }

    const response = await axios.delete(
        `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${id}/published`,
        config,
    );

    return response;
}

export async function deleteEntry(id: string, version: number) {
    const config = {
        headers: {
            'X-Contentful-Version': version,
            'Authorization': `Bearer ${CONTENTFUL_MANAGEMENT_TOKEN}`,
        }
    }

    const response = await axios.delete(
        `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries/${id}`,
        config,
    );
}