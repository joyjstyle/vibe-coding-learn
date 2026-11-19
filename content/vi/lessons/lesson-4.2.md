# Bài 4.2: Lập kế hoạch các tác vụ nhỏ với tiêu chí chấp nhận rõ ràng

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Biến các phát hiện từ việc kiểm tra thành một tác vụ có kích thước dễ quản lý.
- Tách kết quả bạn cần khỏi các bước dùng để đạt được nó.
- Viết tiêu chí chấp nhận mà người khác có thể kiểm tra.
- Xác định một tác vụ phụ thuộc vào điều gì và khi nào công việc nên tạm dừng.
- Duyệt kế hoạch của Claude trước khi bất kỳ dòng mã nào bị thay đổi.

**Điều kiện tiên quyết:** Hoàn thành Bài 4.1 và có sẵn một tác vụ đã được kiểm tra, sẵn sàng để lập kế hoạch.

**Tài liệu cần chuẩn bị:** Các phát hiện và prompt kiểm tra của bạn từ Bài 4.1, bộ hướng dẫn gốc đã duyệt, các tài liệu tham chiếu đã duyệt liên quan và các script được ghi lại của dự án.

## 1. Chuyển từ phát hiện sang tác vụ

Việc kiểm tra cho bạn biết những gì đang có và những gì cần thay đổi. Việc lập kế hoạch quyết định cách thu hẹp khoảng cách đó.

Một tác vụ hữu ích có:

- Một kết quả rõ ràng.
- Một phạm vi được xác định.
- Các tài liệu tham chiếu mà nó cần.
- Các điều kiện tiên quyết đã biết.
- Tiêu chí hoàn thành mà người khác có thể kiểm tra.
- Một cách phù hợp để xác minh kết quả.

**Một tác vụ nhỏ vẫn nên tạo ra một kết quả có ý nghĩa và có thể được duyệt riêng.**

“Xây dựng toàn bộ website” là quá rộng cho một tác vụ. “Thay đổi một dòng” có thể quá hẹp nếu cần nhiều thay đổi liên kết với nhau mới đạt được điều gì hữu ích.

### Ví dụ

| Phát hiện từ việc kiểm tra | Tác vụ phù hợp |
|---|---|
| Header dùng chung đã có, nhưng thiếu menu di động | Xây dựng menu di động đã duyệt |
| Các thẻ liệu trình lặp lại cùng một đoạn markup ở nhiều nơi | Tạo một thẻ liệu trình dùng chung trong khi giữ nguyên giao diện hiện tại |
| Đích đến của liên kết đặt lịch hẹn chưa được xác nhận | Ghi lại phụ thuộc còn thiếu và để liên kết đó cho sau |
| Trang chủ khác với thiết kế đã duyệt ở nhiều phần | Chia các chỉnh sửa thành những tác vụ riêng cho từng phần hoặc tác vụ về style dùng chung |

## 2. Xác định kết quả trước các bước

Một **kết quả** (outcome) mô tả điều gì phải đúng khi tác vụ hoàn thành. **Các bước triển khai** mô tả một cách để đạt được điều đó.

### Kết quả

> Khách truy cập có thể mở menu di động, đi theo các liên kết đã duyệt và đóng nó bằng các điều khiển được đặc tả.

### Các bước triển khai khả thi

1. Xem lại header hiện có và các style dùng chung.
2. Thêm trạng thái mở và đóng của menu.
3. Kết nối các liên kết đã duyệt.
4. Thêm hành vi bàn phím và focus được đặc tả.
5. Kiểm tra kết quả so với tài liệu tham chiếu.

Hãy giữ cố định kết quả, ngay cả khi Claude đề xuất một cách tốt hơn để đạt được nó. Nếu các bước thay đổi, tác vụ vẫn là tác vụ đó. Nếu kết quả thay đổi, đó là một tác vụ khác cần được thống nhất.

## 3. Đặt phạm vi và ranh giới

Hãy nêu rõ tác vụ bao gồm những gì và những gì nó phải để nguyên.

