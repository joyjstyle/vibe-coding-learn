# Bài 7.3: Gỡ lỗi tính năng tương tác và xử lý sự cố

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Tái hiện một lỗi tương tác một cách ổn định.
- Dùng công cụ dành cho nhà phát triển của trình duyệt để thu thập bằng chứng liên quan.
- Phân biệt lỗi giao diện, lỗi request và lỗi tích hợp.
- Giao cho Claude một nhiệm vụ điều tra có trọng tâm.
- Kiểm tra một bản sửa lỗi và cách tính năng khôi phục sau sự cố.

**Điều kiện tiên quyết:** Hoàn thành Bài 7.2 và có một tính năng đã triển khai đang chạy cục bộ.

**Tài liệu cần chuẩn bị:** Bản đặc tả tính năng, tiêu chí chấp nhận, phần triển khai, cách sắp xếp kiểm thử và các phát hiện còn tồn đọng.

## 1. Bắt đầu từ những gì bạn quan sát được

**Gỡ lỗi** (debugging) nghĩa là điều tra vì sao một tính năng hoạt động khác với mong đợi.

Hãy bắt đầu từ những gì bạn thấy xảy ra, không phải từ một phỏng đoán về cách sửa.

| Vội kết luận | Quan sát hữu ích |
|---|---|
| API bị hỏng | Gửi thông tin kiểm thử hợp lệ thì hiện ra một lỗi |
| Cần thay nút bấm | Nhấn nút không tạo ra phản hồi như đã đặc tả |
| Cơ sở dữ liệu làm mất bài gửi | Không tìm thấy bản ghi kiểm thử mong đợi |
| Trang cần được tải lại | Biểu tượng đang tải vẫn hiển thị sau khi request đã kết thúc |

Một **API**, hay giao diện lập trình ứng dụng, là một cách thức được định nghĩa sẵn để một phần mềm gửi request đến một phần mềm khác.

Quan sát ghi lại điều gì đã xảy ra. Việc điều tra tìm ra vì sao.

**Đừng yêu cầu Claude thay đổi mã dựa trên một nguyên nhân mà bạn chỉ mới giả định.**

## 2. Viết các bước mà người khác có thể lặp lại

Một **báo cáo lỗi** hữu ích cho phép người khác tái hiện vấn đề.

| Mục | Cần ghi gì |
|---|---|
| Vị trí | Trang và tính năng |
| Trạng thái triển khai | Branch, commit và mọi thay đổi chưa commit có liên quan |
| Môi trường | Máy tính của bạn, hoặc môi trường kiểm thử đã được phê duyệt |
| Trạng thái ban đầu | Các điều kiện trước khi tương tác |
| Các bước | Chính xác những hành động đã thực hiện |
| Kết quả mong đợi | Những gì bản đặc tả nói sẽ xảy ra |
| Kết quả thực tế | Những gì đã xảy ra thay vào đó |
| Tần suất | Lần nào cũng vậy, hay chỉ thỉnh thoảng |
| Bằng chứng | Ảnh chụp màn hình, thông báo lỗi liên quan hoặc chi tiết request đã loại bỏ dữ liệu cá nhân |

Hãy dùng thông tin tổng hợp (synthetic).

### Ví dụ

> Mở trang liên hệ trên máy cục bộ. Để trống trường email bắt buộc và nhấn Gửi. Bản đặc tả yêu cầu một thông báo lỗi được liên kết với trường email. Không có thông báo nào xuất hiện, và tiêu điểm bàn phím vẫn ở nút Gửi. Điều này xảy ra ở mọi lần thử.

Báo cáo này không đoán xem nguyên nhân nằm ở bước kiểm tra dữ liệu, ở việc hiển thị lỗi hay ở việc xử lý tiêu điểm. Nó để việc đó cho quá trình điều tra.

## 3. Xác nhận vấn đề trước khi điều tra

Hãy lặp lại các bước trong những điều kiện đã ghi lại, và kiểm tra xem:

- Đúng phiên bản mã đang chạy chưa.
- Cấu hình mong đợi đã có sẵn chưa.
- Trình duyệt đã tải những thay đổi mới nhất chưa, thay vì một bản cũ.
- Trạng thái ban đầu có khớp với báo cáo không.
- Dữ liệu kiểm thử trước đó có đang ảnh hưởng đến kết quả không.
- Vấn đề có chỉ xảy ra ở một kích thước màn hình nhất định hoặc trong một trạng thái nhất định không.

Nếu bạn không thể tái hiện vấn đề, hãy ghi lại điều đó, cùng với các điều kiện bạn đã thử.

Một vấn đề **chập chờn** (intermittent) chỉ xảy ra thỉnh thoảng. Đừng đóng nó chỉ vì một lần thử đã thành công.

Mỗi lần chỉ thay đổi một điều kiện. Nếu bạn thay đổi nhiều điều kiện cùng lúc, bạn sẽ không biết điều kiện nào tạo ra khác biệt.

## 4. Dùng công cụ trình duyệt để có bằng chứng tập trung

**Công cụ dành cho nhà phát triển** (developer tools) được tích hợp sẵn trong Chrome, Edge, Firefox và Safari. Chúng cho thấy những gì đang diễn ra phía sau trang. Hãy mở chúng từ menu của trình duyệt hoặc bằng phím tắt được trình duyệt ghi trong tài liệu.

| Bảng | Bằng chứng hữu ích |
|---|---|
| **Console** | Lỗi và cảnh báo do mã của trang tạo ra trong lúc chạy |
| **Network** | Các request mà trang tạo ra, response của chúng, thời gian và các lượt tải thất bại |
| **Elements** | Cấu trúc thực tế, thuộc tính và style của trang |
| **Accessibility** | Tên, vai trò và trạng thái mà công nghệ hỗ trợ nhận được |

Chỉ thu thập thông tin liên quan đến lỗi bạn đang điều tra.

### Kiểm tra trong Console

Hãy tìm các lỗi xuất hiện khi bạn tái hiện vấn đề. Ghi lại thông báo và, nếu có hiển thị, tệp và dòng mà nó trỏ đến.

Một cảnh báo trong console không tự động là nguyên nhân. Hãy giải thích bằng chứng đó liên quan thế nào đến sự cố bạn quan sát được.

### Kiểm tra trong Network

Với một tính năng có gửi request:

1. Mở bảng **Network**.
2. Tái hiện vấn đề trong phạm vi cách sắp xếp kiểm thử được cho phép.
3. Tìm request liên quan trong danh sách.
4. Kiểm tra phương thức, đích đến, **mã trạng thái** (status code) và response của nó.
5. So sánh những gì bạn thấy với các yêu cầu tích hợp.

Mã trạng thái là một con số mà máy chủ trả về để tóm tắt kết quả. Mã trong khoảng 200 thường nghĩa là thành công, khoảng 400 thường nghĩa là request có vấn đề, và khoảng 500 thường nghĩa là máy chủ có vấn đề.

Một request cũng mang theo **header**, tức thông tin bổ sung về request, và **payload**, tức thông tin được gửi đi. Cả hai đều có thể chứa thông tin đăng nhập hoặc thông tin cá nhân. Đừng bao giờ chia sẻ toàn bộ chúng. Hãy loại bỏ các giá trị nhạy cảm trước khi đưa vào bằng chứng.

## 5. Tìm giai đoạn bị lỗi

Hãy lần theo tương tác qua những giai đoạn thực sự tồn tại. Với một biểu mẫu:

| Giai đoạn | Câu hỏi điều tra |
|---|---|
| Nhập liệu | Trường có giữ giá trị mà khách truy cập đã nhập không? |
| Kiểm tra dữ liệu | Quy tắc đúng có chạy và báo cáo kết quả không? |
| Xử lý gửi | Quy trình gửi có bắt đầu không? |
| Request | Có request nào được gửi đến đích đến đã được phê duyệt không? |
| Ứng dụng xử lý | Ứng dụng có chấp nhận và xử lý nó như đã đặc tả không? |
| Dịch vụ nhận | Dịch vụ có xác nhận kết quả mong đợi không? |
| Phản hồi | Trang có hiển thị một thông báo chính xác về kết quả đó không? |

Chỉ khẳng định chắc chắn trong phạm vi mà bằng chứng của bạn cho phép. Ví dụ, nếu chưa từng có request nào được gửi, việc kiểm tra hộp thư sẽ không giải thích được gì.

