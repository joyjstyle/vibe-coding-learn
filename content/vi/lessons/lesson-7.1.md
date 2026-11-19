# Bài 7.1: Xác định biểu mẫu và tính năng tương tác

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Xác định các tính năng tương tác nằm trong phạm vi đã được phê duyệt.
- Mô tả cách mỗi tính năng hoạt động, chứ không chỉ cách nó trông ra sao.
- Xác định các trường của biểu mẫu, quy tắc kiểm tra dữ liệu (validation) và thông báo phản hồi.
- Phân biệt một bản mẫu trực quan (prototype) với một tính năng được kết nối với dịch vụ thật.
- Chuẩn bị một nhiệm vụ triển khai có giới hạn rõ ràng, kèm các bước kiểm tra phù hợp.

**Điều kiện tiên quyết:** Hoàn thành Học phần 6 và đã ghi nhận quyết định duyệt của học phần đó.

**Tài liệu cần chuẩn bị:** Các yêu cầu đã được phê duyệt, thiết kế tương tác, luồng khách truy cập, tài liệu kiến trúc, các component hiện có và các quyết định về tích hợp.

## 1. Xác định những gì cần hoạt động

Một **tính năng tương tác** phản hồi khi khách truy cập làm một việc gì đó, như nhấp chuột, gõ phím hoặc chọn một tùy chọn. Tùy theo dự án đã được phê duyệt, chúng có thể bao gồm:

- Biểu mẫu liên hệ.
- Biểu mẫu yêu cầu đặt lịch hẹn.
- **Accordion** (bảng thu gọn), trong đó mỗi tiêu đề mở hoặc đóng một khung nội dung, thường dùng cho phần câu hỏi thường gặp.
- **Tab** (thẻ), nơi khách truy cập chuyển qua lại giữa các khung nội dung liên quan.
- Tìm kiếm hoặc lọc.
- Liên kết đặt lịch hoặc công cụ đặt lịch được nhúng từ một dịch vụ khác.

Chỉ xây dựng những tính năng nằm trong phạm vi đã được phê duyệt.

Một bức hình về tính năng thì chưa đủ để xây dựng nó. Yêu cầu của tính năng phải nói rõ điều gì xảy ra khi có người sử dụng.

| Tính năng | Hành vi cần xác lập |
|---|---|
| Accordion | Các khung mở và đóng như thế nào, và phản hồi với bàn phím ra sao |
| Tab | Khách truy cập chọn khung như thế nào, và mỗi tab được liên kết với nội dung của nó ra sao |
| Bộ lọc | Kết quả nào thay đổi, và cách xóa các lựa chọn |
| Biểu mẫu | Trường nào bắt buộc, việc gửi hoạt động ra sao và thông báo nào xuất hiện |
| Kết nối đặt lịch | Dịch vụ nào được mở ra hoặc nhận thông tin |

**Một nút điều khiển có thể trông như đã hoàn thiện trong khi hoàn toàn không làm gì cả.**

## 2. Kiểm tra những gì đã có

Trước khi đặc tả công việc mới, hãy kiểm tra:

1. Trang và các component liên quan.
2. Bất kỳ hành vi tương tác nào đã được xây dựng.
3. Các **thư viện** đã cài đặt, tức là các gói mã viết sẵn, và các mẫu (pattern) mà dự án đang dùng.
4. Mọi route **backend** hoặc kết nối dịch vụ. Backend là phần của website chạy trên máy chủ thay vì trong trình duyệt của khách truy cập.
5. Cấu hình mà dự án cần.
6. Các bài kiểm thử hiện có và các phát hiện còn tồn đọng.
7. Các thay đổi Git hiện tại.

Đừng bao giờ mặc định rằng một biểu mẫu nhìn thấy được là đã được kết nối với một nơi nào đó.

Hãy yêu cầu Claude báo cáo riêng biệt:

- Giao diện hiển thị những gì.
- Trình duyệt kiểm tra những gì.
- Điều gì xảy ra khi biểu mẫu được gửi.
- Thông tin được gửi đến đâu.
- Bằng chứng nào xác nhận kết quả.

Ở những chỗ cấu hình quan trọng, hãy yêu cầu Claude chỉ báo cáo tên của các thiết lập. Claude không bao giờ được in ra mật khẩu, khóa (key) hay bất kỳ giá trị bí mật nào khác.

## 3. Tách hành vi giao diện khỏi tích hợp

Một **tích hợp** (integration) là sự kết nối giữa website và một hệ thống khác, như dịch vụ email hoặc nền tảng đặt lịch.

Một biểu mẫu thường có năm phần:

