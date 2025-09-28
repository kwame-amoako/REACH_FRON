export default function VerificationLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Balance Display Skeleton */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gray-200 animate-pulse px-4 py-2 rounded-full h-10 w-20"></div>
      </div>

      {/* Header Skeleton */}
      <header className="bg-[#1a4734] text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 animate-pulse rounded-lg h-10 w-10"></div>
            <div className="bg-white/20 animate-pulse rounded h-12 w-32"></div>
          </div>
          <div className="bg-white/20 animate-pulse rounded-full h-6 w-6"></div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="p-4 lg:p-8">
        {/* Back Button and Title Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-200 animate-pulse rounded h-8 w-32"></div>
            <div className="bg-gray-200 animate-pulse rounded h-8 w-40"></div>
          </div>
          <div className="bg-gray-200 animate-pulse rounded h-10 w-48"></div>
        </div>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="bg-gray-200 animate-pulse rounded h-10 w-64"></div>

          {/* Content Area Skeleton */}
          <div>
            <div className="bg-gray-200 animate-pulse rounded h-6 w-48 mb-2"></div>
            <div className="bg-gray-200 animate-pulse rounded h-4 w-64 mb-6"></div>

            {/* Sort Options Skeleton */}
            <div className="flex justify-end mb-4">
              <div className="flex space-x-2">
                <div className="bg-gray-200 animate-pulse rounded h-8 w-16"></div>
                <div className="bg-gray-200 animate-pulse rounded h-8 w-16"></div>
              </div>
            </div>

            {/* Empty State Skeleton */}
            <div className="text-center py-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-full mx-auto mb-6"></div>
                  <div className="bg-gray-200 animate-pulse rounded h-4 w-48 mx-auto mb-6"></div>
                  <div className="bg-gray-200 animate-pulse rounded h-10 w-40 mx-auto"></div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-full mx-auto mb-6"></div>
                  <div className="bg-gray-200 animate-pulse rounded h-4 w-48 mx-auto mb-6"></div>
                  <div className="bg-gray-200 animate-pulse rounded h-10 w-40 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
