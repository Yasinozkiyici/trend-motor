'use client';

import { useState, useTransition } from 'react';
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';
import { GripVertical } from 'lucide-react';
import { reorderSlides } from '@/actions/slider';

export type SlideSummary = {
  id: string;
  title: string;
  isPublished: boolean;
  sortOrder: number;
};

type SlidesOrderListProps = {
  sliderId: string;
  initialSlides: SlideSummary[];
};

function SortableItem({ slide }: { slide: SlideSummary }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: slide.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-grab rounded-full border border-gray-200 bg-gray-50 p-2 text-gray-500 transition hover:bg-gray-100"
          {...attributes}
          {...listeners}
          aria-label="Taşı"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div>
          <p className="text-sm font-medium text-gray-900">{slide.title}</p>
          <p className="text-xs text-gray-500">
            {slide.isPublished ? 'Yayında' : 'Taslak'}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SlidesOrderList({
  sliderId,
  initialSlides,
}: SlidesOrderListProps) {
  const [slides, setSlides] = useState(() =>
    [...initialSlides].sort((a, b) => a.sortOrder - b.sortOrder)
  );
  const [isPending, startTransition] = useTransition();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    setSlides((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      const reordered = [...prev];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);

      startTransition(async () => {
        const result = await reorderSlides(
          sliderId,
          reordered.map((item) => item.id)
        );
        if (result?.success) {
          toast.success('Sıra güncellendi');
        } else {
          toast.error(result?.error ?? 'Sıra güncellenemedi');
        }
      });

      return reordered.map((item, index) => ({ ...item, sortOrder: index }));
    });
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={slides.map((slide) => slide.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {slides.map((slide) => (
              <SortableItem key={slide.id} slide={slide} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <p className="text-sm text-gray-500">
        {isPending
          ? 'Sıralama kaydediliyor…'
          : 'Kartları sürükleyerek sıralayın.'}
      </p>
    </div>
  );
}
