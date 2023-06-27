import { Suspense } from 'react'
import Page  from './page'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Page/>
      </Suspense>
    </section>
  )
}