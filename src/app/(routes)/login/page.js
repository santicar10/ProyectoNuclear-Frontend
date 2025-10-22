import Card from "@/components/ui/Card";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Huahuacana
          </h1>
          <p className="text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <Card>
          <LoginForm />
        </Card>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}