Với accordion hoặc tab, hãy lần theo hành động của khách truy cập, sự thay đổi trạng thái và những gì trang hiển thị thay vào đó.

## 6. Tách triệu chứng khỏi nguyên nhân

Một **triệu chứng** là thứ bạn có thể thấy đang sai. Một **nguyên nhân** là lý do đằng sau nó.

Một lỗi có thể gây ra nhiều triệu chứng. Ví dụ:

- Một request thất bại.
- Biểu tượng đang tải vẫn hiển thị.
- Nút Gửi vẫn bị vô hiệu hóa.

Request thất bại và việc thiếu cơ chế khôi phục có thể cần những bản sửa riêng biệt.

Tương tự, nhiều vấn đề được báo cáo có thể có chung một nguyên nhân.

Một **giả thuyết** là một lời giải thích được đề xuất nhưng chưa được xác nhận. Hãy yêu cầu Claude giải thích:

1. Bằng chứng nào ủng hộ nguyên nhân được đề xuất.
2. Nó giải thích được những triệu chứng nào.
3. Điều gì vẫn còn chưa chắc chắn.
4. Bước kiểm tra nào sẽ xác nhận hoặc loại trừ lời giải thích đó.

Đừng chấp nhận một lời giải thích kiểu "có lẽ là vấn đề về state" như một chẩn đoán đã được xác nhận.

## 7. Giao cho Claude một nhiệm vụ chỉ điều tra

```text
Investigate the reported interactive defect.

Before investigating:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect the feature specification and relevant implementation.
- Check the authorised test environment and external-action limits.

Investigate:
- Reproduce the reported behaviour where possible.
- Trace the interaction through the relevant stages.
- Inspect focused browser or application evidence.
- Distinguish observed facts from hypotheses.
- Identify related usages that may be affected.

Return:
1. Reproduction result and conditions.
2. Expected and actual behaviour.
3. Evidence collected.
4. Confirmed cause, or ranked hypotheses if unconfirmed.
5. Smallest suitable correction.
6. Affected files and related behaviour.
7. Verification needed after correction.

Do not edit files, install dependencies, commit, push or deploy.
Do not trigger external actions outside the agreed test scope.
Do not expose credentials or personal information.

Defect:
[Insert the reproducible report.]

References:
[Insert exact references and test arrangements.]
```

Hãy rà soát chẩn đoán trước khi cho phép sửa.

Nếu việc kiểm thử thêm cần một môi trường hoặc cấu hình chưa có sẵn, hãy ghi lại phụ thuộc đó. Đừng bịa ra kết quả.

## 8. Sửa nguyên nhân và cơ chế khôi phục

Một bản sửa tốt khắc phục lỗi đã được xác nhận và giữ nguyên hành vi đã được phê duyệt.

Với việc xử lý sự cố, hãy kiểm tra rằng trang:

- Ngừng hiển thị tiến trình vào đúng thời điểm.
- Hiển thị thông báo lỗi đã được đặc tả.
- Giữ lại những gì khách truy cập đã nhập, như đã thống nhất.
- Cung cấp cách thử lại được cho phép.
- Không khẳng định một kết quả mà nó không thể xác nhận.

Đừng thêm cơ chế tự động thử lại chỉ để làm cho sự cố ít bị nhìn thấy hơn.

### Prompt sửa lỗi

```text
Correct the verified defect using the reviewed diagnosis.

- Address the confirmed cause.
- Preserve approved content and interaction behaviour.
- Follow existing project conventions.
- Include the specified failure and recovery behaviour.
- Keep changes within the defect and necessary supporting files.
- Avoid unrelated refactoring or new dependencies.

After editing:
- Repeat the original reproduction steps.
- Verify the expected result.
- Check relevant success, failure and recovery states.
- Recheck affected shared usages.
- Run applicable documented project checks.
- Report evidence and remaining limitations.

Do not commit, push or deploy.
Perform external tests only within existing authorisation.

Verified diagnosis:
[Insert diagnosis and evidence.]

Acceptance criteria:
[Insert the required outcomes.]
```

## 9. Kiểm thử cả việc khôi phục lẫn sự cố

Hiển thị một thông báo lỗi chỉ là một nửa của việc xử lý sự cố. Hãy kiểm tra xem khách truy cập có thể làm gì tiếp theo.

