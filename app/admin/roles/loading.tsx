import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function RolesLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-56 bg-gray-700" />
        <Skeleton className="h-10 w-28 bg-gray-700" />
      </div>

      {/* Roles Overview Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-lg bg-gray-700" />
                  <div>
                    <Skeleton className="h-5 w-24 bg-gray-700 mb-1" />
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full bg-gray-700" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24 bg-gray-700" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 bg-gray-700" />
                  <Skeleton className="h-8 w-8 bg-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Assignments Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-36 bg-gray-700" />
            <Skeleton className="h-10 w-64 bg-gray-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-600" />
                  <div>
                    <Skeleton className="h-5 w-28 bg-gray-600 mb-1" />
                    <Skeleton className="h-4 w-40 bg-gray-600" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-6 w-20 bg-gray-600" />
                  <Skeleton className="h-10 w-40 bg-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permissions Matrix Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex border-b border-gray-700 pb-3">
                <Skeleton className="h-5 w-32 bg-gray-700" />
                <div className="flex space-x-8 ml-auto">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-20 bg-gray-700" />
                  ))}
                </div>
              </div>
              {/* Rows */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center border-b border-gray-700 pb-3">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 bg-gray-700 mb-1" />
                    <Skeleton className="h-4 w-64 bg-gray-700" />
                  </div>
                  <div className="flex space-x-8 ml-auto">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-6 w-6 rounded-full bg-gray-700" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
