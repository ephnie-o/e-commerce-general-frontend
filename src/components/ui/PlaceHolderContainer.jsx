import PlaceHolder from "./PlaceHolder";

const PlaceHolderContainer = () => {
  const placeNumbers = [...Array(7).keys()].slice(0);

  return (
    <div className="bg-white">
      <div className="animate-pulse mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-black mb-10 text-2xl text-center">Our Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {placeNumbers.map((num) => (
              <PlaceHolder key={num} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlaceHolderContainer