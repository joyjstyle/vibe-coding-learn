# Bài 8.4: Tự động hóa các kiểm tra chính bằng Playwright

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Giải thích những gì các bài kiểm thử trình duyệt tự động có thể và không thể xác minh.
- Quyết định những bước kiểm tra thủ công hiện có nào đáng được tự động hóa.
- Xác nhận Playwright đã được thiết lập hay chưa, hoặc xin phép để thêm nó.
- Viết và chạy các bài kiểm thử Playwright ngắn bằng TypeScript cho các route, hành trình và việc kiểm tra dữ liệu biểu mẫu chủ chốt.
- Diễn giải kết quả kiểm thử và xử lý các lần thất bại mà không làm yếu đi bài kiểm thử.

**Điều kiện tiên quyết:** Hoàn thành Bài 8.3 và có sẵn hồ sơ QA, các bước kiểm tra hành trình người dùng và danh sách kiểm tra trạng thái tính năng.

**Tài liệu cần chuẩn bị:** Website đã triển khai, các script đã được ghi trong tài liệu của dự án, các trường hợp kiểm thử QA từ Bài 8.1, các bước kiểm tra hành trình từ Bài 6.3, bản đặc tả biểu mẫu từ Bài 7.1 và mọi cấu hình kiểm thử hiện có.

## 1. Hiểu về kiểm thử trình duyệt tự động

Cho đến giờ, bạn đã kiểm tra website bằng tay. Kiểm tra thủ công là thiết yếu, nhưng lặp lại chúng sau mỗi thay đổi tốn thời gian, và những bước kiểm tra thủ công lặp đi lặp lại rất dễ bị bỏ qua.

Một **bài kiểm thử trình duyệt tự động** là một đoạn script mở website trong một trình duyệt thật, thực hiện các hành động như chọn một liên kết, và kiểm tra rằng kết quả mong đợi xuất hiện.

**Playwright** là một công cụ kiểm thử làm điều này trong Chromium, Firefox và WebKit, engine mà Safari sử dụng. Trình chạy kiểm thử của nó, Playwright Test, dùng TypeScript.

Kiểm thử tự động làm tốt những việc sau:

| Điểm mạnh | Ví dụ |
|---|---|
| Lặp lại chính xác cùng các bước | Đi theo cùng một hành trình sau mỗi thay đổi |
| Kiểm tra nhiều route một cách nhanh chóng | Xác nhận mỗi trang đã được phê duyệt đều tải được với một heading chính |
| Phát hiện sớm lỗi hồi quy | Nhận ra rằng một thay đổi về điều hướng đã làm hỏng một liên kết |
| Tạo ra bằng chứng nhất quán | Một báo cáo cho thấy những bước kiểm tra nào đã đạt |

Kiểm thử tự động không thể:

- Đánh giá xem một trang có khớp với thiết kế đã được phê duyệt không.
- Quyết định xem nội dung chữ có chính xác hoặc phù hợp không.
- Chứng minh rằng một tin nhắn đã đến một hộp thư thật.
- Kiểm tra bất cứ điều gì mà chúng không khẳng định (assert) một cách tường minh.

**Một bài kiểm thử đạt chỉ chứng minh những gì bài kiểm thử đó kiểm tra, trong các điều kiện mà nó đã chạy.**

Kiểm thử tự động hỗ trợ các bước kiểm tra thủ công từ những bài học trước. Chúng không thay thế các bước đó.

## 2. Kiểm tra những gì đã có

Trước khi viết bài kiểm thử, hãy kiểm tra dự án.

Tại dấu nhắc lệnh của terminal, từ thư mục dự án:

```bash
git status --short
```

Sau đó tìm:

| Mục | Tìm ở đâu | Nó cho bạn biết điều gì |
|---|---|---|
| Phụ thuộc Playwright | `devDependencies` trong `package.json` | Playwright đã được cài đặt hay chưa |
| Cấu hình | `playwright.config.ts` ở thư mục gốc dự án | Các bài kiểm thử chạy như thế nào |
| Tệp kiểm thử | Một thư mục `tests` hoặc `e2e`, hoặc các tệp kết thúc bằng `.spec.ts` | Các bài kiểm thử hiện có |
| Script kiểm thử | Phần `scripts` của `package.json` | Các lệnh kiểm thử đã được ghi trong tài liệu |
| Quy tắc dự án | Quy tắc làm việc và tài liệu kiến trúc | Đã có quyết định về cách kiểm thử hay chưa |

Hãy yêu cầu Claude báo cáo những gì đã có mà không thay đổi gì.

Nếu Playwright đã được cấu hình, hãy dùng thiết lập và quy ước hiện có.

## 3. Xin phép trước khi thêm Playwright

Thêm Playwright đồng nghĩa với việc thêm các **phụ thuộc** (dependency), tức các gói do những lập trình viên khác viết mà dự án dựa vào, và thêm các tệp cấu hình. Bài 9.1 đề cập chi tiết hơn đến rủi ro của phụ thuộc.

Thêm một công cụ kiểm thử là một quyết định của dự án. Hãy kiểm tra xem:

- Kiến trúc hoặc quy tắc làm việc đã bao gồm Playwright chưa.
- Người hướng dẫn đã cho phép thêm nó chưa.
- Có công cụ kiểm thử nào khác đã được chọn thay thế không.

Nếu không có điều nào ở trên, hãy đề nghị một quyết định. Giải thích mục đích, các tệp sẽ thay đổi và những bước kiểm tra bạn định tự động hóa.

Đừng thêm Playwright chỉ vì bài học này mô tả nó.

## 4. Cài đặt Playwright khi đã được cho phép

Các lệnh này lấy từ tài liệu của Playwright. Hãy kiểm tra hướng dẫn cài đặt hiện hành trước khi chạy, vì công cụ luôn thay đổi.

Từ thư mục gốc của dự án, tại dấu nhắc lệnh của terminal:

```bash
npm init playwright@latest
```

Lệnh này thêm Playwright vào một dự án có sẵn. Nó sẽ hỏi một số câu hỏi. Với dự án này, hãy chọn:

| Câu hỏi | Lựa chọn |
|---|---|
| Language | TypeScript |
| Tests folder | Theo quy ước hiện có của dự án, hoặc chấp nhận tên được gợi ý và ghi lại |
| GitHub Actions workflow | Không, trừ khi tích hợp liên tục (continuous integration) đã được cho phép riêng |
| Install browsers | Có |

Trình cài đặt thường tạo ra một tệp cấu hình, một bài kiểm thử mẫu và các thay đổi trong `package.json` cùng tệp khóa (lock file).

Sau khi cài đặt:

1. Chạy `git status --short` để xem mọi tệp mới và tệp đã thay đổi.
2. Rà soát các thay đổi bằng `git diff`.
3. Kiểm tra phiên bản đã cài đặt:

```bash
npx playwright --version
```

4. Ghi lại phiên bản trong bài nộp của bạn.

Nếu dự án dùng một trình quản lý gói khác, như pnpm hoặc Yarn, hãy dùng lệnh tương ứng trong tài liệu của Playwright.

## 5. Trỏ các bài kiểm thử đến website cục bộ

Playwright cần biết website chạy ở đâu. Tệp cấu hình cũng có thể khởi động máy chủ phát triển (development server) trước khi các bài kiểm thử chạy.

### Ví dụ minh họa cấu hình

```ts
import { defineConfig, devices } from "@playwright/test";

// Replace with the address your project actually uses.
const baseURL = process.env.BASE_URL ?? "http://localhost:PORT";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    // Replace with the documented development command.
    command: "npm run DEV_SCRIPT",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
```

Trước khi dùng mẫu này:

- Thay `PORT` và `DEV_SCRIPT` bằng các giá trị được ghi trong tài liệu của dự án thực tế.
- Giữ các browser project khớp với điều kiện rà soát đã thống nhất ở Bài 8.1.
- So sánh nó với cấu hình mà trình cài đặt đã tạo ra thay vì thay thế toàn bộ tệp đó.

