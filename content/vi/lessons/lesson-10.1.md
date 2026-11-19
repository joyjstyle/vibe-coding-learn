# Bài 10.1: Hiểu bản yêu cầu thay đổi và cập nhật hướng dẫn dự án

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Giải thích cách thức đánh giá của Học phần 10 và cách bài làm được chấm.
- Rút ra kết quả cần đạt, phạm vi và các ràng buộc từ một bản yêu cầu thay đổi (change brief).
- Xác định những điểm chưa rõ và đặt các câu hỏi làm rõ có trọng tâm.
- Phân tích những phần nào của dự án chịu ảnh hưởng bởi một thay đổi.
- Đề xuất cập nhật hướng dẫn dự án và kế hoạch nhiệm vụ để người hướng dẫn phê duyệt.

**Điều kiện tiên quyết:** Hoàn thành Học phần 9 và đã ghi lại các quyết định duyệt của học phần đó.

**Tài liệu cần chuẩn bị:** Bản yêu cầu thay đổi do người hướng dẫn cung cấp, bộ hướng dẫn cơ sở đã phê duyệt từ Học phần 3, phần triển khai hiện tại, hồ sơ QA, sổ theo dõi trang, các bài kiểm thử Playwright và hồ sơ deploy staging.

## 1. Hiểu cách đánh giá của Học phần 10

Học phần 1 đến 9 đã dạy từng phần của quy trình làm việc với hướng dẫn chi tiết. Học phần 10 yêu cầu bạn áp dụng quy trình đó với ít hướng dẫn hơn.

Người hướng dẫn sẽ đưa cho bạn một **bản yêu cầu thay đổi**: một yêu cầu ngắn về việc thay đổi website. Bạn sẽ:

| Bài học | Công việc của bạn |
|---|---|
| 10.1 | Phân tích bản yêu cầu và đề xuất cập nhật hướng dẫn dự án |
| 10.2 | Lập kế hoạch và triển khai thay đổi |
| 10.3 | Kiểm thử thay đổi và nộp bằng chứng |
| 10.4 | Trình bày website, các vấn đề đã biết và bàn giao |

Các bài học này đưa ra ít chỉ dẫn từng bước hơn các học phần trước. Chúng sẽ chỉ bạn quay lại những bài học trước đã đề cập từng kỹ năng.

### Làm việc độc lập ở đây có nghĩa là gì

Làm việc độc lập không có nghĩa là làm việc mà không đặt câu hỏi.

| Hành vi độc lập | Không độc lập |
|---|---|
| Đưa ra các quyết định thông thường dựa trên các quy ước đã có | Đề nghị người hướng dẫn phê duyệt từng lựa chọn nhỏ |
| Đặt câu hỏi có trọng tâm khi thực sự thiếu một quyết định | Đoán những quyết định thuộc về người khác |
| Ghi lại các giả định và quyết định | Đưa ra giả định một cách âm thầm |
| Tự kiểm tra công việc của Claude | Chấp nhận báo cáo của Claude mà không rà soát |
| Báo cáo giới hạn một cách trung thực | Trình bày công việc chưa kiểm tra như đã hoàn thành |

**Đặt đúng câu hỏi vào đúng thời điểm là một kỹ năng được đánh giá, không phải là điểm yếu.**

### Bài làm được chấm như thế nào

Người hướng dẫn sẽ dùng tiêu chí đánh giá của dự án. Nếu chưa có tiêu chí nào được đặt ra, các lĩnh vực sau phản ánh những gì chương trình học này đã dạy:

| Lĩnh vực | Người hướng dẫn tìm kiếm điều gì |
|---|---|
| Hiểu biết | Kết quả, phạm vi và ràng buộc của thay đổi được hiểu đúng |
| Hướng dẫn | Tài liệu dự án được cập nhật chính xác và chỉ ở những chỗ cần thiết |
| Lập kế hoạch | Các nhiệm vụ có giới hạn rõ ràng, với tiêu chí chấp nhận có thể xác minh |
| Triển khai | Thay đổi tuân theo các tài liệu tham chiếu đã phê duyệt và các quy ước hiện có |
| Xác minh | Bằng chứng hỗ trợ từng khẳng định, và các giới hạn được nêu rõ |
| Giao tiếp | Câu hỏi, quyết định, phát hiện và bàn giao rõ ràng và trung thực |

