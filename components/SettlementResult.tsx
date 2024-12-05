// components/SettlementResult.tsx
import { Member } from '@/types';

interface Settlement {
    from: string;
    to: string;
    amount: number;
}

interface SettlementResultProps {
    settlements: Settlement[];
    members: Member[];
}

export default function SettlementResult({ settlements, members }: SettlementResultProps) {
    if (settlements.length === 0) return null;

    return (
        <div className="bg-white/10 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">清算結果</h2>
            <div className="space-y-2">
                {settlements.map((settlement, index) => {
                    const from = members.find(m => m.id === settlement.from);
                    const to = members.find(m => m.id === settlement.to);
                    return (
                        <div key={index} className="flex items-center justify-between text-white bg-white/5 p-3 rounded">
                            <div className="flex items-center gap-2">
                                <span className="font-mono">{from?.name}</span>
                                <span>→</span>
                                <span className="font-mono">{to?.name}</span>
                            </div>
                            <span className="font-mono">¥{settlement.amount.toLocaleString()}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}