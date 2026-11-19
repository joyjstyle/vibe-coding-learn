# Bài 10.3: Kiểm thử thay đổi và nộp bằng chứng

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Xây dựng một kế hoạch xác minh ghép mỗi tiêu chí chấp nhận với bằng chứng phù hợp.
- Kết hợp các bước kiểm tra thủ công, kiểm thử tự động và các bước kiểm tra của dự án mà không bị thiếu sót hay trùng lặp.
- Chọn các bước kiểm tra hồi quy dựa trên những thay đổi thực tế đã thực hiện.
- Tạo ra bằng chứng mà một người duyệt khác có thể truy vết và lặp lại.
- Nộp một bộ bằng chứng chính xác, có nêu rõ các giới hạn.

**Điều kiện tiên quyết:** Hoàn thành Bài 10.2 và có sẵn bản tóm tắt triển khai cùng nhật ký quyết định.

**Tài liệu cần chuẩn bị:** Các nhiệm vụ thay đổi và tiêu chí chấp nhận đã phê duyệt, bản tóm tắt triển khai, nhật ký quyết định, hồ sơ QA, các bài kiểm thử Playwright, sổ theo dõi trang và, nếu được cho phép, môi trường staging.

## 1. Xác minh theo các tiêu chí đã phê duyệt

Bài 10.2 đã ghi lại những nhiệm vụ nào đã được triển khai. Bài học này xác định xem từng tiêu chí chấp nhận có được đáp ứng hay không, kèm bằng chứng.

**Đã triển khai không đồng nghĩa với đã xác minh.** Bài 5.1 đã phân biệt điều này cho trang chủ. Nó cũng áp dụng tương tự cho công việc độc lập của bạn.

Bằng chứng của bạn phải trả lời ba câu hỏi:

1. Thay đổi có làm đúng những gì các nhiệm vụ đã phê duyệt yêu cầu không?
2. Thay đổi có làm hỏng thứ gì trước đây đang hoạt động không?
3. Điều gì chưa được kiểm tra, và vì sao?

## 2. Xây dựng kế hoạch xác minh

Bắt đầu từ các tiêu chí chấp nhận đã viết ở Bài 10.1. Với mỗi tiêu chí, hãy chọn bằng chứng thực sự có thể chứng minh tiêu chí đó được đáp ứng.

| Loại bằng chứng | Phù hợp cho | Bài học trước |
|---|---|---|
| So sánh trên trình duyệt với tài liệu tham chiếu | Bố cục, nội dung, hình ảnh | 4.4, 5.2 |
| Kiểm tra responsive | Hành vi ở các chiều rộng bắt buộc | 5.3 |
| Kiểm tra hành trình | Liên kết và trình tự thao tác của khách truy cập | 6.3 |
| Kiểm tra trạng thái tính năng | Biểu mẫu và hành vi tương tác | 7.2 |
| Kiểm tra khả năng tiếp cận | Cấu trúc, độ tương phản, bàn phím, khả năng dàn lại nội dung (reflow) | 8.3 |
| Kiểm thử tự động | Route, hành trình, metadata có thể lặp lại | 8.4 |
| Rà soát an toàn | Thông tin xác thực, dữ liệu và gói phụ thuộc | 9.1 |
| Đo hiệu năng | Tốc độ tải và độ ổn định bố cục | 9.2 |
| Kiểm tra metadata | Tiêu đề, mô tả, lập chỉ mục | 9.3 |
| Xác minh trên staging | Hành vi trong môi trường được lưu trữ | 9.4 |
| Các bước kiểm tra của dự án | Type check, lint, build | 4.2 |

Chỉ dùng những loại bằng chứng liên quan đến thay đổi. Một thay đổi chỉ về nội dung có thể không cần đo hiệu năng. Một thay đổi thêm một hình ảnh lớn thì có lẽ cần.

### Ví dụ kế hoạch xác minh

