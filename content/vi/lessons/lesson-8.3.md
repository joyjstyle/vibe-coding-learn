# Bài 8.3: Thực hiện rà soát khả năng tiếp cận có trọng tâm

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Xác nhận yêu cầu về khả năng tiếp cận áp dụng cho website.
- Lập kế hoạch một đợt rà soát có trọng tâm trên các trang, component và trạng thái mang tính đại diện.
- Kiểm tra cấu trúc trang, độ tương phản màu, tiêu điểm bàn phím, thu phóng và dàn lại bố cục (reflow).
- Dùng các công cụ quét tự động trong khi vẫn nhận biết những gì chúng không phát hiện được.
- Ghi các phát hiện về khả năng tiếp cận vào hồ sơ QA hiện có mà không phóng đại phạm vi bao quát.

**Điều kiện tiên quyết:** Hoàn thành Bài 8.2 và có sẵn hồ sơ QA hiện tại cùng trạng thái các bản sửa.

**Tài liệu cần chuẩn bị:** Yêu cầu về khả năng tiếp cận đã được phê duyệt, thiết kế và hướng dẫn phong cách (style guide) đã được phê duyệt, website đã triển khai, hồ sơ QA từ Bài 8.1 và 8.2, và bằng chứng về bàn phím và biểu mẫu trước đó từ Học phần 5 đến 7.

## 1. Tập hợp các bước kiểm tra khả năng tiếp cận

**Khả năng tiếp cận** (accessibility) nghĩa là mọi người có thể nhận biết, hiểu, điều hướng và thao tác với website, kể cả những người dùng công nghệ hỗ trợ như trình đọc màn hình, trình phóng to màn hình, điều khiển bằng giọng nói hoặc chỉ điều hướng bằng bàn phím.

Các bài học trước đã có những bước kiểm tra khả năng tiếp cận:

| Bài học trước | Các bước kiểm tra khả năng tiếp cận đã thực hành |
|---|---|
| 4.3 | Liên kết để điều hướng, nút bấm cho hành động, khả năng truy cập bằng bàn phím |
| 5.2 | Văn bản thay thế cho hình ảnh |
| 5.3 | Thứ tự nội dung, tiêu điểm nhìn thấy được, hành vi khi thu phóng |
| 6.3 | Trạng thái trang hiện tại không chỉ dựa vào màu sắc |
| 7.1 đến 7.3 | Nhãn, liên kết thông báo lỗi, di chuyển tiêu điểm và phản hồi |

Những bước kiểm tra đó gắn với từng nhiệm vụ riêng lẻ. Bài học này rà soát website đã được ghép hoàn chỉnh một cách có hệ thống và bổ sung các bước kiểm tra chưa được bao quát, đặc biệt là độ tương phản màu, cấu trúc trang và reflow.

**Một đợt rà soát khả năng tiếp cận có trọng tâm tạo ra bằng chứng về các bước kiểm tra đã chọn. Nó không phải là một cuộc kiểm định tuân thủ đầy đủ và không thay thế việc kiểm thử cùng người khuyết tật.**

## 2. Xác nhận yêu cầu

Trước khi kiểm tra bất cứ điều gì, hãy xác lập tiêu chuẩn mà dự án sử dụng.

Nhiều dự án áp dụng **Hướng dẫn về Khả năng tiếp cận Nội dung Web (WCAG)**, do World Wide Web Consortium (W3C) ban hành. WCAG 2.2 là Khuyến nghị (Recommendation) hiện hành của W3C. Các yêu cầu của nó được gọi là **tiêu chí thành công** (success criteria), được nhóm thành các Mức A, AA và AAA. Mức AA là mục tiêu phổ biến của các dự án.

Hãy kiểm tra PRD, quy tắc làm việc hoặc bản mô tả đã được phê duyệt để tìm:

| Câu hỏi | Vì sao quan trọng |
|---|---|
| Tiêu chuẩn và mức nào được áp dụng? | Quyết định điều gì được tính là lỗi |
| Có trang hoặc tính năng nào bị loại trừ không? | Xác định phạm vi rà soát |
| Có kế hoạch kiểm định chuyên sâu không? | Làm rõ những gì đợt rà soát này không bao quát |
| Có nghĩa vụ pháp lý hoặc hợp đồng nào không? | Những điều này cần quyết định của người hướng dẫn hoặc chuyên gia |

Nếu chưa có yêu cầu nào được ghi lại, đừng âm thầm tự chọn một yêu cầu. Hãy ghi lại một **thiếu sót trong đặc tả**, đề xuất một mục tiêu như WCAG 2.2 Mức AA để được duyệt, và chỉ tiếp tục với những bước kiểm tra mà người hướng dẫn đồng ý.

Đừng tự quyết định liệu doanh nghiệp có đáp ứng một nghĩa vụ pháp lý hay không. Hãy báo cáo những gì bạn đã kiểm tra.

## 3. Lập kế hoạch bao quát mang tính đại diện

Bạn không cần kiểm thử mọi tiêu chí thành công trên mọi trang để tạo ra bằng chứng hữu ích. Nhưng bạn cần nêu rõ những gì mình đã bao quát.

Hãy chọn:

- Mỗi bố cục hoặc template trang riêng biệt.
- Mỗi trang độc nhất không dùng chung template.
- Mỗi tính năng tương tác từ Học phần 7, trong các trạng thái liên quan của nó.
- Các hành trình người dùng quan trọng đã được phê duyệt.
- Menu di động khi đang mở và mọi lớp phủ (overlay) khác.

| Mục bao quát | Ví dụ lựa chọn |
|---|---|
| Template | Trang chủ, một trang chi tiết liệu trình, một trang thông tin |
| Trang độc nhất | Bất kỳ trang nào có bố cục riêng |
| Component | Header, menu di động, footer, thẻ, biểu mẫu |
| Trạng thái | Menu đang mở, lỗi biểu mẫu, biểu mẫu gửi thành công, nút điều khiển đang có tiêu điểm |
| Hành trình | Các hành trình đã được phê duyệt đã kiểm thử ở Bài 6.3 |

Hãy dùng các trang và tính năng thực tế trong dự án của bạn. Ghi lại lựa chọn vào ma trận bao quát QA từ Bài 8.1 thay vì tạo một sổ đăng ký riêng.

### Tái sử dụng bằng chứng còn hợp lệ

Nếu một bước kiểm tra bàn phím hoặc biểu mẫu trước đó vẫn áp dụng cho phần triển khai hiện tại, hãy trích dẫn nó. Chỉ lặp lại khi các thay đổi về sau đã ảnh hưởng đến component hoặc trang đó.

## 4. Kiểm tra cấu trúc trang

Người dùng trình đọc màn hình thường di chuyển trong trang theo heading, landmark và liên kết. Một cấu trúc rõ ràng giúp họ tìm thông tin nhanh chóng.

Hãy kiểm tra mỗi trang đã chọn về:

| Bước kiểm tra | Kết quả mong đợi |
|---|---|
| Tiêu đề trang | Mô tả trang và khác nhau giữa các trang |
| Ngôn ngữ trang | Thuộc tính `lang` trên phần tử `html` khớp với ngôn ngữ của nội dung |
| Heading chính | Một heading chính rõ ràng nêu mục đích của trang |
| Thứ tự heading | Các cấp heading phản ánh thứ bậc nội dung, không nhảy cấp vì hiệu ứng hình ảnh |
| Landmark | Có thể nhận diện header, thanh điều hướng, nội dung chính và footer |
| Liên kết bỏ qua (skip link) | Có mặt và hoạt động nếu dự án yêu cầu |
| Văn bản liên kết | Mục đích của mỗi liên kết rõ ràng từ văn bản hoặc ngữ cảnh của nó |
| Danh sách và bảng | Dùng mã đánh dấu danh sách và bảng khi nội dung là danh sách hoặc bảng |

Một **landmark** là một vùng của trang mà công nghệ hỗ trợ có thể nhảy đến, như nội dung chính hoặc thanh điều hướng của website. Trong HTML và TSX, các phần tử như `<header>`, `<nav>`, `<main>` và `<footer>` tạo ra landmark.

