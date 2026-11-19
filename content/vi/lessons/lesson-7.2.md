# Bài 7.2: Triển khai và kiểm thử hành vi tương tác

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Xây dựng một tính năng tương tác từ bản đặc tả đã được duyệt.
- Kiểm tra các trạng thái bình thường, không hợp lệ, đang tải và thất bại của nó, ở những chỗ có áp dụng.
- Kiểm tra hành vi bàn phím và các thông báo có khả năng tiếp cận.
- Kiểm thử kết nối với các dịch vụ khác trong phạm vi môi trường và quyền hạn đã thống nhất.
- Báo cáo chính xác những gì hoạt động và những gì chưa được xác nhận.

**Điều kiện tiên quyết:** Hoàn thành Bài 7.1 và có một nhiệm vụ sẵn sàng để triển khai.

**Tài liệu cần chuẩn bị:** Bản đặc tả tính năng đã được duyệt, thiết kế tương tác đã được phê duyệt, kế hoạch triển khai, các component hiện có và cách sắp xếp kiểm thử đã thống nhất.

## 1. Xác nhận những gì bạn được phép xây dựng

Hãy bắt đầu với nhiệm vụ đã chuẩn bị ở Bài 7.1, và xác nhận nó bao gồm những cấp độ nào dưới đây:

| Phạm vi | Kết quả mong đợi |
|---|---|
| Chỉ giao diện | Các nút điều khiển đã được phê duyệt và giao diện của chúng |
| Tương tác cục bộ | Các trạng thái và hành vi hoạt động bên trong trình duyệt |
| Tích hợp có kết nối | Thông tin đến được dịch vụ đã được phê duyệt |
| Xác minh đầu-cuối | Toàn bộ luồng được xác nhận, từ hành động của khách truy cập đến đích đến cuối cùng |

Một nhiệm vụ có thể bao gồm nhiều cấp độ, nhưng ranh giới của nó phải được nêu rõ.

**Xây dựng xong giao diện không chứng minh rằng toàn bộ tính năng hoạt động.**

Nếu một tích hợp vẫn đang bị chặn, hãy xây dựng những phần được phép và báo cáo rõ ràng các giới hạn.

## 2. Kiểm tra lại dự án trước khi chỉnh sửa

Tại dấu nhắc lệnh của terminal, hãy xác nhận vị trí dự án và trạng thái làm việc:

```bash
pwd
```

```bash
git status --short
```

Sau đó kiểm tra:

- Component đã chọn và các style của nó.
- Những thay đổi đã được thực hiện kể từ khi lập kế hoạch.
- Các **tiện ích** (utility) hiện có, tức những đoạn mã nhỏ dùng chung chỉ làm một việc, và các component tương tác.
- Tên của mọi thiết lập cấu hình cần thiết.
- Các script đã được ghi trong tài liệu của dự án.
- Các điều kiện tiên quyết còn tồn đọng.

Đừng ghi đè những thay đổi mà bạn không nhận ra.

Nếu mã đã thay đổi kể từ khi kế hoạch được duyệt, hãy kiểm tra xem kế hoạch có còn áp dụng được không trước khi tiếp tục.

## 3. Xây dựng hành vi hoàn chỉnh nhỏ nhất

Hãy tuân theo bản đặc tả đã được duyệt và các quy ước của dự án.

Với một accordion, điều này có thể bao gồm:

- Phần kích hoạt (trigger) và khung nội dung đã được phê duyệt.
- Mở và đóng.
- Thông tin chính xác về việc mỗi khung đang mở hay không, có sẵn cho công nghệ hỗ trợ.
- Thao tác bằng bàn phím.
- Quy tắc đã đặc tả về việc có thể mở nhiều khung cùng lúc hay không.

Với một biểu mẫu, điều này có thể bao gồm:

- Các trường và nhãn đã được phê duyệt.
- Kiểm tra dữ liệu.
- Xử lý gửi.
- Một thông báo trong khi đang gửi.
- Thông báo thành công và thất bại.
- Kết nối với dịch vụ nhận, chỉ khi đã được cho phép và cấu hình.

Đừng thêm nút điều khiển hoặc tính năng phụ trong khi xây dựng.

### Phân biệt rõ liên kết và nút bấm

Hãy dùng:

- Liên kết để đi đến một nơi nào đó.
- Nút bấm để làm một việc gì đó.
- Các điều khiển biểu mẫu đúng chuẩn để thu thập thông tin.

