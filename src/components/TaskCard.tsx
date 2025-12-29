import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Todo } from '../types';

interface Props {
    task: Todo;
}

export default function TaskCard({ task }: Props) {
    // 1. Sürükleme özellikleri için gerekli hook
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    // 2. Sürükleme esnasındaki görsel değişimleri (hareketleri) ayarla
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1, // Sürüklenirken şeffaflaşsın
    };

    return (
        <div
            ref={setNodeRef} // React'e bu HTML elemanını takip etmesini söyledik
            style={style}    // Koordinat değişimlerini (CSS) buraya bağladık
            {...attributes}  // Erişilebilirlik özellikleri (ID vb.)
            {...listeners}   // Fare tıklama ve sürükleme olayları
            className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-3 hover:border-blue-400 transition-colors cursor-grab active:cursor-grabbing"
        >
            <p className="text-sm font-medium text-slate-700">{task.content}</p>

            <span className={`text-[10px] px-2 py-1 rounded-full mt-2 inline-block ${task.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                {task.status.toUpperCase()}
            </span>
        </div>
    );
}