| Tiêu chí | Bằng chứng | Điều kiện |
|---|---|---|
| Thẻ mới xuất hiện ở vị trí đã phê duyệt | So sánh trên trình duyệt và bài kiểm thử Playwright | Các chiều rộng bắt buộc |
| Thẻ liên kết đến trang chi tiết mới | Bài kiểm thử hành trình Playwright, kiểm tra hành trình thủ công | Project desktop và mobile |
| Nội dung chữ của trang chi tiết khớp với nguồn được cung cấp | So sánh từng dòng | Trang đã hiển thị |
| Hình ảnh hiển thị với văn bản thay thế và khung cắt đã phê duyệt | Kiểm tra trên trình duyệt, kiểm tra cấu trúc | Các chiều rộng bắt buộc |
| Tiêu đề và mô tả trang đã được phê duyệt | Kiểm tra phần head đã hiển thị, bài kiểm thử Playwright | Cục bộ và staging |
| Các thẻ và trang hiện có không thay đổi | Kiểm tra hồi quy | Các trang đại diện |

Đây chỉ là minh họa. Hãy xây dựng kế hoạch từ các tiêu chí thực tế của bạn.

Mỗi tiêu chí cần có ít nhất một bằng chứng thực sự có thể chứng minh nó được đáp ứng. Phần 5 của Bài 4.2 đã giải thích vì sao type check không thể chứng minh độ chính xác về hình ảnh, và một ảnh chụp màn hình không thể chứng minh đích đến của một liên kết.

## 3. Chạy các bước kiểm tra tự động trước

Các bước kiểm tra tự động chạy nhanh và phát hiện sớm các vấn đề rõ ràng.

Tại dấu nhắc lệnh của terminal, trong thư mục dự án, hãy chạy các bước đã ghi trong tài liệu:

1. Type check.
2. Lint.
3. Build production.
4. Các bài kiểm thử Playwright, bao gồm các bài kiểm thử mới và đã cập nhật từ Bài 10.2.

So sánh kết quả với kết quả ban đầu bạn đã ghi ở Bài 10.2.

| Kết quả | Ý nghĩa |
|---|---|
| Đạt trước và sau | Không phát hiện lỗi hồi quy trong những gì các bài kiểm thử kiểm tra |
| Đạt trước, lỗi sau | Có khả năng do thay đổi gây ra; cần điều tra |
| Lỗi trước và sau | Vấn đề có sẵn; ghi lại, nhưng không phải do thay đổi gây ra |
| Bài kiểm thử mới đạt | Hành vi mới đáp ứng những gì bài kiểm thử khẳng định |
| Bài kiểm thử mới lỗi | Điều tra xem website hay bài kiểm thử sai, như trong Bài 8.4 |

Đừng sửa một bài kiểm thử để nó đạt khi không có lý do được ghi lại dựa trên yêu cầu đã phê duyệt.

## 4. Hoàn thành các bước kiểm tra thủ công

Thực hiện lần lượt các phần thủ công của kế hoạch xác minh.

Với mỗi bước kiểm tra, ghi lại:

- Tiêu chí mà nó hỗ trợ.
- Trang, component hoặc hành trình.
- Trình duyệt, khung nhìn (viewport) và phương thức nhập liệu.
- Kết quả: Đạt, Không đạt, Chưa kiểm tra hoặc Không áp dụng.
- Bằng chứng.

Dùng thông tin giả lập cho mọi thao tác với biểu mẫu. Chỉ thực hiện các hành động bên ngoài trong phạm vi các sắp xếp kiểm thử được cho phép.

Nếu một bước kiểm tra không đạt, hãy ghi một phát hiện vào hồ sơ QA. Sửa nó theo quy trình từ Bài 8.2: sửa lỗi có giới hạn rõ ràng, kiểm thử lại trong các điều kiện ban đầu, kiểm tra hồi quy có mục tiêu. Ghi lại các chỉnh sửa trong nhật ký quyết định.

## 5. Chọn các bước kiểm tra hồi quy dựa trên những thay đổi thực tế

Bài 8.2 đã giải thích rằng các bước kiểm tra hồi quy cần khớp với những gì đã thay đổi.

Dùng danh sách tệp đã thay đổi từ bản tóm tắt triển khai của bạn:

| Phần đã thay đổi | Các bước kiểm tra hồi quy |
|---|---|
| Component dùng chung | Mọi trang và trạng thái sử dụng nó, kể cả với nội dung có độ dài khác nhau |
| Style dùng chung | Các trang đại diện sử dụng các style đó |
| Điều hướng | Header, footer, menu di động và các hành trình bị ảnh hưởng trên nhiều trang |
| Dữ liệu nội dung dùng chung giữa các trang | Mọi trang đọc dữ liệu đó |
| Cấu hình route | Tải trực tiếp và tải lại cho các route bị ảnh hưởng |
| Mẫu metadata | Tiêu đề và mô tả trên các trang khác dùng mẫu đó |

