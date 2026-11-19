# Vietnamese content (content/vi)

The Vietnamese version of the programme, shown when a learner picks **VN** in the top bar.

- `curriculum.json` mirrors `../curriculum.json`: the same days, lesson ids, order, minutes and file names. Only the titles are translated.
- `lessons/lesson-X.Y.md` is the Vietnamese translation of `../lessons/lesson-X.Y.md`. If a file is missing, the English lesson is shown.
- `npm run content` builds both languages and fails if a Vietnamese lesson's structure differs from the English one (number of sections, task steps, evidence items, completion criteria or knowledge-check questions). Saved progress depends on these counts, so they must match exactly.

## Structure rules for lesson files

Translate all the prose. Keep the Markdown structure exactly as in English: the same headings in the same order, the same lists with the same number of items, the same tables, blockquotes and code blocks.

| English | Vietnamese (use exactly) |
|---|---|
| `# Lesson 1.1: Title` | `# Bài 1.1: <the title from curriculum.json, character for character>` |
| `### Learning objective` | `### Mục tiêu bài học` |
| `**Prerequisites:**` | `**Điều kiện tiên quyết:**` |
| `**Required materials:**` | `**Tài liệu cần chuẩn bị:**` |
| `**Your output:**` | `**Kết quả của bạn:**` |
| `## N. Practical exercise` | `## N. Bài tập thực hành` |
| `## N. Expected submission` | `## N. Sản phẩm cần nộp` |
| `## N. Completion criteria` | `## N. Tiêu chí hoàn thành` |
| `## N. Knowledge check` | `## N. Kiểm tra kiến thức` |
| `## N. Official reference(s)` | `## N. Tài liệu tham khảo chính thức` |
| `**Task: …**` (first line of the exercise) | `**Nhiệm vụ: …**` |
| A criteria intro ending `either:` | end it with `một trong các điều sau:` |
| `Lesson 4.1`, `Lessons 4.1 and 4.2` | `Bài 4.1`, `Bài 4.1 và 4.2` (also `hoặc`, `đến`) |

Teaching-section headings (`## 1. …`) are translated freely but keep their `N. ` number.

Do not translate: code blocks and inline code, file names and paths, commands, URLs, prompts shown inside code blocks, product names (Claude, Claude Code, Git, GitHub, Vercel, Playwright, Chrome…), and the fictional client's name (Saffron Wellness Clinic). Prompts that the learner sends to Claude in a blockquote (not code) may be translated.

## Glossary

Address the learner as **bạn**, in a friendly, clear, professional tone. Keep widely used technical terms in English, sometimes with a short Vietnamese gloss the first time: prompt, terminal, commit, branch, component, deploy, staging, production, build, PRD, TypeScript, TSX, Markdown, QA, CTA.

| English | Vietnamese |
|---|---|
| Lesson | Bài học (with a number: Bài 1.1) |
| Day | Ngày |
| Home | Trang chủ |
| Syllabus | Chương trình học |
| Toolkit | Bộ công cụ |
| Work / My work | Bài làm |
| Settings | Cài đặt |
| Help | Trợ giúp |
| Supervisor | Người hướng dẫn |
| Intern | Thực tập sinh |
| Learning objective | Mục tiêu bài học |
| Practical exercise | Bài tập thực hành |
| Expected submission | Sản phẩm cần nộp |
| Completion criteria | Tiêu chí hoàn thành |
| Knowledge check | Kiểm tra kiến thức |
| Further reading | Đọc thêm |
| Evidence | Bằng chứng |
| Submission / Submit | Bài nộp / Nộp |
| Draft | Bản nháp |
| Review / Review point | Duyệt / Điểm duyệt |
| Accepted | Đã chấp nhận |
| Changes requested | Cần chỉnh sửa |
| Awaiting review | Chờ duyệt |
| Submitted | Đã nộp |
| Locked | Đã khóa |
| Open | Đang mở |
| Not started | Chưa bắt đầu |
| In progress | Đang làm |
| Complete / Done | Hoàn thành |
| Coming soon | Sắp ra mắt |
| Not yet supplied | Chưa được cung cấp |
| Step | Bước |
| Section | Phần |
| Website brief | Bản mô tả website |
| Sitemap | Sơ đồ trang (sitemap) |
| User journey | Hành trình người dùng |
| Acceptance criteria | Tiêu chí chấp nhận |
| Accessibility | Khả năng tiếp cận |
| Responsive | Đáp ứng (responsive) |
| Checkpoint | Mốc lưu |
| Handover | Bàn giao |
| Unit (as in "Unit 4") | Học phần |
| Checkpoint (Git) | mốc lưu |
| Treatment (clinic) | liệu trình |
| Escalate | chuyển lên cấp trên |
| Finding (QA/review) | phát hiện |
| Defect | lỗi |
| Copy (website text) | nội dung chữ |
| Passed / Failed / Not checked | Đạt / Không đạt / Chưa kiểm tra |
| Reference register | sổ đăng ký tham chiếu |
| Instruction pack | bộ hướng dẫn |
| Starter project | dự án khởi đầu |
| Scope expansion | mở rộng phạm vi |
| Readiness report | báo cáo mức độ sẵn sàng |
| Verify / verified | xác minh / đã xác minh |
