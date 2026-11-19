# Bài 9.3: Kiểm tra metadata, tiêu đề trang và mức sẵn sàng cho tìm kiếm

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Giải thích metadata của trang có tác dụng gì và ai là người phê duyệt câu chữ của nó.
- Kiểm tra tiêu đề trang, mô tả, các heading và văn bản liên kết trên toàn website.
- Xác định các route trùng lặp và xác nhận địa chỉ trang ưu tiên.
- Phân biệt các cơ chế chặn thu thập dữ liệu (crawling) với các cơ chế chặn lập chỉ mục (indexing).
- Xác minh metadata đã được hiển thị và ghi lại mức sẵn sàng cho tìm kiếm mà không hứa hẹn về thứ hạng.

**Điều kiện tiên quyết:** Hoàn thành Bài 9.2 và đã ghi lại các phát hiện của bài đó.

**Tài liệu cần chuẩn bị:** IA và các route đã phê duyệt, nội dung chữ của trang đã phê duyệt, mọi bản mô tả metadata hoặc SEO đã phê duyệt, sổ theo dõi hoàn thành trang từ Bài 6.4, hồ sơ QA và các bài kiểm thử Playwright từ Bài 8.4.

## 1. Hiểu về mức sẵn sàng cho tìm kiếm

**Tối ưu hóa công cụ tìm kiếm (SEO)** bao gồm các công việc giúp công cụ tìm kiếm tìm thấy, hiểu và trình bày các trang của một website.

SEO bao gồm công việc chiến lược, như chọn chủ đề và từ khóa tìm kiếm cần nhắm tới, và công việc kỹ thuật, như đảm bảo các trang có thể được tìm thấy và mô tả đúng.

Bài học này đề cập đến **mức sẵn sàng cho tìm kiếm**: các nền tảng kỹ thuật giúp công cụ tìm kiếm thu thập, lập chỉ mục và mô tả chính xác các trang đã được phê duyệt.

| Thuật ngữ | Ý nghĩa |
|---|---|
| **Thu thập dữ liệu (crawling)** | Chương trình của công cụ tìm kiếm, như Googlebot, truy cập và đọc một trang |
| **Lập chỉ mục (indexing)** | Công cụ tìm kiếm lưu trữ trang để nó có thể xuất hiện trong kết quả |
| **Metadata** | Thông tin về một trang, chủ yếu nằm trong phần `head` của HTML, mà trình duyệt và công cụ tìm kiếm đọc |

**Mức sẵn sàng cho tìm kiếm không đảm bảo thứ hạng hay lưu lượng truy cập.** Thứ hạng phụ thuộc vào nhiều yếu tố nằm ngoài phần triển khai. Đừng hứa hẹn điều đó trong bài nộp.

Chiến lược từ khóa và kế hoạch nội dung thuộc về bản mô tả và nội dung đã phê duyệt. Bài học này không yêu cầu bạn tạo ra chúng.

## 2. Coi câu chữ của metadata là nội dung

Tiêu đề và mô tả trang hiển thị cho người xem. Chúng xuất hiện trong tab trình duyệt, dấu trang (bookmark), kết quả tìm kiếm và các liên kết được chia sẻ. Câu chữ của chúng là nội dung, và tuân theo cùng các quy tắc biên tập như nội dung chữ của trang trong Bài 5.2.

Trước khi triển khai metadata, hãy xác nhận nguồn:

| Tình huống | Cách xử lý |
|---|---|
| Đã có metadata được phê duyệt | Triển khai chính xác như vậy |
| Bản mô tả quy định một mẫu, như “Tên trang, sau đó là tên doanh nghiệp” | Áp dụng mẫu và kiểm tra từng kết quả |
| Không có metadata hay mẫu nào được phê duyệt | Ghi nhận một lỗ hổng đặc tả và đề xuất câu chữ để duyệt |

Nếu bạn đề xuất câu chữ, hãy đánh dấu là **Chờ quyết định biên tập**. Đừng thêm các tuyên bố, giá cả, kết quả, chứng nhận hoặc so sánh mà nội dung đã phê duyệt không hỗ trợ. Các quy định về quảng cáo có thể áp dụng cho dịch vụ liên quan đến sức khỏe, và metadata là một phần của thông điệp quảng cáo.

