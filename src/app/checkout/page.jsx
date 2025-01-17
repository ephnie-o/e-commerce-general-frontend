import CheckoutPage from "@/components/checkout/CheckoutPage"
import ProtectedRoute from "@/components/ui/ProtectedRoute"

const page = () => {
  return (
      <ProtectedRoute>
          <CheckoutPage />
      </ProtectedRoute>
  )
}

export default page