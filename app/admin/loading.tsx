import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-4 w-4 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 bg-gray-700 mb-2" />
              <Skeleton className="h-3 w-32 bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account Overview Loading */}
        <Card className="lg:col-span-1 bg-gray-800 border-gray-700">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-gray-700 mb-2" />
            <Skeleton className="h-10 w-40 bg-gray-700 mb-1" />
            <Skeleton className="h-4 w-48 bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-20 bg-gray-700" />
                <Skeleton className="h-4 w-16 bg-gray-700" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 bg-gray-700" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Loading */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <Skeleton className="h-6 w-36 bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <Skeleton className="h-4 w-32 bg-gray-700 mb-1" />
                  <Skeleton className="h-3 w-20 bg-gray-700" />
                </div>
                <Skeleton className="h-4 w-16 bg-gray-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Bill Pay Loading */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <Skeleton className="h-6 w-28 bg-gray-700" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <Skeleton className="h-4 w-28 bg-gray-700 mb-1" />
                  <Skeleton className="h-3 w-24 bg-gray-700" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-12 bg-gray-700" />
                  <Skeleton className="h-8 w-12 bg-gray-700" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Business Metrics Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-28 bg-gray-700" />
                  <Skeleton className="h-4 w-4 bg-gray-700" />
                </div>
                <Skeleton className="h-4 w-36 bg-gray-700" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-6 w-16 bg-gray-700" />
                  <Skeleton className="h-4 w-24 bg-gray-700" />
                </div>
                <Skeleton className="h-2 w-full bg-gray-700" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 bg-gray-700" />
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
