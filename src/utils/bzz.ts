import type { Reference } from "../clients"

export const isValidReference = (reference: string): reference is Reference => {
  return /^[0-9a-f]{64}$/.test(reference)
}

export function getBzzUrl(origin: string, reference: string, path?: string): string {
  const url = new URL(`/bzz/${reference}/${path ?? ""}`, origin)
  return url.href.replace(/\/$/, "")
}

export function extractReference(bzzUrl: string): string {
  if (isValidReference(bzzUrl)) return bzzUrl

  const reference = bzzUrl.match(/\/bzz\/([A-Fa-f0-9]{64})/)?.[1]

  if (!reference) {
    throw new Error(`Invalid bzz URL: ${bzzUrl}`)
  }

  return reference
}
