# Bài 7.4: Rà soát và nộp các tính năng tương tác

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Rà soát một tính năng tương tác so với bản đặc tả đã được phê duyệt.
- Giữ riêng biệt bằng chứng về giao diện, tích hợp và việc gửi đến nơi.
- Kiểm tra rằng các thay đổi khi gỡ lỗi không làm hỏng hành vi hiện có.
- Chuẩn bị một bản bàn giao rõ ràng cho từng tính năng.
- Ghi nhận chính xác sự chấp nhận của người hướng dẫn và lưu công việc đã được chấp nhận thành một mốc lưu Git.

**Điều kiện tiên quyết:** Hoàn thành Bài 7.1 đến 7.3.

**Tài liệu cần chuẩn bị:** Bản đặc tả tính năng, các nhiệm vụ triển khai, danh sách kiểm tra trạng thái, bằng chứng tích hợp, hồ sơ gỡ lỗi và các phụ thuộc còn tồn đọng.

## 1. Xác định chính xác những gì bạn đang nộp

Với mỗi tính năng, hãy ghi lại:

| Mục | Cần ghi gì |
|---|---|
| Tính năng | Tên và mục đích đã được phê duyệt |
| Vị trí | Trang, component hoặc những chỗ dùng chung |
| Phạm vi | Giao diện, hành vi cục bộ, tích hợp hoặc toàn bộ luồng đầu-cuối |
| Tài liệu tham chiếu | Các phiên bản đặc tả và thiết kế đã được phê duyệt |
| Trạng thái triển khai | Branch, commit và mọi thay đổi chưa commit có liên quan |
| Môi trường kiểm thử | Nơi các bước kiểm tra đã diễn ra |
| Các mục còn tồn đọng | Phụ thuộc, lỗi và các bước kiểm tra chưa làm |

**Hãy chấp nhận một tính năng dựa trên một phạm vi đã xác định, không dựa trên một khẳng định chung chung rằng nó "chạy được".**

Ví dụ, một accordion có thể hoàn thành mà hoàn toàn không cần tích hợp. Một biểu mẫu kết nối với dịch vụ email cần bằng chứng vượt xa giao diện và việc kiểm tra dữ liệu cục bộ của nó.

## 2. So sánh với danh sách tính năng đã được phê duyệt

Hãy so sánh những gì đã được xây dựng với danh sách các tính năng tương tác đã được phê duyệt. Tìm:

- Các tính năng bắt buộc còn thiếu.
- Các nút điều khiển trông như hoạt động nhưng không làm gì cả.
- Các tính năng được xây dựng vượt quá phạm vi đã phê duyệt.
- Các bản mô phỏng tạm thời vẫn còn tồn tại.
- Các trạng thái bắt buộc chưa được xây dựng.
- Các tích hợp vẫn đang chờ cấu hình hoặc kiểm thử.

### Ví dụ sổ đăng ký tính năng

| Tính năng | Phạm vi đã xây dựng | Trạng thái xác minh | Công việc còn tồn đọng |
|---|---|---|---|
| Accordion câu hỏi thường gặp | Tương tác cục bộ đã được phê duyệt | Đã xác minh | Không có |
| Biểu mẫu liên hệ | Giao diện và kiểm tra dữ liệu | Đã xác minh cục bộ | Việc gửi có kết nối bị chặn |
| Bộ lọc liệu trình | Hành vi lọc đã được phê duyệt | Kiểm tra chưa đầy đủ | Còn tồn đọng phần rà soát bàn phím |

Hãy dùng các tính năng thực tế của dự án.

Đừng che giấu một tích hợp chưa hoàn thành đằng sau một nhãn "Đã triển khai" duy nhất.

## 3. Rà soát toàn bộ các trạng thái

Hãy tập hợp các yêu cầu từ Bài 7.1 và kết quả từ Bài 7.2 và 7.3. Với mỗi trạng thái có áp dụng, hãy xác lập:

1. Điều gì sẽ xảy ra.
2. Những gì đã được xây dựng.
3. Nó đã được kiểm tra như thế nào.
4. Các thay đổi về sau có ảnh hưởng đến bằng chứng đó không.

| Trạng thái hoặc hành vi | Kết quả | Bằng chứng hoặc giới hạn |
|---|---|---|
| Giao diện ban đầu | Đạt / Không đạt / Chưa kiểm tra | So sánh với tài liệu tham chiếu |
| Tương tác hợp lệ | Đạt / Không đạt / Chưa kiểm tra | Quan sát trong trình duyệt |
| Dữ liệu nhập không hợp lệ | Đạt / Không đạt / Chưa kiểm tra | Bài kiểm thử kiểm tra dữ liệu |
| Đang tải | Đạt / Không đạt / Chưa kiểm tra | Kiểm tra request có kiểm soát |
| Thông báo thành công | Đạt / Không đạt / Chưa kiểm tra | Kết quả đã được xác nhận |
| Thông báo thất bại | Đạt / Không đạt / Chưa kiểm tra | Mô phỏng sự cố đã được phê duyệt |
| Khôi phục | Đạt / Không đạt / Chưa kiểm tra | Kiểm tra việc sửa hoặc thử lại |
| Hành vi bàn phím | Đạt / Không đạt / Chưa kiểm tra | Chuỗi thao tác bàn phím đã ghi lại |

