import ClipLoader from "react-spinners/ClipLoader"


const Spinner = ({loading}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <ClipLoader
            loading={loading}
            color="indigo"
            size={450}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  )
}

export default Spinner