Bảng này là hướng dẫn dành cho người hướng dẫn. Nó không thay thế bất kỳ tiêu chí đánh giá nào mà người hướng dẫn cung cấp.

## 2. Đọc bản yêu cầu để nắm các phần cốt lõi

Đọc toàn bộ bản yêu cầu trước khi hành động. Sau đó rút ra:

| Thành phần | Câu hỏi cần trả lời |
|---|---|
| **Kết quả** | Điều gì cần đúng sau khi thay đổi? |
| **Lý do** | Vì sao cần thay đổi? |
| **Phạm vi** | Những trang, tính năng hoặc nội dung nào được bao gồm? |
| **Loại trừ** | Điều gì được nêu rõ là không bao gồm? |
| **Tài liệu được cung cấp** | Nội dung chữ, hình ảnh hoặc quyết định nào được cung cấp? |
| **Ràng buộc** | Hạn chót, quy tắc thiết kế hoặc giới hạn kỹ thuật |
| **Chấp nhận** | Người yêu cầu sẽ đánh giá thành công như thế nào? |

### Bản yêu cầu minh họa

> Saffron Wellness Clinic muốn thêm một liệu trình mới đã được phê duyệt vào website. Liệu trình này cần xuất hiện trong danh sách liệu trình và có trang chi tiết riêng. Nội dung chữ và một hình ảnh được đính kèm. Trang chủ không cần thay đổi.

Chỉ dùng ví dụ này để luyện tập. Người hướng dẫn sẽ cung cấp bản yêu cầu thực tế.

Từ bản yêu cầu minh họa này:

| Thành phần | Câu trả lời rút ra |
|---|---|
| Kết quả | Khách truy cập có thể tìm và đọc về liệu trình mới |
| Phạm vi | Danh sách liệu trình và một trang chi tiết mới |
| Loại trừ | Trang chủ |
| Được cung cấp | Nội dung chữ và một hình ảnh |
| Chưa nêu | Route, metadata, vị trí trong danh sách, văn bản thay thế, đích của lời kêu gọi hành động (CTA) |

Dòng “Chưa nêu” cũng quan trọng như các dòng còn lại. Nó cho thấy những chỗ cần đặt câu hỏi hoặc đưa ra đề xuất.

## 3. Xác định điểm chưa rõ và xung đột

So sánh bản yêu cầu với bộ cơ sở đã phê duyệt từ Học phần 3 và phần triển khai hiện tại.

Tìm kiếm:

- Thông tin mà bản yêu cầu không cung cấp.
- Các phát biểu xung đột với tài liệu đã phê duyệt.
- Câu chữ có thể hiểu theo nhiều cách.
- Tài liệu được cung cấp không phù hợp với thiết kế hiện có.
- Các tác động mà người yêu cầu có thể chưa cân nhắc.

### Phân loại từng vấn đề

| Loại | Ví dụ | Cách xử lý |
|---|---|---|
| **Câu hỏi chặn tiến độ** | Route của trang chi tiết chưa được xác định và không có mẫu IA nào bao quát | Hỏi trước khi triển khai phần đó |
| **Giả định được nêu rõ** | Thẻ (card) mới theo thiết kế thẻ liệu trình hiện có | Ghi lại giả định và tiếp tục trừ khi được yêu cầu khác |
| **Xung đột** | Hình ảnh được cung cấp có tỷ lệ khung hình khác với các thẻ hiện có | Báo cáo kèm các phương án để ra quyết định |
| **Ngoài phạm vi** | Bạn để ý thấy một lỗi chính tả không liên quan ở trang khác | Ghi lại thành một phát hiện riêng |

