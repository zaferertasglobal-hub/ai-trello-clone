// src/components/AddTask.tsx
import { useState } from 'react';

interface Props {
    onAdd: (content: string) => void;
}

export default function AddTask({ onAdd }: Props) {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText(''); // Kutuyu temizle
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Yeni görev yaz..."
                className="w-full p-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full mt-2 bg-blue-600 text-white py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Ekle +
            </button>
        </form>
    );
}
