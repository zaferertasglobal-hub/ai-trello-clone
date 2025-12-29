// src/types.ts

// 1. Her bir görev (kart) için veri yapısı
export interface Todo {
  id: string;
  content: string;
  status: 'todo' | 'doing' | 'done'; // Sadece bu üç değerden biri olabilir
}

// 2. Kolonlar için veri yapısı
export interface Column {
  id: string;
  title: string;
}