Một giả định là chấp nhận được khi các quy ước hiện có hỗ trợ rõ ràng cho nó. Hãy ghi lại để người hướng dẫn có thể sửa sớm.

### Viết câu hỏi có trọng tâm

Một câu hỏi tốt có thể được trả lời nhanh và nêu rõ vì sao nó quan trọng.

| Câu hỏi yếu | Câu hỏi có trọng tâm |
|---|---|
| Anh/chị muốn trang trông như thế nào? | Trang chi tiết mới có nên dùng mẫu trang chi tiết liệu trình hiện có không? Bản yêu cầu không nói rõ, và nội dung chữ được cung cấp không có phần về giá. |
| Hình ảnh có ổn không? | Hình ảnh được cung cấp là ảnh dọc, nhưng các thẻ liệu trình dùng khung cắt ngang. Chúng ta nên yêu cầu một phiên bản ngang, hay cắt hình ảnh được cung cấp? |

Gom các câu hỏi vào một tin nhắn thay vì gửi từng câu một.

## 4. Phân tích tác động lên dự án

Kiểm tra dự án hiện tại, như trong Bài 4.1, để tìm mọi thứ mà thay đổi tác động đến.

| Lĩnh vực | Câu hỏi | Bài học trước |
|---|---|---|
| Route và IA | Thay đổi có thêm, đổi tên hoặc xóa route không? | 6.1, 6.3 |
| Component | Một component hiện có có hỗ trợ được không, hay cần thay đổi? | 4.3, 6.2 |
| Nội dung và tài sản | Nội dung chữ, hình ảnh và văn bản thay thế đã được cung cấp và phê duyệt chưa? | 5.2 |
| Điều hướng và hành trình | Những liên kết và hành trình nào thay đổi? | 6.3 |
| Tính năng tương tác | Thay đổi có ảnh hưởng đến biểu mẫu hoặc tính năng khác không? | 7.1 |
| Khả năng tiếp cận | Những bước kiểm tra nào áp dụng cho nội dung mới hoặc đã thay đổi? | 8.3 |
| Kiểm thử tự động | Những bài kiểm thử nào cần thêm hoặc cập nhật? | 8.4 |
| Dữ liệu và gói phụ thuộc | Thay đổi có liên quan đến dữ liệu cá nhân hoặc gói mới không? | 9.1 |
| Hiệu năng | Hình ảnh hoặc script mới có ảnh hưởng đến việc tải không? | 9.2 |
| Metadata và tìm kiếm | Thay đổi có cần tiêu đề, mô tả hoặc cập nhật sitemap không? | 9.3 |
| Deploy | Thay đổi có được deploy lên staging không? | 9.4 |

Các component dùng chung cần được chú ý đặc biệt. Thêm một thẻ liệu trình mới có vẻ chỉ mang tính cục bộ, nhưng một thay đổi ở component thẻ sẽ ảnh hưởng đến mọi trang dùng nó.

## 5. Đề xuất cập nhật hướng dẫn dự án

Học phần 3 đã thiết lập các tài liệu hướng dẫn của dự án, như PRD, kiến trúc, quy tắc làm việc và kế hoạch nhiệm vụ, làm bộ cơ sở cho việc triển khai. Một thay đổi đối với website cần được phản ánh trong các tài liệu đó trước khi triển khai.

Với mỗi tài liệu, hãy quyết định xem thay đổi có ảnh hưởng đến nó hay không:

| Tài liệu | Cập nhật thường gặp |
|---|---|
| PRD hoặc yêu cầu | Thêm hoặc thay đổi yêu cầu mà bản yêu cầu thay đổi đưa ra |
| IA hoặc sơ đồ trang (sitemap) | Thêm route mới và các điểm truy cập vào nó |
| Kiến trúc | Chỉ khi thay đổi ảnh hưởng đến cấu trúc, dữ liệu hoặc tích hợp |
| Quy tắc làm việc | Hiếm khi, trừ khi thay đổi đưa ra một quy tắc mới |
| Kế hoạch nhiệm vụ | Thêm các nhiệm vụ mới với tiêu chí chấp nhận và cách xác minh |
| Danh mục nội dung và tài sản | Thêm các tài liệu được cung cấp và trạng thái của chúng |