### Ví dụ minh họa cấu trúc bố cục

```tsx
import type { ReactNode } from "react";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header>
        <nav aria-label="Main">{/* Existing navigation */}</nav>
      </header>
      <main id="main-content">{children}</main>
      <footer>{/* Existing footer */}</footer>
    </>
  );
}
```

Ví dụ này cho thấy cấu trúc cần tìm. Nó không phải là yêu cầu phải tái cấu trúc bố cục của bạn. Hãy kiểm tra xem dự án khởi đầu thực tế đã cung cấp các vùng này như thế nào trước khi đề xuất thay đổi.

### Cách kiểm tra cấu trúc

1. Mở trang trong Chrome hoặc Edge.
2. Mở công cụ dành cho nhà phát triển và chọn bảng **Elements**.
3. Kiểm tra phần tử `html` để tìm thuộc tính `lang`.
4. Xác định vị trí heading chính và các phần tử landmark.
5. Dùng khung accessibility, nếu có, để xem vai trò (role) và tên có thể truy cập (accessible name) của mỗi phần tử.

Đừng đánh giá thứ tự heading theo cỡ chữ. Một heading trông nhỏ vẫn có thể là heading cấp 2, và chữ lớn không tự động là heading.

## 5. Kiểm tra độ tương phản màu

**Tỷ lệ tương phản** so sánh độ sáng của hai màu, như màu chữ và màu nền của nó. Độ tương phản thấp khiến nội dung khó đọc với nhiều người, kể cả người có thị lực kém.

WCAG 2.2 Mức AA đặt ra các mức tối thiểu sau:

| Nội dung | Tỷ lệ tối thiểu | Tiêu chí thành công |
|---|---|---|
| Văn bản thường | 4.5:1 | 1.4.3 Contrast (Minimum) |
| Văn bản lớn | 3:1 | 1.4.3 Contrast (Minimum) |
| Thông tin hình ảnh cần để nhận diện nút điều khiển và trạng thái của chúng, như viền ô nhập liệu và chỉ báo tiêu điểm | 3:1 so với các màu liền kề | 1.4.11 Non-text Contrast |
| Các phần của đồ họa cần để hiểu nội dung | 3:1 so với các màu liền kề | 1.4.11 Non-text Contrast |

WCAG định nghĩa văn bản lớn một cách chính xác. Hãy dùng định nghĩa trong hướng dẫn của W3C thay vì ước lượng bằng mắt.

### Cách kiểm tra độ tương phản

1. Kiểm tra phần tử văn bản trong công cụ dành cho nhà phát triển.
2. Chọn giá trị màu trong khung **Styles**. Chrome và Edge hiển thị tỷ lệ tương phản cho màu chữ.
3. Với văn bản đặt trên hình ảnh hoặc dải màu chuyển (gradient), hãy kiểm tra vùng có độ tương phản thấp nhất mà văn bản thực sự nằm trên đó, ở mỗi độ rộng khung nhìn bắt buộc.
4. Kiểm tra các trạng thái hover, focus, đã truy cập (visited) và bị vô hiệu hóa mà thiết kế có đặc tả, nhưng lưu ý rằng WCAG không đặt yêu cầu tương phản cho các component không hoạt động.

Các tỷ lệ là ngưỡng. Một tỷ lệ tính được là 4.49:1 không đạt mức 4.5:1.

### Khi các màu đã được phê duyệt không đạt

Các màu đến từ thiết kế và hướng dẫn phong cách đã được phê duyệt. Nếu một tổ hợp màu đã được phê duyệt không đạt yêu cầu đã thống nhất:

1. Ghi lại phát hiện với tỷ lệ đo được, vị trí và các màu.
2. Phân loại nó là một xung đột giữa hai yêu cầu đã được phê duyệt.
3. Chuyển lên cấp trên như một quyết định thiết kế.

Đừng tự thay đổi màu thương hiệu để vượt qua một bước kiểm tra độ tương phản. Thay đổi một giá trị màu dùng chung sẽ ảnh hưởng đến mọi trang sử dụng nó.

