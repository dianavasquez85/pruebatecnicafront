import Simulator from "./Simulator";

export const revalidate = 3600; 

export default function SimulatorPage() {
  return (
    <main className="container mt-4">
      <Simulator />
    </main>
  );
}