### Ví dụ về phạm vi tác vụ

**Tác vụ: Xây dựng menu di động bên trong header dùng chung hiện có.**

| Bao gồm | Ranh giới |
|---|---|
| Mở và đóng menu | Giữ nguyên header máy tính đã duyệt |
| Các nhãn và đích đến đã duyệt | Không viết lại câu chữ điều hướng |
| Hành vi bàn phím và focus bắt buộc | Tuân theo đặc tả tương tác đã thống nhất |
| Bố cục di động và các trạng thái trực quan | Tái sử dụng style hiện có khi phù hợp |
| Các bước kiểm tra liên quan | Không thêm tính năng hay package không liên quan |

Ranh giới bảo vệ các yêu cầu. Chúng không nên ngăn cản những thay đổi hỗ trợ cần thiết.

Ví dụ, đừng khăng khăng rằng chỉ được thay đổi một tệp trước khi bạn biết liệu component, các style và các test của nó có cần thay đổi cùng nhau hay không. Thay vào đó, hãy yêu cầu Claude giải thích mọi tệp bổ sung mà nó cần sửa.

## 4. Viết tiêu chí chấp nhận

**Tiêu chí chấp nhận** (acceptance criteria) là các điều kiện mà một tác vụ hoàn thành phải đáp ứng. Mỗi tiêu chí nên đủ rõ ràng để người khác có thể kiểm tra mà không cần hỏi bạn có ý gì.

| Tiêu chí yếu | Tiêu chí có thể xác minh |
|---|---|
| Menu hoạt động | Menu mở ra từ nút kích hoạt và đóng lại qua các điều khiển được đặc tả |
| Liên kết đúng | Mỗi nhãn và đích đến trong menu khớp với điều hướng đã duyệt |
| Trông đẹp trên di động | Bố cục, khoảng cách và kiểu chữ khớp với tài liệu tham chiếu di động được cung cấp ở các độ rộng kiểm thử đã thống nhất |
| Có khả năng tiếp cận | Nút kích hoạt có thể thao tác bằng bàn phím, thông báo menu đang mở hay đóng, và tuân theo hành vi focus đã thống nhất |
| Không có lỗi | Các bước kiểm tra liên quan đều đạt, và mọi vấn đề còn lại được ghi lại |

Tránh những tiêu chí khẳng định nhiều hơn mức một tác vụ có thể chứng minh, chẳng hạn “website có khả năng tiếp cận” hay “không có lỗi nào”.

### Dùng “Given, When, Then” khi hữu ích

Định dạng này liên kết một điều kiện ban đầu, một hành động và một kết quả mong đợi:

> **Given** (Khi) menu di động đang đóng,  
> **when** (nếu) khách truy cập kích hoạt nút của nó,  
> **then** (thì) menu xuất hiện và nút kích hoạt cho thấy menu đang được mở rộng.

Không phải tiêu chí nào cũng cần định dạng này. Hãy dùng nó khi nó giúp một hành vi dễ hiểu hơn.

## 5. Tách tiêu chí khỏi xác minh

**Tiêu chí chấp nhận nêu điều gì phải đúng. Xác minh giải thích bạn sẽ kiểm tra điều đó như thế nào.**

| Tiêu chí chấp nhận | Phương pháp xác minh |
|---|---|
| Nhãn và đích đến khớp với IA đã duyệt | So sánh các liên kết hiển thị với tài liệu tham chiếu và đi theo từng liên kết |
| Menu phản hồi với bàn phím | Thao tác nút kích hoạt chỉ bằng bàn phím |
| Cách trình bày trực quan theo đúng thiết kế đã duyệt | So sánh ảnh chụp màn hình trình duyệt ở các độ rộng đã thống nhất |
| Điều hướng trên máy tính vẫn hoạt động | Lặp lại các bước kiểm tra liên quan trên máy tính |
| Các thay đổi không gây ra lỗi TypeScript | Chạy lệnh type-check được ghi lại của dự án |

