# Bài 9.2: Cải thiện hình ảnh, tốc độ tải và chất lượng bản dựng

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Giải thích các thước đo chính về tốc độ tải, khả năng phản hồi và độ ổn định hình ảnh.
- Đo hiệu năng trong các điều kiện được ghi lại và có thể lặp lại.
- Xác định nguyên nhân gây tải chậm và dịch chuyển bố cục từ một báo cáo Lighthouse.
- Cải thiện cách phân phối hình ảnh mà không thay đổi thiết kế đã được phê duyệt.
- Xác nhận bản build production hoàn tất sạch sẽ và đo lại sau khi thay đổi.

**Điều kiện tiên quyết:** Hoàn thành Bài 9.1 và đã ghi lại các phát hiện của bài đó.

**Tài liệu cần chuẩn bị:** Website đã được triển khai, các lệnh build và preview được ghi trong tài liệu, danh mục tài sản (asset register) đã phê duyệt, hướng dẫn phong cách (style guide), hồ sơ QA và các bài kiểm thử Playwright từ Bài 8.4.

## 1. Coi hiệu năng là một phần của trải nghiệm khách truy cập

Một trang chậm ảnh hưởng trực tiếp đến khách truy cập. Họ phải chờ nội dung, chạm nhầm nút khi bố cục dịch chuyển, hoặc rời đi trước khi trang tải xong. Khách truy cập dùng dữ liệu di động hoặc điện thoại cũ cảm nhận các vấn đề này rõ nhất.

Google công bố ba chỉ số **Core Web Vitals** để mô tả các khía cạnh chính của trải nghiệm:

| Chỉ số | Đo lường điều gì | Ngưỡng tốt |
|---|---|---|
| **Largest Contentful Paint (LCP)** | Tốc độ xuất hiện của nội dung chính, thường là ảnh hero hoặc tiêu đề | 2,5 giây trở xuống |
| **Interaction to Next Paint (INP)** | Tốc độ trang phản hồi về mặt hiển thị sau một lần nhấp, chạm hoặc nhấn phím | 200 mili giây trở xuống |
| **Cumulative Layout Shift (CLS)** | Mức độ nội dung hiển thị bị dịch chuyển bất ngờ khi trang đang tải và đang được sử dụng | 0,1 trở xuống |

Các ngưỡng này áp dụng cho lượt truy cập thực, đo ở phân vị thứ 75. Nghĩa là ít nhất ba trên bốn lượt truy cập trang phải đạt ngưỡng.

**Các phép đo cục bộ của bạn là ước tính trong điều kiện kiểm thử. Chúng không phải là trải nghiệm của khách truy cập thực.**

## 2. Hiểu dữ liệu phòng thí nghiệm và dữ liệu thực tế

| Loại dữ liệu | Đến từ đâu | Hữu ích cho việc gì |
|---|---|---|
| **Dữ liệu phòng thí nghiệm (lab data)** | Một công cụ tải trang trong điều kiện được kiểm soát, như Lighthouse trong công cụ dành cho nhà phát triển | Tìm và gỡ lỗi các vấn đề trước khi ra mắt |
| **Dữ liệu thực tế (field data)** | Các phép đo từ khách truy cập thực theo thời gian | Hiểu trải nghiệm thực tế sau khi ra mắt |

Một website thực hành hoặc chưa ra mắt thường không có dữ liệu thực tế. Bạn sẽ dùng dữ liệu phòng thí nghiệm.

Lighthouse không thể đo INP, vì INP cần một người thật tương tác với trang. Thay vào đó, Lighthouse báo cáo **Total Blocking Time (TBT)**, ước tính mức độ các script của trang chặn trình duyệt phản hồi. Cải thiện TBT thường cải thiện INP, nhưng đây là hai thước đo khác nhau.

## 3. Đo bản build production

Máy chủ phát triển (development server) được thiết kế để chỉnh sửa nhanh, không phải để tải nhanh. Nó thêm mã bổ sung cho các tính năng như tự động tải lại. Đo trên đó sẽ cho kết quả sai lệch.