Ghi lại những bước kiểm tra hồi quy bạn đã chọn và lý do. Người duyệt cần thấy được rằng phạm vi hồi quy của bạn xuất phát từ các thay đổi.

Đừng mặc định chạy lại toàn bộ kế hoạch QA. Hãy mở rộng phạm vi hồi quy khi có một lỗi hoặc một tác động dùng chung ngoài dự kiến cho thấy cần làm vậy.

## 6. Xác minh trên staging khi được cho phép

Nếu người hướng dẫn đã cho phép deploy thay đổi lên staging, hãy làm theo Bài 9.4:

1. Rà soát và chỉ commit những thay đổi dự định.
2. Deploy bằng phương thức đã được ghi lại.
3. Ghi lại lần deploy.
4. Xác minh phiên bản đã deploy.
5. Chạy các bài kiểm thử tự động an toàn trên staging.
6. Ghi lại mọi khác biệt so với hành vi cục bộ thành phát hiện.

Nếu việc deploy lên staging không được cho phép cho thay đổi này, hãy ghi phần xác minh staging là **Chưa kiểm tra**, kèm lý do.

## 7. Làm cho bằng chứng có thể truy vết

Bằng chứng chỉ hữu ích nếu người duyệt có thể liên kết nó với công việc và lặp lại bước kiểm tra.

| Chất lượng bằng chứng | Yếu | Mạnh |
|---|---|---|
| Phiên bản | “Phiên bản mới nhất” | Mã định danh commit, cùng mọi thay đổi chưa commit |
| Điều kiện | “Đã kiểm tra trên điện thoại” | Trình duyệt, phiên bản, khung nhìn 390 x 844, giả lập cảm ứng |
| Ảnh chụp màn hình | Hình ảnh không có nhãn | Được đặt tên theo trang, chiều rộng, trạng thái và ngày |
| Kết quả kiểm thử | “Kiểm thử đạt” | Lệnh, phiên bản Playwright, các project đã chạy, số lượng đạt và lỗi |
| Chưa kiểm tra | Bị bỏ qua | Được liệt kê kèm lý do |

Làm sạch mọi bằng chứng. Loại bỏ thông tin xác thực, dữ liệu cá nhân thật và các giá trị cấu hình riêng tư.

Nếu phần triển khai thay đổi sau một bước kiểm tra, hãy quyết định xem thay đổi đó có thể ảnh hưởng đến bước kiểm tra hay không. Nếu có thể, hãy lặp lại bước kiểm tra.

## 8. Hoàn thành ma trận chấp nhận

Tổng hợp các kết quả vào một ma trận chấp nhận, như trong Bài 6.4 và 7.4.

| Tiêu chí | Kết quả | Bằng chứng | Ghi chú |
|---|---|---|---|
| [Tiêu chí từ nhiệm vụ] | Đạt / Không đạt / Chưa kiểm tra / Không áp dụng | [Tham chiếu đến bằng chứng] | [Giới hạn hoặc phát hiện] |

Mọi tiêu chí của mọi nhiệm vụ đều phải xuất hiện.

Sau đó tóm tắt:

- Các tiêu chí đạt, kèm bằng chứng.
- Các tiêu chí không đạt, kèm mã phát hiện.
- Các tiêu chí chưa kiểm tra, kèm lý do.
- Các bước kiểm tra hồi quy đã chạy và kết quả.
- Các phát hiện mới, bao gồm các phát hiện ngoài phạm vi từ Bài 10.2.

## 9. Nhờ Claude kiểm tra bằng chứng

Hãy nhờ Claude rà soát bằng chứng một cách phản biện, như một người duyệt sẽ làm, thay vì để xác nhận nó.

```text
Review the evidence package for the change against its
approved acceptance criteria.

Read:
- The approved change tasks and acceptance criteria.
- The implementation summary and decision log.
- The verification plan, acceptance matrix and evidence.
- The changed files compared with the starting commit.

Assess:
1. Whether each criterion has evidence capable of showing
   it is met.
2. Whether any result claims more than its evidence shows.
3. Whether the evidence matches the current implementation,
   or later changes could invalidate it.
4. Whether the regression scope covers the changed shared
   code and its usages.
5. Whether any criterion is missing from the matrix.
6. Whether unchecked items and limits are stated.

Report gaps and overstatements with specific references.
Do not mark criteria as passed yourself.

Review only. Do not edit files, run external actions,
commit, push or deploy.

Change tasks and evidence locations:
[Insert task IDs and where the evidence is recorded.]
```

