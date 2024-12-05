// components/MemberList.tsx
import { useState } from 'react';
import { Member } from '@/types';

interface MemberListProps {
    members: Member[];
    onAddMember: (member: Member) => void;
    onRemoveMember: (id: string) => void;
}

export default function MemberList({ members, onAddMember, onRemoveMember }: MemberListProps) {
    const [newMemberName, setNewMemberName] = useState('');

    const handleAddMember = () => {
        if (newMemberName.trim()) {
            onAddMember({
                id: crypto.randomUUID(),
                name: newMemberName.trim()
            });
            setNewMemberName('');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">メンバー</h2>
            <div className="flex flex-wrap gap-2">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="inline-flex items-center gap-2 px-3 py-1 text-white bg-pink-300 border-2 border-dashed border-white rounded-lg"
                    >
                        <span>{member.name}</span>
                        <button
                            onClick={() => onRemoveMember(member.id)}
                            className="w-5 h-5 text-pink-300 bg-white rounded-full"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="flex-1 px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none"
                    placeholder="名前を入力"
                />
                <button
                    onClick={handleAddMember}
                    className="px-4 py-2 text-pink-300 bg-white rounded-lg hover:bg-pink-50"
                >
                    追加
                </button>
            </div>
        </div>
    );
}