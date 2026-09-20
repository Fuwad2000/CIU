import { formatFormDetails, sendFormSubmissionEmails } from "@/lib/email/form-mail";
import { getPortalBackend } from "@/lib/portal/backend";
import { jsonError, jsonOk, readString } from "@/lib/portal/http";
import { kidsAgeRanges, type RegistrationProgram } from "@/lib/portal/types";

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
    if (!(kidsAgeRanges as readonly string[]).includes(studentAge)) {
      return jsonError("Choose a student age range.");
    }
  }

  const notes = readString(body.notes);
  const record = await getPortalBackend().createRegistration({
    program,
    studentName,
    studentAge,
    grade: program === "kids" ? grade : undefined,
    parentName: program === "kids" ? parentName : undefined,
    email,
    phone,
    notes,
  });

  await sendFormSubmissionEmails({
    form: program === "kids" ? "kids-program" : "quran-class",
    submitterName: program === "kids" ? parentName : studentName,
    submitterEmail: email,
    internalDetails: formatFormDetails({
      Program: program === "kids" ? "kids" : "quran",
      Student: studentName,
      Age: studentAge,
      Grade: program === "kids" ? grade : undefined,
      Parent: program === "kids" ? parentName : undefined,
      Email: email,
      Phone: phone,
      Notes: notes,
    }),
  });

  return jsonOk(record, 201);
}