## 3. Kiểm tra tiêu đề trang

Tiêu đề trang được đặt bằng phần tử `title` trong phần `head` của HTML. Nó xuất hiện trên tab trình duyệt và thường được dùng làm dòng tiêu đề có thể nhấp trong kết quả tìm kiếm.

Kiểm tra từng trang:

| Kiểm tra | Kết quả mong đợi |
|---|---|
| Có tồn tại | Mọi trang đều có tiêu đề |
| Duy nhất | Không có hai trang nào trùng tiêu đề |
| Mang tính mô tả | Xác định được chủ đề của trang |
| Nhất quán | Tuân theo mẫu đã phê duyệt, như có kèm tên doanh nghiệp |
| Chính xác | Khớp với nội dung trang và câu chữ đã phê duyệt |
| Dễ đọc | Viết cho người đọc, không phải một danh sách từ khóa tìm kiếm |

Bài 8.3 đã kiểm tra tiêu đề về khả năng tiếp cận. Người dùng trình đọc màn hình sẽ nghe tiêu đề khi trang tải. Hãy tái sử dụng bằng chứng đó nếu nó vẫn còn áp dụng.

### Cách đặt tiêu đề trong dự án TSX

Phương pháp phụ thuộc vào framework. Ví dụ, trong một dự án Next.js dùng App Router, một trang có thể export metadata của nó:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[Approved page title]",
  description: "[Approved page description]",
};
```

Đây chỉ là ví dụ cho framework đó. Các dự án khởi đầu khác dùng phương pháp khác. Hãy nhờ Claude xác định cách dự án khởi đầu thực tế đặt metadata trước khi thay đổi bất cứ điều gì, và tái sử dụng mọi mẫu dùng chung mà dự án đã có.

## 4. Kiểm tra meta description

**Meta description** là một đoạn tóm tắt ngắn về trang, được đặt bằng phần tử `meta`:

```html
<meta name="description" content="[Approved page description]" />
```

Công cụ tìm kiếm có thể hiển thị nó bên dưới tiêu đề trong kết quả, nhưng cũng có thể chọn đoạn văn bản khác từ trang.

Kiểm tra để đảm bảo mô tả của từng trang:

- Có tồn tại, ở những nơi phạm vi đã phê duyệt yêu cầu.
- Là duy nhất cho trang đó.
- Tóm tắt trang một cách chính xác.
- Dùng câu chữ hoặc mẫu đã được phê duyệt.

Mô tả bị sao chép là lỗi thường gặp khi xây dựng các trang liên quan từ một mẫu dùng chung, như Bài 6.2 đã cảnh báo về việc nội dung bị mang từ trang này sang trang khác.

## 5. Xác nhận heading và văn bản liên kết

Giống như người dùng trình đọc màn hình, công cụ tìm kiếm dùng các heading và văn bản liên kết để hiểu một trang.

Bài 8.3 đã kiểm tra cấu trúc heading và mục đích của liên kết. Trong bài học này, bạn chỉ cần xác nhận rằng:

- Heading chính của mỗi trang khớp với chủ đề đã phê duyệt của trang đó.
- Heading chính, tiêu đề trang và mô tả đều mô tả cùng một trang.
- Văn bản liên kết mô tả đích đến của nó, như tên một liệu trình đã phê duyệt, thay vì “Nhấp vào đây”.
- Hình ảnh có văn bản thay thế (alt text) đã được ghi lại trong Bài 5.2.

Đừng viết lại heading hoặc thêm từ khóa tìm kiếm vào heading. Heading là nội dung đã được phê duyệt.

## 6. Xác định route trùng lặp và địa chỉ ưu tiên

Đôi khi cùng một trang có thể tải ở nhiều địa chỉ.

| Biến thể | Ví dụ |
|---|---|
| Dấu gạch chéo ở cuối | `/treatments` và `/treatments/` |
| Chữ in hoa | `/Treatments` và `/treatments` |
| Tham số truy vấn | `/treatments?ref=footer` |
| Route cũ hoặc trùng lặp | Hai route cùng hiển thị một trang |

Công cụ tìm kiếm có thể coi đây là các trang riêng biệt, làm phân tán tín hiệu của chúng hoặc hiển thị sai địa chỉ.

Kiểm tra cách website xử lý từng biến thể với một số trang mẫu:

1. Mở route đã được phê duyệt.
2. Mở cùng route đó khi có và không có dấu gạch chéo ở cuối.
3. Mở route đó khi thêm một tham số truy vấn.
4. Ghi lại xem mỗi trường hợp tải trang, chuyển hướng hay trả về trang không tìm thấy.

### Địa chỉ chuẩn (canonical)

**Canonical URL** cho công cụ tìm kiếm biết địa chỉ nào là phiên bản ưu tiên của một trang. Nó được đặt bằng phần tử `link`:

```html
<link rel="canonical" href="https://[production domain]/[approved route]" />
```

Canonical URL thường dùng địa chỉ production đầy đủ. Tên miền production là một quyết định về deploy. Nếu nó chưa được xác nhận, hãy ghi nhận sự phụ thuộc này thay vì tự đặt ra một tên miền.

Kiểm tra để đảm bảo canonical URL của mỗi trang, nếu đã được triển khai:

- Trỏ đến địa chỉ ưu tiên của chính trang đó, không trỏ đến trang chủ hay trang khác.
- Dùng tên miền production đã được xác nhận.
- Khớp với route trong IA đã phê duyệt.

Canonical URL trỏ mọi trang về trang chủ là một lỗi nghiêm trọng. Nó cho công cụ tìm kiếm biết rằng các trang còn lại là bản trùng lặp.

## 7. Hiểu các cơ chế kiểm soát thu thập dữ liệu và lập chỉ mục

Mỗi cơ chế kiểm soát làm một việc khác nhau. Nhầm lẫn giữa chúng là một sai lầm phổ biến và tốn kém.

| Cơ chế kiểm soát | Tác dụng | Không có tác dụng |
|---|---|---|
| Tệp `robots.txt` | Cho trình thu thập dữ liệu biết những địa chỉ nào không được truy cập | Không giữ một trang ngoài kết quả tìm kiếm một cách đáng tin cậy |
| Quy tắc `noindex` | Cho công cụ tìm kiếm biết không đưa trang vào kết quả | Không ngăn mọi người truy cập trang |
| Bảo vệ bằng mật khẩu | Chặn trình thu thập dữ liệu và những người không có quyền truy cập | Cần cấu hình trên nền tảng lưu trữ (host) |

Theo tài liệu của Google, một trang bị chặn bởi `robots.txt` vẫn có thể xuất hiện trong kết quả nếu các trang khác liên kết đến nó, vì công cụ tìm kiếm không bao giờ đọc chính trang đó. Quy tắc `noindex` chỉ có tác dụng nếu trình thu thập dữ liệu truy cập được trang để đọc nó. Google không hỗ trợ `noindex` bên trong `robots.txt`.

Quy tắc `noindex` có thể được đặt trong HTML của trang:

```html
<meta name="robots" content="noindex" />
```

Hoặc dưới dạng HTTP response header do máy chủ hoặc host gửi:

```text
X-Robots-Tag: noindex
```

### Hai tình huống cần kiểm tra

| Môi trường | Trạng thái mong đợi |
|---|---|
| Staging hoặc preview | Được bảo vệ, hoặc được đánh dấu `noindex`, để các phiên bản thử nghiệm không xuất hiện trong kết quả tìm kiếm |
| Production | Không có `noindex` trên những trang cần xuất hiện trong kết quả tìm kiếm |

Một quy tắc `noindex` còn sót lại từ staging có thể khiến toàn bộ website bị loại khỏi kết quả tìm kiếm sau khi ra mắt. Đây là một lỗi phổ biến khi ra mắt.

Hãy tìm hiểu cách dự án kiểm soát việc lập chỉ mục cho từng môi trường. Việc này có thể được đặt trong mã, trong cấu hình hoặc trên host. Bài 9.4 sẽ kiểm tra trực tiếp môi trường staging.

## 8. Chỉ kiểm tra các tính năng tìm kiếm tùy chọn khi nằm trong phạm vi

Một số tính năng giúp công cụ tìm kiếm hoặc nền tảng mạng xã hội trình bày các trang. Chỉ triển khai và kiểm tra chúng khi phạm vi đã phê duyệt bao gồm chúng.

| Tính năng | Mục đích | Kiểm tra nếu nằm trong phạm vi |
|---|---|---|
| **XML sitemap** | Liệt kê các trang mà website muốn được thu thập dữ liệu | Chỉ liệt kê các trang production đã phê duyệt và có thể lập chỉ mục |
| **Metadata chia sẻ mạng xã hội**, như Open Graph | Kiểm soát tiêu đề, mô tả và hình ảnh khi một trang được chia sẻ | Dùng câu chữ và hình ảnh đã phê duyệt |
| **Dữ liệu có cấu trúc (structured data)** | Mô tả trang theo định dạng mà công cụ tìm kiếm đọc được, như thông tin doanh nghiệp | Khớp chính xác với nội dung hiển thị trên trang |

Dữ liệu có cấu trúc không được mô tả thông tin không có trên trang, như các đánh giá hay xếp hạng bịa đặt. Thông tin doanh nghiệp, giờ mở cửa và địa chỉ phải đến từ các nguồn đã được phê duyệt.

## 9. Xác minh metadata đã được hiển thị

Mã nguồn cho thấy phần triển khai dự định làm gì. Trang đã hiển thị cho thấy những gì khách truy cập và công cụ tìm kiếm thực sự nhận được.

Với mỗi trang đã chọn:

1. Mở trang trong trình duyệt.
2. Mở công cụ dành cho nhà phát triển và chọn bảng **Elements**.
3. Mở rộng phần tử `head`.
4. Kiểm tra `title`, mô tả, liên kết canonical và mọi quy tắc robots.

Một số website thêm hoặc thay đổi metadata bằng JavaScript sau khi trang tải. Hãy so sánh bảng Elements với tùy chọn **View page source** của trình duyệt, vốn hiển thị HTML ban đầu. Nếu chúng khác nhau, hãy ghi lại những giá trị nào công cụ tìm kiếm có thể thấy trước tiên và nhờ Claude giải thích cách dự án khởi đầu hiển thị metadata.

### Dùng Lighthouse

Danh mục **SEO** của Lighthouse kiểm tra mức sẵn sàng cơ bản cho tìm kiếm, như trang có tiêu đề và mô tả hay không, có bị chặn lập chỉ mục hay không và các liên kết có văn bản mô tả hay không. Giống như danh mục khả năng tiếp cận, nó chỉ kiểm tra những gì nó có thể phát hiện tự động.

### Tự động hóa các kiểm tra ổn định

Mở rộng các bài kiểm thử Playwright từ Bài 8.4 cho những metadata không được phép thay đổi ngoài ý muốn:

```ts
import { test, expect } from "@playwright/test";

