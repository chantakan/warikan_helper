// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MemberList from '@/components/MemberList';
import { Member } from '@/types';

export default function Home() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);

  const handleAddMember = (member: Member) => {
    setMembers(prev => [...prev, member]);
  };

  const handleRemoveMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleSubmit = () => {
    if (members.length >= 2) {
      // メンバー情報をローカルストレージに保存
      localStorage.setItem('warikanMembers', JSON.stringify(members));
      router.push('/input');
    }
  };

  return (
    <main className="container max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-8">割り勘計算</h1>

      <MemberList
        members={members}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          disabled={members.length < 2}
          className="px-8 py-3 text-xl text-pink-300 bg-white rounded-lg hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          メンバー決定
        </button>
      </div>
    </main>
  );
}