Đừng biến một khối văn bản thông thường thành thứ có thể nhấp được khi một phần tử chuẩn đã cung cấp đúng hành vi. Phần tử chuẩn tự động hoạt động với bàn phím và công nghệ hỗ trợ. Văn bản có thể nhấp thường thì không.

## 4. Đặt việc kiểm tra dữ liệu đúng chỗ

Kiểm tra biểu mẫu ngay trong trình duyệt giúp khách truy cập sửa lỗi trước khi gửi.

Hệ thống nhận cũng phải kiểm tra những gì nó nhận được. Các bước kiểm tra trong trình duyệt có thể bị vượt qua dễ dàng, ví dụ khi ai đó gửi thông tin trực tiếp đến endpoint.

Trong phạm vi kiến trúc đã được phê duyệt, hãy quyết định phần nào xử lý từng quy tắc:

| Khía cạnh kiểm tra | Ví dụ về trách nhiệm |
|---|---|
| Dữ liệu bắt buộc | Xác định thông tin bị thiếu |
| Định dạng | Kiểm tra cấu trúc đã thống nhất, như địa chỉ email |
| Giá trị cho phép | Từ chối mọi thứ nằm ngoài các lựa chọn được phép |
| Độ dài hoặc kích thước | Áp dụng các giới hạn đã thống nhất |
| Quy tắc gửi | Áp dụng các yêu cầu riêng của hệ thống nhận |

TypeScript kiểm tra mã của bạn trong lúc bạn viết. Nó không kiểm tra thông tin đến trong lúc website đang chạy, giai đoạn mà các lập trình viên gọi là **runtime** (thời gian chạy). Một kiểu TypeScript nói rằng một trường là địa chỉ email không làm cho dữ liệu khách truy cập nhập vào trở thành một địa chỉ email hợp lệ. Bạn vẫn cần mã kiểm tra dữ liệu thật sự.

Hãy giữ thông báo lỗi rõ ràng và nhất quán với câu chữ đã được phê duyệt.

## 5. Hiển thị thông báo đúng với những gì thực sự đã xảy ra

Phản hồi chỉ nên cho khách truy cập biết những gì hệ thống thực sự biết.

| Tình huống | Thông báo phù hợp |
|---|---|
| Dữ liệu nhập không hợp lệ | Giải thích những gì cần sửa |
| Đang gửi | Cho thấy việc gửi đang diễn ra |
| Dịch vụ xác nhận đã chấp nhận yêu cầu | Hiển thị thông báo xác nhận đã được đặc tả |
| Yêu cầu thất bại | Giải thích lỗi và những gì khách truy cập có thể làm tiếp theo |
| Kết quả không chắc chắn | Tuân theo hành vi khôi phục đã thống nhất, không tuyên bố là thành công |

Ví dụ, việc một dịch vụ chấp nhận một yêu cầu đặt lịch hẹn không giống với việc lịch hẹn đã được xác nhận. Hãy dùng câu chữ đã được phê duyệt để làm rõ sự khác biệt này cho khách truy cập.

### Giữ lại những gì khách truy cập đã nhập một cách phù hợp

Hãy tuân theo bản đặc tả về việc giữ lại hay xóa những gì khách truy cập đã gõ.

Nếu hành vi đã thống nhất là giữ lại dữ liệu sau khi thất bại, thì một yêu cầu thất bại không được xóa sạch chúng.

Đừng tự động gửi lại sau một kết quả không chắc chắn, trừ khi tích hợp có thể xử lý an toàn các bản trùng lặp.

## 6. Kiểm thử các trạng thái đã xác định

Hãy viết một danh sách kiểm tra trạng thái trước khi kiểm thử. Với một biểu mẫu, danh sách có thể gồm:

| Trường hợp kiểm thử | Kết quả mong đợi |
|---|---|
| Gửi khi các trường bắt buộc để trống | Các thông báo lỗi liên quan xuất hiện |
| Nhập một giá trị không hợp lệ | Bước kiểm tra dữ liệu đã đặc tả phát hiện ra nó |
| Sửa giá trị không hợp lệ | Thông báo lỗi cập nhật như đã đặc tả |
| Gửi thông tin kiểm thử hợp lệ | Quy trình gửi đã được phê duyệt bắt đầu |
| Nhấn Gửi nhiều lần liên tiếp thật nhanh | Các lần thử lặp lại được xử lý như đã đặc tả |
| Mô phỏng một lỗi | Thông báo lỗi và việc khôi phục hoạt động đúng |
| Hoàn tất một lần kiểm thử thành công được cho phép | Thông báo xác nhận khớp với kết quả đã được xác minh |

