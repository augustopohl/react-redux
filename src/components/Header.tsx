import { useAppSelector } from "../store";
import { useCurrentLesson } from "../store/slices/player";

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()
  const isCourseLoading = useAppSelector(state => state.player.isLoading)


  return (
    <>
      {isCourseLoading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-6 w-44 bg-slate-600 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 w-32 bg-slate-600 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{currentModule?.title}</h1>
          <span className="text-sm text-zinc-400">Módulo "{currentLesson?.title}"</span>
        </div>
      )}
    </>
  );
}