import JournalForm from "@/components/form";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Mental Health Journal</h1>
      <JournalForm />
    </main>
  );
}