## 6. Kiểm tra truy cập bằng bàn phím và tiêu điểm

Hãy lặp lại các bước kiểm tra bàn phím trên toàn bộ website đã được ghép, tập trung vào những gì đã thay đổi kể từ Học phần 7 và những khu vực chưa từng được kiểm tra cùng nhau.

Dùng phím **Tab** để di chuyển tới, **Shift** và **Tab** để di chuyển lùi, **Enter** để mở liên kết, và **Enter** hoặc **Space** để kích hoạt nút bấm.

| Bước kiểm tra | Kết quả mong đợi | Tiêu chí thành công |
|---|---|---|
| Mọi nút điều khiển đều có thể truy cập | Liên kết, nút bấm và điều khiển biểu mẫu nhận được tiêu điểm | 2.1.1 Keyboard |
| Thứ tự tiêu điểm hợp lý | Tiêu điểm đi theo thứ tự hiển thị và thứ tự đọc | 2.4.3 Focus Order |
| Tiêu điểm nhìn thấy được | Một chỉ báo nhìn thấy được cho biết tiêu điểm đang ở đâu | 2.4.7 Focus Visible |
| Tiêu điểm không bị che khuất | Một nút điều khiển đang có tiêu điểm không bị che hoàn toàn bởi header dính (sticky), banner cookie hoặc nội dung khác do tác giả tạo ra | 2.4.11 Focus Not Obscured (Minimum) |
| Không có bẫy bàn phím | Tiêu điểm luôn có thể rời khỏi một component | 2.1.2 No Keyboard Trap |
| Vùng nhấp bằng con trỏ dùng được | Vùng nhấp có kích thước ít nhất 24 x 24 pixel CSS, hoặc đáp ứng các ngoại lệ về khoảng cách hoặc ngoại lệ khác trong WCAG | 2.5.8 Target Size (Minimum) |

Focus Not Obscured và Target Size (Minimum) được bổ sung trong WCAG 2.2. Header dính là nguyên nhân phổ biến của vấn đề thứ nhất: khi bạn nhấn Tab xuống dưới trang, một liên kết đang có tiêu điểm có thể bị cuộn xuống bên dưới header.

Hãy đo kích thước vùng nhấp trong công cụ dành cho nhà phát triển thay vì ước lượng. Đọc các ngoại lệ trong tài liệu Understanding của W3C trước khi ghi một liên kết văn bản nhỏ nằm trong dòng là lỗi.

## 7. Kiểm tra thu phóng, thay đổi cỡ chữ và reflow

Một số người phóng to nội dung để đọc.

| Bước kiểm tra | Cách kiểm thử | Tiêu chí thành công |
|---|---|---|
| Thay đổi cỡ chữ | Thu phóng trình duyệt lên 200% và xác nhận nội dung và chức năng vẫn khả dụng | 1.4.4 Resize Text |
| Reflow | Đặt trình duyệt ở độ rộng 1280 pixel CSS và thu phóng lên 400%, tạo ra khung nhìn tương đương rộng 320 pixel CSS | 1.4.10 Reflow |

Ở độ rộng reflow, hãy kiểm tra rằng:

- Có thể đọc nội dung chỉ bằng cách cuộn dọc.
- Không có thông tin hay nút điều khiển nào biến mất.
- Thanh điều hướng trên di động vẫn dùng được.
- Các phần tử dính không che phần lớn màn hình.
- Các từ dài, địa chỉ email hoặc liên kết được ngắt dòng thay vì buộc phải cuộn ngang.

Một số nội dung, như bản đồ hoặc bảng dữ liệu, có thể cần cuộn theo hai chiều. WCAG cho phép ngoại lệ đối với nội dung cần điều đó. Hãy ghi lại ngoại lệ và lý do của nó thay vì bỏ qua.

Bài 5.3 đã kiểm tra thu phóng trên trang chủ. Hãy lặp lại bước kiểm tra này trên các template khác đã chọn.

## 8. Kiểm tra lại biểu mẫu, phản hồi và chuyển động

