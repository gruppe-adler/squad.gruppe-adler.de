import fetch from 'node-fetch';

export default interface User {
    username: string;
    steamId: string;
    avatar: string;
    groups: Array<{ tag: string }>;
}

let lastFetch: number = 0;
let adlerCache: User[] = [];

const sendGraphQL = async (query: string, variables: object = {}) => {
    const res = await fetch(`https://sso.gruppe-adler.de/api/v1/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const body = await res.json();

    if (body.errors) throw body.errors;

    return body.data;
};

/**
 * Fetch all users, which are adler
 * @returns { Promise<User[]> } Promise resolves into array of users.
 */
export async function fetchAdlers(): Promise<User[]> {

    if ((new Date()).valueOf() - lastFetch < 300000) { // 5 minutes
        console.log('using cache', (new Date()).valueOf(), lastFetch);
        return adlerCache;
    }

    try {
        const data: { users: User[] } = await sendGraphQL(`
            query {
                users {
                    username,
                    steamId,
                    avatar,
                    groups {
                        tag
                    }
                }
            }
        `);

        lastFetch = new Date().valueOf();
        adlerCache = data.users.filter(u => u.groups.findIndex(g => g.tag === 'adler') > -1);
        return adlerCache;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export function userToXML(user: User) {
    return `
    <member id="${user.steamId}" nick="${user.username}">
        <name>${user.username}</name>
        <email>${user.username}@gruppe-adler.de</email>
    </member>`;
}
