// app/simulator/page.tsx

import Simulator from "./Simulator";

export const revalidate = 3600; 
// opcional: si quieres ISR para el texto/condiciones que puedan cambiar cada cierto tiempo

export default function SimulatorPage() {
  return (
    <main  className="container mt-4">
      <h1>Simulador de crédito</h1>
      <p>
        Ingresa el monto, plazo y tasa para calcular la cuota estimada de tu crédito.
      </p>
      <Simulator />
    </main>
  );
}