Hãy dùng bằng chứng từ Học phần 7 và chỉ kiểm tra lại ở những chỗ các thay đổi về sau đã ảnh hưởng.

Với biểu mẫu, hãy xác nhận rằng:

- Mỗi điều khiển có một nhãn nhìn thấy được và được liên kết với nó trong mã.
- Các trường bắt buộc được nhận diện bằng văn bản, không chỉ bằng màu sắc.
- Thông báo lỗi chỉ rõ trường và mô tả vấn đề.
- Các thông báo trạng thái, như kết quả gửi, được đọc lên hoặc có thể truy cập như đã đặc tả.

Với nội dung chuyển động, hãy kiểm tra xem website có:

| Nội dung | Yêu cầu cần kiểm tra |
|---|---|
| Carousel hoặc nội dung tự động chuyển | Có cách tạm dừng, dừng hoặc ẩn nếu nó chuyển động lâu hơn năm giây (2.2.2 Pause, Stop, Hide) |
| Hoạt ảnh | Tuân theo mọi yêu cầu giảm chuyển động (reduced motion) đã được phê duyệt |
| Video hoặc âm thanh | Phụ đề hoặc phương án thay thế theo yêu cầu của phạm vi đã được phê duyệt |

Chỉ kiểm tra những tính năng có tồn tại. Đừng thêm carousel, video hay hoạt ảnh để hoàn thành đợt rà soát.

## 9. Dùng công cụ quét tự động đúng cách

Công cụ quét tự động kiểm tra trang theo các quy tắc và báo cáo những vấn đề có khả năng xảy ra. Các lựa chọn phổ biến gồm:

- Nhóm **Accessibility** trong Lighthouse, có trong công cụ dành cho nhà phát triển của Chrome.
- Tiện ích mở rộng trình duyệt axe DevTools.

Các bước kiểm tra khả năng tiếp cận của Lighthouse được vận hành bởi engine axe.

Công cụ tự động hữu ích để tìm các vấn đề như thiếu nhãn, thiếu thuộc tính văn bản thay thế, một số lỗi tương phản và giá trị thuộc tính không hợp lệ. Chúng không thể đánh giá nhiều yêu cầu, ví dụ:

- Văn bản thay thế có mô tả chính xác hình ảnh không.
- Một heading có thực sự mô tả phần của nó không.
- Thứ tự tiêu điểm có hợp lý không.
- Một thông báo lỗi có dễ hiểu không.
- Nội dung đặt trên một bức ảnh có đọc được ở mọi chỗ văn bản nằm trên không.

**Một lần quét tự động sạch lỗi nghĩa là công cụ không tìm thấy vấn đề nào mà nó có thể phát hiện. Nó không có nghĩa là trang có khả năng tiếp cận.**

### Cách chạy một lần quét khả năng tiếp cận bằng Lighthouse

1. Mở trang trong Chrome.
2. Mở công cụ dành cho nhà phát triển và chọn bảng **Lighthouse**.
3. Trong phần categories, chọn **Accessibility**. Bạn có thể bỏ chọn các mục khác để chạy nhanh hơn.
4. Chọn loại thiết bị phù hợp với điều kiện rà soát.
5. Chạy phân tích.
6. Mở từng mục kiểm tra không đạt và tự mình kiểm tra các phần tử bị ảnh hưởng.

Hãy ghi lại công cụ, phiên bản của nó nếu có hiển thị, trang, thiết lập thiết bị và ngày. Điểm số không phải là phát hiện. Mỗi vấn đề được báo cáo vẫn cần được xác minh trước khi trở thành một phát hiện.

Bài 8.4 hướng dẫn cách chạy quét tự động như một phần của các bài kiểm thử Playwright.

## 10. Thực hiện kiểm tra nhanh bằng trình đọc màn hình

Một **trình đọc màn hình** (screen reader) đọc to nội dung trang và cho phép người dùng điều hướng theo heading, landmark, liên kết và điều khiển biểu mẫu.