Một **type check** (kiểm tra kiểu) yêu cầu trình biên dịch TypeScript xác nhận rằng mã sử dụng dữ liệu đúng cách, ví dụ một component nhận đúng loại giá trị mà nó mong đợi.

Hãy dùng các script và công cụ thực sự có trong dự án. Đừng bịa ra lệnh, và tuyệt đối không ghi một bước kiểm tra chưa thực hiện là đã đạt.

Hãy khớp mỗi bước kiểm tra với những gì nó thực sự có thể chứng minh. Type check không thể cho bạn biết trang trông có đúng không. Ảnh chụp màn hình không thể cho bạn biết một liên kết có dẫn tới đúng trang không.

## 6. Xác định điều kiện tiên quyết và điều kiện dừng

Một **điều kiện tiên quyết** (prerequisite) là thứ phải sẵn sàng trước khi tác vụ có thể hoàn thành.

Trước khi triển khai, hãy hỏi:

- Các tài liệu tham chiếu bắt buộc đã có chưa?
- Các nhãn và đích đến đã được xác nhận chưa?
- Hành vi tương tác đã được đặc tả chưa?
- Các dịch vụ hoặc môi trường kiểm thử bắt buộc có sẵn không?
- Những thay đổi hiện có có xung đột với tác vụ này không?

Ghi lại các điều kiện tiên quyết còn thiếu theo tác vụ mà chúng ảnh hưởng.

### Xác định khi nào Claude nên tạm dừng

Yêu cầu Claude dừng lại và báo cáo, thay vì tự quyết định, khi:

- Hai tài liệu tham chiếu đã duyệt mâu thuẫn nhau.
- Tác vụ cần một tích hợp không có trong kế hoạch.
- Phần việc hiện có sẽ phải bị ghi đè.
- Thiếu một quyết định cần thiết.
- Giải pháp đề xuất sẽ khiến tác vụ lớn hơn nhiều.

Các lựa chọn lập trình thông thường có thể theo các quy ước đã có của dự án. Đừng biến mọi quyết định nhỏ thành một yêu cầu phê duyệt.

## 7. Duyệt kế hoạch để loại bỏ sự phức tạp không cần thiết

Một kế hoạch tốt giải thích:

1. Những gì sẽ thay đổi.
2. Những tệp nào có khả năng bị ảnh hưởng.
3. Phần mã hiện có nào có thể tái sử dụng.
4. Kết quả sẽ được kiểm tra như thế nào.
5. Những gì vẫn còn chưa chắc chắn.

Hãy để ý các dấu hiệu cảnh báo sau:

| Dấu hiệu cảnh báo | Câu hỏi cần đặt ra |
|---|---|
| Một package mới cho một tương tác nhỏ | Vì sao dự án hiện có không làm được việc này? |
| Refactor trên diện rộng | Việc này có cần thiết cho tác vụ này không? |
| Nhiều tính năng không liên quan | Có thể tách chúng thành các tác vụ riêng không? |
| Không có xác minh | Làm sao chúng ta biết kết quả là đúng? |
| Trả lời tự tin cho những câu hỏi chưa được giải quyết | Nguồn nào hỗ trợ quyết định này? |

Một **package**, còn gọi là dependency (phụ thuộc), là đoạn mã do người khác viết mà dự án cài đặt và dựa vào. **Refactor** nghĩa là tái cấu trúc mã hiện có mà không thay đổi những gì nó làm.

Một kế hoạch nên đủ chi tiết để đánh giá, mà không trở thành một bản viết lại toàn bộ dự án mang tính phỏng đoán.

## 8. Hướng dẫn từng bước

### Bước 1: Chọn tác vụ đã được kiểm tra

Dùng các phát hiện của bạn từ Bài 4.1.

Viết một câu mô tả kết quả và liệt kê mọi điều kiện tiên quyết chưa được giải quyết.

### Bước 2: Soạn bản nháp tác vụ

Hoàn thành bản đặc tả sau:

