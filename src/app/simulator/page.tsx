import Simulator from "./Simulator";

export const revalidate = 3600; 

export default function SimulatorPage() {
  return (
    <main className="container py-5">
      <div className="col">
          <h1 className="h3 mb-1">Simulador</h1>
          <p className="text-muted mb-0">
            Calcula los valores aproximados de tus productos financieros antes de contratarlos.
          </p>
        </div>
      <Simulator />
    </main>
  );
}
