import Navigation from "@/components/Navigation";

export default function Placeholder({ pageName }: { pageName: string }) {
  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {pageName} Page
        </h1>
        <p className="text-lg text-grey-400">
          This page is a placeholder. Continue prompting to fill in this content
          if you'd like.
        </p>
      </div>
    </div>
  );
}
