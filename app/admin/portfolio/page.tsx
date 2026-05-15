import PortfolioAdmin from "./PortfolioAdmin";
import { portfolioItems } from "@/lib/data";

export default function AdminPortfolioPage() {
  return <PortfolioAdmin initialItems={portfolioItems} />;
}