Hãy dùng thông tin kiểm thử **tổng hợp** (synthetic), tức dữ liệu bịa ra không thuộc về người thật nào. Không bao giờ dùng thông tin thật của khách hàng hoặc bệnh nhân trong một bài tập thực hành.

Với accordion, tab hoặc bộ lọc, hãy dùng các trạng thái và chuyển trạng thái đã được xác định cho tính năng đó ở Bài 7.1. Đừng ép mọi tính năng vào một danh sách kiểm tra dành cho biểu mẫu.

## 7. Kiểm tra hành vi bàn phím và các thông báo

Hãy sử dụng tính năng chỉ bằng bàn phím. Xác nhận rằng:

- Mọi nút điều khiển liên quan đều có thể truy cập được.
- Tiêu điểm (focus) hiển thị rõ ràng.
- Các nút điều khiển phản hồi với những phím được mong đợi.
- Tiêu điểm di chuyển, hoặc giữ nguyên, như tương tác đã đặc tả.
- Không có **bẫy bàn phím** (keyboard trap), tức khi tiêu điểm đi vào một component và không thể thoát ra.
- Thông báo lỗi và thông báo trạng thái được liên kết với đúng trường và được đọc lên như yêu cầu.

Với biểu mẫu, hãy kiểm tra cách nhãn và thông báo lỗi được liên kết trong mã, không chỉ cách chúng hiển thị.

Một bước kiểm tra bằng bàn phím không chứng minh rằng trình đọc màn hình đọc các thông báo đúng cách. Hãy ghi lại những bước kiểm tra khả năng tiếp cận nào bạn thực sự đã thực hiện. Bài 8.3 đề cập đến một đợt rà soát khả năng tiếp cận đầy đủ hơn.

## 8. Kiểm thử tích hợp trong môi trường đã thống nhất

Trước khi gửi bất kỳ bài gửi thử nào, hãy xác nhận cách sắp xếp kiểm thử đã thống nhất ở Bài 7.1:

- Endpoint hoặc dịch vụ.
- Môi trường.
- Thông tin kiểm thử.
- Người nhận hoặc đích đến.
- Cách kiểm tra việc nhận.

Nếu nhiệm vụ cho phép bài kiểm thử và các tác động phụ của nó, hãy tiến hành trong phạm vi đó.

Nếu một bài kiểm thử sẽ kích hoạt một hành động nằm ngoài những gì được cho phép, hãy để nó ở trạng thái chờ và nêu rõ hành động cụ thể cần có quyết định.

### Kiểm tra riêng từng giai đoạn

Khi một biểu mẫu được gửi, trình duyệt tạo một **request** (yêu cầu) đến endpoint, và endpoint gửi lại một **response** (phản hồi) cho biết điều gì đã xảy ra.

| Giai đoạn | Bằng chứng |
|---|---|
| Trình duyệt gửi request | Request hiển thị trong công cụ dành cho nhà phát triển của trình duyệt |
| Ứng dụng xử lý request | Response, hoặc đầu ra riêng của ứng dụng đã loại bỏ dữ liệu cá nhân |
| Dịch vụ nhận chấp nhận nó | Response của dịch vụ hoặc một bản ghi kiểm thử |
| Đích đến nhận được nó | Một bản ghi đã được xác nhận, một email trong hộp thư kiểm thử hoặc tương tự |
| Khách truy cập thấy một thông báo chính xác | Quan sát trong trình duyệt |

Một giai đoạn thành công không chứng minh rằng các giai đoạn khác cũng thành công.

Hãy giữ thông tin đăng nhập và thông tin cá nhân đã gửi ngoài ảnh chụp màn hình và báo cáo.

## 9. Hướng dẫn Claude xây dựng tính năng

