const PlaceHolder = () => {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="aspect-[3/4] w-full bg-gray-200 object-cover group-hover:opacity-75 sm:aspect-auto sm:h-96">
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">
            <div>
              <span className="absolute inset-0" />
            </div>
          </h3>
          <p className="text-sm text-gray-500"></p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="h-2 bg-slate-700 rounded col-span-2 mb-2"></p>
            <p className="h-2 bg-slate-700 rounded col-span-1"></p>
          </div>
        </div>
      </div>
    )
  }

  export default PlaceHolder