| Phần | Trách nhiệm |
|---|---|
| **Giao diện** | Hiển thị các trường, hướng dẫn và nút điều khiển |
| **Kiểm tra dữ liệu** | Đối chiếu những gì khách truy cập nhập vào với các quy tắc đã thống nhất |
| **Xử lý gửi** | Xử lý một lần thử gửi biểu mẫu |
| **Đích đến** | Nhận hoặc lưu trữ thông tin |
| **Phản hồi** | Cho khách truy cập biết điều gì đã xảy ra |

Các phần này có thể được xây dựng vào những thời điểm khác nhau, nhưng trạng thái của chúng luôn phải rõ ràng.

### Ví dụ

Một biểu mẫu có thể hiển thị đúng và báo lỗi khi thiếu trường, trong khi đích đến của nó chưa được thiết lập. Điều đó cho thấy tiến độ ở phần giao diện và kiểm tra dữ liệu. Nó không chứng minh rằng bất kỳ tin nhắn nào có thể được gửi đến nơi.

Đừng bao giờ hiển thị thông báo thành công chỉ vì khách truy cập đã nhấn Gửi. Làm vậy là nói với khách truy cập một điều có thể không đúng sự thật.

Nếu nhiệm vụ là một **prototype**, tức một mô hình chạy được, dựng lên để cho thấy một thứ sẽ hoạt động ra sao, hãy xác định chính xác cách nó mô phỏng kết quả. Đảm bảo không ai có thể nhầm nó với một biểu mẫu thật, đang hoạt động.

## 4. Đặc tả các trường của biểu mẫu

Với mỗi trường đã được phê duyệt, hãy ghi lại:

| Thuộc tính của trường | Cần xác định gì |
|---|---|
| Nhãn | Câu chữ hiển thị |
| Mục đích | Vì sao cần thông tin này |
| Loại nhập liệu | Loại điều khiển phù hợp, như ô văn bản, trường email hoặc danh sách thả xuống |
| Yêu cầu | Bắt buộc hay không bắt buộc |
| Giá trị cho phép | Các lựa chọn được phép hoặc quy tắc định dạng |
| Văn bản trợ giúp | Hướng dẫn khách truy cập cần trước khi điền |
| Thông báo lỗi | Câu chữ rõ ràng khi thiếu hoặc nhập không hợp lệ |
| Ánh xạ đích đến | Giá trị được gửi sẽ đi vào đâu trong hệ thống nhận |

Hãy dùng danh sách trường đã được phê duyệt. Đừng thu thập thêm thông tin chỉ vì sau này có thể hữu ích. Mỗi trường thêm vào là thêm dữ liệu cá nhân cần bảo vệ.

### Ví dụ minh họa đặc tả trường

| Trường | Yêu cầu | Kiểm tra dữ liệu | Thông báo lỗi |
|---|---|---|---|
| Họ tên | Bắt buộc | Không được để trống | Nhập họ tên của bạn |
| Địa chỉ email | Bắt buộc | Phải vượt qua bước kiểm tra định dạng email đã thống nhất | Nhập địa chỉ email hợp lệ |
| Tin nhắn | Bắt buộc | Phải đáp ứng giới hạn độ dài đã thống nhất | Nhập tin nhắn của bạn |

Đây chỉ là ví dụ, không phải một biểu mẫu bắt buộc.

Tránh đặt quy tắc chặt chẽ về tên, số điện thoại hoặc địa chỉ trừ khi yêu cầu có lý do chính đáng. Tên và số điện thoại thật đa dạng hơn nhiều so với người ta nghĩ, và một quy tắc quá chặt có thể chặn cả những khách truy cập thật.

## 5. Xác định trạng thái và chuyển trạng thái

Một **trạng thái** (state) là tình trạng của một tính năng tại một thời điểm nhất định, như "đang gửi" hoặc "thất bại". Một **chuyển trạng thái** (transition) là sự thay đổi từ trạng thái này sang trạng thái khác.

Với một biểu mẫu, hãy mô tả những gì khách truy cập thấy trước, trong và sau khi gửi:

| Trạng thái | Hành vi mong đợi |
|---|---|
| Ban đầu | Các trường và hướng dẫn đã sẵn sàng |
| Nhập không hợp lệ | Thông báo lỗi giải thích những gì cần sửa |
| Đang gửi | Tiến trình được hiển thị, và việc nhấp nhiều lần được xử lý |
| Gửi thành công | Thông báo phản ánh kết quả đã được xác nhận |
| Gửi thất bại | Một thông báo lỗi hữu ích xuất hiện, và khách truy cập có thể thử lại |
| Đích đến không khả dụng | Thông báo dự phòng hoặc thông báo lỗi đã thống nhất xuất hiện |

Cũng hãy quyết định điều gì xảy ra với những gì khách truy cập đã nhập sau khi thành công hoặc thất bại. Ví dụ:

- Những gì họ đã nhập có nên được giữ lại trong biểu mẫu sau một lần gửi thất bại không?
- Khi nào nên xóa trống biểu mẫu?
- Tiêu điểm bàn phím (focus) nên di chuyển đến đâu khi kiểm tra dữ liệu thất bại?
- Thông báo nên được đọc cho **công nghệ hỗ trợ** như thế nào, chẳng hạn trình đọc màn hình mà người khiếm thị hoặc thị lực kém sử dụng?

Hãy tuân theo các quy ước sẵn có của dự án ở những chỗ chúng đã trả lời các câu hỏi này.

Đừng thêm cơ chế tự động thử lại mà chưa cân nhắc khả năng lần thử đầu tiên có thể đã đến nơi. Nếu không, một yêu cầu liên hệ có thể đến hai lần.

## 6. Xác lập các điều kiện tiên quyết cho tích hợp

Trước khi lên kế hoạch cho một biểu mẫu có kết nối, hãy xác nhận:

- Dịch vụ nhận đã được phê duyệt.
- **Endpoint**, tức địa chỉ web nhận thông tin được gửi, hoặc cách kết nối được hỗ trợ với dịch vụ.
- Trường nào của biểu mẫu đi vào đâu trong hệ thống nhận.
- Môi trường kiểm thử sẽ dùng.
- Ai cung cấp cấu hình.
- Việc nhận thành công sẽ được kiểm tra như thế nào.
- Mỗi lần gửi gây ra những thông báo hoặc tác động phụ nào khác.
- Việc gửi thử có được cho phép hay không.

Một phản hồi thành công trên máy tính của bạn và một tin nhắn thực sự được nhận là hai loại bằng chứng khác nhau.

### Ghi lại các phụ thuộc còn thiếu

| Phụ thuộc | Ảnh hưởng | Công việc vẫn có thể tiến hành |
|---|---|---|
| Chưa xác nhận đích đến | Việc gửi có kết nối bị chặn | Giao diện đã phê duyệt và kiểm tra dữ liệu cục bộ |
| Chưa có thông tin đăng nhập để kiểm thử | Kiểm thử tích hợp bị chặn | Công việc component không liên quan |
| Chưa đặc tả hành vi khi lỗi | Các thông báo bị ảnh hưởng bị chặn | Các trạng thái khác đã được đặc tả |
| Chưa xác nhận người nhận thông báo | Việc thiết lập gửi bị chặn | Công việc về trường và bố cục |

Chỉ tạm dừng những phần bị chặn.

Đừng bao giờ thay thế bằng hộp thư cá nhân của bạn, một dịch vụ production đang chạy thật hoặc một endpoint bịa ra để làm cho tính năng trông như đã hoàn thiện.

## 7. Xác định tương tác có khả năng tiếp cận

Hãy dùng các yêu cầu về khả năng tiếp cận và các component hiện có của dự án.

Với biểu mẫu, hãy kiểm tra rằng bản đặc tả bao gồm:

- Nhãn hiển thị được liên kết với trường của nó trong mã.
- Hướng dẫn giải thích những trường nào là bắt buộc.
- Thông báo lỗi được liên kết với trường mà nó mô tả.
- Truy cập đầy đủ bằng bàn phím.
- Tiêu điểm (focus) nhìn thấy được.
- Thông báo được đọc phù hợp cho người dùng trình đọc màn hình.
- Trạng thái đang tải và trạng thái bị vô hiệu hóa vẫn dễ hiểu.

**Văn bản giữ chỗ** (placeholder), tức dòng chữ ví dụ mờ bên trong một trường trống, không được thay thế cho nhãn. Nó biến mất ngay khi khách truy cập bắt đầu gõ, và thường quá mờ để đọc.

Với các nút điều khiển khác, hãy xác lập mẫu tương tác được mong đợi. Ví dụ, accordion và tab được xây dựng khác nhau và phản hồi với các phím khác nhau.

Hãy ưu tiên một component phù hợp đã có sẵn thay vì xây dựng một hệ thống tương tác mới từ đầu.

## 8. Đối chiếu tiêu chí với bằng chứng

Viết tiêu chí chấp nhận cho tính năng đã chọn, mỗi tiêu chí đi kèm một bước kiểm tra tương ứng.

