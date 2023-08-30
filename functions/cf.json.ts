export function onRequest({ request }) {
  const req = request
  const res = {
    url: req.url,
    headers: Object.fromEntries(req.headers),
    cf: req.cf,
  }
  return new Response(JSON.stringify(res, null, '\t'), { headers: { 'Content-Type': 'application/json' } })
}