Đọc `BASE_URL` từ một biến môi trường nghĩa là sau này cùng các bài kiểm thử đó có thể chạy trên website staging ở Bài 9.4.

Một **trace** là bản ghi lại từng bước của bài kiểm thử. Playwright có thể mở nó sau đó để cho thấy điều gì đã xảy ra khi một bài kiểm thử thất bại.

## 6. Quyết định những gì cần tự động hóa

Hãy tự động hóa những bước kiểm tra ổn định, quan trọng và được lặp lại thường xuyên.

| Ứng viên tốt | Ứng viên kém |
|---|---|
| Mỗi route đã được phê duyệt tải được và hiển thị heading chính của nó | Đánh giá khoảng cách so với thiết kế |
| Các liên kết ở header đến đúng đích đến đã được phê duyệt | Rà soát giọng văn của nội dung chữ |
| Các hành trình người dùng quan trọng đã được phê duyệt | Các bước kiểm tra một lần sẽ không bao giờ được lặp lại |
| Thông báo kiểm tra dữ liệu biểu mẫu khi để trống hoặc nhập không hợp lệ | Các lần gửi sẽ gửi tin nhắn thật hoặc tạo bản ghi thật |
| Một lần quét khả năng tiếp cận tự động trên các trang chính | Các bước kiểm tra mà hành vi mong đợi vẫn đang Chờ quyết định |

Hãy bắt đầu từ nhỏ. Ba đến năm bài kiểm thử có ý nghĩa mà bạn hiểu rõ tốt hơn một bộ kiểm thử lớn mà bạn không giải thích được.

Hãy dựa mỗi bài kiểm thử trên một trường hợp kiểm thử hoặc hành trình hiện có từ Bài 6.3, 7.1 và 8.1. Mỗi bài kiểm thử tự động nên truy ngược được về một yêu cầu đã được phê duyệt.

## 7. Viết bài kiểm thử đầu tiên

Một tệp kiểm thử chứa một hoặc nhiều bài kiểm thử. Mỗi bài kiểm thử có một tên, các bước và các **assertion** (khẳng định). Một assertion là một phát biểu về điều phải đúng, chẳng hạn "heading này hiển thị".

### Ví dụ: một route tải được với heading đã được phê duyệt

```ts
import { test, expect } from "@playwright/test";

// Use the exact heading from the approved content source.
const APPROVED_HOMEPAGE_HEADING = "[Approved homepage heading]";

test("homepage loads with its approved main heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: APPROVED_HOMEPAGE_HEADING }),
  ).toBeVisible();
});
```

Mỗi phần làm gì:

| Mã | Ý nghĩa |
|---|---|
| `test("...", async ({ page }) => { ... })` | Định nghĩa một bài kiểm thử và cấp cho nó một trang trình duyệt |
| `page.goto("/")` | Mở trang chủ, dùng base URL đã cấu hình |
| `page.getByRole("heading", ...)` | Tìm phần tử theo cách mà công nghệ hỗ trợ tìm, theo vai trò và tên có thể truy cập của nó |
| `expect(...).toBeVisible()` | Khẳng định rằng phần tử xuất hiện |

Playwright khuyến nghị xác định vị trí phần tử theo vai trò bất cứ khi nào có thể, vì cách này phản ánh cách con người và công nghệ hỗ trợ nhận biết trang. Các locator dựa trên vai trò cảnh báo sớm về các vấn đề cấu trúc, nhưng chúng không thay thế đợt rà soát khả năng tiếp cận ở Bài 8.3.

Hãy thay phần giữ chỗ bằng chính xác heading đã được phê duyệt. Đừng sao chép câu chữ từ phần triển khai hiện tại, vì phần triển khai có thể chứa chính lỗi mà bạn đang cố phát hiện.

## 8. Tự động hóa một hành trình người dùng

Hãy dùng một hành trình đã được phê duyệt từ Bài 6.3.

### Ví dụ: từ trang danh sách đến trang chi tiết

Chỉ khi hành trình này tồn tại trong dự án đã được phê duyệt:

```ts
import { test, expect } from "@playwright/test";

const TREATMENT_LINK_NAME = "[Approved treatment link label]";
const TREATMENT_ROUTE = "[Approved detail route]";
const TREATMENT_HEADING = "[Approved detail page heading]";

test("visitor can open a treatment from the listing", async ({ page }) => {
  await page.goto("[Approved listing route]");

  await page.getByRole("link", { name: TREATMENT_LINK_NAME }).click();

  await expect(page).toHaveURL(TREATMENT_ROUTE);
  await expect(
    page.getByRole("heading", { level: 1, name: TREATMENT_HEADING }),
  ).toBeVisible();
});
```

Bài này kiểm tra cả đích đến lẫn việc đích đến hiển thị đúng nội dung. Chỉ kiểm tra URL sẽ bỏ sót trường hợp một route đúng nhưng lại hiển thị thông tin của một trang khác.

Playwright tự động chờ các phần tử và điều kiện trong assertion. Đừng thêm các khoảng dừng cố định như `page.waitForTimeout(3000)`. Khoảng dừng cố định làm bài kiểm thử chậm đi và vẫn thất bại khi website chậm hơn dự kiến.

## 9. Tự động hóa việc kiểm tra dữ liệu biểu mẫu một cách an toàn

Chỉ tự động hóa những hành vi cục bộ an toàn khi lặp lại.

### Ví dụ: lỗi khi thiếu trường bắt buộc

```ts
import { test, expect } from "@playwright/test";

test("contact form reports a missing email address", async ({ page }) => {
  await page.goto("[Approved contact route]");

  await page.getByLabel("[Approved name label]").fill("Test Visitor");
  await page.getByRole("button", { name: "[Approved submit label]" }).click();

  await expect(page.getByText("[Approved email error message]")).toBeVisible();
});
```

`getByLabel` tìm một điều khiển theo nhãn hiển thị của nó. Nếu locator này không tìm thấy trường, có thể nhãn chưa được liên kết với điều khiển, và bản thân điều đó đã đáng để điều tra.

Trước khi chạy bất kỳ bài kiểm thử biểu mẫu nào, hãy xác nhận điều gì xảy ra khi biểu mẫu được gửi với thông tin hợp lệ. Nếu một bài kiểm thử có thể gửi tin nhắn thật, tạo một lượt đặt lịch hoặc kích hoạt một thông báo, nó không được chạy trừ khi cách sắp xếp kiểm thử đã thống nhất ở Bài 7.1 cho phép.

Nếu bạn không chắc một bài kiểm thử có thể chạm đến dịch vụ bên ngoài hay không, hãy yêu cầu Claude kiểm tra phần xử lý gửi trước và báo cáo lại. Đừng chạy bài kiểm thử cho đến khi bạn biết rõ.

## 10. Thêm một lần quét khả năng tiếp cận tự động

Gói `@axe-core/playwright` chạy engine khả năng tiếp cận axe bên trong các bài kiểm thử Playwright. Đây là một phụ thuộc riêng, nên nó cần sự cho phép giống như Playwright.

Tài liệu của Playwright đưa ra mẫu sau:

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage has no automatically detectable WCAG A or AA violations", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

Các tag giới hạn lần quét vào những quy tắc gắn với các mức WCAG cụ thể. Hãy kiểm tra tài liệu của axe để tìm các tag khớp với yêu cầu đã được ghi lại của dự án trước khi thay đổi chúng.

Lần quét kiểm tra trang ở trạng thái hiện tại của nó. Để quét menu di động khi đang mở, hãy mở nó trong bài kiểm thử trước khi chạy quét.

Như Bài 8.3 đã giải thích, quét tự động chỉ phát hiện được một số vấn đề. Hãy giữ các bước kiểm tra khả năng tiếp cận thủ công trong kế hoạch QA của bạn.

Đừng dùng các tùy chọn của công cụ để loại trừ phần tử hoặc tắt quy tắc nhằm làm cho một bài kiểm thử đang thất bại trở thành đạt. Nếu một vấn đề đã biết buộc phải tạm thời loại trừ, hãy ghi lại phát hiện, sự phê duyệt và việc loại trừ cùng với nhau.