const APPROVED_TITLE = "[Approved page title]";
const APPROVED_DESCRIPTION = "[Approved page description]";

test("treatment page has its approved title and description", async ({
  page,
}) => {
  await page.goto("[Approved route]");

  await expect(page).toHaveTitle(APPROVED_TITLE);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    APPROVED_DESCRIPTION,
  );
});
```

Chỉ thêm bài kiểm thử kiểm tra rằng các trang production không mang quy tắc `noindex` khi dự án có cách để kiểm thử cấu hình production. Đừng chạy kiểm thử trên website production đang hoạt động khi chưa được cho phép.

## 10. Ghi lại metadata trong sổ theo dõi trang hiện có

Thêm các cột metadata vào sổ theo dõi hoàn thành trang từ Bài 6.4 thay vì tạo một sổ mới.

| Trang | Route | Trạng thái tiêu đề | Trạng thái mô tả | Canonical | Lập chỉ mục | Ghi chú |
|---|---|---|---|---|---|---|
| Danh sách liệu trình | Route đã phê duyệt | Khớp bản đã duyệt | Khớp bản đã duyệt | Đúng | Có thể lập chỉ mục | Không có |
| Chi tiết liệu trình | Route đã phê duyệt | Khớp bản đã duyệt | Sao chép từ trang khác | Đúng | Có thể lập chỉ mục | Phát hiện QA-SEO-02 |
| Trang địa điểm | Route đã phê duyệt | Câu chữ đề xuất | Câu chữ đề xuất | Chưa xác nhận tên miền | Chưa kiểm tra | Chờ quyết định biên tập |

Các dòng này chỉ mang tính minh họa. Hãy ghi lại các trang và kết quả thực tế.

Thêm các lỗi vào hồ sơ QA với danh mục “Mức sẵn sàng cho tìm kiếm” và tuân theo quy trình sửa lỗi từ Bài 8.2.

## 11. Nhờ Claude rà soát mức sẵn sàng cho tìm kiếm

```text
Review search readiness for the selected pages.

