#!/usr/bin/env python3
"""Generate the CIU Azure setup requirements PDF."""

from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "docs" / "CIU-Azure-Setup-Requirements.pdf"

BRAND = (23, 77, 50)
BRAND_DARK = (10, 50, 32)
GOLD = (184, 137, 31)
SLATE = (51, 65, 85)
MUTED = (100, 116, 139)
LINE = (226, 232, 240)
CODE_BG = (248, 250, 252)


class Pdf(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*BRAND)
        self.rect(0, 0, self.w, 12, "F")
        self.set_xy(16, 3.5)
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(255, 255, 255)
        self.cell(0, 5, "Canadian Islamic Union  |  Azure Setup Requirements", align="L")
        self.set_xy(16, 3.5)
        self.set_font("Helvetica", "", 8)
        self.cell(0, 5, f"Page {self.page_no()}", align="R")
        self.ln(12)

    def footer(self):
        self.set_y(-14)
        self.set_draw_color(*LINE)
        self.line(16, self.get_y(), self.w - 16, self.get_y())
        self.set_y(-11)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 6, "Confidential  |  For CIU staff and Azure implementation  |  August 2026", align="C")

    def h1(self, text):
        self.set_font("Helvetica", "B", 16)
        self.set_text_color(*BRAND_DARK)
        self.cell(0, 10, text, new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*GOLD)
        self.set_line_width(0.6)
        self.line(self.l_margin, self.get_y(), self.l_margin + 42, self.get_y())
        self.ln(5)

    def h2(self, text):
        self.ln(2)
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(*BRAND)
        self.cell(0, 8, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def h3(self, text):
        self.ln(1)
        self.set_font("Helvetica", "B", 10.5)
        self.set_text_color(*BRAND_DARK)
        self.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")

    def body(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*SLATE)
        self.multi_cell(0, 5.2, text)
        self.ln(1.5)

    def bullet(self, text):
        x = self.get_x()
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*GOLD)
        self.cell(5, 5.2, "-")
        self.set_text_color(*SLATE)
        self.multi_cell(0, 5.2, text)
        self.set_x(x)

    def note(self, text):
        self.set_fill_color(245, 247, 250)
        self.set_draw_color(*LINE)
        y = self.get_y()
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*SLATE)
        self.multi_cell(0, 5, text, border=1, fill=True)
        self.ln(3)

    def code(self, text):
        self.set_fill_color(*CODE_BG)
        self.set_draw_color(*LINE)
        self.set_font("Courier", "", 8)
        self.set_text_color(30, 41, 59)
        self.multi_cell(0, 4.4, text, border=1, fill=True)
        self.ln(3)

    def table(self, headers, rows, col_widths=None):
        usable = self.w - self.l_margin - self.r_margin
        if not col_widths:
            col_widths = [usable / len(headers)] * len(headers)
        self.set_font("Helvetica", "B", 8.5)
        self.set_fill_color(*BRAND)
        self.set_text_color(255, 255, 255)
        for i, h in enumerate(headers):
            self.cell(col_widths[i], 7, f" {h}", border=0, fill=True)
        self.ln()
        self.set_font("Helvetica", "", 8.5)
        fill = False
        for row in rows:
            self.set_fill_color(248, 250, 252) if fill else self.set_fill_color(255, 255, 255)
            self.set_text_color(*SLATE)
            heights = []
            for i, cell in enumerate(row):
                heights.append(self.font_size * (1 + str(cell).count("\n")) + 4)
            h = max(7, max(heights))
            if self.get_y() + h > self.h - 22:
                self.add_page()
                self.set_font("Helvetica", "B", 8.5)
                self.set_fill_color(*BRAND)
                self.set_text_color(255, 255, 255)
                for i, head in enumerate(headers):
                    self.cell(col_widths[i], 7, f" {head}", border=0, fill=True)
                self.ln()
                self.set_font("Helvetica", "", 8.5)
            x, y = self.get_x(), self.get_y()
            for i, cell in enumerate(row):
                self.set_xy(x + sum(col_widths[:i]), y)
                self.set_fill_color(248, 250, 252) if fill else self.set_fill_color(255, 255, 255)
                self.multi_cell(col_widths[i], 5, f" {cell}", border=0, fill=True)
            self.set_xy(x, y + h)
            fill = not fill
        self.ln(4)