Hãy đo một **bản build production**, tức phiên bản đã được tối ưu và chuẩn bị cho việc deploy.

1. Tìm lệnh build được ghi trong tài liệu và lệnh phục vụ website đã build ở máy cục bộ. Chúng thường là các script trong `package.json`, nhưng hãy dùng đúng những gì dự án của bạn thực sự ghi lại.
2. Chạy lệnh build tại dấu nhắc lệnh của terminal trong thư mục dự án.
3. Xác nhận bản build hoàn tất mà không có lỗi.
4. Khởi động bản xem trước cục bộ của website đã build bằng lệnh được ghi trong tài liệu.
5. Mở địa chỉ cục bộ mà lệnh đó báo.

Nếu dự án không ghi lại cách phục vụ bản build production ở máy cục bộ, hãy ghi nhận đây là một lỗ hổng và hỏi xem nên đo hiệu năng như thế nào.

## 4. Chạy Lighthouse trong điều kiện được ghi lại

1. Mở trang trong Chrome. Nếu có thể, hãy dùng một hồ sơ trình duyệt không có tiện ích mở rộng, vì tiện ích mở rộng có thể làm chậm trang và làm sai lệch kết quả.
2. Mở công cụ dành cho nhà phát triển và chọn bảng **Lighthouse**.
3. Chọn chế độ **Navigation**, chế độ đo một lần tải trang mới.
4. Chọn **Mobile** làm thiết bị, trừ khi điều kiện đã thống nhất quy định khác.
5. Chọn danh mục **Performance**.
6. Chạy phân tích.

Kết quả Lighthouse thay đổi giữa các lần chạy, vì máy tính và mạng xử lý hơi khác nhau mỗi lần. Hãy chạy phân tích ít nhất ba lần cho mỗi trang và ghi lại giá trị trung vị, tức kết quả ở giữa.

Ghi lại:

| Trường | Ví dụ |
|---|---|
| Trang | Trang chủ |
| Bản build | Bản build production từ commit đã ghi lại |
| Công cụ | Lighthouse trong công cụ dành cho nhà phát triển của Chrome, kèm phiên bản |
| Chế độ và thiết bị | Navigation, Mobile |
| Số lần chạy | Ba |
| Trung vị LCP, TBT và CLS | Các giá trị đo được |
| Phần tử LCP | Phần tử mà Lighthouse xác định |

Đo trang chủ và từng mẫu trang (template) riêng biệt trong phạm vi bao phủ đã chọn ở Bài 8.3.

Điểm tổng thể của Lighthouse chỉ là một bản tóm tắt. Hãy tập trung vào các phép đo và những vấn đề cụ thể đằng sau chúng.

## 5. Đọc báo cáo để tìm nguyên nhân

Lighthouse liệt kê các chẩn đoán (diagnostics) và cơ hội cải thiện (opportunities) bên dưới phần điểm. Hãy dùng chúng để tìm nguyên nhân, không phải như một danh sách việc cần làm một cách tự động.

| Triệu chứng | Các nguyên nhân thường gặp cần điều tra |
|---|---|
| LCP chậm | Ảnh hero lớn, ảnh được tải muộn, máy chủ phản hồi chậm, style hoặc font chặn hiển thị |
| TBT cao | Lượng JavaScript lớn, script bên thứ ba nặng, xử lý tốn kém trong lúc tải |
| CLS cao | Ảnh không được dành sẵn chỗ, font thay đổi kích thước khi hoán đổi, nội dung được chèn lên trên nội dung hiện có |

Với mỗi vấn đề, hãy xác định:

1. Phần tử hoặc tài nguyên bị ảnh hưởng.
2. Bằng chứng từ báo cáo.
3. Vấn đề ảnh hưởng một trang hay một component dùng chung.
4. Việc khắc phục có làm thay đổi bất kỳ thứ gì đã được phê duyệt hay không.

