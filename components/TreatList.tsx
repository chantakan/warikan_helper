// components/TreatList.tsx
import { useState } from 'react';
import { TreatItem, Member } from '@/types';

interface TreatListProps {
    treats: TreatItem[];
    members: Member[];
    onAddTreat: (treat: TreatItem) => void;
    onRemoveTreat: (id: string) => void;
}

export default function TreatList({ treats, members, onAddTreat, onRemoveTreat }: TreatListProps) {
    const [newTreat, setNewTreat] = useState<Omit<TreatItem, 'id'>>({
        description: '', // 追加
        amount: 0,
        treater: '',
        treated: ''
    });

    const handleAddTreat = () => {
        if (newTreat.amount && newTreat.treater && newTreat.treated && newTreat.description) { // descriptionの確認を追加
            onAddTreat({
                id: crypto.randomUUID(),
                ...newTreat
            });
            setNewTreat({ description: '', amount: 0, treater: '', treated: '' }); // リセット時にdescriptionも追加
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">奢り</h2>
            <div className="space-y-2">
                {treats.map((treat) => (
                    <div key={treat.id} className="flex items-center gap-4">
                        <input
                            type="text"
                            value={treat.description}
                            readOnly
                            className="flex-1 min-w-[100px] px-3 py-2 text-white bg-transparent border-b border-white"
                        />
                        <input
                            type="number"
                            value={treat.amount}
                            readOnly
                            className="w-24 px-3 py-2 text-white bg-transparent border-b border-white text-right"
                        />
                        <select
                            value={treat.treater}
                            disabled
                            className="w-32 px-3 py-2 text-white bg-transparent border-b border-white"
                        >
                            <option value={treat.treater}>
                                {members.find(m => m.id === treat.treater)?.name}
                            </option>
                        </select>
                        <select
                            value={treat.treated}
                            disabled
                            className="w-32 px-3 py-2 text-white bg-transparent border-b border-white"
                        >
                            <option value={treat.treated}>
                                {members.find(m => m.id === treat.treated)?.name}
                            </option>
                        </select>
                        <button
                            onClick={() => onRemoveTreat(treat.id)}
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
                    value={newTreat.description}
                    onChange={(e) => setNewTreat(prev => ({ ...prev, description: e.target.value }))}
                    className="flex-1 min-w-[100px] px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none"
                    placeholder="項目"
                />
                <input
                    type="number"
                    value={newTreat.amount || ''}
                    onChange={(e) => setNewTreat(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-24 px-3 py-2 text-white bg-transparent border-b border-white text-right focus:outline-none"
                    placeholder="金額"
                />
                <select
                    value={newTreat.treater}
                    onChange={(e) => setNewTreat(prev => ({ ...prev, treater: e.target.value }))}
                    className="w-32 px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none"
                >
                    <option value="">奢る人</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <select
                    value={newTreat.treated}
                    onChange={(e) => setNewTreat(prev => ({ ...prev, treated: e.target.value }))}
                    className="w-32 px-3 py-2 text-white bg-transparent border-b border-white focus:outline-none"
                >
                    <option value="">奢られる人</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAddTreat}
                    className="px-4 py-2 text-pink-300 bg-white rounded-lg hover:bg-pink-50"
                >
                    追加
                </button>
            </div>
        </div>
    );
}