/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from "clsx";


export default function SkeletonCard({ isLoading }: { isLoading: boolean }) {
    return (
        <div className="{clsx('animate-pulse', !isLoading && 'hidden')}">
            <div className="relative max-h-72 flex-1 bg-zinc-700"></div>
            <div className="flex justify-between font-bold my-3 bg-zinc-700"></div>
            <div className="h-3 w-8/12 rounded-md bg-zinc-700"></div>
        </div>
    )
}