Chỉ cập nhật những gì thay đổi yêu cầu. Đừng sắp xếp lại hay viết lại các phần không liên quan.

### Ghi lại từng thay đổi rõ ràng

Mỗi cập nhật cần cho thấy điều gì đã thay đổi và vì sao:

| Trường | Ví dụ |
|---|---|
| Tài liệu | Kế hoạch nhiệm vụ |
| Phần | Các trang liệu trình |
| Thay đổi | Thêm các nhiệm vụ T-NEW-01 đến T-NEW-03 cho liệu trình mới |
| Lý do | Bản yêu cầu thay đổi, có ghi ngày và mã định danh |
| Nhiệm vụ bị ảnh hưởng | Chỉ các nhiệm vụ mới; các nhiệm vụ liệu trình hiện có không thay đổi |
| Trạng thái | Chờ duyệt |

Dùng định dạng phiên bản hoặc ghi chú thay đổi hiện có của dự án nếu có.

Giữ các tài liệu đã cập nhật ở trạng thái **Chờ duyệt** cho đến khi người hướng dẫn phê duyệt. Các cập nhật đã được phê duyệt trở thành bộ hướng dẫn cơ sở mới cho Bài 10.2.

## 6. Viết các nhiệm vụ thay đổi

Dùng cấu trúc nhiệm vụ từ Bài 4.2. Với mỗi nhiệm vụ, hãy bao gồm:

- Một kết quả rõ ràng.
- Phạm vi và giới hạn.
- Tài liệu tham chiếu, bao gồm bản yêu cầu và mọi câu trả lời cho câu hỏi của bạn.
- Điều kiện tiên quyết và các câu hỏi chặn tiến độ.
- Tiêu chí chấp nhận.
- Phương pháp xác minh, bao gồm kiểm tra thủ công và kiểm thử tự động.
- Phạm vi kiểm tra hồi quy.

### Ví dụ về tiêu chí chấp nhận

Cho bản yêu cầu minh họa:

| Tiêu chí chấp nhận | Xác minh |
|---|---|
| Danh sách có một thẻ cho liệu trình mới, ở vị trí đã phê duyệt | Kiểm tra trên trình duyệt và bài kiểm thử Playwright |
| Thẻ liên kết đến trang chi tiết mới | Kiểm thử hành trình từ danh sách |
| Trang chi tiết hiển thị chính xác nội dung chữ được cung cấp | So sánh với nguồn được cung cấp |
| Hình ảnh hiển thị với văn bản thay thế và khung cắt đã phê duyệt | Kiểm tra trên trình duyệt ở các chiều rộng bắt buộc |
| Trang có tiêu đề và mô tả đã phê duyệt | Kiểm tra metadata đã hiển thị và bài kiểm thử Playwright |
| Các thẻ và trang liệu trình hiện có không thay đổi | Kiểm tra hồi quy trên các trang đại diện |

Hãy thay thế các tiêu chí này bằng tiêu chí cho bản yêu cầu thực tế.

## 7. Nhờ Claude rà soát tác động

```text
Review the change brief against the current project and
its approved instructions.

Before reviewing:
- Read the project instructions and approved baseline.
- Confirm the current Git status.
- Read the change brief and any answers already received.

Report:
1. The required outcome, scope and exclusions, as stated
   in the brief.
2. Information the brief does not provide.
3. Conflicts with approved documents or the implementation.
4. Routes, components, content, tests, metadata and other
   areas the change affects, with file references.
5. Shared components whose other usages may be affected.
6. Project documents that need updating, and the sections.
7. Questions that block implementation, separately from
   assumptions supported by existing conventions.

Do not invent answers to open questions.
Do not propose design changes beyond the brief.

Review only. Do not edit files, install dependencies,
commit, push or deploy.

Change brief:
[Insert the brief.]
```

