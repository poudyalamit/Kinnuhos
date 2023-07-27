import { useRouter } from 'next/router'
 
export default function Page() {
  const router = useRouter()
  return <p>Query is: {router.query.slug}</p>
}