| Tình huống | Kiểm tra khôi phục |
|---|---|
| Thiếu dữ liệu bắt buộc | Khách truy cập có thể điền vào trường và tiếp tục |
| Việc gửi thất bại trước khi dịch vụ chấp nhận | Những gì đã nhập theo thỏa thuận được giữ lại và cách thử lại được cho phép hoạt động |
| Kết quả không chắc chắn | Thông báo tuân theo bước tiếp theo đã được đặc tả và không khuyến khích một bản gửi trùng lặp không an toàn |
| Bộ lọc không tìm thấy kết quả nào | Khách truy cập có thể xóa hoặc thay đổi lựa chọn của mình |
| Một hình ảnh không tải được | Thông tin cần thiết vẫn có nghĩa, như đã thống nhất |

Hãy dùng một cách mô phỏng sự cố có kiểm soát ở những nơi có sẵn.

Đừng bao giờ cố ý làm gián đoạn một dịch vụ đang chạy thật để tạo ra sự cố.

## 10. Ghi lại cách giải quyết

Hãy cập nhật phát hiện với:

- Nguyên nhân đã được xác nhận.
- Bản sửa đã thực hiện.
- Các tệp đã thay đổi.
- Các bước kiểm tra đã lặp lại.
- Bằng chứng.
- Mọi giới hạn còn lại.

Hãy dùng các trạng thái phát hiện hiện có:

- **Đang mở**
- **Đã sửa, chờ xác minh**
- **Đã xác minh**
- **Chờ quyết định**

Nếu quá trình điều tra phát hiện ra một vấn đề riêng biệt, hãy ghi nó thành một phát hiện mới có liên kết. Đừng âm thầm mở rộng nhiệm vụ ban đầu.

## 11. Bài tập thực hành

**Nhiệm vụ: Điều tra và giải quyết một lỗi tương tác.**

1. Chọn một phát hiện đã được xác minh hiện có.
2. Viết các bước tái hiện nó.
3. Thu thập bằng chứng tập trung.
4. Yêu cầu Claude điều tra mà không chỉnh sửa.
5. Rà soát chẩn đoán.
6. Cho phép một bản sửa có giới hạn rõ ràng.
7. Kiểm thử lại vấn đề ban đầu và việc khôi phục liên quan.
8. Cập nhật phát hiện.

Nếu không có lỗi nào, hãy dùng một bài tập do người hướng dẫn cung cấp hoặc một cách mô phỏng sự cố cục bộ đã được phê duyệt. Đừng bao giờ đưa lỗi vào công việc dùng chung hoặc đang chạy thật để hoàn thành bài học.

## 12. Sản phẩm cần nộp

Nộp:

- Báo cáo lỗi.
- Các điều kiện và kết quả tái hiện.
- Bằng chứng liên quan, đã loại bỏ các giá trị nhạy cảm.
- Chẩn đoán của Claude và phần rà soát của bạn.
- Nhiệm vụ sửa lỗi.
- Bản tóm tắt các tệp đã thay đổi.
- Kết quả kiểm thử lại và khôi phục.
- Trạng thái đã cập nhật của phát hiện.

## 13. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Vấn đề được mô tả thông qua những gì có thể quan sát được.
- Bằng chứng ủng hộ chẩn đoán.
- Bản sửa nằm trong phạm vi được cho phép.
- Vấn đề ban đầu đã được kiểm thử lại.
- Hành vi sự cố và khôi phục liên quan đã được kiểm tra.
- Những chỗ sử dụng bị ảnh hưởng và các bước kiểm tra của dự án đều đã được bao quát.
- Sự chưa chắc chắn và các phụ thuộc còn lại được báo cáo chính xác.

## 14. Kiểm tra kiến thức

1. Vì sao một báo cáo lỗi nên mô tả hành vi trước khi đề xuất cách sửa?
2. Một response thành công trong trình duyệt không chứng minh được điều gì về việc gửi đến nơi?
3. Làm thế nào một sự cố có thể tạo ra nhiều triệu chứng riêng biệt?
4. Vì sao cần kiểm thử việc khôi phục sau khi một thông báo lỗi xuất hiện?
5. Khi nào một phát hiện đã sửa có thể được đánh dấu là đã xác minh?
