export default {
	async fetch(request: Request): Promise<Response> {
		// Point to my origin and pass through the request
		const req = new Request('https://brotli.walshy.dev', request);

		const res = await fetch(req);
		let body = await res.text();

		const trace = await this.trace();
		// @ts-ignore
		body = body.replaceAll('Brotli testing', `Metal: ${trace.fl}, sliver: ${trace.sliver}, colo: ${trace.colo}`);

		const headers = new Headers(res.headers);
		// @ts-ignore
		headers.append('x-metal', trace.fl);
		// @ts-ignore
		headers.append('x-sliver', trace.sliver);
		// @ts-ignore
		headers.append('x-colo', trace.colo);

		return new Response(body, {
			...res,
			headers,
		});
	},

	async trace() {
		const res = await fetch('https://walshy.dev/cdn-cgi/trace');
		const text = await res.text();

		const data = {};
		// @ts-ignore
		text.replace(/(\w+)=(.+)/g, (_, key, value) => data[key] = value);

		return data;
	}
};