## 6. Cải thiện cách phân phối hình ảnh

Hình ảnh thường là các tệp lớn nhất trên một trang. Bài 5.2 đã đặt các hình ảnh được phê duyệt vào trang. Bài học này kiểm tra xem chúng được phân phối hiệu quả đến mức nào.

| Kiểm tra | Vì sao quan trọng |
|---|---|
| Kích thước tệp phù hợp với kích thước hiển thị lớn nhất | Một bức ảnh rộng 4000 pixel hiển thị ở 800 pixel là lãng phí dữ liệu |
| Định dạng và mức nén tuân theo quy trình tài sản đã thống nhất | Các định dạng hiện đại như WebP hoặc AVIF thường nhỏ hơn |
| Có sẵn các kích thước khác nhau cho các màn hình khác nhau | Điện thoại không nên tải ảnh cỡ desktop |
| Chiều rộng và chiều cao, hoặc tỷ lệ khung hình, được chỉ định | Trình duyệt dành sẵn chỗ, tránh dịch chuyển bố cục |
| Ảnh ở xa phía dưới trang được tải lười (lazy loading) | Chúng chỉ tải khi khách truy cập cuộn đến gần |
| Ảnh chính ở gần đầu trang không được tải lười | Trì hoãn ảnh này làm LCP chậm đi |

Nhiều framework cung cấp một component hình ảnh xử lý việc thay đổi kích thước, định dạng và tải lười. Bài 5.2 đã yêu cầu bạn tuân theo cách làm đã được thiết lập của dự án. Hãy kiểm tra những gì nó đã làm trước khi thêm bất cứ thứ gì.

### Ví dụ minh họa không dùng component hình ảnh của framework

```tsx
type TreatmentImageProps = {
  src: string;
  alt: string;
};

// Below the first screen: load only when needed.
export function TreatmentImage({ src, alt }: TreatmentImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={600}
      loading="lazy"
      decoding="async"
    />
  );
}
```

Giá trị `width` và `height` cho trình duyệt biết tỷ lệ của ảnh để nó có thể dành sẵn chỗ. Chúng cần khớp với tỷ lệ thực của ảnh. CSS vẫn có thể làm ảnh hiển thị đáp ứng (responsive).

Đừng thêm `loading="lazy"` vào ảnh hero hoặc bất kỳ ảnh nào có khả năng là phần tử LCP.

### Giữ nguyên các tài sản đã được phê duyệt

- Giữ các tệp gốc. Tạo các phiên bản đã tối ưu thông qua quy trình tài sản đã thống nhất.
- Kiểm tra để đảm bảo việc nén không làm hỏng rõ rệt khuôn mặt, sản phẩm hoặc chữ trong ảnh.
- Kiểm tra lại cách cắt ảnh và điểm nhấn (focal point) ở mỗi chiều rộng bắt buộc sau mọi thay đổi, như trong Bài 5.2.

Suy giảm chất lượng nhìn thấy được là một lỗi, kể cả khi tệp nhỏ hơn.

## 7. Kiểm tra font, script và nội dung bên thứ ba

### Font

Web font có thể làm chậm việc hiển thị chữ hoặc khiến chữ bị dịch chuyển khi font tải xong. Kiểm tra:

- Font được tải như thế nào, và framework có cung cấp phương thức tối ưu hay không.
- Có phải chỉ những độ đậm và kiểu font đã phê duyệt được tải hay không.

Đừng thay thế hoặc gỡ bỏ các font đã phê duyệt để cải thiện hiệu năng. Hãy nêu sự đánh đổi này thành một quyết định thiết kế.

### JavaScript

Lượng JavaScript lớn làm chậm việc tải và khả năng phản hồi. Kiểm tra:

- Có gói phụ thuộc nào lớn bất thường so với chức năng của nó không.
- Có mã nào được tải trên những trang không dùng đến nó không.
- Một gói được thêm vào cho một tính năng nhỏ có thể được thay bằng mã sẵn có hay không.

