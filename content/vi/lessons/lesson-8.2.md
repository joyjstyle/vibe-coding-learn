# Bài 8.2: Sửa các lỗi QA và chạy kiểm tra hồi quy

### Mục tiêu bài học

Kết thúc bài học này, bạn sẽ có thể:

- Biến các phát hiện QA đã được xác minh thành những nhiệm vụ sửa lỗi có quy mô vừa phải.
- Rà soát một bản sửa được đề xuất trước khi nó được thực hiện.
- Kiểm thử lại từng lỗi trong đúng các điều kiện ban đầu của nó.
- Chọn các bước kiểm tra hồi quy dựa trên những thay đổi thực sự đã được thực hiện.
- Cập nhật hồ sơ QA với bằng chứng chính xác, và lưu các bản sửa đã được chấp nhận thành một mốc lưu Git.

**Điều kiện tiên quyết:** Hoàn thành Bài 8.1 và đã được duyệt các phát hiện cùng thứ tự ưu tiên sửa lỗi của bài đó.

**Tài liệu cần chuẩn bị:** Các phát hiện QA, các trường hợp kiểm thử, tài liệu tham chiếu đã được phê duyệt, các nhiệm vụ sửa lỗi, phần triển khai và bằng chứng xác minh hiện có.

## 1. Làm việc từ các phát hiện đã được xác minh

Hãy bắt đầu với các phát hiện đã được ghi lại ở Bài 8.1. Trước khi yêu cầu bất kỳ bản sửa nào, hãy xác nhận rằng mỗi phát hiện có:

- Một vị trí rõ ràng.
- Các điều kiện cần thiết để tái hiện nó.
- Hành vi mong đợi và hành vi thực tế.
- Yêu cầu mà nó dựa trên.
- Bằng chứng đi kèm.
- Các phần của website mà nó ảnh hưởng.

Nếu thiếu bất kỳ mục nào trong số này, hãy điều tra phát hiện đó trước.

**Một bản sửa nên khắc phục một sai khác đã được xác nhận so với yêu cầu. Nó không được lén đưa vào một thiết kế lại chưa được phê duyệt.**

Các gợi ý tùy chọn và các thiếu sót trong đặc tả cần có quyết định riêng, từ đúng người.

## 2. Gom nhóm các bản sửa theo nguyên nhân và phạm vi

Nhiều phát hiện có thể có chung một nguyên nhân. Ví dụ, khoảng đệm sai trên nhiều thẻ liệu trình có thể đều xuất phát từ một style dùng chung.

Những phát hiện khác có thể trông giống nhau nhưng cần các bản sửa riêng.

| Phát hiện | Cách xử lý phù hợp |
|---|---|
| Nhiều thẻ dùng sai giá trị khoảng cách dùng chung | Một bản sửa cho style dùng chung |
| Hai liên kết trỏ đến hai trang sai khác nhau | Kiểm tra riêng từng đích đến, có thể trong cùng một nhiệm vụ về điều hướng |
| Một biểu mẫu thất bại và không khôi phục đúng cách | Điều tra xem có một hay nhiều nguyên nhân |
| Các trang khác nhau có lỗi nội dung chữ không liên quan đến nhau | Một nhiệm vụ nội dung có giới hạn rõ ràng, với bước kiểm tra trên từng trang |
| Một tính năng chưa có bản đặc tả hành vi được phê duyệt | Lấy quyết định trước khi thay đổi tính năng đó |

Hãy gom nhóm các phát hiện để công việc dễ hiểu hơn, không chỉ để giảm số lượng nhiệm vụ.

Đừng bao giờ gộp các bản sửa không liên quan vào một yêu cầu "dọn dẹp website".

## 3. Đặt thứ tự sửa lỗi

Hãy dùng các mức ưu tiên và phụ thuộc đã được duyệt. Một thứ tự thực tế là:

1. Sửa các vấn đề làm dừng việc kiểm thử tiếp theo.
2. Sửa các nguyên nhân dùng chung ảnh hưởng đến nhiều trang.
3. Sửa các hành trình người dùng quan trọng và các hành động bắt buộc.
4. Sửa các lỗi riêng của từng trang còn lại.
5. Xử lý các sai lệch nhỏ hơn về hình ảnh và nội dung.

Thứ tự thực tế phụ thuộc vào các phát hiện. Một thay đổi trông nhỏ có thể cần cẩn trọng hơn nếu nó ảnh hưởng đến một style dùng chung trên nhiều trang.

Hãy ghi riêng các quyết định về đặc tả và các phụ thuộc chưa có sẵn. Đừng tiếp tục giao công việc đang bị chặn như thể chỉ việc xây dựng là có thể giải quyết được.

## 4. Viết một nhiệm vụ sửa lỗi có giới hạn rõ ràng