```text
Implement the selected interactive feature according to
the reviewed task, specification and plan.

Before editing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect changes made since planning.
- Confirm prerequisites and the authorised integration scope.

During implementation:
- Reuse established components and project conventions.
- Implement the approved controls, states and transitions.
- Preserve approved wording and interaction design.
- Apply validation at the appropriate layers.
- Ensure feedback reflects the actual confirmed outcome.
- Follow the specified keyboard and focus behaviour.
- Keep credentials out of browser-delivered code and reports.

Verification:
- Test the applicable normal, invalid, loading and failure states.
- Check keyboard behaviour and accessibility associations.
- Use synthetic information.
- Perform external tests only within the agreed authority
  and test arrangements.
- Recheck affected shared usages.
- Run applicable documented project checks.

Report:
- Files changed and why.
- States and criteria verified.
- Integration stages actually confirmed.
- Checks not performed and their reasons.
- Remaining findings and dependencies.

Do not add unrelated features, commit, push or deploy.

Task and reviewed plan:
[Insert the task.]

References and test arrangements:
[Insert exact references.]
```

## 10. Rà soát và kiểm thử lại các thay đổi

Hãy kiểm tra các tệp đã thay đổi và hành vi trong trình duyệt. Tìm:

- Các chỉnh sửa không liên quan.
- Các gói (package) mới không mong đợi.
- Các response thành công bịa ra.
- Thiếu xử lý lỗi.
- Các trường được gửi đến sai chỗ trong hệ thống nhận.
- Cấu hình bí mật có thể lọt đến trình duyệt của khách truy cập.
- Các thay đổi dùng chung ảnh hưởng đến component khác.

Hãy yêu cầu Claude giải thích mọi lựa chọn triển khai mà bạn không hiểu.

Sau mỗi lần chỉnh sửa:

1. Lặp lại bước kiểm tra ban đầu đã thất bại.
2. Kiểm tra các trạng thái bị ảnh hưởng và những chỗ dùng chung.
3. Chạy các bước kiểm tra liên quan của dự án.
4. Cập nhật trạng thái của phát hiện.

Đừng đánh dấu một tính năng là hoàn thành khi còn bất kỳ trạng thái bắt buộc nào chưa được kiểm thử.

## 11. Bài tập thực hành

**Nhiệm vụ: Xây dựng và kiểm tra tính năng đã lên kế hoạch ở Bài 7.1.**

1. Xác nhận phạm vi được cho phép.
2. Yêu cầu Claude xây dựng theo kế hoạch đã được duyệt.
3. Kiểm tra các tệp đã thay đổi.
4. Kiểm thử các trạng thái đã xác định.
5. Kiểm tra hành vi bàn phím và các thông báo.
6. Chạy các bài kiểm thử tích hợp được cho phép, ở những chỗ có áp dụng.
7. Sửa các lỗi đã được xác minh.
8. Kiểm thử lại và ghi lại kết quả.

Nếu việc kiểm thử có kết nối bị chặn, hãy nộp những phần bạn đã kiểm tra cục bộ và nêu chính xác những gì chưa được xác nhận.

## 12. Sản phẩm cần nộp

Nộp:

- Mã nhiệm vụ và prompt triển khai.
- Bản tóm tắt các tệp đã thay đổi.
- Kết quả về trạng thái và tiêu chí chấp nhận.
- Kết quả kiểm tra bàn phím và khả năng tiếp cận.
- Bằng chứng tích hợp, nếu có liên quan.
- Ảnh chụp màn hình hoặc đầu ra kiểm thử, đã loại bỏ dữ liệu cá nhân.
- Kết quả các bước kiểm tra của dự án.
- Các phát hiện còn tồn đọng và giới hạn của các bước kiểm tra bạn đã làm.

## 13. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Phạm vi được cho phép của tính năng đã được xây dựng.
- Các trạng thái và chuyển trạng thái bắt buộc đã được kiểm tra.
- Kiểm tra dữ liệu và thông báo tuân theo bản đặc tả.
- Hành vi bàn phím đã được kiểm tra.
- Các khẳng định về tích hợp khớp với bằng chứng hiện có.
- Những chỗ dùng chung bị ảnh hưởng đã được kiểm tra lại.
- Các phụ thuộc còn lại và các bước kiểm tra chưa thực hiện được hiển thị rõ.
- Tính năng sẵn sàng để người hướng dẫn duyệt.

## 14. Kiểm tra kiến thức

1. Vì sao một kiểu TypeScript không kiểm tra thông tin đến vào lúc runtime?
2. Một thông báo thành công nên liên quan thế nào đến response của hệ thống nhận?
3. Vì sao bạn nên kiểm thử việc nhấn Gửi nhiều lần?
4. Bằng chứng nào phân biệt việc website xử lý một request với việc đích đến nhận được nó?
5. Bạn nên báo cáo thế nào về một tính năng hoạt động cục bộ trong khi việc kiểm thử có kết nối bị chặn?