So sánh phân tích của Claude với phân tích của chính bạn. Bài đánh giá này chấm sự hiểu biết của bạn. Hãy dùng bản rà soát của Claude để kiểm tra những chỗ còn thiếu, không phải để thay thế phân tích của bạn.

## 8. Nộp bản phân tích thay đổi

Gộp công việc của bạn thành một bài nộp cho người hướng dẫn:

1. Các thành phần đã rút ra từ bản yêu cầu.
2. Các câu hỏi, đã được gom nhóm và có trọng tâm.
3. Các giả định được nêu rõ.
4. Bản phân tích tác động.
5. Các cập nhật tài liệu đề xuất, được đánh dấu Chờ duyệt.
6. Các nhiệm vụ thay đổi kèm tiêu chí chấp nhận.

Chờ câu trả lời và phê duyệt trước khi triển khai các nhiệm vụ bị chặn. Các nhiệm vụ không bị chặn có thể tiến hành trong Bài 10.2 sau khi các cập nhật hướng dẫn của chúng được phê duyệt.

## 9. Bài tập thực hành

**Nhiệm vụ: Phân tích bản yêu cầu thay đổi của người hướng dẫn và chuẩn bị các cập nhật hướng dẫn.**

1. Đọc bản yêu cầu và rút ra các phần cốt lõi.
2. So sánh nó với bộ cơ sở đã phê duyệt và phần triển khai hiện tại.
3. Phân loại các điểm chưa rõ, xung đột và giả định.
4. Gửi các câu hỏi có trọng tâm cho người hướng dẫn.
5. Hoàn thành bản phân tích tác động.
6. Đề xuất cập nhật cho các tài liệu dự án bị ảnh hưởng.
7. Viết các nhiệm vụ thay đổi kèm tiêu chí chấp nhận và cách xác minh.
8. Nhờ Claude rà soát tác động và so sánh với bản của bạn.
9. Nộp bản phân tích thay đổi.

Chỉ dùng bản yêu cầu do người hướng dẫn cung cấp. Nếu chưa được cung cấp bản yêu cầu nào, hãy yêu cầu một bản. Đừng tự tạo bản yêu cầu cho bài đánh giá.

## 10. Sản phẩm cần nộp

Nộp:

- Các thành phần đã rút ra từ bản yêu cầu.
- Các câu hỏi đã gửi và câu trả lời đã nhận.
- Các giả định đã ghi lại.
- Bản phân tích tác động.
- Các cập nhật tài liệu đề xuất kèm ghi chú thay đổi.
- Các nhiệm vụ thay đổi kèm tiêu chí chấp nhận và phương pháp xác minh.
- Bản rà soát tác động của Claude và cách nó so sánh với bản của bạn.
- Quyết định phê duyệt của người hướng dẫn khi nhận được.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Kết quả, phạm vi và các chỗ còn thiếu của bản yêu cầu được xác định đúng.
- Các câu hỏi có trọng tâm và được gom nhóm.
- Các giả định được ghi lại, không bị che giấu.
- Bản phân tích tác động bao quát các tác động dùng chung.
- Các cập nhật tài liệu giới hạn ở những gì thay đổi yêu cầu.
- Các nhiệm vụ có tiêu chí chấp nhận có thể xác minh.
- Các hướng dẫn đã cập nhật đang chờ hoặc đã nhận được phê duyệt của người hướng dẫn.

## 12. Kiểm tra kiến thức

1. Khi nào thì hợp lý để tiến hành dựa trên một giả định đã nêu thay vì đặt câu hỏi?
2. Vì sao hướng dẫn dự án cần được cập nhật trước khi triển khai?
3. Vì sao một thay đổi ở một thẻ cần kiểm tra cả các trang khác?
4. Điều gì làm cho một câu hỏi làm rõ có trọng tâm?
5. Vì sao bản phân tích tác động của chính bạn nên có trước bản của Claude?
