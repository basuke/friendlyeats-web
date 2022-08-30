/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    console.log('+page.js', params)
    return { id: params.id };
}