Hãy dùng trình đọc màn hình có sẵn trên máy tính của bạn, như VoiceOver trên macOS hoặc NVDA trên Windows. Học các lệnh cơ bản của nó từ hướng dẫn chính thức trước khi bắt đầu.

Với một trang đại diện và một biểu mẫu:

1. Nghe tiêu đề trang khi trang tải xong.
2. Di chuyển qua các heading và xác nhận chúng mô tả đúng nội dung.
3. Di chuyển đến landmark main.
4. Di chuyển qua các liên kết và xác nhận mục đích của chúng rõ ràng.
5. Hoàn tất biểu mẫu bằng dữ liệu tổng hợp, kích hoạt một lỗi kiểm tra dữ liệu và xác nhận lỗi được đọc lên hoặc có thể truy cập.

Hãy ghi lại những gì bạn đã kiểm tra, trình đọc màn hình và trình duyệt bạn đã dùng, cùng phiên bản của chúng.

Một lần kiểm tra nhanh của người mới bắt đầu chỉ là bằng chứng hạn chế. Các trình đọc màn hình và trình duyệt kết hợp với nhau theo những cách khác nhau, và người dùng có kinh nghiệm điều hướng khác với một người kiểm thử mới. Đừng báo cáo website là tương thích với trình đọc màn hình dựa trên lần kiểm tra này.

## 11. Ghi lại các phát hiện về khả năng tiếp cận

Hãy thêm các phát hiện vào hồ sơ QA hiện có từ Bài 8.1.

Với các phát hiện về khả năng tiếp cận, hãy ghi kèm tiêu chí thành công nếu có áp dụng.

| Mục | Ví dụ |
|---|---|
| Mã | QA-A11Y-03 |
| Vị trí | Template chi tiết liệu trình, phần giới thiệu |
| Điều kiện | Chrome trên máy tính, khung nhìn 1280 x 800, thu phóng 100% |
| Mong đợi | Độ tương phản văn bản nội dung ít nhất 4.5:1 (WCAG 2.2, 1.4.3) |
| Thực tế | Đo được 3.9:1, màu chữ so với nền của phần |
| Bằng chứng | Ảnh chụp màn hình chỉ số tương phản trong công cụ dành cho nhà phát triển |
| Tác động | Ảnh hưởng đến mọi trang dùng template này |
| Phân loại | Xung đột với màu trong hướng dẫn phong cách đã được phê duyệt |
| Trạng thái | Chờ quyết định |

Ví dụ này chỉ mang tính minh họa. Hãy ghi lại các số đo thực tế từ dự án của bạn.

Hãy dùng các mức ưu tiên từ Bài 8.1. Một lỗi khiến người dùng bàn phím không thể hoàn tất một hành động bắt buộc thường là chặn sử dụng. Một chút thiếu hụt tương phản trên một chú thích trang trí thường có mức ưu tiên thấp hơn.

Hãy sửa các lỗi đã được xác minh theo quy trình từ Bài 8.2: các nhiệm vụ sửa lỗi có giới hạn rõ ràng, kiểm thử lại trong đúng các điều kiện ban đầu và các bước kiểm tra hồi quy có trọng tâm.

## 12. Nhờ Claude hỗ trợ đợt rà soát

```text
Run a focused accessibility review of the selected pages,
components and states.

Before reviewing:
- Read the relevant project instructions.
- Confirm the accessibility requirement recorded for the project.
- Confirm the implementation and Git working state.
- Read the existing QA record and earlier accessibility evidence.
- Identify which browser and scanning tools you can actually use.

Check, where applicable:
- Page titles, page language, headings and landmarks.
- Link purpose and alternative text presence.
- Text and non-text contrast for the selected states.
- Keyboard reach, focus order, visible focus and focus
  hidden by sticky or overlapping content.
- Target sizes for small controls.
- Reflow at a viewport equivalent to 320 CSS pixels wide
  and text resizing to 200%.
- Form labels, error identification and status messages.
- Moving content and pause controls, if present.

Reuse valid earlier evidence and state where you did so.
For each finding, report the location, conditions, expected
result with the relevant success criterion, actual result,
evidence, likely affected scope and suggested classification.

Separate automated tool results from checks you verified.
List checks you could not perform and why.

Review only. Do not edit files, install dependencies,
commit, push or deploy. Do not claim conformance.
Use synthetic information in any form.

Scope and references:
[Insert selected pages, components, states and the
recorded accessibility requirement.]
```

