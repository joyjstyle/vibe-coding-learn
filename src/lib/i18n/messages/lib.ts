/**
 * Interface text: see ./common.ts for the conventions. Every key in this file starts with "lib.".
 * vi must have exactly the keys en has, with the same types (TypeScript checks this).
 */
const en = {
  // Main navigation (src/lib/nav.ts)
  "lib.nav.home": "Home",
  "lib.nav.syllabus": "Syllabus",
  "lib.nav.work": "My work",
  "lib.nav.toolkit": "Toolkit",

  // Toolkit areas (src/lib/toolkit.ts)
  "lib.toolkit.prompts": "Prompt library",
  "lib.toolkit.commands": "Command sheet",
  "lib.toolkit.templates": "Templates",
  "lib.toolkit.glossary": "Glossary",
  "lib.toolkit.project-kit": "Project kit",
  "lib.toolkit.statuses": "Statuses explained",

  // Where a Toolkit entry sits in its lesson (src/lib/toolkit-index.ts)
  "lib.toolkit.where.section": (n: number, title: string) => `Section ${n}: ${title}`,
  "lib.toolkit.where.task": "Your task",
  "lib.toolkit.where.submit": "Submit evidence",
  "lib.toolkit.where.criteria": "Final self-check",
  "lib.toolkit.where.check": "Knowledge check",
  "lib.toolkit.where.furtherReading": "Further reading",

  // Toolkit search (src/lib/actions/search.ts)
  "lib.search.area.toolkit": "Toolkit",
  "lib.search.area.lesson": (day: number) => `Lesson, Day ${day}`,
  "lib.search.area.prompt": "Prompt",
  "lib.search.area.command": "Command",
  "lib.search.area.template": "Template",
  "lib.search.area.glossary": "Glossary",
  "lib.search.lessonTitle": (id: string, title: string) => `Lesson ${id}: ${title}`,
  "lib.search.entryTitle": (id: string, where: string) => `Lesson ${id} · ${where}`,

  // Evidence files (src/lib/evidence-rules.ts)
  "lib.evidence.fileTypes": "PNG, JPG, WebP, GIF, PDF, TXT, Markdown, CSV or JSON",
  "lib.evidence.notAllowed": (name: string, types: string) => `${name} is not a file type you can upload. Use ${types}.`,
  "lib.evidence.empty": (name: string) => `${name} is empty.`,
  "lib.evidence.tooLarge": (name: string, max: string) => `${name} is larger than ${max}.`,

  // Server action messages (src/lib/actions/*.ts)
  "lib.error.lessonMissing": "This lesson does not exist.",
  "lib.error.lessonNotOpen": "This lesson isn't open yet.",
  "lib.error.saveFailed": "We couldn't save your changes. Check your connection, then try again.",
  "lib.check.notSignedIn": "Your answers can't be saved because you're not signed in.",
  "lib.check.unavailable": "This lesson's multiple-choice check is not available yet.",
  "lib.check.chooseAnswer": "Choose one of the answers, then select Check answer.",
  "lib.check.saveFailed": "We couldn't save your answer. Check your connection, then try again.",
  "lib.progress.notSignedIn": "Your progress can't be saved because you're not signed in.",
  "lib.progress.conditionsNotMet": "Some conditions are not met yet. Check the list above.",
  "lib.settings.notSignedIn": "Your settings can't be saved because you're not signed in.",
  "lib.settings.nameTooLong": "Your name can be up to 80 characters.",
  "lib.work.notSignedIn": "Your work can't be saved because you're not signed in.",
  "lib.work.lessonNotOpen": "This lesson isn't open yet, so work can't be saved for it.",
  "lib.work.chooseFile": "Choose a file to upload.",
  "lib.work.uploadFailed": (name: string) => `We couldn't upload ${name}. Try again, or remove it.`,
  "lib.work.unreadable": "Some of your entries could not be read. Reload the page, then try again.",
  "lib.work.itemEmpty": (n: number) => `Item ${n} is empty. Add text, a link or a file.`,
  "lib.work.itemNeedsLink": (n: number) => `Item ${n} needs a full link starting with https://.`,
  "lib.work.itemNoFile": (n: number) => `Item ${n} has no uploaded file. Choose a file, or use text or a link.`,
  "lib.work.commitFormat": "The Git commit should be 7 to 40 letters and numbers, as shown by git log.",
  "lib.work.needsAttention": "Some items need attention before you can submit.",
  "lib.work.notReviewPoint": "This lesson is not a review point, so there is no decision to record.",
  "lib.work.reviewerName": "Add the reviewer's name.",
  "lib.work.checkDecision": "Check the decision and notes, then try again.",
  "lib.work.submitBeforeReview": "Submit your evidence before recording a review outcome.",
  "lib.work.submitBeforeShare": "Submit your evidence before sharing it.",
};