Không phải trạng thái nào cũng áp dụng cho mọi tính năng. Hãy dùng **Không áp dụng** kèm lý do. Đừng bịa ra một trạng thái đang tải cho một tương tác đơn giản vốn không có.

## 4. Giữ riêng bằng chứng tích hợp

Với các tính năng có kết nối, hãy rà soát từng giai đoạn một cách riêng biệt:

| Giai đoạn | Bằng chứng cho thấy điều gì |
|---|---|
| Request đã được gửi | Trình duyệt đã thử gửi theo đúng đặc tả |
| Response của ứng dụng | Ứng dụng đã xử lý request theo cách quan sát được |
| Dịch vụ chấp nhận | Dịch vụ nhận đã chấp nhận request |
| Đích đến nhận được | Bản ghi hoặc tin nhắn mong đợi đã đến được đích |
| Thông báo cho khách truy cập | Trang đã hiển thị một thông báo chính xác về kết quả đã được xác nhận |

Một giai đoạn thành công không chứng minh giai đoạn tiếp theo.

### Ví dụ

> Ứng dụng đã trả về một response thành công, nhưng việc nhận tại đích đến chưa được kiểm tra.

Đây là một kết quả từng phần hợp lệ và trung thực. Đừng viết lại nó thành:

> Tin nhắn đã được gửi đến nơi thành công.

Nếu một giai đoạn nằm ngoài kiến trúc đã được phê duyệt hoặc các bước kiểm tra đã thống nhất, hãy giải thích ranh giới đó thay vì báo cáo nó là một lỗi.

## 5. Kiểm tra cấu hình và ranh giới kiểm thử

Hãy xác nhận tính năng dùng đúng cách tiếp cận đã định đối với **cấu hình**, tức các thiết lập cho website biết cách kết nối với các dịch vụ khác. Kiểm tra xem:

- Tên của các thiết lập bắt buộc đã được ghi trong tài liệu chưa.
- Có thể phân biệt đích đến kiểm thử với đích đến thật không.
- Mọi hành vi kiểm thử tạm thời đã được nhận diện rõ ràng chưa.
- Việc thiếu cấu hình có tạo ra hành vi đã thống nhất không.
- Báo cáo và ảnh chụp màn hình có chứa thông tin đăng nhập hoặc thông tin cá nhân không.
- Đích đến nhận có khớp với quyết định tích hợp đã được phê duyệt không.

Hãy ghi lại mỗi thiết lập bắt buộc theo tên và mục đích. Không bao giờ đưa các giá trị bí mật vào bản bàn giao.

Việc đạt trên máy tính của bạn, hoặc trong một môi trường kiểm thử, không chứng minh rằng một môi trường khác đã được cấu hình đúng.

Hãy giữ riêng mọi bước kiểm tra sau khi deploy, trừ khi nhiệm vụ nêu rõ là bao gồm chúng.

## 6. Kiểm tra lại các thay đổi khi gỡ lỗi

Hãy dùng các phát hiện đã được giải quyết ở Bài 7.3 để quyết định cần chạy những bước kiểm tra hồi quy nào. Hãy hỏi:

- Vấn đề ban đầu có còn được sửa không?
- Các tương tác bình thường có còn hoạt động không?
- Việc khôi phục có còn hoạt động như đã đặc tả không?
- Có thay đổi dùng chung nào ảnh hưởng đến trang hoặc tính năng khác không?
- Bằng chứng trước đó có còn hợp lệ không?

### Ví dụ

Nếu một tiện ích kiểm tra dữ liệu dùng chung đã thay đổi, hãy tìm những chỗ nó được sử dụng và lặp lại các bước kiểm tra mà nó có thể ảnh hưởng.

Nếu chỉ có văn bản đã được phê duyệt của một accordion thay đổi, thì việc kiểm thử lại toàn bộ tích hợp biểu mẫu có lẽ không liên quan.

Hãy chọn các bước kiểm tra phù hợp với các thay đổi. Đừng lặp lại mọi bài kiểm thử khi bằng chứng hợp lệ đã bao quát phiên bản được nộp.

## 7. Chuẩn bị ma trận chấp nhận tính năng

