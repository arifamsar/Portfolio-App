import type { EventHandlerRequest, H3Event } from "h3";

export interface CloudflareEnv {
	KV?: KVNamespace;
	DB?: D1Database;
	// Add other Cloudflare bindings as needed
}

export interface CloudflareContext {
	cloudflare?: {
		env?: CloudflareEnv;
		cf?: IncomingRequestCfProperties;
		ctx?: ExecutionContext;
	};
}

export function getCloudflareEnv(event: H3Event<EventHandlerRequest>): CloudflareEnv | undefined {
	return (event.context as CloudflareContext).cloudflare?.env;
}

export function getKVNamespace(event: H3Event<EventHandlerRequest>): KVNamespace | undefined {
	return getCloudflareEnv(event)?.KV;
}

export function getD1Database(event: H3Event<EventHandlerRequest>): D1Database | undefined {
	return getCloudflareEnv(event)?.DB;
}

export function isProduction(): boolean {
	return process.env.NODE_ENV === "production";
}

export function isCloudflarePages(): boolean {
	return !!process.env.CF_PAGES;
}
