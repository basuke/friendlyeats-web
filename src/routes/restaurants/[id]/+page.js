import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    console.log('+page.js', params.id, browser ? 'browser' : 'server');
    return { id: params.id };
}
