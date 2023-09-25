import * as Collapsible from '@radix-ui/react-collapsible';

import { ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from '../store';
import { Lesson } from './Lesson';
import { play } from '../store/slices/player';
import { useState } from 'react';

interface ModuleProps {
    moduleIndex: number;
    title: string;
    amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
    const dispatch = useAppDispatch()

    const lessons = useAppSelector(state => state.player.course?.modules[moduleIndex].lessons);

    const { currentModuleIndex, currentLessonIndex } = useAppSelector(state => {
        const { currentModuleIndex, currentLessonIndex } = state.player

        return { currentModuleIndex, currentLessonIndex }
    })

    const [isModuleOpen, setIsModuleOpen] = useState<boolean>(false);

    const toggleModule = () => {
        setIsModuleOpen(!isModuleOpen);
    }


    return (
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0} open={isModuleOpen}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4" onClick={toggleModule}>
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                    {moduleIndex + 1}
                </div>

                <div className="flex flex-col gap-1 text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
                </div>

                <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform duration-400" />
            </Collapsible.Trigger>

            <Collapsible.Content>
                <nav className="relative flex flex-col gap-4 p-6">
                    {lessons && lessons.map((lesson, lessonIndex) => {
                        const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex

                        return (
                            <Lesson
                                key={lesson.id}
                                title={lesson.title}
                                duration={lesson.duration}
                                isCurrent={isCurrent}
                                onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
                            />
                        )
                    })}
                </nav>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}

export function ModuleSkeleton() {
    return (
        <div className="animate-pulse flex w-full items-center gap-3 bg-zinc-800 p-4">
            <div className="rounded-full bg-slate-600 h-10 items-center justify-center flex w-10"></div>
            <div className="flex flex-col gap-2 text-left">
                <div className="h-3 w-28 bg-slate-600 rounded"></div>
                <div className="h-2 w-12 bg-slate-600 rounded"></div>
            </div>
        </div>
    )
}