import { type NextRequest } from "next/server";
import { confirmEmailRequest } from "@/api/auth";

export async function GET(request: NextRequest) {
  await confirmEmailRequest(request);
}
