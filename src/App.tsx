import {
    closestCorners,
    DndContext,
    type DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from 'react';

import AddTask from './components/AddTask';
import Column from './components/Column';
import type { Column as ColumnType, Todo } from './types';

// 1. AI YAPILANDIRMASI
// NOT: Gerçek projelerde bu KEY .env dosyasında tutulur.
const genAI = new GoogleGenerativeAI("AIzaSyBHDGIimse_G06kGETQA_RsWQgR2dmeWB4");
const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const COLUMNS: ColumnType[] = [
    { id: 'todo', title: 'Yapılacaklar' },
    { id: 'doing', title: 'Devam Edenler' },
    { id: 'done', title: 'Bitenler' },
];

const INITIAL_TASKS: Todo[] = [
    { id: '1', content: 'Proje iskeletini kur', status: 'done' },
    { id: '2', content: 'TypeScript interface tanımla', status: 'doing' },
    { id: '3', content: 'AI servisini bağla', status: 'todo' },
];

function App() {
    // 2. STATE & LOCAL STORAGE MANTIĞI
    // Başlangıçta tarayıcı hafızasına bak, yoksa varsayılan verileri getir.
    const [tasks, setTasks] = useState<Todo[]>(() => {
        const saved = localStorage.getItem('ai-trello-tasks');
        return saved ? JSON.parse(saved) : INITIAL_TASKS;
    });

    // Görevler her değiştiğinde tarayıcı hafızasını güncelle.
    useEffect(() => {
        localStorage.setItem('ai-trello-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    // 3. GERÇEK AI MOTİVASYON FONKSİYONU
    const getAiMotivation = async (taskContent: string) => {
        try {
            const prompt = `${taskContent} görevini az önce tamamladım. Bana 10 kelimeyi geçmeyen, çok enerjik ve profesyonel bir tebrik mesajı yazar mısın?`;
            const result = await aiModel.generateContent(prompt);
            const response = await result.response;
            // İstersen bunu bir alert yerine ekranda bir toast/popup olarak da gösterebilirsin.
            alert("🤖 AI Tebrik Kartı: " + response.text());
        } catch (error) {
            console.error("AI bağlantı hatası:", error);
        }
    };

    const handleAddTask = (content: string) => {
        const newTask: Todo = {
            id: Math.random().toString(36).substr(2, 9),
            content,
            status: 'todo',
        };
        setTasks([...tasks, newTask]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id as string;
        const overId = over.id as string;

        setTasks((items) => {
            const oldIndex = items.findIndex((i) => i.id === activeId);
            const activeTask = items[oldIndex];
            const isOverAColumn = COLUMNS.some((col) => col.id === overId);

            // Görev "Bitenler" kolonuna geçtiğinde AI'yı tetikle
            if (overId === 'done' && activeTask.status !== 'done') {
                getAiMotivation(activeTask.content);
            }

            if (isOverAColumn) {
                const newTasks = [...items];
                newTasks[oldIndex] = { ...activeTask, status: overId as any };
                return newTasks;
            }

            const newIndex = items.findIndex((i) => i.id === overId);
            const overTask = items[newIndex];

            if (activeTask.status !== overTask.status) {
                const newTasks = [...items];
                newTasks[oldIndex] = { ...activeTask, status: overTask.status };
                return arrayMove(newTasks, oldIndex, newIndex);
            }

            return arrayMove(items, oldIndex, newIndex);
        });
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6 md:p-12">
            <header className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        AI TRELLO <span className="text-blue-600">PRO</span>
                    </h1>
                    <p className="text-slate-500 text-sm italic">Verileriniz otomatik kaydedilir.</p>
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="text-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Kapasite</p>
                        <p className="text-xl font-bold text-slate-700">{tasks.length} Görev</p>
                    </div>
                    <div className="text-center bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                        <p className="text-xs text-green-400 uppercase font-bold tracking-widest">Başarı</p>
                        <p className="text-xl font-bold text-green-600">
                            {tasks.filter(t => t.status === 'done').length} Bitti
                        </p>
                    </div>
                </div>
            </header>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-center">
                    {COLUMNS.map((col) => (
                        <div key={col.id} className="flex flex-col w-full md:w-80 group">
                            <Column
                                column={col}
                                tasks={tasks.filter(t => t.status === col.id)}
                            />
                            {col.id === 'todo' && (
                                <div className="mt-4 transition-transform group-hover:scale-[1.02]">
                                    <AddTask onAdd={handleAddTask} />
                                </div>
                            )}
                        </div>
                    ))}
                </main>
            </DndContext>
        </div>
    );
}

export default App;