| Trường | Bản nháp của bạn |
|---|---|
| ID và tiêu đề tác vụ | |
| Kết quả dự kiến | |
| Các tài liệu tham chiếu liên quan | |
| Phần triển khai hiện tại | |
| Phần việc bao gồm | |
| Ranh giới | |
| Điều kiện tiên quyết | |
| Tiêu chí chấp nhận | |
| Phương pháp xác minh | |
| Điều kiện dừng | |

### Bước 3: Yêu cầu Claude đề xuất kế hoạch triển khai

```text
Plan the selected task using the inspection findings and
approved references below.

Return:
1. Your understanding of the intended outcome.
2. Any unmet prerequisites.
3. The proposed implementation steps.
4. Likely files affected and why.
5. Existing components or styles to reuse.
6. Acceptance criteria and matching verification methods.
7. Conditions that would require pausing for clarification.

Keep the work within the selected task.
Use established project conventions for routine choices.
Explain any proposed dependency or broader refactoring.

Do not implement, install packages, commit, push or deploy.
Do not invent decisions for unresolved requirements.

Task:
[Paste the task draft.]

Inspection findings:
[Paste the verified findings.]

References:
[Provide the relevant project references.]
```

### Bước 4: Đánh giá kế hoạch

Kiểm tra xem Claude có:

- Hiểu đúng kết quả.
- Giữ trong phạm vi ranh giới.
- Xác định được các điều kiện tiên quyết thực tế.
- Đề xuất thay đổi tương xứng với tác vụ.
- Khớp mỗi tiêu chí với bằng chứng phù hợp.
- Tránh mô tả phần việc dự kiến như thể nó đã được làm xong.

Chỉnh sửa kế hoạch khi cần.

## 9. Bài tập thực hành

**Nhiệm vụ: Chuẩn bị một tác vụ sẵn sàng để triển khai.**

Sử dụng kết quả kiểm tra thẻ liệu trình của bạn từ Bài 4.1:

1. Xác định khoảng trống thực tế.
2. Viết một kết quả có phạm vi rõ ràng.
3. Đặc tả phạm vi và các điều kiện tiên quyết.
4. Viết từ bốn đến sáu tiêu chí chấp nhận.
5. Gán một phương pháp xác minh cho mỗi tiêu chí.
6. Yêu cầu Claude lập kế hoạch.
7. Duyệt và chỉnh sửa kế hoạch.

Nếu các thẻ liệu trình chưa tồn tại, hãy lập kế hoạch tạo chúng từ các tài liệu tham chiếu đã duyệt. Nếu thiếu tài liệu tham chiếu bắt buộc, hãy ghi tác vụ là bị chặn thay vì bịa ra chúng.

Việc triển khai bắt đầu ở Bài 4.3.

## 10. Sản phẩm cần nộp

Nộp:

- Bản đặc tả tác vụ đã hoàn thành của bạn.
- Kế hoạch được Claude đề xuất.
- Mọi chỉnh sửa bạn đã thực hiện, kèm lý do.
- Các tiêu chí chấp nhận cuối cùng và phương pháp xác minh của chúng.
- Trạng thái sẵn sàng của tác vụ và mọi phụ thuộc chưa được giải quyết.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Tác vụ có một kết quả rõ ràng, có ý nghĩa.
- Phạm vi và ranh giới được nêu rõ.
- Các điều kiện tiên quyết đã được đáp ứng hoặc được ghi lại rõ ràng.
- Tiêu chí chấp nhận mô tả các kết quả có thể quan sát được.
- Phương pháp xác minh khớp với các tiêu chí.
- Kế hoạch tương xứng với tác vụ.
- Mọi quyết định duyệt cần thiết đều được ghi lại chính xác.

## 12. Kiểm tra kiến thức

1. Một kết quả khác với một bước triển khai như thế nào?
2. Điều gì khiến một tác vụ đủ nhỏ để duyệt?
3. Tiêu chí chấp nhận khác với phương pháp xác minh như thế nào?
4. Vì sao một type check đạt không thể chứng minh rằng trang trông đúng?
5. Khi nào Claude nên tạm dừng thay vì tự chọn câu trả lời?
