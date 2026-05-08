import MainStatistics from "../components/MainStatistics";
import SectionCardsNav from "../components/SectionCardsNav";

export default function HomePage() {
  return (
    <div className="grid gap-4">
      <SectionCardsNav />
      <MainStatistics />
    </div>
  );
}
