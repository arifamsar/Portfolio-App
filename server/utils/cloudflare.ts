import type { EventHandlerRequest, H3Event } from "h3";

// Cloudflare global types
declare global {
	interface KVNamespace {
		get(key: string, options?: { type?: "text" | "json" | "arrayBuffer" | "stream" }): Promise<string | null>;
		put(key: string, value: string | ArrayBuffer | ArrayBufferView | ReadableStream, options?: Record<string, unknown>): Promise<void>;
		delete(key: string): Promise<void>;
		list(options?: Record<string, unknown>): Promise<Record<string, unknown>>;
	}

	interface D1Database {
		prepare(query: string): D1PreparedStatement;
		dump(): Promise<ArrayBuffer>;
		batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
		exec(query: string): Promise<D1ExecResult>;
	}

	interface D1PreparedStatement {
		bind(...values: unknown[]): D1PreparedStatement;
		first(colName?: string): Promise<Record<string, unknown> | null>;
		run(): Promise<D1Result>;
		all(): Promise<D1Result>;
		raw(): Promise<unknown[]>;
	}

	interface D1Result {
		results?: Record<string, unknown>[];
		success: boolean;
		error?: string;
		meta: Record<string, unknown>;
	}

	interface D1ExecResult {
		count: number;
		duration: number;
	}

	interface IncomingRequestCfProperties {
		colo?: string;
		country?: string;
		city?: string;
		continent?: string;
		latitude?: string;
		longitude?: string;
		postalCode?: string;
		metroCode?: string;
		region?: string;
		regionCode?: string;
		timezone?: string;
	}

	interface ExecutionContext {
		waitUntil(promise: Promise<unknown>): void;
		passThroughOnException(): void;
	}
}

export interface CloudflareEnv {
	KV_BINDING?: KVNamespace;
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
	return getCloudflareEnv(event)?.KV_BINDING;
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
