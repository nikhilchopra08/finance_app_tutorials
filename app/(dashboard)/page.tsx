"use client"

import { UseNewAccounts } from "@/features/accounts/hooks/use-new-accounts"
import { Button } from "@/components/ui/button"

export default function Home(){
  const { onOpen} = UseNewAccounts();

  return (
    <div> 
      <Button onClick={onOpen}>
        Add an account
      </Button>
    </div>
  )
}

// "use client"

// import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";

// export default function Home() {
//   const {accounts , isLoading} = useGetAccounts();
  
//   if(isLoading){
//     return (
//       <div>
//       Loading...
//       </div>
//     )
//   }

//   return (
//     <>
//     {/* // <UserButton afterSignOutUrl="/"/> */}
//     <p>DashBoard Page</p>
//     {accounts?.map((account) => (
//       <div key={account.id}>
//         {account.name}
//       </div>
//     ))}
//     </>
//   );
// }