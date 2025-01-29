import Card from "../products/Card"

const RelatedProducts = ({products}) => {
    return (
        <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                <Card key={product.id} product={product} />
                ))}
            </div>
        </section>
  )
}

export default RelatedProducts