def cover(pdf: Pdf):
    pdf.add_page()
    pdf.set_fill_color(*BRAND_DARK)
    pdf.rect(0, 0, pdf.w, pdf.h, "F")
    pdf.set_fill_color(*BRAND)
    pdf.rect(0, 0, 10, pdf.h, "F")
    pdf.set_fill_color(*GOLD)
    pdf.rect(10, 0, 3, pdf.h, "F")

    pdf.set_xy(28, 70)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*GOLD)
    pdf.cell(0, 8, "STAFF PORTAL  |  IMPLEMENTATION GUIDE")

    pdf.set_xy(28, 84)
    pdf.set_font("Helvetica", "B", 28)
    pdf.set_text_color(255, 255, 255)
    pdf.multi_cell(0, 12, "Azure Setup\nRequirements")

    pdf.set_xy(28, 122)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(1)
    pdf.line(28, 122, 90, 122)

    pdf.set_xy(28, 132)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(226, 232, 240)
    pdf.multi_cell(
        150,
        6.5,
        "Database tables, API request and response bodies,\nemail services, and the order to build them in\nfor the Canadian Islamic Union website.",
    )

    pdf.set_xy(28, 230)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(0, 6, "Canadian Islamic Union")
    pdf.set_xy(28, 238)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(203, 213, 225)
    pdf.cell(0, 6, "ciucanada.ca  |  August 2026")