Mỗi nhiệm vụ nên nối phát hiện với một kết quả mà người khác có thể kiểm tra.

| Mục | Cần ghi gì |
|---|---|
| Mã nhiệm vụ | Một mã tham chiếu sửa lỗi duy nhất |
| Phát hiện | Các mã được bao gồm trong nhiệm vụ này |
| Kết quả | Điều gì phải đúng sau khi sửa |
| Phạm vi | Các trang, component hoặc hành vi bị ảnh hưởng |
| Tài liệu tham chiếu | Các nguồn đã được phê duyệt xác định kết quả mong đợi |
| Ranh giới | Nội dung và hành vi không được thay đổi |
| Xác minh | Các bước kiểm tra ban đầu cần lặp lại |
| Phạm vi hồi quy | Hành vi liên quan mà thay đổi có thể ảnh hưởng |
| Phụ thuộc | Các quyết định hoặc tài nguyên cần thiết |

### Ví dụ

**Nhiệm vụ:** Sửa khoảng cách của thẻ liệu trình dùng chung.

**Phát hiện:** QA-UI-03 và QA-UI-04.

**Kết quả:** Các thẻ liệu trình dùng khoảng cách bên trong đã được phê duyệt ở các bố cục bắt buộc.

**Phạm vi:** Các style thẻ dùng chung hiện có và những chỗ chúng được dùng.

**Ranh giới:** Giữ nguyên nội dung chữ, đích đến, hình ảnh và thứ tự thẻ.

**Xác minh:** Lặp lại các phép so sánh đã không đạt ở đúng các kích thước khung nhìn ban đầu.

**Hồi quy:** Kiểm tra các thẻ trên trang chủ và trang danh sách, bao gồm cả các thẻ có nội dung đã được phê duyệt dài hơn.

Hãy dùng mã phát hiện và tài liệu tham chiếu thật.

## 5. Rà soát bản sửa được đề xuất

Trước khi thay đổi được thực hiện, hãy xác lập xem nó có thực sự xử lý đúng nguyên nhân hay không. Hãy hỏi:

- Bằng chứng nào ủng hộ chẩn đoán?
- Vì sao cần thay đổi này?
- Nó sẽ ảnh hưởng đến những tệp và chỗ sử dụng nào?
- Các component và style hiện có có xử lý được không?
- Nó có thêm một gói mới hoặc tái cấu trúc rộng hơn không?
- Kết quả sẽ được kiểm tra như thế nào?

Các bản sửa thông thường có thể tuân theo quy ước đã có mà không cần một vòng lập kế hoạch riêng.

Hãy yêu cầu điều tra thêm khi nguyên nhân chưa chắc chắn, hoặc khi thay đổi được đề xuất sẽ làm nhiệm vụ lớn hơn nhiều.

Tương tự, đừng đòi hỏi viết lại quy mô lớn để sửa một lỗi cục bộ trừ khi có bằng chứng cho thấy điều đó là cần thiết.

## 6. Hướng dẫn Claude thực hiện bản sửa

```text
Correct the verified QA findings included in the selected task.

Before editing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect the affected code and existing changes.
- Confirm the findings, expected behaviour and prerequisites.

During implementation:
- Address the verified cause.
- Follow approved references and existing conventions.
- Preserve unrelated content and behaviour.
- Keep changes within the task and necessary supporting files.
- Explain any broader change required before proceeding.
- Do not introduce unrelated dependencies or refactoring.

After implementation:
- Review the changed files.
- Repeat the original failed checks under the recorded conditions.
- Run the selected regression checks.
- Run applicable documented project checks.
- Report the outcome for each finding.
- Identify any new issue or remaining limitation.

Do not mark a finding verified without retest evidence.
Do not commit, push or deploy.
Perform external actions only within existing authorisation.

Correction task:
[Insert the task.]

Findings and references:
[Insert verified findings and exact references.]
```

Hãy rà soát các thay đổi thực tế. Đừng chỉ dựa vào báo cáo hoàn thành của Claude.

## 7. Kiểm thử lại lỗi ban đầu

**Kiểm thử lại** (retesting) kiểm tra xem vấn đề đã báo cáo đã biến mất hay chưa. Hãy dùng đúng những thứ ban đầu:

- Điều kiện ban đầu.
- Các bước.
- Trình duyệt và khung nhìn, nếu có liên quan.
- Thông tin kiểm thử.
- Kết quả mong đợi.

Nếu bạn phải thay đổi bất kỳ điều kiện nào, hãy ghi lại sự khác biệt và giải thích nó ảnh hưởng thế nào đến phép so sánh.

### Ví dụ

Nếu một heading bị cắt mất ở một độ rộng khung nhìn cụ thể:

1. Mở trang đã được sửa.
2. Dùng kích thước khung nhìn và mức thu phóng đã ghi lại.
3. Xác nhận rằng heading đã được phê duyệt giờ hiển thị đầy đủ.
4. So sánh nó với tài liệu tham chiếu tương ứng.

Chỉ kiểm tra ở một khung nhìn rộng hơn sẽ không chứng minh được vấn đề ban đầu đã được sửa.

Nếu vấn đề vẫn xảy ra, hãy để phát hiện ở trạng thái mở và ghi lại bằng chứng mới.

## 8. Chạy các bước kiểm tra hồi quy có trọng tâm

**Kiểm tra hồi quy** (regression checking) tìm kiếm những hư hại ngoài ý muốn đối với những thứ đã hoạt động trước khi thay đổi. Hãy chọn các bước kiểm tra dựa trên những gì bản sửa đã thay đổi.

| Thay đổi | Các bước kiểm tra hồi quy liên quan |
|---|---|
| Style thẻ dùng chung | Các thẻ bị ảnh hưởng, với độ dài nội dung khác nhau |
| Thanh điều hướng ở header | Các trang liên quan, menu trên di động và chỉ báo trang hiện tại |
| Một tiện ích kiểm tra dữ liệu | Các biểu mẫu và quy tắc sử dụng nó |
| Cấu hình route | Mở trực tiếp, tải lại trang và các liên kết đến bị ảnh hưởng |
| Xử lý hình ảnh | Các hình ảnh bị ảnh hưởng và cách cắt khung của chúng ở các độ rộng khác nhau |
| Một đoạn văn đã được phê duyệt | Câu chữ hiển thị, cách ngắt dòng và bố cục xung quanh |

Kiểm thử lại và kiểm tra hồi quy trả lời những câu hỏi khác nhau:

- Kiểm thử lại: lỗi ban đầu đã biến mất chưa?
- Kiểm tra hồi quy: bản sửa có làm hỏng thứ gì khác không?

Đừng mặc định chạy lại toàn bộ kế hoạch QA. Hãy mở rộng việc kiểm thử khi thay đổi, một lỗi hoặc một mối lo ngại chưa được giải quyết là lý do chính đáng.

## 9. Xử lý các bản sửa thất bại và phát hiện mới

Nếu một bản sửa không hiệu quả:

1. Giữ lại bằng chứng.
2. So sánh thay đổi thực tế với chẩn đoán.
3. Xác định xem nguyên nhân có bị hiểu sai không.
4. Yêu cầu một đợt điều tra có trọng tâm.
5. Điều chỉnh nhiệm vụ sửa lỗi nếu cần.

Tránh chồng thêm các bản sửa mang tính phỏng đoán lên trên một sự cố mà không ai hiểu. Mỗi bản sửa như vậy làm cho nguyên nhân thật càng khó tìm hơn.

Nếu việc kiểm thử phát hiện ra một vấn đề riêng biệt, hãy ghi nó thành một phát hiện mới có liên kết. Đừng âm thầm mở rộng nhiệm vụ ban đầu để bao gồm cả công việc không liên quan.

### Khi yêu cầu chưa rõ ràng

Hãy chuyển mục bị ảnh hưởng sang **Chờ quyết định** và nêu chính xác câu hỏi cần được trả lời.

Hãy tiếp tục với các bản sửa khác đã được cho phép. Một quyết định thiết kế chưa được giải quyết không cần phải làm dừng toàn bộ công việc QA.

## 10. Cập nhật hồ sơ QA

Hãy giữ cho mỗi phát hiện, bản sửa của nó và việc xác minh của nó luôn được liên kết với nhau.

| Mục | Cần ghi gì |
|---|---|
| Mã phát hiện | Vấn đề ban đầu |
| Nhiệm vụ sửa lỗi | Công việc đã xử lý nó |
| Nguyên nhân | Lời giải thích đã được xác nhận |
| Phần triển khai | Các tệp đã thay đổi và phiên bản |
| Kiểm thử lại | Bước kiểm tra ban đầu và kết quả của nó |
| Hồi quy | Các bước kiểm tra liên quan và kết quả của chúng |
| Trạng thái | Tình trạng giải quyết hiện tại |
| Giới hạn còn lại | Bằng chứng hoặc phụ thuộc còn tồn đọng |

Hãy dùng các trạng thái hiện có:

- **Đang mở**
- **Đã sửa, chờ xác minh**
- **Đã xác minh**
- **Chờ quyết định**

Một lần kiểm thử lại đạt có thể xác minh lỗi ban đầu, trong khi một lỗi hồi quy mới được phát hiện vẫn ở trạng thái mở như một phát hiện riêng. Đừng mô tả toàn bộ bài nộp là đã sẵn sàng khi công việc bắt buộc vẫn chưa được giải quyết.