const vi: typeof en = {
  "lib.nav.home": "Trang chủ",
  "lib.nav.syllabus": "Chương trình học",
  "lib.nav.work": "Bài làm",
  "lib.nav.toolkit": "Bộ công cụ",

  "lib.toolkit.prompts": "Thư viện prompt",
  "lib.toolkit.commands": "Bảng lệnh",
  "lib.toolkit.templates": "Mẫu",
  "lib.toolkit.glossary": "Thuật ngữ",
  "lib.toolkit.project-kit": "Bộ tài liệu dự án",
  "lib.toolkit.statuses": "Giải thích trạng thái",

  "lib.toolkit.where.section": (n: number, title: string) => `Phần ${n}: ${title}`,
  "lib.toolkit.where.task": "Nhiệm vụ của bạn",
  "lib.toolkit.where.submit": "Nộp bằng chứng",
  "lib.toolkit.where.criteria": "Tự kiểm tra lần cuối",
  "lib.toolkit.where.check": "Kiểm tra kiến thức",
  "lib.toolkit.where.furtherReading": "Đọc thêm",

  "lib.search.area.toolkit": "Bộ công cụ",
  "lib.search.area.lesson": (day: number) => `Bài học, Ngày ${day}`,
  "lib.search.area.prompt": "Prompt",
  "lib.search.area.command": "Lệnh",
  "lib.search.area.template": "Mẫu",
  "lib.search.area.glossary": "Thuật ngữ",
  "lib.search.lessonTitle": (id: string, title: string) => `Bài ${id}: ${title}`,
  "lib.search.entryTitle": (id: string, where: string) => `Bài ${id} · ${where}`,

  "lib.evidence.fileTypes": "PNG, JPG, WebP, GIF, PDF, TXT, Markdown, CSV hoặc JSON",
  "lib.evidence.notAllowed": (name: string, types: string) => `${name} không phải loại tệp bạn có thể tải lên. Hãy dùng ${types}.`,
  "lib.evidence.empty": (name: string) => `${name} đang trống.`,
  "lib.evidence.tooLarge": (name: string, max: string) => `${name} lớn hơn ${max}.`,

  "lib.error.lessonMissing": "Bài học này không tồn tại.",
  "lib.error.lessonNotOpen": "Bài học này chưa mở.",
  "lib.error.saveFailed": "Chúng tôi chưa lưu được thay đổi của bạn. Hãy kiểm tra kết nối rồi thử lại.",
  "lib.check.notSignedIn": "Không thể lưu câu trả lời vì bạn chưa đăng nhập.",
  "lib.check.unavailable": "Phần kiểm tra trắc nghiệm của bài học này chưa có.",
  "lib.check.chooseAnswer": "Hãy chọn một đáp án, rồi chọn Kiểm tra đáp án.",
  "lib.check.saveFailed": "Chúng tôi chưa lưu được câu trả lời của bạn. Hãy kiểm tra kết nối rồi thử lại.",
  "lib.progress.notSignedIn": "Không thể lưu tiến độ vì bạn chưa đăng nhập.",
  "lib.progress.conditionsNotMet": "Một số điều kiện chưa được đáp ứng. Hãy xem danh sách ở trên.",
  "lib.settings.notSignedIn": "Không thể lưu cài đặt vì bạn chưa đăng nhập.",
  "lib.settings.nameTooLong": "Tên của bạn có thể dài tối đa 80 ký tự.",
  "lib.work.notSignedIn": "Không thể lưu bài làm vì bạn chưa đăng nhập.",
  "lib.work.lessonNotOpen": "Bài học này chưa mở, nên chưa thể lưu bài làm cho bài này.",
  "lib.work.chooseFile": "Hãy chọn một tệp để tải lên.",
  "lib.work.uploadFailed": (name: string) => `Chúng tôi chưa tải lên được ${name}. Hãy thử lại, hoặc gỡ tệp này.`,
  "lib.work.unreadable": "Không đọc được một số nội dung bạn nhập. Hãy tải lại trang rồi thử lại.",
  "lib.work.itemEmpty": (n: number) => `Mục ${n} đang trống. Hãy thêm văn bản, liên kết hoặc tệp.`,
  "lib.work.itemNeedsLink": (n: number) => `Mục ${n} cần một liên kết đầy đủ bắt đầu bằng https://.`,
  "lib.work.itemNoFile": (n: number) => `Mục ${n} chưa có tệp được tải lên. Hãy chọn một tệp, hoặc dùng văn bản hay liên kết.`,
  "lib.work.commitFormat": "Mã commit Git phải gồm 7 đến 40 chữ cái và chữ số, như git log hiển thị.",
  "lib.work.needsAttention": "Một số mục cần được xử lý trước khi bạn có thể nộp.",
  "lib.work.notReviewPoint": "Bài học này không phải điểm duyệt, nên không có quyết định nào cần ghi lại.",
  "lib.work.reviewerName": "Hãy thêm tên người duyệt.",
  "lib.work.checkDecision": "Hãy kiểm tra quyết định và ghi chú, rồi thử lại.",
  "lib.work.submitBeforeReview": "Hãy nộp bằng chứng trước khi ghi lại kết quả duyệt.",
  "lib.work.submitBeforeShare": "Hãy nộp bằng chứng trước khi chia sẻ.",
};

export const lib = { en, vi };
