# Bài 10.4: Trình bày website, các vấn đề đã biết và bàn giao

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Chuẩn bị ghi chú bàn giao giúp người khác có thể chạy, kiểm tra và tiếp tục phát triển website.
- Duy trì một danh sách các vấn đề đã biết một cách trung thực, kèm mức ảnh hưởng và trạng thái.
- Lập kế hoạch và thực hiện buổi trình diễn website cùng thay đổi.
- Trả lời câu hỏi bằng cách phân biệt sự thật đã xác minh với giả định.
- Ghi lại kết quả đánh giá tách biệt với việc chấp nhận website và quyền deploy.

**Điều kiện tiên quyết:** Hoàn thành Bài 10.3 và đã nộp bộ bằng chứng.

**Tài liệu cần chuẩn bị:** Bộ bằng chứng, hồ sơ QA, sổ theo dõi trang, nhật ký quyết định, hồ sơ deploy, hướng dẫn dự án và mọi định dạng trình bày mà người hướng dẫn đã quy định.

## 1. Hiểu mục đích của việc bàn giao

**Bàn giao** là chuyển trách nhiệm đối với công việc cho người khác, như người hướng dẫn, một thành viên khác trong nhóm hoặc khách hàng.

Người nhận bàn giao cần có thể:

- Hiểu những gì đã được xây dựng và những gì đã được thay đổi.
- Chạy website và các bước kiểm tra của nó.
- Tìm được bằng chứng đằng sau mỗi khẳng định.
- Thấy được những gì chưa hoàn thành hoặc chưa chắc chắn.
- Tiếp tục công việc mà không phải dựng lại lịch sử của nó.

**Một bản bàn giao tốt trung thực về các giới hạn. Một bản bàn giao che giấu vấn đề sẽ chuyển các vấn đề đó cho một người không biết chúng tồn tại.**

Bài học này cũng bao gồm buổi trình bày đánh giá cuối khóa. Buổi trình bày thể hiện công việc của bạn. Ghi chú bàn giao là hồ sơ lưu lại lâu dài.

## 2. Viết ghi chú bàn giao

Gộp các hồ sơ từ các học phần trước thành một tài liệu. Liên kết đến các hồ sơ hiện có thay vì sao chép chúng.

| Phần | Cần đưa vào gì | Nguồn |
|---|---|---|
| **Tổng quan** | Website là gì và trạng thái hiện tại của nó, trong vài câu | Bản mô tả dự án |
| **Phạm vi đã bàn giao** | Các trang, tính năng và thay đổi của Học phần 10 | Sổ theo dõi trang và tính năng |
| **Bộ hướng dẫn cơ sở** | Các phiên bản tài liệu đã được phê duyệt | Bộ cơ sở Học phần 3, các cập nhật ở Bài 10.1 |
| **Chạy ở máy cục bộ** | Dự án nằm ở đâu và các lệnh đã được ghi lại | Hướng dẫn dự án |
| **Kiểm tra và kiểm thử** | Cách chạy type check, lint, build và các bài kiểm thử Playwright | Bài 8.4 và 9.2 |
| **Môi trường** | Địa chỉ cục bộ và staging, cùng commit đã deploy | Bài 9.4 |
| **Cấu hình** | Tên và mục đích của các biến môi trường, tuyệt đối không ghi giá trị | Bài 9.1 |
| **Nội dung và tài sản** | Nguồn nội dung, danh mục tài sản và các tài liệu tạm thời còn lại | Bài 5.1 và 5.2 |
| **Tình trạng chất lượng** | Kết quả về khả năng tiếp cận, hiệu năng và mức sẵn sàng cho tìm kiếm, kèm giới hạn của chúng | Bài 8.3, 9.2 và 9.3 |
| **Các vấn đề đã biết** | Xem Phần 3 | Hồ sơ QA |
| **Các quyết định còn mở** | Các câu hỏi đang chờ trả lời, và ai chịu trách nhiệm cho từng câu | Nhật ký quyết định và hồ sơ QA |
| **Các bước tiếp theo được đề xuất** | Các hành động cụ thể, theo thứ tự ưu tiên | Đánh giá của bạn |

