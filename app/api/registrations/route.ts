import { getPortalBackend } from "@/lib/portal/backend";
import { jsonError, jsonOk, readString } from "@/lib/portal/http";
import type { RegistrationProgram } from "@/lib/portal/types";

export const dynamic = "force-dynamic";

const programs = new Set<RegistrationProgram>(["quran", "kids"]);
const kidsGrades = new Set(
  Array.from({ length: 12 }, (_, index) => String(index + 1))
);

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const program = readString(body.program) as RegistrationProgram;
  const studentName = readString(body.studentName);
  const studentAge = readString(body.studentAge);
  const grade = readString(body.grade);
  const parentName = readString(body.parentName);
  const email = readString(body.email);
  const phone = readString(body.phone);

  if (!programs.has(program)) {
    return jsonError("Choose Quran class or kids class.");
  }
  if (!studentName || !email || !phone) {
    return jsonError("Name, email, and phone are required.");
  }

  if (program === "kids") {
    if (!studentAge || !parentName || !grade) {
      return jsonError("Kids registration needs student age, grade, and parent/guardian name.");
    }
    if (!kidsGrades.has(grade)) {
      return jsonError("Choose a grade from 1 to 12.");
    }
  }

  const record = await getPortalBackend().createRegistration({
    program,
    studentName,
    studentAge,
    grade: program === "kids" ? grade : undefined,
    parentName: program === "kids" ? parentName : undefined,
    email,
    phone,
    notes: readString(body.notes),
  });

  return jsonOk(record, 201);
}
