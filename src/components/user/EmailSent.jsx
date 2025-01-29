import { useRouter } from "next/navigation";

const EmailSent = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 rounded shadow-md bg-white max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-lg text-gray-700">
          We’ve sent a verification email to your inbox. Please check your email and click the link to verify your account.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default EmailSent;