### Viết cho một người đọc mới

Hãy hình dung một người chưa từng thấy dự án đang đọc ghi chú.

- Định nghĩa các thuật ngữ riêng của dự án.
- Dùng chính xác các lệnh từ tài liệu của dự án.
- Nêu rõ nơi lưu từng hồ sơ.
- Giải thích mọi thứ chỉ hoạt động theo một cách đặc thù.

Nếu có thể, hãy nhờ một đồng nghiệp làm theo hướng dẫn chạy website. Hướng dẫn chỉ hoạt động với chính tác giả của nó thì chưa hoàn thiện.

## 3. Duy trì danh sách các vấn đề đã biết một cách trung thực

Lấy các vấn đề đã biết từ hồ sơ QA. Đưa vào mọi phát hiện còn mở, mọi hạn chế đã được chấp nhận và mọi phần chưa kiểm tra có ý nghĩa.

| Trường | Cần đưa vào gì |
|---|---|
| Mã | Tham chiếu trong hồ sơ QA |
| Vấn đề | Điều gì sai hoặc chưa được xác minh |
| Ảnh hưởng | Ảnh hưởng đến ai và như thế nào |
| Mức ưu tiên | Lấy từ hồ sơ QA |
| Trạng thái | Đang mở, Chờ quyết định hoặc hạn chế đã được chấp nhận |
| Cách tạm khắc phục | Mọi cách tạm thời để né vấn đề |
| Người phụ trách | Ai cần hành động |

### Ví dụ

| Mã | Vấn đề | Ảnh hưởng | Mức ưu tiên | Trạng thái | Người phụ trách |
|---|---|---|---|---|---|
| QA-A11Y-03 | Độ tương phản của chữ trong phần nội dung thấp hơn yêu cầu đã thống nhất | Khó đọc hơn với một số khách truy cập trên tất cả các trang chi tiết | Nghiêm trọng | Chờ quyết định về màu thương hiệu | Người hướng dẫn |
| QA-CH-02 | Ảnh liệu trình mới bị cắt mất chủ thể ở chiều rộng hẹp | Hình ảnh kém rõ ràng hơn trên điện thoại | Nhỏ | Chờ ảnh thay thế | Người hướng dẫn |
| Chưa kiểm tra | Kiểm thử trên thiết bị iOS thật | Chưa rõ hành vi trên Safari trên iPhone | Cần đánh giá | Chưa thực hiện | Cần phân công |

Đây chỉ là minh họa. Hãy dùng các phát hiện thực tế của bạn.

Các phần chưa kiểm tra cũng thuộc danh sách này. “Chưa kiểm tra” là một thiếu sót đã biết, và người đọc cần biết về nó.

## 4. Lập kế hoạch buổi trình bày

Xác nhận định dạng trình bày với người hướng dẫn:

- Ai sẽ tham dự.
- Bạn có bao nhiêu thời gian.
- Trình bày ở máy cục bộ, trên staging hay cả hai.
- Người hướng dẫn muốn xem điều gì nhất.

Một cấu trúc hữu ích:

| Phần | Nội dung |
|---|---|
| Bối cảnh | Mục đích của website và phạm vi đã phê duyệt, một cách ngắn gọn |
| Trình diễn | Các hành trình người dùng đã phê duyệt, trên môi trường đã thống nhất |
| Thay đổi | Bản yêu cầu, cách bạn hiểu nó, các câu hỏi bạn đã đặt và cách bạn triển khai |
| Bằng chứng | Cách bạn xác minh thay đổi, dùng ma trận chấp nhận |
| Các vấn đề đã biết | Các vấn đề và quyết định còn mở quan trọng nhất |
| Các bước tiếp theo | Điều gì nên xảy ra tiếp theo |
| Hỏi đáp | Thời gian cho các câu hỏi của người hướng dẫn |

Giữ phần trình diễn tập trung vào các hành trình đã phê duyệt. Hãy cho xem bằng chứng thay vì mô tả theo trí nhớ.

### Chuẩn bị cho sự cố

