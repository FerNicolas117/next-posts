import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPost() {
  return (
    <div className="px-5 sm:px-7 md:px-10 mt-9 mb-9">
      <div className="flex flex-col justify-center items-center space-y-3">
      <Skeleton className="h-[225px] w-1/2 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    </div>
  )
}
