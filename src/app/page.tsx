import Link from "next/link";

import { api } from "@/trpc/server";
import { CreatePost } from "./_components/create-post";

export default function Home() {
  return <p>You have no posts yet.</p>;
}

// export default async function CrudShowcase() {
//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
