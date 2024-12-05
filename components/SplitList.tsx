// components/SplitList.tsx
import { useState } from 'react';
import { SplitItem, Member } from '@/types';

interface SplitListProps {
    splits: SplitItem[];
    members: Member[];
    onAddSplit: (split: SplitItem) => void;
    onRemoveSplit: (id: string) => void;
}

export default function SplitList({ splits, members, onAddSplit, onRemoveSplit }: SplitListProps) {
    const [newSplit, setNewSplit] = useState<Omit<SplitItem, 'id'>>({
        description: '',
        amount: 0,
        paidBy: ''
    });

    const handleAddSplit = () => {
        if (newSplit.description && newSplit.amount && newSplit.paidBy) {
            onAddSplit({
                id: crypto.randomUUID(),
                ...newSplit
            });
            setNewSplit({ description: '', amount: 0, paidBy: '' });
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">割り勘</h2>
            <div className="space-y-2">
                {splits.map((split) => (
                    <div key={split.id} className="flex items-center gap-4">
                        <input
                            type="text"
                            value={split.description}
                            readOnly
                            className="flex-1 px-3 py-2 text-white bg-transparent border-b border-white"
                        />
                        <input
                            type="number"
                            value={split.amount}
                            readOnly
                            className="w-24 px-3 py-2 text-white bg-transparent border-b border-white text-right"
                        />
                        <select
                            value={split.paidBy}
                            disabled
                            className="w-32 px-3 py-2 text-white bg-transparent border-b border-white"
                        >
                            <option value={split.paidBy}>
                                {members.find(m => m.id === split.paidBy)?.name}
                            </option>
                        </select>
                        <button
                            onClick={() => onRemoveSplit(split.id)}
                            className="w-8 h-8 text-pink-300 bg-white rounded-full"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={newSplit.description}
                    onChange={(e) => setNewSplit(prev => ({ ...prev, description: e.target.value }))}
                    className="flex-1 px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none"
                    placeholder="項目"
                />
                <input
                    type="number"
                    value={newSplit.amount || ''}
                    onChange={(e) => setNewSplit(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-24 px-3 py-2 text-white bg-transparent border-b border-white text-right focus:outline-none"
                    placeholder="金額"
                />
                <select
                    value={newSplit.paidBy}
                    onChange={(e) => setNewSplit(prev => ({ ...prev, paidBy: e.target.value }))}
                    className="w-32 px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none"
                >
                    <option value="">立替人</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAddSplit}
                    className="px-4 py-2 text-pink-300 bg-white rounded-lg hover:bg-pink-50"
                >
                    追加
                </button>
            </div>
        </div>
    );
}