## 11. Chạy các bài kiểm thử và đọc kết quả

Hãy chạy các lệnh này tại dấu nhắc lệnh của terminal trong thư mục dự án.

| Lệnh | Tác dụng |
|---|---|
| `npx playwright test` | Chạy tất cả bài kiểm thử mà không hiển thị cửa sổ trình duyệt |
| `npx playwright test --headed` | Chạy bài kiểm thử với cửa sổ trình duyệt hiển thị |
| `npx playwright test --ui` | Mở chế độ UI, nơi bạn có thể đi qua từng bước của mỗi bài kiểm thử |
| `npx playwright test tests/[file].spec.ts` | Chạy một tệp kiểm thử |
| `npx playwright test --project=chromium` | Chạy bài kiểm thử cho một browser project đã cấu hình |
| `npx playwright show-report` | Mở báo cáo HTML từ lần chạy gần nhất |

Nếu dự án định nghĩa script kiểm thử riêng trong `package.json`, hãy dùng script đã được ghi trong tài liệu đó.

Terminal hiển thị số bài kiểm thử đạt và không đạt, và trong những browser project nào. Hãy ghi lại:

- Lệnh đã dùng.
- Phiên bản Playwright.
- Các browser project đã chạy.
- Phiên bản triển khai đã được kiểm thử.
- Số lượng đạt và không đạt.

## 12. Xử lý bài kiểm thử thất bại một cách trung thực

Khi một bài kiểm thử thất bại, trước hết hãy xác lập lý do. Có ba khả năng chính:

| Nguyên nhân | Cách xử lý |
|---|---|
| Website có lỗi | Ghi lại một phát hiện và làm theo quy trình sửa lỗi từ Bài 8.2 |
| Bài kiểm thử sai | Sửa bài kiểm thử để nó khớp với yêu cầu đã được phê duyệt |
| Môi trường sai | Sửa thiết lập, chẳng hạn máy chủ không khởi động hoặc base URL không đúng |

Hãy dùng chế độ UI hoặc trace để xem từng bước và trang trông như thế nào.

**Đừng bao giờ thay đổi một bài kiểm thử chỉ để nó đạt.** Nới lỏng một assertion, xóa một bước kiểm tra, thêm một khoảng dừng dài hoặc bỏ qua bài kiểm thử mà không ghi lại lý do là che giấu vấn đề chứ không giải quyết nó.

Một **bài kiểm thử chập chờn** (flaky test) lúc đạt lúc không đạt mà không có thay đổi mã nào. Hãy coi sự chập chờn là một phát hiện về bài kiểm thử hoặc về website. Đừng chạy lại cho đến khi nó đạt rồi báo cáo là đạt.

## 13. Yêu cầu Claude viết các bài kiểm thử

```text
Write Playwright tests in TypeScript for the selected checks.

Before writing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Confirm whether Playwright is installed and how it is configured.
- Inspect the existing test files and conventions.
- Read the selected test cases and their approved requirements.

For each test:
- Trace it to the listed test case or requirement.
- Use the exact approved text from the content source,
  not text copied from the current implementation.
- Prefer role, label and text locators.
- Use web-first assertions; do not use fixed timeouts.
- Keep tests independent of each other.
- Use synthetic information only.

Do not write tests that submit information to external
services, send messages or create bookings, unless the
test arrangements I provide authorise it.

After writing:
- Run the new tests using the documented command.
- Report each test, its source requirement and its result.
- For any failure, state whether the evidence points to the
  website, the test or the environment.
- Do not weaken, skip or delete a test to make it pass.

Do not install dependencies, change unrelated files,
commit, push or deploy.

Selected checks and approved references:
[Insert test case IDs, routes, journeys and exact approved text.]
```

Hãy đọc mọi bài kiểm thử mà Claude viết. Bạn phải có khả năng giải thích mỗi bài kiểm tra điều gì.

