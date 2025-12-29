import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Column as ColumnType, Todo } from '../types';
import TaskCard from './TaskCard';

interface Props {
    column: ColumnType;
    tasks: Todo[];
}

export default function Column({ column, tasks }: Props) {
    return (
        <div className="bg-slate-200/50 w-80 flex flex-col rounded-xl p-4 min-h-[500px]">
            <h2 className="font-bold text-lg mb-4 text-slate-700 flex justify-between items-center">
                {column.title}
                <span className="bg-slate-300 text-slate-600 text-xs px-2 py-1 rounded-full">
                    {tasks.length}
                </span>
            </h2>

            {/* 3. SortableContext: İçindeki kartların sıralanabilir olduğunu tanımlar */}
            <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}
