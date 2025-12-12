import { Suspense } from "react";
import VerifyOtp from "./VerifyOtp";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <VerifyOtp />
    </Suspense>
  );
}