def main():
    pdf = Pdf(format="Letter", unit="mm")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(16, 18, 16)
    cover(pdf)

    pdf.add_page()
    pdf.h1("1. Recommended Azure stack")
    pdf.body(
        "Use Azure SQL Database plus a small REST API. The CIU website already expects that shape: "
        "when AZURE_API_BASE_URL is set, Next.js calls Azure and uses the JSON as-is. "
        "Do not wrap responses like { data: [...] }. Arrays for lists, objects for creates, "
        "and { error: \"message\" } only on failure."
    )
    pdf.table(
        ["Piece", "Use"],
        [
            ["Database", "Azure SQL Database (one database, e.g. ciu)"],
            ["API", "Azure Functions or App Service at AZURE_API_BASE_URL"],
            ["API auth", "AZURE_API_KEY as Authorization: Bearer and/or x-api-key"],
            ["Transactional email", "Azure Communication Services Email (or SendGrid)"],
            ["Mailing list later", "Same ACS/SendGrid, or Mailchimp / Constant Contact"],
        ],
        [45, 127],
    )
    pdf.note(
        "IDs are UUID strings. Dates are ISO-8601 UTC, e.g. 2026-08-17T19:40:00.000Z. "
        "DELETE endpoints return HTTP 204 with an empty body."
    )

    pdf.h1("2. How the website talks to Azure")
    pdf.body(
        "Set these environment variables on the website. lib/portal/azure-store.ts already maps "
        "to the paths below. Until AZURE_API_BASE_URL is set, the site uses an in-memory store that resets on deploy."
    )
    pdf.table(
        ["Variable", "Purpose"],
        [
            ["AZURE_API_BASE_URL", "API origin with no trailing slash"],
            ["AZURE_API_KEY", "Shared secret sent as Bearer token and x-api-key"],
            ["ADMIN_PASSWORD", "Temporary shared password on Next.js until /auth/login uses users"],
        ],
        [50, 122],
    )
    pdf.h3("Paths already called by the website")
    pdf.table(
        ["Method", "Path", "Used by"],
        [
            ["GET", "/announcements", "Public ticker + admin"],
            ["POST", "/announcements", "Admin create"],
            ["PATCH / DELETE", "/announcements/{id}", "Admin update / delete"],
            ["GET / POST", "/events", "Public Events + admin"],
            ["PATCH / DELETE", "/events/{id}", "Admin update / delete"],
            ["GET / POST", "/contacts", "Contact form + admin inbox"],
            ["GET / POST", "/registrations", "/register + admin"],
            ["GET / POST", "/history", "Admin activity log"],
            ["POST", "/auth/login", "Staff sign-in (add this)"],
            ["GET / POST", "/users", "Staff accounts (add this)"],
            ["PATCH", "/users/{id}", "Update staff (add this)"],
        ],
        [38, 58, 76],
    )

    pdf.h1("3. Required tables")
    pdf.body(
        "Announcements, events, contacts, registrations, and history are already used by the website. "
        "Add users as well so every change is tied to who signed in. Today the portal only stores a "
        "typed email cookie, so history can say unknown. users is the real staff account table."
    )

    pdf.h2("3.1  users  (staff who authenticate)")
    pdf.body(
        "This is not the public membership list. users are people who log into /admin. "
        "Store a password hash only, never the raw password. Never return passwordHash in any response. "
        "role is admin or staff. Inactive users must not be able to sign in."
    )
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK, generated by Azure"],
            ["email", "nvarchar(256)", "Required, unique, lowercase"],
            ["displayName", "nvarchar(200)", "Required. Shown in the portal"],
            ["role", "nvarchar(20)", "admin | staff"],
            ["passwordHash", "nvarchar(256)", "Hash only. Never send this back"],
            ["isActive", "bit", "Default 1. 0 = cannot sign in"],
            ["lastLoginAt", "datetime2", "Null until first successful login"],
            ["createdAt", "datetime2", "ISO string in JSON"],
            ["updatedAt", "datetime2", "ISO string in JSON"],
        ],
        [38, 42, 92],
    )
    pdf.h3("POST /auth/login  -  body")
    pdf.code(
        "{\n"
        '  "email": "staff@ciucanada.ca",\n'
        '  "password": "the-staff-password"\n'
        "}"
    )
    pdf.h3("Login response 200  -  never include passwordHash")
    pdf.code(
        "{\n"
        '  "id": "11111111-1111-1111-1111-111111111111",\n'
        '  "email": "staff@ciucanada.ca",\n'
        '  "displayName": "Amina Khan",\n'
        '  "role": "admin",\n'
        '  "isActive": true,\n'
        '  "lastLoginAt": "2026-08-17T19:40:00.000Z",\n'
        '  "createdAt": "2026-08-01T12:00:00.000Z",\n'
        '  "updatedAt": "2026-08-17T19:40:00.000Z"\n'
        "}"
    )
    pdf.h3("POST /users  -  create staff  -  body")
    pdf.code(
        "{\n"
        '  "email": "staff@ciucanada.ca",\n'
        '  "displayName": "Amina Khan",\n'
        '  "role": "admin",\n'
        '  "password": "temporary-password",\n'
        '  "isActive": true\n'
        "}"
    )
    pdf.body(
        "Azure hashes password into passwordHash and returns the same public user object as login. "
        "GET /users returns that array. PATCH /users/{id} can change displayName, role, isActive, or password. "
        "Do not hard-delete; set isActive to false. Failed login: HTTP 401 with { error: \"Incorrect email or password.\" }."
    )
    pdf.note(
        "members = public mailing list. users = staff portal accounts. Do not mix them. "
        "After login, history rows must store userId plus email so you can see who created or edited a record."
    )

    pdf.h2("3.2  announcements")
    pdf.body("Public site ticker. Admin can create, edit, hide, and delete. Public GET returns active items only.")
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK, generated by Azure"],
            ["message", "nvarchar(500)", "Required"],
            ["href", "nvarchar(500)", "Optional. /Events or a full URL"],
            ["active", "bit", "Default 1"],
            ["createdAt", "datetime2", "ISO string in JSON"],
            ["updatedAt", "datetime2", "ISO string in JSON"],
        ],
        [38, 48, 86],
    )
    pdf.h3("POST /announcements  -  body")
    pdf.code(
        '{\n'
        '  "message": "Eid prayer this Friday",\n'
        '  "href": "/Events",\n'
        '  "active": true\n'
        "}"
    )
    pdf.body("Response 201: full row including id, createdAt, updatedAt. PATCH accepts any subset of message, href, active.")

    pdf.h2("3.3  events")
    pdf.body("Public /Events list. Admin CRUD. Category must be one of: education, youth, family, community, spiritual, volunteer.")
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK"],
            ["title", "nvarchar(200)", "Required"],
            ["category", "nvarchar(32)", "See allowed values above"],
            ["dateLabel", "nvarchar(120)", "Display text, e.g. Every Tuesday"],
            ["date", "date", "Optional sort date YYYY-MM-DD"],
            ["time", "nvarchar(80)", "Required"],
            ["location", "nvarchar(200)", "Required"],
            ["description", "nvarchar(max)", "Required"],
            ["tags", "nvarchar(max)", "JSON array of strings"],
            ["href", "nvarchar(500)", "Required button link"],
            ["buttonLabel", "nvarchar(80)", 'Default "View Details"'],
            ["image", "nvarchar(1000)", "Optional image URL"],
            ["recurring", "bit", "Default 0"],
            ["featured", "bit", "Default 0"],
            ["createdAt / updatedAt", "datetime2", "ISO strings in JSON"],
        ],
        [46, 42, 84],
    )
    pdf.h3("POST /events  -  body")
    pdf.code(
        "{\n"
        '  "title": "Weekly Quran Class",\n'
        '  "category": "education",\n'
        '  "dateLabel": "Every Tuesday & Thursday",\n'
        '  "date": "2026-09-01",\n'
        '  "time": "7:00 PM",\n'
        '  "location": "Canadian Islamic Centre",\n'
        '  "description": "Open to adults and all learners.",\n'
        '  "tags": ["quran", "education"],\n'
        '  "href": "/Education/ciu",\n'
        '  "buttonLabel": "View Details",\n'
        '  "image": "https://...",\n'
        '  "recurring": true,\n'
        '  "featured": false\n'
        "}"
    )
    pdf.body("Response: full event object. GET /events returns an array, newest date first.")

    pdf.h2("3.4  contacts")
    pdf.body("Public contact form into the admin inbox. No update or delete in the app today.")
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK"],
            ["firstName", "nvarchar(100)", "Required"],
            ["surname", "nvarchar(100)", "Required"],
            ["name", "nvarchar(200)", 'Azure should set "First Last"'],
            ["email", "nvarchar(256)", "Required"],
            ["phone", "nvarchar(40)", "Required"],
            ["subject", "nvarchar(200)", "Required"],
            ["message", "nvarchar(max)", "Required"],
            ["createdAt", "datetime2", "ISO string in JSON"],
        ],
        [38, 42, 92],
    )
    pdf.h3("POST /contacts  -  body (what the site sends)")
    pdf.code(
        "{\n"
        '  "firstName": "Amina",\n'
        '  "surname": "Khan",\n'
        '  "email": "amina@example.com",\n'
        '  "phone": "905-555-0123",\n'
        '  "subject": "Weekend school",\n'
        '  "message": "Do you still have space in Grade 4?"\n'
        "}"
    )
    pdf.body("Response 201: include generated id, name, and createdAt. GET /contacts: array, newest first.")

    pdf.h2("3.5  registrations")
    pdf.body(
        "One table for Quran class and kids weekend school. program is quran or kids. "
        "Kids rows require studentAge, grade (1-12), and parentName. Quran rows leave those empty."
    )
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK"],
            ["program", "nvarchar(16)", "quran or kids"],
            ["studentName", "nvarchar(200)", "Required (learner or child)"],
            ["studentAge", "nvarchar(20)", "Required for kids; empty for quran"],
            ["grade", "nvarchar(8)", 'Kids only: "1" through "12"'],
            ["parentName", "nvarchar(200)", "Kids only"],
            ["email", "nvarchar(256)", "Required"],
            ["phone", "nvarchar(40)", "Required"],
            ["notes", "nvarchar(max)", "Optional"],
            ["createdAt", "datetime2", "ISO string in JSON"],
        ],
        [38, 42, 92],
    )
    pdf.h3("Quran  -  POST /registrations")
    pdf.code(
        "{\n"
        '  "program": "quran",\n'
        '  "studentName": "Yusuf Ali",\n'
        '  "email": "yusuf@example.com",\n'
        '  "phone": "416-555-0199",\n'
        '  "notes": "Beginner"\n'
        "}"
    )
    pdf.h3("Kids  -  POST /registrations")
    pdf.code(
        "{\n"
        '  "program": "kids",\n'
        '  "studentName": "Fatima Ali",\n'
        '  "studentAge": "9",\n'
        '  "grade": "4",\n'
        '  "parentName": "Sara Ali",\n'
        '  "email": "sara@example.com",\n'
        '  "phone": "416-555-0199",\n'
        '  "notes": ""\n'
        "}"
    )
    pdf.body("Response 201: full row. GET /registrations returns all programs; the admin UI filters by tab.")

    pdf.h2("3.6  history")
    pdf.body(
        "Staff audit log. Every create, update, delete, sign-in, and sign-out writes a row. "
        "Tie it to users: store userId from the signed-in account, and keep adminEmail as a readable copy "
        "of users.email. If Azure only receives userId, look up the email from users."
    )
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK"],
            ["userId", "uniqueidentifier", "FK to users.id. Null only for old unknown rows"],
            ["adminEmail", "nvarchar(256)", "Copy of users.email at the time of the action"],
            ["action", "nvarchar(32)", "authenticated | signed-out | created | updated | deleted"],
            ["area", "nvarchar(32)", "session | users | announcements | events | contacts | registrations"],
            ["summary", "nvarchar(500)", "Human-readable sentence"],
            ["entityId", "uniqueidentifier", "Optional related row"],
            ["createdAt", "datetime2", "ISO string in JSON"],
        ],
        [38, 42, 92],
    )
    pdf.h3("POST /history  -  body")
    pdf.code(
        "{\n"
        '  "userId": "11111111-1111-1111-1111-111111111111",\n'
        '  "adminEmail": "staff@ciucanada.ca",\n'
        '  "action": "created",\n'
        '  "area": "events",\n'
        '  "summary": "Added event: Weekly Quran Class",\n'
        '  "entityId": "22222222-2222-2222-2222-222222222222"\n'
        "}"
    )

    pdf.h1("4. Tables not wired yet")
    pdf.body(
        "These public forms exist on the site but currently show a coming-soon toast. "
        "Create the tables now so the website can POST later."
    )

    pdf.h2("4.1  members  (mailing list)")
    pdf.body(
        "From /Membership. This is the community email list. "
        "emailTopics values: events, education, family-programs, community-news, charitable-projects. "
        "membershipType is individual or family."
    )
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK"],
            ["fullName", "nvarchar(200)", "Required"],
            ["email", "nvarchar(256)", "Required, unique"],
            ["phone", "nvarchar(40)", "Optional"],
            ["city", "nvarchar(100)", "Optional"],
            ["membershipType", "nvarchar(20)", "individual | family"],
            ["emailTopics", "nvarchar(max)", "JSON array of topic keys"],
            ["notes", "nvarchar(max)", "Optional message field"],
            ["agreedToEmails", "bit", "Must be 1"],
            ["unsubscribedAt", "datetime2", "Null until they opt out"],
            ["source", "nvarchar(40)", "membership | events-newsletter"],
            ["createdAt", "datetime2", "ISO string in JSON"],
        ],
        [42, 42, 88],
    )
    pdf.h3("POST body to plan for")
    pdf.code(
        "{\n"
        '  "fullName": "Amina Khan",\n'
        '  "email": "amina@example.com",\n'
        '  "phone": "905-555-0123",\n'
        '  "city": "Mississauga",\n'
        '  "membershipType": "family",\n'
        '  "emailTopics": ["events", "education"],\n'
        '  "message": "",\n'
        '  "agreement": true\n'
        "}"
    )

    pdf.h2("4.2  volunteers")
    pdf.body("From /Services/volunteer. This is staff follow-up, not a newsletter.")
    pdf.body(
        "ageGroup: high-school | adult | senior.  "
        "availability: weekdays | weekends | evenings | flexible.  "
        "roles: event-coordination, community-engagement, education-programs, masjid-facility, "
        "outreach, admin-support, student-mentor."
    )
    pdf.table(
        ["Column", "Type", "Notes"],
        [
            ["id", "uniqueidentifier", "PK"],
            ["fullName", "nvarchar(200)", "Required"],
            ["email", "nvarchar(256)", "Required"],
            ["phone", "nvarchar(40)", "Required"],
            ["ageGroup", "nvarchar(20)", "high-school | adult | senior"],
            ["roles", "nvarchar(max)", "JSON array of role keys"],
            ["availability", "nvarchar(20)", "weekdays | weekends | evenings | flexible"],
            ["volunteerHours", "nvarchar(8)", "yes | no | empty"],
            ["message", "nvarchar(max)", "Optional"],
            ["agreement", "bit", "Required"],
            ["createdAt", "datetime2", "ISO string in JSON"],
        ],
        [42, 42, 88],
    )
    pdf.h3("POST body to plan for")
    pdf.code(
        "{\n"
        '  "fullName": "Omar Hassan",\n'
        '  "email": "omar@example.com",\n'
        '  "phone": "905-555-0144",\n'
        '  "ageGroup": "adult",\n'
        '  "roles": ["event-coordination", "masjid-facility"],\n'
        '  "availability": "weekends",\n'
        '  "volunteerHours": "no",\n'
        '  "message": "Happy to help with setup.",\n'
        '  "agreement": true\n'
        "}"
    )

    pdf.h2("4.3  Event newsletter")
    pdf.body(
        "The Events page form collects fullName, email, and consent. "
        "Do not create a second mailing list. Store these in members with source = events-newsletter."
    )
    pdf.code('{ "fullName": "Amina Khan", "email": "amina@example.com" }')

    pdf.h1("5. What does not need a table")
    pdf.table(
        ["Feature", "Why"],
        [
            ["Donate / e-transfer / PayPal", "Copy-paste Canadianislamicunion@gmail.com only"],
            ["Funeral, counseling, matrimonial", "Point people to the Contact form"],
            ["Prayer times, About, Media", "Static content on the website"],
            ["Shared ADMIN_PASSWORD cookie", "Temporary only. Replace with users + /auth/login"],
        ],
        [62, 110],
    )

    pdf.h1("6. Email services")
    pdf.body(
        "You need a real email product for notifications and mailing lists. "
        "Azure Communication Services Email is the Azure-native option. "
        "From-address should be noreply@ciucanada.ca or info@ciucanada.ca after DNS (SPF/DKIM)."
    )

    pdf.h2("Must have email")
    pdf.table(
        ["Trigger", "Send to", "Why"],
        [
            ["Contact form", "info@ciucanada.ca", "Staff alert with the message. Optional auto-reply to sender."],
            ["Class registration", "Staff inbox", "New Quran/kids signup. Optional confirmation to the family."],
            ["Volunteer form", "Staff inbox", "Team will follow up. Optional confirmation to the volunteer."],
            ["Membership sign-up", "Member + list engine", "CASL consent for ongoing emails. Must include unsubscribe."],
            ["Events newsletter", "Same list engine", "Merge into members unless you keep a separate list."],
            ["Staff invite / reset", "That user's email", "Optional. Send a temporary password when a users row is created."],
        ],
        [42, 42, 88],
    )

    pdf.h2("Does not need email sending")
    pdf.table(
        ["Item", "Notes"],
        [
            ["Donate / PayPal / e-transfer", "Display and copy Canadianislamicunion@gmail.com"],
            ["Footer / Contact page email", "mailto: links only"],
            ["Admin history", "Database only"],
            ["Announcements / events on the site", "Shown on the website, not emailed unless you later blast the list"],
        ],
        [62, 110],
    )

    pdf.h2("Suggested mail types")
    pdf.bullet("Transactional (ACS): contact alert, registration received, volunteer received.")
    pdf.bullet("Marketing / newsletter (ACS or Mailchimp): membership and event updates, topic tags, unsubscribe.")
    pdf.bullet("Canada CASL: store agreedToEmails plus timestamp. Every marketing mail needs unsubscribe.")
    pdf.ln(2)
    pdf.note(
        "Staff notify address: info@ciucanada.ca. "
        "Donations stay on Canadianislamicunion@gmail.com and must not mix with the mailing list."
    )

    pdf.h1("7. Build order")
    pdf.table(
        ["Step", "Work"],
        [
            ["1", "Azure SQL + users first, then announcements, events, contacts, registrations, history"],
            ["2", "Add POST /auth/login and store userId on every history row"],
            ["3", "Point the website at AZURE_API_BASE_URL and AZURE_API_KEY"],
            ["4", "ACS Email for contact and registration alerts"],
            ["5", "Create members and volunteers tables, then connect those forms"],
            ["6", "Merge the events newsletter into members (source field)"],
            ["7", "Optional: admin screens for members/volunteers, and announcement emails to the list"],
        ],
        [18, 154],
    )

    pdf.h1("8. Error and success contract")
    pdf.bullet("Success lists: a JSON array of objects. No wrapper.")
    pdf.bullet("Success create: the saved object with id and timestamps. HTTP 201.")
    pdf.bullet("Success update: the saved object. HTTP 200.")
    pdf.bullet("Success delete: HTTP 204, empty body.")
    pdf.bullet('Failure: { "error": "Human readable message" } with HTTP 400/401/404/500.')
    pdf.ln(2)
    pdf.code('{ "error": "Name, email, and phone are required." }')

    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