Các buổi trình diễn trực tiếp có thể gặp sự cố vì những lý do không liên quan đến công việc của bạn, như mất kết nối mạng.

- Chạy thử trước lộ trình trình diễn trên cùng môi trường.
- Chuẩn bị sẵn ảnh chụp màn hình hoặc một đoạn ghi hình ngắn về các hành trình chính.
- Biết rõ những tính năng nào bạn sẽ không trình diễn trực tiếp, và vì sao.

## 5. Trình diễn an toàn

Buổi trình bày không phải là lý do để bỏ qua các quy tắc trước đó.

- Dùng môi trường đã thống nhất, thường là cục bộ hoặc staging.
- Dùng thông tin giả lập trong mọi biểu mẫu.
- Không kích hoạt tin nhắn, lịch hẹn thật hay các hành động bên ngoài khác trừ khi được cho phép.
- Không hiển thị giá trị cấu hình, thông tin xác thực hay hồ sơ riêng tư trên màn hình.
- Đóng các tab, thông báo và tệp không liên quan trước khi chia sẻ màn hình.

Nếu một tính năng chỉ có thể được trình diễn bằng cách thực hiện một hành động bên ngoài chưa được cho phép, hãy cho xem bằng chứng của nó và giải thích giới hạn đó.

## 6. Trả lời câu hỏi chính xác

Trong phần hỏi đáp, hãy phân biệt điều bạn biết với điều bạn giả định.

| Tình huống | Câu trả lời hữu ích |
|---|---|
| Bạn đã xác minh | “Vâng. Ma trận chấp nhận cho thấy bài kiểm thử và các điều kiện của nó.” |
| Bạn chưa kiểm tra | “Tôi chưa kiểm tra điều đó. Nó được liệt kê là chưa kiểm tra trong bản bàn giao.” |
| Bạn đã giả định | “Tôi giả định điều đó dựa trên thiết kế thẻ hiện có. Nó được ghi trong nhật ký quyết định.” |
| Bạn không biết | “Tôi không biết. Tôi có thể tìm hiểu và bổ sung câu trả lời vào bản bàn giao.” |

“Tôi không biết” kèm theo một cách để tìm hiểu là một câu trả lời tốt. Một phỏng đoán tự tin nhưng hóa ra sai sẽ làm giảm niềm tin vào phần còn lại của bằng chứng.

Ghi lại mọi hành động tiếp theo phát sinh từ các câu hỏi và thêm chúng vào ghi chú bàn giao.

## 7. Nhờ Claude rà soát bản bàn giao

```text
Review the handover notes for accuracy and completeness.

Read:
- The handover notes.
- The QA record, page register and decision log.
- The evidence package and acceptance matrix.
- Deployment records and project instructions.

Check:
1. Every claim in the notes is supported by a linked record.
2. The known issues list includes every open finding,
   accepted limitation and unchecked area from the records.
3. The running and testing instructions match the
   documented commands.
4. Configuration is described by variable names only,
   with no values.
5. Environments and deployed commits are identified.
6. A new team member could run the website and checks
   using only these notes and the linked records.
7. Nothing overstates completion, quality or compliance.

Report each gap or inaccuracy with a specific reference.

Review only. Do not edit files, commit, push or deploy.
```

Sửa các thiếu sót thực sự. Nếu Claude báo cáo một vấn đề mà bạn cho là sai, hãy kiểm tra hồ sơ và ghi lại lập luận của bạn.

## 8. Ghi lại kết quả

Sau buổi trình bày, người hướng dẫn ghi lại các quyết định của họ. Hãy giữ chúng tách biệt:

| Hồ sơ | Quyết định điều gì | Ai quyết định |
|---|---|---|
| **Kết quả đánh giá** | Bạn đã đáp ứng các yêu cầu đánh giá của chương trình học hay chưa | Người hướng dẫn |
| **Chấp nhận website** | Website đã triển khai và thay đổi có được chấp nhận hay không, và cho phạm vi nào | Người hướng dẫn hoặc khách hàng |
| **Quyền deploy** | Có phiên bản nào được phép phát hành lên production hay không | Người được dự án ủy quyền |

