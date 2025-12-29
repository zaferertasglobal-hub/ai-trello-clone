import {
    DndContext,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import AddTask from './components/AddTask'; // Yeni eklediğimiz bileşen
import Column from './components/Column';
import type { Column as ColumnType, Todo } from './types';

// Sabit Kolon Tanımları
const COLUMNS: ColumnType[] = [
    { id: 'todo', title: 'Yapılacaklar' },
    { id: 'doing', title: 'Devam Edenler' },
    { id: 'done', title: 'Bitenler' },
];

// Başlangıç Verileri
const INITIAL_TASKS: Todo[] = [
    { id: '1', content: 'Proje iskeletini kur', status: 'done' },
    { id: '2', content: 'TypeScript interface tanımla', status: 'doing' },
    { id: '3', content: 'AI servisini bağla', status: 'todo' },
];

function App() {
    // 1. STATE: Uygulamanın tüm verisi burada tutulur
    const [tasks, setTasks] = useState<Todo[]>(INITIAL_TASKS);

    // 2. SENSÖRLER: Fare ve dokunmatik hareketleri daha hassas algılamak için
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }, // 5px hareket etmeden sürükleme başlamaz (tıklama ile karışmasın diye)
        })
    );

    // 3. YENİ GÖREV EKLEME FONKSİYONU
    const handleAddTask = (content: string) => {
        const newTask: Todo = {
            id: Math.random().toString(36).substr(2, 9), // Basit bir eşsiz ID üretici
            content,
            status: 'todo', // Yeni görevler her zaman "todo" başlar
        };
        setTasks([...tasks, newTask]);
    };

    // 4. SÜRÜKLEME BİTTİĞİNDE ÇALIŞAN ANA MANTIK
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        setTasks((items) => {
            const oldIndex = items.findIndex((i) => i.id === activeId);
            const activeTask = items[oldIndex];

            // Eğer bir kolonun (sütunun) tam üzerine bırakıldıysa
            const isOverAColumn = COLUMNS.some((col) => col.id === overId);

            if (isOverAColumn) {
                // AI SİMÜLASYONU: Eğer bitenler kolonuna atıldıysa bir uyarı verelim
                if (overId === 'done' && activeTask.status !== 'done') {
                    alert("AI Mesajı: Harika! '" + activeTask.content + "' görevini bitirdin. Üretkenliğin %15 arttı!");
                }

                const newTasks = [...items];
                newTasks[oldIndex] = { ...activeTask, status: overId as any };
                return newTasks;
            }

            // Eğer başka bir kartın üzerine bırakıldıysa
            const newIndex = items.findIndex((i) => i.id === overId);
            const overTask = items[newIndex];

            // Kart başka bir kolona geçtiyse durumunu (status) güncelle
            if (activeTask.status !== overTask.status) {
                const newTasks = [...items];
                newTasks[oldIndex] = { ...activeTask, status: overTask.status };
                return arrayMove(newTasks, oldIndex, newIndex);
            }

            // Aynı kolon içinde sadece yer değiştirme
            return arrayMove(items, oldIndex, newIndex);
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-12">
            {/* Üst Başlık ve İstatistik Paneli */}
            <header className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        AI TRELLO <span className="text-blue-600">PRO</span>
                    </h1>
                    <p className="text-slate-500 text-sm">Akıllı görev takip sistemi</p>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold">Toplam</p>
                        <p className="text-xl font-bold text-slate-700">{tasks.length}</p>
                    </div>
                    <div className="text-center border-l pl-4">
                        <p className="text-xs text-slate-400 uppercase font-bold">Bitenler</p>
                        <p className="text-xl font-bold text-green-600">
                            {tasks.filter(t => t.status === 'done').length}
                        </p>
                    </div>
                </div>
            </header>

            {/* Sürükle Bırak Alanı */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start justify-center">
                    {COLUMNS.map((col) => (
                        <div key={col.id} className="flex flex-col w-full md:w-80">
                            <Column
                                column={col}
                                tasks={tasks.filter(t => t.status === col.id)}
                            />
                            {/* Sadece "Yapılacaklar" kolonunun altına ekleme butonu koyalım */}
                            {col.id === 'todo' && <AddTask onAdd={handleAddTask} />}
                        </div>
                    ))}
                </main>
            </DndContext>
        </div>
    );
}

export default App;
