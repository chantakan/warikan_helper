// types/index.ts
export interface Member {
    id: string;
    name: string;
}

export interface SplitItem {
    id: string;
    description: string;
    amount: number;
    paidBy: string;
}

export interface TreatItem {
    id: string;
    description: string; // 追加
    amount: number;
    treater: string;
    treated: string;
}

export interface Settlement {
    from: string;
    to: string;
    amount: number;
}