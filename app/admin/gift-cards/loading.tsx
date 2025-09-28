import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GiftCardsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-56 bg-gray-700" />
        <Skeleton className="h-10 w-32 bg-gray-700" />
      </div>

      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-20 bg-gray-700 mb-2" />
                  <Skeleton className="h-8 w-12 bg-gray-700" />
                </div>
                <Skeleton className="h-8 w-8 bg-gray-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <Skeleton className="h-10 w-full bg-gray-700" />
        </CardContent>
      </Card>

      {/* Gift Cards Grid Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-12 h-12 rounded-lg bg-gray-700" />
                  <div>
                    <Skeleton className="h-5 w-32 bg-gray-700 mb-1" />
                    <Skeleton className="h-4 w-20 bg-gray-700" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 bg-gray-700" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16 bg-gray-700" />
                <Skeleton className="h-4 w-20 bg-gray-700" />
              </div>
              <div>
                <Skeleton className="h-4 w-28 bg-gray-700 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-12 bg-gray-700" />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <Skeleton className="h-4 w-16 bg-gray-700 mb-1" />
                  <Skeleton className="h-5 w-12 bg-gray-700" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 bg-gray-700 mb-1" />
                  <Skeleton className="h-5 w-16 bg-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