Xử lý các thiếu sót thực sự bằng cách hoàn thành các bước kiểm tra còn thiếu hoặc bằng cách chỉnh sửa khẳng định. Đừng làm nhẹ câu chữ về một thiếu sót để khiến nó ít bị chú ý hơn.

## 10. Chuẩn bị bài nộp bằng chứng

Viết một bản tóm tắt ngắn cho người hướng dẫn, theo sau là các hồ sơ hỗ trợ.

### Ví dụ bản tóm tắt

> Thay đổi bổ sung thẻ liệu trình và trang chi tiết đã được phê duyệt. Mười hai trên mười ba tiêu chí chấp nhận đạt, với bằng chứng trong ma trận chấp nhận. Tiêu chí về khung cắt ảnh không đạt ở chiều rộng hẹp nhất; phát hiện QA-CH-02 đang chờ quyết định về việc có yêu cầu một hình ảnh khác hay không. Các bước kiểm tra hồi quy trên các thẻ liệu trình hiện có và trang chủ đều đạt. Chưa thực hiện xác minh trên staging vì việc deploy chưa được cho phép cho thay đổi này.

Hãy dùng số liệu, phát hiện và giới hạn thực tế của bạn.

Tránh các cụm từ như “đã kiểm thử đầy đủ” hay “mọi thứ đều hoạt động”. Hãy nêu rõ những gì đã được kiểm tra.

## 11. Bài tập thực hành

**Nhiệm vụ: Xác minh thay đổi và nộp bằng chứng.**

1. Xây dựng kế hoạch xác minh từ các tiêu chí chấp nhận.
2. Chạy type check, lint, build và các bài kiểm thử Playwright.
3. So sánh kết quả với kết quả ban đầu.
4. Hoàn thành các bước kiểm tra thủ công.
5. Chọn và chạy các bước kiểm tra hồi quy dựa trên các tệp đã thay đổi.
6. Xác minh trên staging nếu được cho phép.
7. Sửa các lỗi đã xác minh theo quy trình của Bài 8.2.
8. Hoàn thành ma trận chấp nhận.
9. Nhờ Claude rà soát bằng chứng và xử lý các thiếu sót thực sự.
10. Nộp bộ bằng chứng kèm bản tóm tắt.

Đừng bịa ra kết quả đạt. Một lỗi hoặc thiếu sót được ghi lại rõ ràng là bằng chứng về kỹ năng tốt hơn một kết quả đạt không có cơ sở.

## 12. Sản phẩm cần nộp

Nộp:

- Kế hoạch xác minh.
- Kết quả kiểm tra tự động và kiểm thử, kèm phần so sánh với kết quả ban đầu.
- Kết quả kiểm tra thủ công kèm điều kiện.
- Phạm vi hồi quy, lý do chọn phạm vi đó và kết quả.
- Hồ sơ deploy và xác minh staging, hoặc lý do không thực hiện.
- Ma trận chấp nhận.
- Các phát hiện mới và đã cập nhật.
- Bản rà soát bằng chứng của Claude và phản hồi của bạn.
- Bản tóm tắt bằng chứng.

## 13. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Mọi tiêu chí chấp nhận đều có kết quả được ghi lại.
- Các loại bằng chứng khớp với những gì mỗi tiêu chí yêu cầu.
- Các bước kiểm tra hồi quy xuất phát từ những thay đổi thực tế.
- Bằng chứng có thể truy vết đến phần triển khai và các điều kiện.
- Các lỗi và mục chưa kiểm tra đều được thể hiện rõ.
- Bản tóm tắt không khẳng định nhiều hơn những gì bằng chứng cho thấy.

## 14. Kiểm tra kiến thức

1. Vì sao bạn nên so sánh kết quả kiểm thử với kết quả đã ghi lại trước khi thay đổi?
2. Bạn quyết định chạy những bước kiểm tra hồi quy nào bằng cách nào?
3. Điều gì làm cho một ảnh chụp màn hình trở thành bằng chứng có thể truy vết?
4. Vì sao nên nhờ Claude rà soát bằng chứng một cách phản biện thay vì để xác nhận nó?
5. Vì sao một lỗi được ghi lại lại tốt hơn một kết quả đạt không có cơ sở?
