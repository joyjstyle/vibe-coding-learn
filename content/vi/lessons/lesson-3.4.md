# Bài 3.4: Rà soát hướng dẫn trước khi xây dựng

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Kiểm tra rằng bộ hướng dẫn hỗ trợ được tác vụ xây dựng tiếp theo.
- Truy vết một yêu cầu qua tài liệu kiến trúc, kế hoạch công việc và các bước kiểm tra.
- Phân biệt những khoảng trống chặn tác vụ tiếp theo với những khoảng trống chỉ ảnh hưởng đến công việc về sau.
- Duyệt các phát hiện của Claude dựa trên bằng chứng.
- Ghi lại một bộ tham chiếu gốc đã duyệt có thể nhận diện được.

**Điều kiện tiên quyết:** Hoàn thành Bài 3.3.

**Tài liệu cần chuẩn bị:** Bốn bản nháp tài liệu từ Bài 3.3 (PRD, kiến trúc, quy tắc làm việc và kế hoạch công việc), hướng dẫn đầu vào, sổ đăng ký tham chiếu từ Bài 3.1, kết quả kiểm tra dự án khởi đầu và bản ghi phụ thuộc.

## 1. Rà soát mức độ sẵn sàng cho một tác vụ xác định

Một **bộ hướng dẫn** (instruction pack) là tập hợp các tài liệu mà Claude sẽ dựa vào để làm việc: hướng dẫn đầu vào, bốn tài liệu từ Bài 3.3 và các tài liệu tham chiếu đã duyệt.

Bộ hướng dẫn được coi là sẵn sàng khi nó cho phép một tác vụ tiếp theo cụ thể được tiến hành. Chỉ có sẵn vài tệp Markdown là chưa đủ.

Hãy nêu tên tác vụ trước. Sau đó hỏi xem các yêu cầu, tài liệu tham chiếu và bước kiểm tra của nó có dùng được không.

Mức độ sẵn sàng có thể chỉ là một phần. Ví dụ, việc thiếu tích hợp đặt lịch không ngăn được công việc về style dùng chung. Hãy giải thích phần việc nào đã sẵn sàng và phần nào chưa.

## 2. Kiểm tra rằng các tài liệu tham chiếu có thể truy cập được

Với mỗi nguồn mà tác vụ cần, hãy xác nhận:

- Vị trí của nó.
- Phiên bản của nó.
- Bằng chứng phê duyệt của nó.
- Rằng bạn, và Claude, có thể mở được nó.

Nêu tên một tệp thiết kế trong tài liệu không giống với việc đã kiểm tra nó. Hãy mở từng tệp.

Ghi lại mọi nguồn còn thiếu theo các tác vụ mà nó ảnh hưởng.

## 3. Kiểm tra rằng các tài liệu thống nhất với nhau

Mỗi tài liệu nên nhất quán với những tài liệu mà nó phụ thuộc vào.

| Mối liên kết | Điều cần kiểm tra |
|---|---|
| PRD → IA | Các trang bắt buộc và hành trình của khách truy cập khớp nhau |
| Thiết kế → nội dung | Nhãn, các phần và tài nguyên khớp nhau, hoặc mâu thuẫn đã được ghi lại |
| Kiến trúc → dự án khởi đầu | Cách tiếp cận được mô tả khớp với các tệp bạn đã kiểm tra |
| Quy tắc làm việc → tác vụ | Các quy tắc cho phép những phần việc hỗ trợ mà tác vụ cần |
| Tác vụ → xác minh | Việc hoàn thành có thể được kiểm tra bằng bằng chứng phù hợp |

Hãy ghi lại các mâu thuẫn. Đừng âm thầm chọn một nguồn thay cho nguồn khác.

## 4. Truy vết tác vụ tiếp theo

Một **chuỗi truy vết** (trace) theo dõi một yêu cầu từ nguồn của nó tới bước kiểm tra sẽ chứng minh yêu cầu đã được đáp ứng. Hãy tạo một chuỗi truy vết cho tác vụ tiếp theo:

1. Yêu cầu và tài liệu sở hữu nó.
2. Tài liệu tham chiếu thiết kế hoặc tương tác được áp dụng.
3. Những gì đã được triển khai trong dự án khởi đầu.
4. Kết quả dự kiến của tác vụ, và các ranh giới của nó.
5. Các phụ thuộc.
6. Tiêu chí chấp nhận.
7. Cách kiểm tra từng tiêu chí.

Một chuỗi truy vết là chưa hoàn chỉnh nếu không mở được một tài liệu tham chiếu hoặc kết quả mong đợi chưa được xác định.

## 5. Phân loại phát hiện theo tác động của chúng

| Loại phát hiện | Điều nó cần |
|---|---|
| **Mâu thuẫn** | Một quyết định hoặc một chỉnh sửa cho một trong các tài liệu |
| **Tài liệu còn thiếu** | Một bản ghi về tác vụ bị ảnh hưởng và phụ thuộc |
| **Tiêu chí không thể kiểm tra** | Một kết quả mong đợi rõ ràng hơn và một cách để kiểm tra nó |
| **Cải tiến tùy chọn** | Một bản ghi riêng, tách biệt khỏi các vấn đề về mức độ sẵn sàng |

Không cần đặc tả đầy đủ toàn bộ website tương lai rồi mới bắt đầu được bất kỳ tác vụ nào. Những phần việc độc lập có thể tiến hành trong khi các quyết định về sau vẫn còn để ngỏ.

## 6. Chuẩn bị báo cáo mức độ sẵn sàng

**Báo cáo mức độ sẵn sàng** (readiness report) ghi lại:

- Các bước kiểm tra đã đạt.
- Các phát hiện.
- Các nguồn còn thiếu.
- Một khuyến nghị cho phạm vi công việc tiếp theo đã được xác định.

Hãy để việc phê duyệt cho người hướng dẫn. Một khuyến nghị rằng công việc có thể tiến hành không phải là sự cho phép để bắt đầu.

## 7. Nhận và so sánh bản duyệt từ Claude

### Bước 1: Tự mình duyệt bộ hướng dẫn

Hãy dùng các bước kiểm tra và chuỗi truy vết ở trên. Ghi lại bằng chứng của bạn trước khi yêu cầu Claude duyệt độc lập, để các phát hiện của nó không định hướng phát hiện của bạn.

### Bước 2: Yêu cầu Claude kiểm tra bộ hướng dẫn

```text
Review the draft instruction pack for readiness to perform the selected task.

Inspect:
- Project entry instructions.
- Product requirements.
- Architecture.
- Working rules.
- Task plan.
- Relevant approved IA, design, style guide and content.

Check:
1. Whether required references exist and are accessible.
2. Whether documents agree on scope and behaviour.
3. Whether architecture matches the inspected starter.
4. Whether the next task has satisfied prerequisites.
5. Whether its acceptance criteria can be verified.
6. Which gaps block this task or only later tasks.

Return:
- Sources actually inspected.
- Checks passed.
- Findings with evidence and affected task IDs.
- Missing or inaccessible sources.
- A readiness recommendation for a clearly defined scope.

Do not invent decisions, claim approval, edit files,
install dependencies, run services or implement anything.
```

### Bước 3: So sánh và giải quyết

So sánh các phát hiện của Claude với bản duyệt của bạn.

Với mỗi vấn đề:

1. Xác minh bằng chứng.
2. Xác định tài liệu chịu trách nhiệm.
3. Đề xuất chỉnh sửa.
4. Xin làm rõ khi cần một quyết định.
5. Cập nhật các bản nháp bị ảnh hưởng.
6. Kiểm tra lại các mối liên kết liên quan.

Một chỉnh sửa về câu chữ có thể chỉ cần kiểm tra lại một chút. Một thay đổi về quyết định tích hợp có thể ảnh hưởng tới yêu cầu, kiến trúc, tác vụ và xác minh.

## 8. Ghi lại bộ tham chiếu gốc đã duyệt

Khi người hướng dẫn chấp nhận bộ hướng dẫn, hãy ghi lại:

- Các phiên bản tài liệu đã được duyệt.
- Ngày phê duyệt và người duyệt.
- Phạm vi được phép tiến hành.
- Các phụ thuộc còn tồn đọng.
- Tác vụ tiếp theo.

Tập hợp các tài liệu tham chiếu đã duyệt này trở thành **bộ gốc triển khai** (implementation baseline).

Các thay đổi về sau nên nêu rõ chúng thay thế điều gì và ảnh hưởng tới những tác vụ nào.

Hãy giữ việc phê duyệt tài liệu tách biệt với việc hoàn thành tác vụ. Một kế hoạch công việc đã được duyệt mô tả công việc cần làm; nó không chứng minh rằng công việc đã được triển khai.

## 9. Bài tập thực hành

**Nhiệm vụ: Rà soát hướng dẫn của Saffron Wellness Clinic trước khi triển khai.**

1. Rà soát bốn bản nháp tài liệu và các tài liệu tham chiếu của bạn.
2. Truy vết tác vụ tiếp theo từ yêu cầu đến xác minh.
3. Xác định mọi thông tin còn thiếu hoặc mâu thuẫn.
4. Phân loại tác động của từng phát hiện.
5. Yêu cầu Claude duyệt độc lập.
6. Giải quyết các phát hiện hợp lệ hoặc ghi lại các quyết định cần đưa ra.
7. Nộp báo cáo mức độ sẵn sàng.

Nếu việc phê duyệt đang chờ, hãy để quyết định duyệt ở trạng thái **Chờ duyệt**.

## 10. Sản phẩm cần nộp

Nộp:

- Danh sách kiểm tra mức độ sẵn sàng đã hoàn thành của bạn.
- Bảng các phát hiện.
- Một chuỗi truy vết từ yêu cầu đến xác minh.
- Bộ hướng dẫn đã được chỉnh sửa, nếu có.
- Báo cáo mức độ sẵn sàng.
- Bản ghi phê duyệt sau khi người hướng dẫn đã duyệt.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các tài liệu tham chiếu bắt buộc đã được kiểm tra.
- Tác vụ tiếp theo đã được truy vết tới các yêu cầu và bước xác minh của nó.
- Các phát hiện nêu rõ bằng chứng và phạm vi bị ảnh hưởng.
- Các quyết định chưa được giải quyết vẫn được thể hiện rõ.
- Người hướng dẫn đã ghi lại những gì được phép tiến hành.
- Bộ hướng dẫn gốc đã duyệt có thể nhận diện được.

## 12. Kiểm tra kiến thức

1. Vì sao chỉ nêu tên một tệp thiết kế là chưa đủ nếu phiên bản đã duyệt chưa rõ ràng?
2. Một tích hợp chưa được giải quyết có thể chỉ chặn một phần của dự án không?
3. Một phát hiện về mức độ sẵn sàng nên bao gồm những gì?
4. Một khuyến nghị về mức độ sẵn sàng khác với phê duyệt như thế nào?
5. Việc phê duyệt kế hoạch công việc có nghĩa là các tác vụ của nó đã hoàn thành không?
