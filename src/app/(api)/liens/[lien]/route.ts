import { findALien } from '@/services/contentful'
import { redirect } from 'next/navigation'

export const GET = async (_request: Request, { params }: { params: Promise<{ lien: string }> }) => {
  const { lien: id } = await params
  const lien = await findALien(id)
  if (!lien) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  if ('url' in lien && lien.url) {
    return redirect(lien.url)
  }

  if ('fichier' in lien && lien.fichier) {
    const proxiedResponse = await fetch(lien.fichier.file.url)

    const headers = new Headers(proxiedResponse.headers)

    // Remove problematic headers
    headers.delete('content-encoding')
    headers.delete('content-length')
    headers.delete('transfer-encoding')

    return new Response(proxiedResponse.body, {
      status: proxiedResponse.status,
      headers,
    })
  }

  return Response.json({ error: 'Lien has no url or asset' }, { status: 400 })
}
