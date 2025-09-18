import { MethodologiesStoreProvider } from "@/shared/stores/methodologies-store-provider";
import { MethodologiesComponent } from "@/app/(public)/methodologies/_component/page";

export default function MethodologiesPage() {
  return (
    <MethodologiesStoreProvider>
      <MethodologiesComponent />
    </MethodologiesStoreProvider>
  );
}
