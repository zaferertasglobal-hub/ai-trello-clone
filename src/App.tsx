import { closestCorners, DndContext, type DragEndEvent } from '@dnd-kit/core'; // Dnd temel bileşenleri
import { arrayMove } from '@dnd-kit/sortable'; // Liste elemanlarını kaydırmak için
import { useState } from 'react'; // Durumu yönetmek için
import Column from './components/Column';
import type { Column as ColumnType, Todo } from './types';

const COLUMNS: ColumnType[] = [
    { id: 'todo', title: 'Yapılacaklar' },
    { id: 'doing', title: 'Devam Edenler' },
    { id: 'done', title: 'Bitenler' },
];

const INITIAL_TASKS: Todo[] = [
    { id: '1', content: 'Projeyi kur', status: 'done' },
    { id: '2', content: 'Tailwind ayarlarını yap', status: 'doing' },
    { id: '3', content: 'AI entegrasyonunu planla', status: 'todo' },
];

function App() {
    // 1. Veriyi "State" içine alıyoruz (Böylece değiştiğinde ekran güncellenir)
    const [tasks, setTasks] = useState<Todo[]>(INITIAL_TASKS);

    // 2. Sürükleme bittiğinde çalışan fonksiyon
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return; // Eğer boşluğa bırakıldıysa bir şey yapma

        if (active.id !== over.id) {
            setTasks((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);

                // Görevin yerini listede değiştir
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-10">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight italic">
                    AI-Trello <span className="text-blue-600">Pro</span>
                </h1>
            </header>

            {/* 3. DndContext: Tüm sürükleme alanını kapsar */}
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <main className="flex gap-6 justify-center overflow-x-auto">
                    {COLUMNS.map((col) => (
                        <Column
                            key={col.id}
                            column={col}
                            tasks={tasks.filter(t => t.status === col.id)}
                        />
                    ))}
                </main>
            </DndContext>
        </div>
    );
}

export default App;