Before reviewing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Identify how the starter sets page titles, descriptions,
  canonical links and robots rules.
- Read the approved metadata, IA routes and page copy.

Check for each selected page:
- Rendered title and description against approved wording.
- Uniqueness of titles and descriptions across pages.
- Main heading consistency with the title and description.
- Canonical link target, where implemented.
- Robots rules in the HTML and, where visible, response headers.
- Behaviour of the route with and without a trailing slash
  and with a query parameter.
- Sitemap, social sharing metadata or structured data,
  only if they are in the approved scope.

Compare source code with the rendered head.
Report how indexing is controlled for each environment.
Identify any noindex rule that could reach production.

For each finding, report the page, expected result and
source, actual result, evidence and affected scope.
Do not propose new wording unless I ask for it.
Do not promise ranking outcomes.

Review only. Do not edit files, commit, push or deploy.

Scope and references:
[Insert selected pages, routes and exact references.]
```

## 12. Bài tập thực hành

**Nhiệm vụ: Kiểm tra mức sẵn sàng cho tìm kiếm trên các trang đã triển khai.**

1. Xác nhận nguồn metadata đã được phê duyệt, hoặc ghi nhận lỗ hổng.
2. Xác định cách dự án khởi đầu đặt metadata.
3. Kiểm tra tiêu đề và mô tả của mọi trang đã nộp.
4. Xác nhận tính nhất quán của heading và văn bản liên kết.
5. Kiểm thử các biến thể route với một số trang mẫu.
6. Kiểm tra liên kết canonical và các cơ chế kiểm soát lập chỉ mục.
7. Chỉ kiểm tra các tính năng tùy chọn nếu chúng nằm trong phạm vi.
8. Xác minh metadata đã hiển thị trong trình duyệt và bằng Lighthouse.
9. Thêm các bài kiểm thử metadata khi phù hợp.
10. Cập nhật sổ theo dõi trang và hồ sơ QA.

Nếu thiếu câu chữ cho metadata, hãy đề xuất để duyệt và giữ nguyên đánh dấu là đang chờ quyết định.

## 13. Sản phẩm cần nộp

Nộp:

- Nguồn metadata đã dùng, hoặc lỗ hổng đã ghi nhận.
- Cách dự án khởi đầu đặt metadata.
- Sổ theo dõi trang đã cập nhật với các cột metadata.
- Kết quả kiểm tra các biến thể route.
- Các phát hiện về canonical và cơ chế kiểm soát lập chỉ mục cho từng môi trường.
- Kết quả SEO của Lighthouse kèm phần xác minh của bạn.
- Các bài kiểm thử Playwright mới hoặc đã cập nhật.
- Câu chữ đề xuất, được đánh dấu rõ là đang chờ quyết định.
- Các phát hiện mới trong hồ sơ QA.

## 14. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Mọi trang đã nộp đều được kiểm tra tiêu đề và mô tả.
- Câu chữ metadata tuân theo các nguồn đã phê duyệt hoặc đang chờ quyết định.
- Hành vi của các route trùng lặp được ghi lại.
- Liên kết canonical trỏ đến đúng địa chỉ ưu tiên.
- Các cơ chế kiểm soát lập chỉ mục được hiểu rõ cho từng môi trường.
- Metadata đã hiển thị được xác minh trong trình duyệt.
- Không hứa hẹn bất kỳ kết quả thứ hạng nào.

## 15. Kiểm tra kiến thức

1. Thu thập dữ liệu khác với lập chỉ mục như thế nào?
2. Vì sao một trang bị chặn bởi `robots.txt` vẫn có thể xuất hiện trong kết quả tìm kiếm?
3. Vì sao một quy tắc `noindex` còn sót lại từ staging lại nguy hiểm sau khi ra mắt?
4. Ai là người phê duyệt câu chữ của tiêu đề và mô tả trang?
5. Điều gì sai khi liên kết canonical của mọi trang đều trỏ về trang chủ?