Hãy tự mình kiểm tra các phát hiện của Claude trước khi ghi lại. Nếu Claude báo cáo một tỷ lệ tương phản, hãy xác nhận nó bằng phép đo của riêng bạn.

## 13. Bài tập thực hành

**Nhiệm vụ: Thực hiện một đợt rà soát khả năng tiếp cận có trọng tâm cho website đã triển khai.**

1. Xác nhận yêu cầu về khả năng tiếp cận đã được ghi lại, hoặc ghi lại thiếu sót.
2. Chọn các template, trang độc nhất, component và trạng thái mang tính đại diện.
3. Kiểm tra cấu trúc trang trên mỗi trang đã chọn.
4. Đo độ tương phản cho văn bản và các thành phần giao diện chính.
5. Hoàn tất các bước kiểm tra bàn phím, tiêu điểm và kích thước vùng nhấp.
6. Kiểm thử thay đổi cỡ chữ 200% và reflow ở 320 pixel CSS.
7. Chạy một lần quét tự động và xác minh từng vấn đề được báo cáo.
8. Hoàn tất một lần kiểm tra nhanh bằng trình đọc màn hình trên một trang và một biểu mẫu.
9. Thêm các phát hiện đã được xác minh vào hồ sơ QA.
10. Chuẩn bị các nhiệm vụ sửa lỗi cho các lỗi đã được xác minh và chuyển các xung đột thiết kế lên cấp trên.

Đừng bịa ra lỗi để lấp đầy bài tập. Nếu một bước kiểm tra đạt, hãy ghi lại bằng chứng.

## 14. Sản phẩm cần nộp

Nộp:

- Yêu cầu về khả năng tiếp cận đã sử dụng, hoặc thiếu sót trong đặc tả đã được ghi lại.
- Lựa chọn bao quát kèm lý do.
- Kết quả về cấu trúc, độ tương phản, bàn phím, thu phóng và reflow.
- Kết quả quét tự động kèm phần xác minh của bạn cho từng mục.
- Ghi chú kiểm tra nhanh bằng trình đọc màn hình, công cụ và phiên bản.
- Các phát hiện mới và đã cập nhật trong hồ sơ QA.
- Các nhiệm vụ sửa lỗi được đề xuất và các quyết định đã chuyển lên cấp trên.
- Một tuyên bố về những gì đợt rà soát này không bao quát.

## 15. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Yêu cầu áp dụng đã được xác định hoặc việc thiếu yêu cầu đã được ghi lại.
- Phạm vi bao quát mang tính đại diện và các giới hạn của nó đã được nêu rõ.
- Mỗi loại kiểm tra đều có điều kiện và kết quả được ghi lại.
- Kết quả tự động được xác minh trước khi trở thành phát hiện.
- Các xung đột thiết kế được chuyển lên cấp trên thay vì bị thay đổi đơn phương.
- Các phát hiện trích dẫn bằng chứng và, khi có liên quan, một tiêu chí thành công.
- Không có khẳng định nào về việc tuân thủ đầy đủ hoặc tương thích với trình đọc màn hình.

## 16. Kiểm tra kiến thức

1. Vì sao một lần quét tự động sạch lỗi không chứng minh rằng một trang có khả năng tiếp cận?
2. WCAG 2.2 Mức AA yêu cầu tỷ lệ tương phản bao nhiêu cho văn bản nội dung thông thường?
3. Một header dính có thể gây ra lỗi khả năng tiếp cận bằng bàn phím như thế nào?
4. Làm thế nào để tạo ra một khung nhìn tương đương rộng 320 pixel CSS cho bước kiểm tra reflow?
5. Bạn nên làm gì nếu một màu thương hiệu đã được phê duyệt không đạt yêu cầu về độ tương phản?
