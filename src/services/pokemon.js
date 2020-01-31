export async function PokemonsData(url) {
    const res = await fetch(url)
    const body = await res.json();
    return body
}