Hãy nối mỗi tiêu chí chấp nhận với bằng chứng của nó.

| Tiêu chí | Kết quả | Bằng chứng | Hành động còn lại |
|---|---|---|---|
| Các nút điều khiển khớp với bản đặc tả đã được phê duyệt | Đạt | So sánh trong trình duyệt | Không có |
| Tương tác bàn phím tuân theo mẫu đã thống nhất | Đạt | Bước kiểm tra bàn phím đã ghi lại | Không có |
| Dữ liệu nhập không hợp lệ tạo ra các thông báo lỗi được liên kết | Đạt | Kết quả kiểm tra dữ liệu | Không có |
| Đích đến đã được phê duyệt nhận được thông tin kiểm thử | Chưa kiểm tra | Chưa có cấu hình kiểm thử | Hoàn tất bài kiểm thử tích hợp được cho phép |
| Một lần thất bại giữ lại những gì đã nhập theo thỏa thuận | Đạt | Kiểm tra sự cố có kiểm soát | Không có |

Hãy dùng các tiêu chí thực tế từ nhiệm vụ đã được duyệt. Hãy giữ riêng biệt:

- Các lỗi đã được xác nhận.
- Các phụ thuộc còn thiếu.
- Các bước kiểm tra chưa làm.
- Các cải tiến tùy chọn.

Một gợi ý tùy chọn không được âm thầm trở thành một yêu cầu chấp nhận mới.

## 8. Yêu cầu Claude rà soát tính năng lần cuối

```text
Review the selected interactive features for submission.

Read:
- Relevant project instructions.
- Approved feature specifications and interaction designs.
- Task acceptance criteria.
- Current implementation and Git working state.
- State checks, integration evidence and debugging records.
- Outstanding findings and dependencies.

Assess:
1. Whether the submitted scope is implemented.
2. Whether required states and transitions are covered.
3. Whether keyboard and feedback behaviour match the specification.
4. Whether integration claims match the available evidence.
5. Whether debugging changes have unresolved effects.
6. Whether temporary simulations or configuration gaps remain.
7. Which checks or decisions are still outstanding.

Return:
- Sources and implementation state actually inspected.
- Feature-by-feature readiness.
- Acceptance criteria with evidence and results.
- New or unresolved findings.
- Evidence affected by later changes.
- A readiness recommendation for the defined scope.

Review only. Do not edit files, install dependencies,
commit, push or deploy.

Do not submit information or trigger external actions
outside the existing test authorisation.

Do not treat your recommendation as supervisor acceptance.
State which browser and integration checks were actually performed.

Submission scope and references:
[Insert features, task IDs and exact references.]
```

Hãy tự mình xác nhận mọi phát hiện mới trước khi tạo nhiệm vụ sửa lỗi.

## 9. Chuẩn bị bản bàn giao

Bản bàn giao nên cho phép người hướng dẫn rà soát từng tính năng mà không phải tự ghép nối lại lịch sử của nó.

| Mục | Thông tin bắt buộc |
|---|---|
| Các tính năng được nộp | Tên, vị trí và phạm vi |
| Mốc tham chiếu | Các bản đặc tả đã được phê duyệt đã tuân theo |
| Trạng thái triển khai | Phiên bản và mọi thay đổi chưa commit có liên quan |
| Quyền truy cập để rà soát | Hướng dẫn hiện có của dự án để mở và kiểm thử tính năng |
| Xác minh | Ma trận chấp nhận và bằng chứng đi kèm |
| Trạng thái tích hợp | Các giai đoạn đã được xác nhận và các giới hạn còn lại |
| Công việc còn tồn đọng | Phát hiện, phụ thuộc và các bước kiểm tra chưa làm |
| Quyết định được yêu cầu | Phạm vi chính xác được nộp để chấp nhận |

### Ví dụ tuyên bố mức độ sẵn sàng

> Giao diện, kiểm tra dữ liệu và cơ chế khôi phục sau sự cố của biểu mẫu liên hệ đã sẵn sàng để rà soát. Việc gửi có kết nối vẫn bị chặn do thiếu cấu hình kiểm thử. Bài nộp này không đưa ra khẳng định nào về việc gửi đến nơi.

Hãy dùng câu chữ khớp với bằng chứng thực tế. Đừng gọi toàn bộ biểu mẫu là hoàn thành khi chỉ mới kiểm tra hành vi cục bộ của nó.

## 10. Ghi nhận quyết định của người hướng dẫn

Hãy để quyết định ở trạng thái **Chờ duyệt** cho đến khi người hướng dẫn phản hồi. Sau đó ghi lại:

- Người duyệt và ngày quyết định.
- Phiên bản triển khai đã được duyệt.
- Các tính năng và phạm vi được chấp nhận.
- Các chỉnh sửa bắt buộc.
- Các điều kiện tích hợp còn tồn đọng.
- Các nhiệm vụ tiếp theo.

Việc chấp nhận có thể bao gồm toàn bộ một tính năng hoặc một phần được xác định rõ của nó. Ví dụ, chấp nhận giao diện của một biểu mẫu không có nghĩa là việc gửi đến nơi chưa được kiểm thử của nó đã được chấp nhận.

Việc chấp nhận không cho phép deploy hoặc thực hiện thêm các bài kiểm thử có liên quan đến dịch vụ bên ngoài.

## 11. Lưu một mốc lưu Git sau khi được chấp nhận

Khi người hướng dẫn chấp nhận các tính năng, hoặc một phần đã xác định của chúng, hãy lưu công việc đã được chấp nhận thành một mốc lưu Git, theo các bước ở Bài 4.4 và các quy tắc Git của dự án:

1. Chạy `git status` để xem mọi thay đổi.
2. Chỉ stage những tệp thuộc phạm vi đã được chấp nhận, dùng `git add` với đường dẫn của từng tệp.
3. Kiểm tra các thay đổi đã stage bằng `git diff --staged`.
4. Đảm bảo không có tệp môi trường, thông tin đăng nhập hay dữ liệu kiểm thử chứa thông tin cá nhân nào được stage.
5. Commit với một thông điệp rõ ràng tuân theo quy ước của dự án.
6. Thêm mã định danh của commit vào hồ sơ quyết định.

Nếu vẫn còn bản mô phỏng tạm thời nào trong mã, hãy nêu rõ điều đó trong thông điệp commit và hồ sơ quyết định, để không ai nhầm nó với một tích hợp đã hoàn thành.

## 12. Bài tập thực hành

**Nhiệm vụ: Nộp các tính năng tương tác đã xây dựng trong Học phần 7.**

1. Hoàn thành sổ đăng ký tính năng.
2. Tập hợp bằng chứng về trạng thái và tích hợp.
3. Kiểm tra các bản sửa lỗi và những chỗ chúng ảnh hưởng.
4. Hoàn thành ma trận chấp nhận.
5. Chạy các bước kiểm tra còn tồn đọng của dự án.
6. Yêu cầu Claude rà soát lần cuối.
7. Giải quyết các lỗi đã được xác minh trong phạm vi được cho phép.
8. Chuẩn bị bản bàn giao.
9. Ghi nhận quyết định của người hướng dẫn khi có.
10. Sau khi được chấp nhận, lưu một mốc lưu Git và ghi lại mã định danh của nó.

Nếu việc kiểm thử có kết nối vẫn bị chặn, hãy nộp phạm vi đã hoàn thành với một ranh giới chính xác.

## 13. Sản phẩm cần nộp

Nộp:

- Sổ đăng ký tính năng.
- Kết quả bao quát các trạng thái.
- Ma trận chấp nhận.
- Bằng chứng tích hợp và các giới hạn của nó.
- Các phát hiện đã giải quyết và còn tồn đọng.
- Kết quả kiểm tra hồi quy và kiểm tra của dự án.
- Ảnh chụp màn hình hoặc đầu ra kiểm thử tiêu biểu, đã loại bỏ dữ liệu cá nhân.
- Bản bàn giao và quyết định của người hướng dẫn.
- Mã định danh của commit mốc lưu, sau khi công việc được chấp nhận.

## 14. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Phạm vi của mỗi tính năng được nộp được xác định rõ ràng.
- Hành vi bắt buộc đã được rà soát so với bản đặc tả.
- Các khẳng định về tích hợp được hỗ trợ bởi đúng loại bằng chứng.
- Các thay đổi khi gỡ lỗi đã được kiểm tra để phát hiện hồi quy liên quan.
- Hành vi tạm thời và các thiếu sót về cấu hình vẫn được hiển thị rõ.
- Bản bàn giao xác định chính xác phiên bản đang được rà soát.
- Quyết định của người hướng dẫn và công việc tiếp theo được ghi lại chính xác.
- Công việc đã được chấp nhận được lưu thành một mốc lưu Git, nếu quy tắc dự án cho phép.

## 15. Kiểm tra kiến thức

1. Vì sao việc chấp nhận giao diện nên tách riêng khỏi việc chấp nhận tích hợp?
2. Việc dịch vụ chấp nhận một request không chứng minh được điều gì về việc nhận tại đích đến?
3. Khi nào có thể tái sử dụng bằng chứng xác minh trước đó?
4. Vì sao các bản mô phỏng tạm thời phải luôn được hiển thị rõ trong bài nộp?
5. Bạn nên mô tả thế nào về một tính năng mới chỉ được kiểm tra một phần?
