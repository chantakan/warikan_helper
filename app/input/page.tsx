// app/input/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Member, SplitItem, TreatItem } from '@/types';
import SplitList from '@/components/SplitList';
import TreatList from '@/components/TreatList';
import SettlementResult from '@/components/SettlementResult';

interface Settlement {
    from: string;
    to: string;
    amount: number;
}

export default function InputPage() {
    const router = useRouter();
    const [members, setMembers] = useState<Member[]>([]);
    const [splits, setSplits] = useState<SplitItem[]>([]);
    const [treats, setTreats] = useState<TreatItem[]>([]);
    const [settlements, setSettlements] = useState<Settlement[]>([]);

    useEffect(() => {
        const storedMembers = localStorage.getItem('warikanMembers');
        if (storedMembers) {
            setMembers(JSON.parse(storedMembers));
        } else {
            router.push('/');
        }
    }, [router]);

    const handleAddSplit = (split: SplitItem) => {
        setSplits(prev => [...prev, split]);
    };

    const handleRemoveSplit = (id: string) => {
        setSplits(prev => prev.filter(split => split.id !== id));
    };

    const handleAddTreat = (treat: TreatItem) => {
        setTreats(prev => [...prev, treat]);
    };

    const handleRemoveTreat = (id: string) => {
        setTreats(prev => prev.filter(treat => treat.id !== id));
    };

    const calculateSettlement = () => {
        // メンバーごとの収支を計算
        const balance: { [key: string]: number } = {};

        // 初期化
        members.forEach(member => {
            balance[member.id] = 0;
        });

        // 割り勘の計算
        splits.forEach(split => {
            const perPerson = split.amount / members.length;
            balance[split.paidBy] += split.amount; // 支払った人はプラス
            members.forEach(member => {
                if (member.id !== split.paidBy) {
                    balance[member.id] -= perPerson; // 支払った人以外が等分して引く
                }
            });
        });

        // 奢りの計算
        treats.forEach(treat => {
            balance[treat.treater] += treat.amount; // 奢った人はプラス
            balance[treat.treated] -= treat.amount; // 奢られた人はマイナス
        });

        // 小数点以下を四捨五入
        Object.keys(balance).forEach(key => {
            balance[key] = Math.round(balance[key]);
        });

        // 清算計算
        const newSettlements: Settlement[] = [];

        while (true) {
            // 最大債務者と最大債権者を見つける
            let maxDebtor = '';
            let maxCreditor = '';
            let maxDebt = 0;
            let maxCredit = 0;

            Object.entries(balance).forEach(([id, amount]) => {
                if (amount < -maxDebt) {
                    maxDebt = -amount;
                    maxDebtor = id;
                }
                if (amount > maxCredit) {
                    maxCredit = amount;
                    maxCreditor = id;
                }
            });

            // 清算が完了したら終了
            if (maxDebt < 1 || maxCredit < 1) break;

            // 金額の小さい方を清算額とする
            const amount = Math.min(maxDebt, maxCredit);

            newSettlements.push({
                from: maxDebtor,
                to: maxCreditor,
                amount: amount
            });

            // 残高を更新
            balance[maxDebtor] += amount;
            balance[maxCreditor] -= amount;
        }

        setSettlements(newSettlements);
    };

    const canCalculate = splits.length > 0 || treats.length > 0;

    return (
        <main className="container max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-white mb-8">お支払い内容</h1>

            <div className="space-y-8">
                <div className="bg-white/10 p-4 rounded-lg">
                    <h2 className="text-xl font-bold text-white mb-4">参加メンバー</h2>
                    <div className="flex flex-wrap gap-2">
                        {members.map(member => (
                            <span
                                key={member.id}
                                className="px-3 py-1 text-white bg-pink-400/50 rounded-lg"
                            >
                                {member.name}
                            </span>
                        ))}
                    </div>
                </div>

                <SplitList
                    splits={splits}
                    members={members}
                    onAddSplit={handleAddSplit}
                    onRemoveSplit={handleRemoveSplit}
                />

                <TreatList
                    treats={treats}
                    members={members}
                    onAddTreat={handleAddTreat}
                    onRemoveTreat={handleRemoveTreat}
                />

                <div className="text-center">
                    <button
                        onClick={calculateSettlement}
                        disabled={!canCalculate}
                        className="px-8 py-3 text-xl text-pink-300 bg-yellow-100 rounded-lg hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        清算する
                    </button>
                </div>

                <SettlementResult
                    settlements={settlements}
                    members={members}
                />
            </div>
        </main>
    );
}