## 11. Chuẩn bị bản tóm tắt sửa lỗi

Hãy tóm tắt kết quả cho người duyệt. Ví dụ:

> Ba phát hiện QA đã được xác minh đã được sửa. Các bước kiểm tra ban đầu của chúng giờ đã đạt, và những chỗ dùng chung bị ảnh hưởng đã được kiểm tra lại. Một phát hiện về điều hướng đang chờ quyết định về đích đến của nó. Bài kiểm thử biểu mẫu có kết nối chưa được thực hiện vì chưa có cấu hình kiểm thử.

Hãy dùng con số và bằng chứng thực tế của bạn.

Tránh viết "Đã sửa hết" khi một số phát hiện đang bị chặn, chưa được kiểm tra hoặc nằm ngoài phạm vi sửa lỗi.

## 12. Lưu một mốc lưu Git sau khi được chấp nhận

Khi người hướng dẫn chấp nhận các bản sửa, hãy lưu chúng thành một mốc lưu Git, theo các bước ở Bài 4.4 và các quy tắc Git của dự án:

1. Chạy `git status` để xem mọi thay đổi.
2. Chỉ stage những tệp thuộc các bản sửa đã được chấp nhận, dùng `git add` với đường dẫn của từng tệp.
3. Kiểm tra các thay đổi đã stage bằng `git diff --staged`.
4. Commit với một thông điệp rõ ràng nêu tên các mã phát hiện đã được sửa.
5. Thêm mã định danh của commit vào hồ sơ QA.

Nêu tên các mã phát hiện trong thông điệp commit giúp sau này dễ dàng tìm ra chính xác thay đổi nào đã sửa vấn đề nào.

## 13. Bài tập thực hành

**Nhiệm vụ: Sửa và kiểm tra một nhóm phát hiện QA đã được duyệt.**

1. Chọn các phát hiện đã được xác minh từ Bài 8.1.
2. Gom chúng thành các nhiệm vụ sửa lỗi có giới hạn rõ ràng.
3. Xác nhận thứ tự và các phụ thuộc của chúng.
4. Yêu cầu Claude thực hiện bản sửa đã chọn.
5. Kiểm tra các thay đổi.
6. Kiểm thử lại các lỗi ban đầu.
7. Chạy các bước kiểm tra hồi quy có trọng tâm và các bước kiểm tra của dự án.
8. Cập nhật hồ sơ QA.
9. Chuẩn bị bản tóm tắt sửa lỗi.
10. Sau khi được chấp nhận, lưu một mốc lưu Git và ghi lại mã định danh của nó.

Nếu không có lỗi nào cần sửa, hãy rà soát bằng chứng hiện có và nộp kết quả đó. Đừng bao giờ bịa ra lỗi để hoàn thành bài tập.

## 14. Sản phẩm cần nộp

Nộp:

- Các phát hiện đã chọn và các nhiệm vụ sửa lỗi.
- Prompt triển khai.
- Bản tóm tắt các tệp đã thay đổi.
- Kết quả kiểm thử lại các lỗi ban đầu.
- Kết quả kiểm tra hồi quy và kiểm tra của dự án.
- Trạng thái đã cập nhật của các phát hiện.
- Mọi phát hiện mới hoặc quyết định chưa được giải quyết.
- Bản tóm tắt sửa lỗi.
- Mã định danh của commit mốc lưu, sau khi các bản sửa được chấp nhận.

## 15. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các bản sửa xử lý các phát hiện đã được xác minh.
- Các nhiệm vụ giữ trong giới hạn và tuân theo các yêu cầu đã được phê duyệt.
- Các lỗi ban đầu đã được kiểm thử lại trong những điều kiện phù hợp.
- Các bước kiểm tra hồi quy phù hợp với những thay đổi đã thực hiện.
- Các bước kiểm tra của dự án đã được ghi lại.
- Trạng thái các phát hiện khớp với bằng chứng hiện có.
- Công việc còn lại và giới hạn của các bước kiểm tra được hiển thị rõ.
- Các bản sửa đã được chấp nhận được lưu thành một mốc lưu Git, nếu quy tắc dự án cho phép.

## 16. Kiểm tra kiến thức

1. Khi nào nhiều phát hiện nên trở thành một nhiệm vụ sửa lỗi?
2. Kiểm thử lại khác với kiểm tra hồi quy như thế nào?
3. Vì sao nên giữ lại các điều kiện tái hiện ban đầu?
4. Điều gì nên xảy ra khi một bản sửa làm lộ ra một lỗi riêng biệt?
5. Cần có bằng chứng gì trước khi một phát hiện có thể được đánh dấu là đã xác minh?
