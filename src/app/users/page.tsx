"use client";

import Container from '@/components/shared/Container';
import Header from '@/components/shared/Header'
import { useGetUsersQuery } from '@/store/api/userApi';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/store/hooks';
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import Spinner from '@/components/spinner/Spinner';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue] = useDebounce(searchTerm, 1000);
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search") || ""


  useEffect(() => {
    if (searchValue) {
      router.push(`/users?search=${searchValue}`)
    } else {
      router.push("/users")
    }
  }, [searchValue])

  useEffect(() => {
    setSearchTerm(search)
  }, [])

  const { data, isLoading, isError } = useGetUsersQuery({ search: search });
  const filterUser = data?.filter((userList) => userList._id !== user?.id)
  return (
    <div>
      <Header />
      <Container className='mt-4'>
        <div className="w-1/2 mx-auto">
          <Label htmlFor="" className='text-base'>Search User</Label>
          <Input defaultValue={search} placeholder='Search User...' type='search' className='mt-2' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* user data fetching */}
        {
          isLoading ?
            <div className="flex justify-center mt-10"><Spinner /></div> :
            filterUser?.length ? <div className="grid grid-cols-3 gap-6 mt-6">
              {filterUser?.map((item) => (
                <div className="dark:border-none dark:bg-bgDark p-4 text-center border border-gray-200 rounded-lg shadow" key={item._id}>
                  <Avatar className='mx-auto'>
                    <AvatarImage src={item.profile.secure_url} alt="profile" />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <h3 className='mt-4 text-base font-semibold'>{item.name}</h3>
                  <Button asChild variant="link" className='w-full mt-4'>
                    <Link href={`/profile?userId=${item._id}`}>Visit Profile</Link>
                  </Button>
                </div>
              ))}
            </div> : <div className="mt-10 text-sm font-medium text-center uppercase">No User Match</div>

        }

      </Container>

    </div>
  )
}

export default UsersPage