import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()

  const referer = request.headers.get('referer')
  if (!referer) {
    return redirect('/')
  }

  revalidatePath(referer)
  return redirect(referer)
}