## 14. Ghi lại và duy trì các bài kiểm thử

Hãy thêm các bài kiểm thử tự động vào hồ sơ QA từ Bài 8.1.

| Mục | Cần ghi gì |
|---|---|
| Tệp và tên bài kiểm thử | Nơi bước kiểm tra tự động nằm |
| Yêu cầu gốc | Trường hợp kiểm thử hoặc yêu cầu mà nó bao quát |
| Nó khẳng định điều gì | Các điều kiện cụ thể được kiểm tra |
| Nó không kiểm tra điều gì | Các bước kiểm tra thủ công vẫn cần thiết |
| Kết quả gần nhất | Đạt hoặc không đạt, kèm phiên bản triển khai |

Khi nội dung hoặc route đã được phê duyệt thay đổi, các bài kiểm thử phải thay đổi theo. Các bài kiểm thử lỗi thời hoặc sẽ thất bại vì sai lý do, hoặc tệ hơn, vẫn tiếp tục đạt trong khi kiểm tra sai thứ.

Nếu hướng dẫn của dự án chưa ghi lại cách chạy các bài kiểm thử, hãy đề xuất một bản cập nhật để người hướng dẫn duyệt.

## 15. Bài tập thực hành

**Nhiệm vụ: Tự động hóa một tập nhỏ các bước kiểm tra chủ chốt.**

1. Kiểm tra dự án để tìm thiết lập kiểm thử hiện có.
2. Xác nhận sự cho phép trước khi thêm Playwright hoặc `@axe-core/playwright`.
3. Chọn ba đến năm bước kiểm tra từ hồ sơ QA của bạn.
4. Viết bài kiểm thử cho ít nhất một route, một hành trình và một bước kiểm tra dữ liệu biểu mẫu an toàn, nếu chúng tồn tại.
5. Chạy các bài kiểm thử và ghi lại kết quả.
6. Điều tra mọi lần thất bại và phân loại nguyên nhân của nó.
7. Ghi lại phạm vi bao quát tự động và các giới hạn của nó trong hồ sơ QA.

Nếu không được cho phép thêm Playwright, hãy nộp các bước kiểm tra đã chọn, các bài kiểm thử ở dạng bản nháp và đề nghị xin phép. Đừng cài đặt nó khi chưa được phê duyệt.

## 16. Sản phẩm cần nộp

Nộp:

- Những phát hiện về thiết lập kiểm thử hiện có.
- Quyết định cho phép đối với mọi phụ thuộc mới.
- Phiên bản Playwright và bản tóm tắt cấu hình.
- Các tệp kiểm thử, mỗi tệp được truy ngược về một yêu cầu.
- Lệnh đã dùng và kết quả kiểm thử.
- Phân loại mọi lần thất bại.
- Hồ sơ QA đã cập nhật cho thấy phạm vi bao quát tự động và thủ công.

## 17. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các phụ thuộc mới chỉ được thêm khi đã được cho phép.
- Mỗi bài kiểm thử truy ngược được về một yêu cầu đã được phê duyệt.
- Các bài kiểm thử dùng câu chữ đã được phê duyệt và các locator ổn định.
- Không có bài kiểm thử nào kích hoạt hành động bên ngoài khi chưa được cho phép.
- Kết quả được ghi lại kèm phiên bản và điều kiện.
- Các lần thất bại được điều tra, không bị che giấu.
- Các bước kiểm tra thủ công còn lại được xác định rõ ràng.

## 18. Kiểm tra kiến thức

1. Một bài kiểm thử Playwright đạt chứng minh được điều gì?
2. Vì sao các bài kiểm thử nên dùng nguồn nội dung đã được phê duyệt thay vì câu chữ sao chép từ phần triển khai?
3. Vì sao bạn nên tránh các khoảng dừng cố định như `waitForTimeout`?
4. Ba nguyên nhân có thể khiến một bài kiểm thử thất bại là gì?
5. Vì sao tự động hóa việc gửi biểu mẫu mà không kiểm tra thông tin được gửi đến đâu là không an toàn?
