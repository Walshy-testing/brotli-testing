export async function onRequest({ request }) {
  // Point to my origin and pass through the request
  const req = new Request('https://brotli.walshy.dev', request);

  const res = await fetch(req);
  let body = await res.text();
  // @ts-ignore
  body = body.replaceAll('Brotli testing', 'This text was replaced in the Function');

  return new Response(body, res);
}