| Tiêu chí chấp nhận | Cách xác minh phù hợp |
|---|---|
| Các trường và nhãn đã phê duyệt xuất hiện | So sánh biểu mẫu hiển thị với bản đặc tả |
| Thiếu dữ liệu bắt buộc thì biểu mẫu không được gửi | Thử gửi khi các trường bắt buộc để trống |
| Thông báo lỗi chỉ rõ các trường bị ảnh hưởng | Kiểm tra các thông báo và cách chúng được liên kết với các trường |
| Người dùng bàn phím có thể hoàn tất biểu mẫu | Hoàn tất biểu mẫu chỉ bằng bàn phím |
| Một lần gửi thất bại giữ lại những gì đã nhập theo thỏa thuận | Dùng một cách mô phỏng lỗi đã được phê duyệt |
| Thông báo thành công chỉ xuất hiện sau khi có xác nhận như đã định | Kiểm tra cách phản hồi được xử lý, và kết quả tích hợp đã được phê duyệt |

Đừng gửi một bài gửi thật chỉ để hoàn thành một bài tập lập kế hoạch.

Hãy ghi chú những chỗ sau này sẽ cần một bài kiểm thử có kiểm soát, hoặc một hành động được cho phép bên ngoài website.

## 9. Yêu cầu Claude chuẩn bị kế hoạch triển khai

```text
Inspect and plan the selected interactive feature.

Read:
- Relevant project instructions.
- Approved requirements and interaction references.
- Existing components and related behaviour.
- Architecture and integration decisions.
- Applicable project checks.

Return:
1. What currently works, with supporting evidence.
2. Interface behaviour and external integration status separately.
3. Required fields or controls.
4. States, transitions and validation rules.
5. Accessibility behaviour.
6. Missing decisions and affected scope.
7. Proposed implementation steps and likely files.
8. Acceptance criteria with matching verification methods.
9. Tests requiring external actions or controlled environments.

Reuse established components and conventions.
Do not invent fields, recipients, endpoints or credentials.
Do not present simulated success as confirmed delivery.

Plan only. Do not edit files, install dependencies,
submit information, commit, push or deploy.

Selected feature:
[Insert the approved feature and task.]

References:
[Insert exact reference locations.]
```

Hãy rà soát kế hoạch so với các yêu cầu đã được phê duyệt. Giải quyết mọi quyết định có ảnh hưởng đáng kể đến công việc trước khi cho phép thực hiện.

## 10. Bài tập thực hành

**Nhiệm vụ: Chuẩn bị một tính năng tương tác để triển khai.**

1. Chọn một tính năng đã được phê duyệt.
2. Kiểm tra cách nó hiện đang hoạt động, nếu có.
3. Xác định các nút điều khiển, trạng thái và hành vi mong đợi của nó.
4. Xác định mọi đích đến bên ngoài và tác động phụ.
5. Ghi lại các điều kiện tiên quyết và các quyết định còn thiếu.
6. Viết tiêu chí chấp nhận và các bước kiểm tra.
7. Yêu cầu Claude lập kế hoạch.
8. Rà soát và chỉnh sửa kế hoạch.

Nếu dự án không có biểu mẫu, hãy dùng một tính năng tương tác khác đã được phê duyệt. Đừng thêm một biểu mẫu chỉ để làm bài tập này.

## 11. Sản phẩm cần nộp

Nộp:

- Tính năng đã chọn và mã nhiệm vụ.
- Những phát hiện của bạn về trạng thái hiện tại của nó.
- Bản đặc tả trường hoặc nút điều khiển.
- Các yêu cầu về trạng thái và thông báo.
- Các phụ thuộc tích hợp, nếu có liên quan.
- Tiêu chí chấp nhận và các bước kiểm tra tương ứng.
- Kế hoạch của Claude và các chỉnh sửa của bạn.
- Trạng thái sẵn sàng của nhiệm vụ.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Tính năng đã chọn có mục đích và phạm vi được xác định.
- Hành vi của nó được đặc tả, không chỉ riêng giao diện.
- Các trạng thái bắt buộc và quy tắc kiểm tra dữ liệu đã rõ ràng.
- Tiến độ giao diện được tách riêng khỏi mức độ sẵn sàng của tích hợp.
- Các yêu cầu về khả năng tiếp cận đã được đưa vào.
- Các hành động bên ngoài website và cách sắp xếp kiểm thử đã được xác định.
- Kế hoạch sẵn sàng để duyệt, với các phụ thuộc chưa giải quyết được hiển thị rõ.

## 13. Kiểm tra kiến thức

1. Vì sao một biểu mẫu nhìn thấy được không chứng minh rằng việc gửi hoạt động?
2. Việc website xử lý một yêu cầu khác với việc đích đến xác nhận đã nhận như thế nào?
3. Vì sao cần đặc tả các trạng thái lỗi và khôi phục trước khi xây dựng?
4. Công việc nào vẫn có thể tiến hành khi chưa có cấu hình tích hợp?
5. Vì sao một thành công mô phỏng không bao giờ được bị nhầm là một biểu mẫu có kết nối?
