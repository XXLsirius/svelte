import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type RouteParams = {  }
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/certificates" | "/certificates/certificate-edit/type=[type]&id=[id]&certificateTypeId=[certificateTypeId]&shipId=[shipId]&personId=[personId]" | "/charterers" | "/components" | "/components/card" | "/components/carousel" | "/components/checkbox-and-input" | "/components/file-attachement" | "/components/label-group" | "/components/modal" | "/components/search-input" | "/components/select" | "/components/tab" | "/components/table" | "/mariner" | "/mariner/mariner-create/id=[id]" | "/mariner/mariner-detail/id=[id]" | "/ship" | "/ship/ship-create/id=[id]" | "/ship/ship-detail/id=[id]" | "/shipping" | "/shipping/shipping-create/id=[id]" | "/shipping/shipping-detail/id=[id]" | "/shipping/shipping-history" | "/sign-in" | "/sign-up" | "/typeofcertificate" | "/waterareas" | null
type LayoutParams = RouteParams & { type?: string,id?: string,certificateTypeId?: string,shipId?: string,personId?: string }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;