import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-56 bg-gray-700" />
        <Skeleton className="h-10 w-20 bg-gray-700" />
      </div>

      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-24 bg-gray-700 mb-2" />
                  <Skeleton className="h-8 w-16 bg-gray-700" />
                </div>
                <Skeleton className="h-8 w-8 bg-gray-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="flex-1 min-w-[200px] h-10 bg-gray-700" />
            <Skeleton className="w-[150px] h-10 bg-gray-700" />
            <Skeleton className="w-[150px] h-10 bg-gray-700" />
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table Loading */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-gray-700" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="w-10 h-10 rounded-full bg-gray-600" />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Skeleton className="h-5 w-24 bg-gray-600" />
                      <Skeleton className="h-5 w-16 bg-gray-600" />
                    </div>
                    <Skeleton className="h-4 w-40 bg-gray-600 mb-1" />
                    <Skeleton className="h-3 w-48 bg-gray-600" />
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <Skeleton className="h-5 w-16 bg-gray-600 mb-1" />
                    <Skeleton className="h-3 w-12 bg-gray-600" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-24 bg-gray-600" />
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