Bài 9.1 đã đề cập việc rà soát các gói phụ thuộc. Gỡ bỏ hoặc thay thế một gói là một nhiệm vụ có giới hạn rõ ràng với bước xác minh riêng.

### Nội dung bên thứ ba

Bản đồ nhúng, widget đặt lịch, trình phát video, công cụ chat và script phân tích thường làm tăng đáng kể tải trang. Hãy kiểm tra xem từng thứ có nằm trong phạm vi đã phê duyệt và được tải đúng như đặc tả hay không. Một số có thể chỉ được tải khi khách truy cập cần đến, nhưng cách tải phải được thống nhất, vì nó thay đổi những gì khách truy cập nhìn thấy.

## 8. Xác nhận chất lượng bản build

Một website có thể hiển thị đúng trong khi bản build của nó báo có vấn đề.

Chạy các bước kiểm tra được ghi trong tài liệu và ghi lại kết quả:

| Kiểm tra | Cần chú ý điều gì |
|---|---|
| Bản build production | Hoàn tất không có lỗi; xem xét mọi cảnh báo |
| Kiểm tra kiểu (type check) | Không có lỗi TypeScript |
| Lint | Không có lỗi theo các quy tắc của dự án |
| Kiểm thử tự động | Các bài kiểm thử Playwright từ Bài 8.4 đều đạt |
| Console của trình duyệt trên website đã build | Không có lỗi trên các trang đã chọn |
| Bảng Network | Không có request thất bại nào cho ảnh, font hoặc script |

Không phải cảnh báo nào cũng cần sửa, nhưng bạn cần hiểu từng cảnh báo. Một cảnh báo về ảnh thiếu kích thước hoặc gói mã (bundle) quá lớn có thể giải thích một phát hiện về hiệu năng.

Chỉ dùng các lệnh mà dự án ghi lại. Đừng thêm công cụ mới để hoàn thành danh sách kiểm tra này.

## 9. Ưu tiên cải thiện dựa trên bằng chứng

Ưu tiên những thay đổi:

1. Có bằng chứng rõ ràng từ các phép đo lặp lại.
2. Ảnh hưởng đến các trang quan trọng hoặc các mẫu trang dùng chung.
3. Có thể thực hiện mà không thay đổi nội dung hoặc thiết kế đã phê duyệt.
4. Có thể xác minh bằng cách đo lại.

Tránh tối ưu một cách mù quáng. Những thay đổi chỉ được thực hiện vì một công cụ gợi ý có thể làm tăng độ phức tạp mà không mang lại lợi ích đo được.

Đừng chạy theo điểm số hoàn hảo. Một cải thiện được ghi nhận so với các ngưỡng đã thống nhất là kết quả có giá trị hơn.

## 10. Nhờ Claude điều tra và cải thiện hiệu năng

### Prompt điều tra

```text
Investigate the performance of the selected pages using
the production build.

Before investigating:
- Read the relevant project instructions and asset workflow.
- Confirm the current Git status.
- Identify the documented build and preview commands.

Investigate:
- The LCP element on each page and why it loads when it does.
- Sources of layout shift.
- Image dimensions, formats, responsive sizes and lazy loading.
- Font loading.
- JavaScript size and third-party scripts on each page.
- Production build warnings and browser console errors.

For each issue, report:
1. The affected page, element or resource.
2. The evidence.
3. Whether it affects a shared component.
4. A proportionate improvement.
5. Whether the improvement would change approved
   content, assets, fonts or behaviour.

Investigate only. Do not edit files, install dependencies,
commit, push or deploy. State which measurements you
actually ran and under what conditions.

Pages and references:
[Insert pages, baseline measurements and exact references.]
```

### Prompt sửa lỗi

