import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48 bg-gray-700" />
        <Skeleton className="h-10 w-24 bg-gray-700" />
      </div>

      {/* Search and Filter Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Skeleton className="flex-1 h-10 bg-gray-700" />
            <Skeleton className="h-10 w-20 bg-gray-700" />
          </div>
        </CardContent>
      </Card>

      {/* Users List Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-gray-600" />
                  <div>
                    <Skeleton className="h-5 w-32 bg-gray-600 mb-2" />
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-3 w-40 bg-gray-600" />
                      <Skeleton className="h-3 w-28 bg-gray-600" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Skeleton className="h-5 w-20 bg-gray-600 mb-1" />
                    <Skeleton className="h-3 w-12 bg-gray-600" />
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <Skeleton className="h-5 w-16 bg-gray-600" />
                    <Skeleton className="h-5 w-12 bg-gray-600" />
                  </div>
                  <Skeleton className="h-8 w-8 bg-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