Các quyết định này độc lập với nhau. Bạn có thể đạt bài đánh giá trong khi website vẫn còn vấn đề mở. Website có thể được chấp nhận cho staging trong khi việc phát hành production chưa được cho phép.

Giữ mỗi quyết định ở trạng thái **Chờ duyệt** cho đến khi người hướng dẫn ghi lại. Ghi lại người duyệt, ngày, phạm vi và mọi điều kiện kèm theo.

Việc phê duyệt chương trình học cho bài học này lại là một vấn đề riêng nữa. Nó liên quan đến nội dung bài học, không phải công việc của bạn.

## 9. Nhìn lại quá trình tiến bộ của bạn

Viết một đoạn tự đánh giá ngắn để giúp bạn và người hướng dẫn lên kế hoạch cho các bước tiếp theo:

- Những phần nào của quy trình làm việc bạn hiện đã hoàn thành một cách tự tin?
- Bạn cần trợ giúp nhiều nhất ở đâu?
- Lần sau bạn sẽ đưa ra quyết định nào khác đi, và vì sao?
- Bạn muốn học gì tiếp theo?

Hãy cụ thể. “Tôi cần luyện tập thêm về gỡ lỗi” ít hữu ích hơn “Tôi thấy khó phân biệt một bài kiểm thử bị lỗi là do website hay do chính bài kiểm thử.”

## 10. Bài tập thực hành

**Nhiệm vụ: Hoàn thành bàn giao và trình bày công việc của bạn.**

1. Viết ghi chú bàn giao, liên kết đến các hồ sơ hiện có.
2. Tổng hợp danh sách các vấn đề đã biết từ hồ sơ QA.
3. Nếu có thể, nhờ một đồng nghiệp làm theo hướng dẫn chạy website.
4. Nhờ Claude rà soát bản bàn giao và sửa các thiếu sót thực sự.
5. Xác nhận định dạng trình bày với người hướng dẫn.
6. Chuẩn bị và tập dượt phần trình diễn cùng các tài liệu dự phòng.
7. Thực hiện buổi trình bày.
8. Ghi lại các hành động tiếp theo phát sinh từ các câu hỏi.
9. Ghi lại riêng biệt các quyết định của người hướng dẫn.
10. Viết phần tự đánh giá của bạn.

## 11. Sản phẩm cần nộp

Nộp:

- Ghi chú bàn giao.
- Danh sách các vấn đề đã biết.
- Tài liệu trình bày và bằng chứng dự phòng.
- Bản rà soát bàn giao của Claude và các chỉnh sửa của bạn.
- Các hành động tiếp theo từ buổi trình bày.
- Hồ sơ kết quả đánh giá, chấp nhận website và quyền deploy, khi đã có quyết định.
- Phần tự đánh giá của bạn.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Bản bàn giao giúp một người đọc mới có thể chạy, kiểm tra và tiếp tục phát triển website.
- Mọi khẳng định đều liên kết đến hồ sơ hỗ trợ.
- Các vấn đề đã biết, quyết định còn mở và phần chưa kiểm tra được liệt kê trung thực.
- Không có thông tin xác thực, dữ liệu cá nhân hay giá trị riêng tư nào xuất hiện trong bất kỳ tài liệu nào.
- Buổi trình bày dùng môi trường và dữ liệu an toàn, đã được thống nhất.
- Các câu hỏi được trả lời mà không phóng đại bằng chứng.
- Các quyết định về đánh giá, chấp nhận và deploy được ghi lại riêng biệt.

## 13. Kiểm tra kiến thức

1. Vì sao các phần chưa kiểm tra nên xuất hiện trong danh sách các vấn đề đã biết?
2. Bạn nên trả lời thế nào cho câu hỏi về điều bạn chưa xác minh?
3. Vì sao nên chuẩn bị ảnh chụp màn hình hoặc bản ghi hình trước một buổi trình diễn trực tiếp?
4. Kết quả đánh giá, việc chấp nhận website và quyền deploy khác nhau như thế nào?
5. Điều gì giúp hướng dẫn bàn giao có thể dùng được bởi người không phải tác giả của nó?