```text
Implement the selected performance improvements.

- Follow the project's established image and asset approach.
- Preserve approved content, assets, crops, fonts and behaviour.
- Keep original asset files unchanged.
- Do not lazy-load the LCP image.
- Do not add dependencies or change unrelated files.

After editing:
- Run the production build and documented checks.
- Run the Playwright tests.
- Report the changes and any build warnings.

Do not commit, push or deploy.

Selected improvements:
[Insert the reviewed improvements.]
```

## 11. Đo lại và kiểm tra lỗi hồi quy

Sau mỗi thay đổi:

1. Build lại phiên bản production.
2. Chạy Lighthouse trong cùng các điều kiện đã ghi lại, ít nhất ba lần.
3. So sánh các giá trị trung vị với mức cơ sở (baseline).
4. Kiểm tra chất lượng ảnh, cách cắt ảnh và điểm nhấn ở các chiều rộng bắt buộc.
5. Kiểm tra để đảm bảo bố cục không bị dịch chuyển hoặc thay đổi.
6. Chạy các bước kiểm tra được ghi trong tài liệu và các bài kiểm thử Playwright.
7. Cập nhật hồ sơ QA.

Hãy báo cáo kết quả so sánh một cách trung thực. Nếu một thay đổi không tạo ra khác biệt đo được, hãy nói rõ. Nếu một chỉ số cải thiện trong khi chỉ số khác xấu đi, hãy báo cáo cả hai.

## 12. Bài tập thực hành

**Nhiệm vụ: Đo và cải thiện hiệu năng tải của website.**

1. Build phiên bản production và phục vụ nó ở máy cục bộ.
2. Đo các trang đã chọn bằng Lighthouse, mỗi trang ba lần.
3. Ghi lại các điều kiện cơ sở và các giá trị trung vị.
4. Xác định nguyên nhân bằng báo cáo và kết quả điều tra của Claude.
5. Chọn các cải thiện giữ nguyên thiết kế đã phê duyệt.
6. Thực hiện chúng thông qua các nhiệm vụ có giới hạn rõ ràng.
7. Đo lại trong cùng các điều kiện.
8. Kiểm tra ảnh, bố cục và các bài kiểm thử tự động để phát hiện lỗi hồi quy.
9. Ghi lại kết quả và các vấn đề còn tồn tại vào hồ sơ QA.

Nếu một trang đã đạt các ngưỡng đã thống nhất, hãy ghi lại bằng chứng. Đừng thay đổi nó chỉ để nâng điểm.

## 13. Sản phẩm cần nộp

Nộp:

- Các điều kiện build, preview và đo lường.
- Các phép đo cơ sở cho từng trang đã chọn.
- Các nguyên nhân đã xác định kèm bằng chứng.
- Các cải thiện đã chọn và lý do cho từng cải thiện.
- Tóm tắt các tệp đã thay đổi.
- Các phép đo trước và sau.
- Kết quả kiểm tra chất lượng ảnh và lỗi hồi quy.
- Kết quả build, type check, lint và kiểm thử.
- Các phát hiện về hiệu năng còn tồn tại và các quyết định cần đưa ra.

## 14. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các phép đo dùng bản build production trong các điều kiện được ghi lại.
- Kết quả đến từ nhiều lần chạy lặp lại.
- Các cải thiện giải quyết những nguyên nhân đã xác định.
- Nội dung, tài sản và thiết kế đã phê duyệt được giữ nguyên.
- Kết quả trước và sau được so sánh trong cùng điều kiện.
- Các bước kiểm tra chất lượng bản build được ghi lại.
- Giới hạn của phép đo phòng thí nghiệm được nêu rõ.

## 15. Kiểm tra kiến thức

1. Vì sao bạn nên đo bản build production thay vì máy chủ phát triển?
2. Vì sao Lighthouse không thể đo INP, và thay vào đó nó báo cáo gì?
3. Vì sao ảnh hero không nên dùng tải lười?
4. Thuộc tính width và height của ảnh giúp tránh dịch chuyển bố cục như thế nào?
5. Vì sao bạn nên chạy Lighthouse nhiều lần và ghi lại giá trị trung vị?
