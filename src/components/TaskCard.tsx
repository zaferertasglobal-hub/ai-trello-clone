import type { Todo } from '../types'; // Tanımladığımız tipi içeri aldık
// Tanımladığımız tipi içeri aldık

// Props: Bu bileşene dışarıdan gelecek verileri tanımlıyoruz
interface Props {
    task: Todo;
}

export default function TaskCard({ task }: Props) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-3 hover:border-blue-400 transition-colors cursor-grab">
            <p className="text-sm font-medium text-slate-700">{task.content}</p>

            {/* Durumuna göre küçük bir etiket gösterelim */}
            <span className={`text-[10px] px-2 py-1 rounded-full mt-2 inline-block ${task.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                {task.status.toUpperCase()}
            </span>
        </div>
    );
}
