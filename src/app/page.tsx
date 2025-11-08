import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="container mt-4">
        
        <h1>Bienvenido a Banco</h1>
        <p>
          Tu plataforma confiable para gestionar tus productos financieros de manera fácil y segura.
        </p>
        <div className="text-center my-4">
          <Image
            src="/images/bank-illustration.png"
            alt="Ilustración de Banco"
            width={600}
            height={400}
            priority
          />
        </div>
        <p>
          Navega a través del menú lateral para acceder a tus productos, simular créditos y completar tu proceso de onboarding.
        </p>
      </main>
    </div>
  );
}
