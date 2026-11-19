# Bài 10.2: Tự lập kế hoạch và triển khai thay đổi

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Bắt đầu triển khai từ một bộ hướng dẫn cơ sở đã được phê duyệt và một trạng thái dự án đã biết.
- Sắp xếp thay đổi thành các bước nhỏ, có thể xác minh.
- Tự viết các prompt triển khai với đầy đủ các thành phần bắt buộc.
- Duy trì nhật ký quyết định ghi lại các lựa chọn, giả định và những việc chuyển lên cấp trên.
- Xử lý các tình huống bất ngờ mà không âm thầm mở rộng phạm vi, và tự rà soát các thay đổi của mình.

**Điều kiện tiên quyết:** Hoàn thành Bài 10.1, với các hướng dẫn đã cập nhật được phê duyệt và các câu hỏi chặn tiến độ đã được trả lời hoặc ghi lại.

**Tài liệu cần chuẩn bị:** Bản yêu cầu thay đổi và các cập nhật hướng dẫn đã phê duyệt, các nhiệm vụ thay đổi, câu trả lời của người hướng dẫn, phần triển khai hiện tại, hồ sơ QA và các bài kiểm thử Playwright.

## 1. Làm việc từ bộ cơ sở đã được phê duyệt

Bài 10.1 đã tạo ra các hướng dẫn được cập nhật và các nhiệm vụ thay đổi. Việc triển khai chỉ bắt đầu từ các phiên bản đã được phê duyệt.

Trước khi bắt đầu, hãy xác nhận:

| Hạng mục | Kiểm tra |
|---|---|
| Cập nhật hướng dẫn | Đã được phê duyệt, có ghi lại việc phê duyệt |
| Câu hỏi chặn tiến độ | Đã được trả lời, hoặc các nhiệm vụ bị ảnh hưởng được ghi lại là đang bị chặn |
| Nhiệm vụ | Phiên bản cuối cùng kèm tiêu chí chấp nhận |
| Trạng thái dự án | Khớp với những gì bạn đã phân tích, hoặc các khác biệt đã được hiểu rõ |

Nếu người hướng dẫn đã thay đổi các cập nhật bạn đề xuất, hãy dùng phiên bản của họ. Đừng triển khai đề xuất ban đầu của bạn.

## 2. Xác nhận trạng thái ban đầu

Tại dấu nhắc lệnh của terminal, trong thư mục dự án:

```bash
git status --short
```

```bash
git log --oneline -5
```

Ghi lại commit ban đầu và mọi thay đổi chưa được commit.

Tuân theo quy tắc phân nhánh của dự án. Nếu quy tắc yêu cầu một branch riêng cho mỗi thay đổi, hãy tạo branch theo quy ước đã ghi trong tài liệu trước khi chỉnh sửa.

Nếu trạng thái làm việc chứa những thay đổi mà bạn không nhận ra, hãy dừng lại và tìm hiểu chúng thuộc về việc gì, như Bài 4.1 đã dạy. Đừng loại bỏ chúng.

Chạy các bước kiểm tra đã ghi trong tài liệu và các bài kiểm thử Playwright trước khi thực hiện bất kỳ thay đổi nào. Nếu có thứ gì đó đã lỗi sẵn, hãy ghi lại ngay bây giờ. Nếu không, về sau bạn có thể nhầm một lỗi có sẵn thành vấn đề do thay đổi của bạn gây ra.

## 3. Lập kế hoạch trình tự

Sắp xếp các nhiệm vụ sao cho mỗi nhiệm vụ được xây dựng trên công việc đã được xác minh.

Một trình tự thực tế cho nhiều thay đổi là:

1. Các nền tảng dùng chung mà thay đổi cần đến, như một biến thể component.
2. Nội dung và tài sản mới hoặc đã thay đổi.
3. Route hoặc trang mới.
4. Điều hướng và các điểm truy cập.
5. Metadata và mức sẵn sàng cho tìm kiếm.
6. Kiểm thử tự động cho hành vi mới.

Với mỗi bước, hãy quyết định cách bạn biết nó đã hoàn thành trước khi chuyển sang bước tiếp theo. Bài 5.1 đã trình bày cách làm này cho trang chủ.

### Đặt các mốc lưu

**Mốc lưu** (checkpoint) là một điểm mà bạn dừng lại để xác minh trước khi tiếp tục.

| Mốc lưu | Cần xác minh điều gì |
|---|---|
| Sau mỗi nhiệm vụ | Tiêu chí chấp nhận của nhiệm vụ |
| Sau mọi thay đổi dùng chung | Những chỗ khác sử dụng mã dùng chung đó |
| Trước khi chuyển sang Bài 10.3 | Mọi nhiệm vụ đã hoàn thành hoặc trạng thái của chúng đã được ghi lại |

Nếu quy tắc dự án cho phép commit cục bộ làm mốc lưu, hãy commit sau mỗi nhiệm vụ đã xác minh với một thông điệp rõ ràng. Commit không có nghĩa là push hay deploy.

## 4. Tự viết các prompt triển khai

Trong các bài học trước, bạn dùng các prompt được cung cấp trong bài. Trong bài đánh giá này, bạn tự viết chúng.

Mỗi prompt triển khai cần có các thành phần từ Bài 4.1:

| Thành phần | Cần đưa vào gì |
|---|---|
| Mục tiêu | Kết quả của nhiệm vụ |
| Đối tượng | Các trang, component hoặc hành vi |
| Tài liệu tham chiếu | Hướng dẫn, bản yêu cầu, câu trả lời và tài sản đã phê duyệt, kèm vị trí chính xác |
| Trạng thái hiện tại | Các phát hiện liên quan từ bản phân tích tác động của bạn |
| Phạm vi | Nhiệm vụ bao gồm những gì |
| Giới hạn | Những gì phải được giữ nguyên |
| Phản hồi mong đợi | Triển khai, sau đó xác minh và báo cáo |
| Xác minh | Các bước kiểm tra cần chạy và bằng chứng cần báo cáo |
| Hạn chế | Không thay đổi không liên quan, không thêm gói phụ thuộc mới, không commit, push hay deploy trừ khi được cho phép |

### Khung prompt

Điều chỉnh khung này cho từng nhiệm vụ. Bài đánh giá xem xét bạn hoàn thiện nó tốt đến đâu, không phải bạn có sao chép nó hay không.

```text
Implement task [ID]: [one-sentence outcome].

Read first:
- [Project instructions and approved updates]
- [Task specification]
- [Approved references and supplied materials]

Current state:
- [What already exists and what is missing]

Scope:
- [What to change]

Preserve:
- [Content, behaviour and pages that must not change]

Pause and report if:
- [Conditions that need my decision]

After implementing:
- [Checks to run]
- [Evidence to report]
- Report changed files and any shared effects.

Do not add dependencies, change unrelated files,
commit, push or deploy.
```

Giữ lại một bản sao của mỗi prompt bạn dùng. Bạn sẽ nộp chúng.

## 5. Duy trì nhật ký quyết định

Trong quá trình triển khai, bạn sẽ đưa ra các lựa chọn. Hãy ghi lại chúng ngay khi làm, không phải đến cuối mới ghi.

| Ngày | Quyết định hoặc sự kiện | Loại | Lý do | Ai quyết định |
|---|---|---|---|---|
| [Ngày] | Dùng component thẻ hiện có mà không tạo biến thể mới | Quyết định thông thường | Nội dung được cung cấp phù hợp với bố cục hiện có | Thực tập sinh |
| [Ngày] | Cắt hình ảnh theo tỷ lệ khung hình của thẻ | Giả định | Câu trả lời của người hướng dẫn cho phép cắt ảnh | Thực tập sinh, dựa trên câu trả lời của người hướng dẫn |
| [Ngày] | Tạm dừng liên kết CTA | Chuyển lên cấp trên | Đích đến chưa được xác nhận | Chờ người hướng dẫn |
| [Ngày] | Phát hiện lỗi chính tả trên một trang không liên quan | Phát hiện ngoài phạm vi | Ghi lại thành phát hiện QA, không sửa | Thực tập sinh |

Các dòng này chỉ mang tính minh họa. Hãy ghi lại các quyết định thực tế của bạn.

Nhật ký quyết định giúp người hướng dẫn hiểu lập luận của bạn. Nó cũng bảo vệ bạn: một giả định hợp lý đã được ghi lại thì dễ sửa, còn một giả định âm thầm trông giống như một lỗi.

### Những gì cần chuyển lên cấp trên

Chuyển lên cấp trên khi:

- Một tài liệu tham chiếu đã phê duyệt xung đột với một tài liệu khác.
- Thay đổi đòi hỏi một gói phụ thuộc hoặc tích hợp mới.
- Tài liệu được cung cấp không thể đáp ứng thiết kế đã phê duyệt.
- Thay đổi sẽ ảnh hưởng đến các component dùng chung theo cách mà bản phân tích chưa lường trước.
- Việc hoàn thành nhiệm vụ cần một quyết định về nội dung, thiết kế hoặc dữ liệu.

Các lựa chọn triển khai thông thường tuân theo các quy ước đã có thì không cần chuyển lên cấp trên. Hãy ghi chúng vào nhật ký.

## 6. Triển khai theo từng bước nhỏ, có xác minh

Với mỗi nhiệm vụ:

1. Gửi prompt triển khai của bạn.
2. Rà soát các tệp đã thay đổi bằng `git diff`, và kiểm tra riêng mọi tệp mới chưa được theo dõi.
3. Kiểm tra kết quả trên trình duyệt so với tiêu chí chấp nhận.
4. Kiểm tra những chỗ khác sử dụng mã dùng chung đã thay đổi.
5. Chạy các bước kiểm tra liên quan đã ghi trong tài liệu.
6. Ghi lại kết quả và mọi quyết định.
7. Chỉ chuyển sang nhiệm vụ tiếp theo khi nhiệm vụ này đã được xác minh hoặc trạng thái của nó đã được ghi lại.

Tránh yêu cầu Claude triển khai toàn bộ thay đổi trong một lần. Một thay đổi lớn khó rà soát và khó sửa hơn.

Nếu kết quả của Claude khác với những gì bạn yêu cầu, hãy sửa nó trước khi tiếp tục. Bài 4.3 đã đề cập việc rà soát thay đổi thay vì dựa vào báo cáo hoàn thành.

## 7. Xử lý tình huống bất ngờ mà không mở rộng phạm vi

Quá trình triển khai thường làm lộ ra điều mà bản phân tích đã bỏ sót.

| Tình huống bất ngờ | Cách xử lý |
|---|---|
| Một nhiệm vụ khó hơn dự kiến nhưng vẫn trong phạm vi | Tiếp tục, ghi lại lý do trong nhật ký quyết định |
| Thay đổi cần một thay đổi dùng chung ngoài kế hoạch | Tạm dừng, đánh giá tác động và chuyển lên cấp trên nếu đáng kể |
| Bạn phát hiện một lỗi không liên quan | Ghi lại thành phát hiện QA; không sửa trong thay đổi này |
| Một tài sản được cung cấp không dùng được | Chuyển lên cấp trên kèm bằng chứng và các phương án |
| Một bài kiểm thử lỗi trên mã bạn không thay đổi | Đối chiếu với trạng thái ban đầu đã ghi ở Phần 2 |

Sửa các vấn đề không liên quan trong khi triển khai một thay đổi khiến thay đổi khó rà soát hơn và bằng chứng của nó khó diễn giải hơn. Hãy giữ công việc tập trung.

Nếu một tình huống bất ngờ cho thấy các hướng dẫn đã phê duyệt bị sai, hãy đề xuất chỉnh sửa hướng dẫn như trong Bài 10.1. Đừng để phần triển khai âm thầm đi lệch khỏi bộ cơ sở.

## 8. Cập nhật các bài kiểm thử tự động

Thay đổi ảnh hưởng đến những gì các bài kiểm thử Playwright cần kiểm tra.

- Thêm bài kiểm thử cho các route, hành trình và metadata mới, theo Bài 8.4.
- Cập nhật các bài kiểm thử kiểm tra nội dung hoặc route mà thay đổi cố ý điều chỉnh.
- Đừng thay đổi các bài kiểm thử cho hành vi mà thay đổi không được phép ảnh hưởng. Nếu chúng lỗi, hãy điều tra.

Xây dựng các bài kiểm thử mới dựa trên nội dung đã phê duyệt, không dựa trên những gì Claude đã triển khai.

## 9. Tự rà soát các thay đổi trước khi chuyển giao

Trước khi chuyển sang Bài 10.3, hãy rà soát toàn bộ thay đổi như thể người khác viết nó.

Tại dấu nhắc lệnh của terminal:

```bash
git status
```

```bash
git diff [starting commit]
```

Thay `[starting commit]` bằng mã định danh commit bạn đã ghi ở Phần 2. Lệnh này so sánh các tệp hiện tại với commit đó, bao gồm cả các thay đổi chưa được commit. Kiểm tra riêng các tệp mới chưa được theo dõi.

Kiểm tra:

| Mối lo ngại | Câu hỏi |
|---|---|
| Phạm vi | Mọi thay đổi có thuộc về một nhiệm vụ đã phê duyệt không? |
| Tài liệu tham chiếu | Phần triển khai có tuân theo các hướng dẫn và tài liệu đã phê duyệt không? |
| Tác động dùng chung | Mọi chỗ sử dụng mã dùng chung đã thay đổi đã được tính đến chưa? |
| Phần còn sót | Có câu lệnh gỡ lỗi, tệp tạm thời hoặc mã bị chú thích bỏ không? |
| An toàn | Có thông tin xác thực, dữ liệu cá nhân hoặc gói phụ thuộc chưa được phê duyệt không? |
| Hồ sơ | Nhật ký quyết định đã đầy đủ chưa? |

Sửa các vấn đề bạn phát hiện, sau đó kiểm tra lại các tiêu chí chấp nhận bị ảnh hưởng.

## 10. Nhờ Claude rà soát phạm vi

```text
Review the implemented change against its approved tasks.

Before reviewing:
- Read the approved instruction updates and change tasks.
- Compare the current files with the recorded starting
  commit, including untracked files.

Report:
1. Each changed file and the task it belongs to.
2. Any change that does not belong to an approved task.
3. Shared code that changed and its other usages.
4. Debugging output, temporary files or leftover code.
5. Credentials, personal data or new dependencies.
6. Acceptance criteria that appear unmet or unverified.

Review only. Do not edit files, commit, push or deploy.

Starting commit and tasks:
[Insert the commit identifier and task IDs.]
```

Xác minh các phát hiện của Claude trước khi hành động theo chúng.

## 11. Bài tập thực hành

**Nhiệm vụ: Triển khai thay đổi đã được phê duyệt.**

1. Xác nhận bộ cơ sở và các câu trả lời đã được phê duyệt.
2. Ghi lại trạng thái ban đầu và chạy các bước kiểm tra cùng bài kiểm thử hiện có.
3. Sắp xếp trình tự các nhiệm vụ và đặt các mốc lưu.
4. Viết và dùng prompt của riêng bạn cho mỗi nhiệm vụ.
5. Xác minh từng nhiệm vụ trước khi bắt đầu nhiệm vụ tiếp theo.
6. Duy trì nhật ký quyết định trong suốt quá trình.
7. Ghi lại riêng các phát hiện ngoài phạm vi.
8. Thêm và cập nhật các bài kiểm thử tự động.
9. Rà soát toàn bộ thay đổi và nhờ Claude rà soát phạm vi.
10. Chuẩn bị bản tóm tắt triển khai cho Bài 10.3.

Nếu một nhiệm vụ vẫn bị chặn, hãy triển khai các nhiệm vụ không bị chặn và ghi lại chính xác sự phụ thuộc của nhiệm vụ bị chặn.

## 12. Sản phẩm cần nộp

Nộp:

- Commit ban đầu, trạng thái làm việc và kết quả kiểm tra ban đầu.
- Trình tự nhiệm vụ và các mốc lưu.
- Mọi prompt triển khai bạn đã dùng.
- Tóm tắt các tệp đã thay đổi cho từng nhiệm vụ.
- Trạng thái nhiệm vụ và kết quả tiêu chí chấp nhận.
- Nhật ký quyết định.
- Các bài kiểm thử tự động mới và đã cập nhật.
- Các phát hiện ngoài phạm vi đã thêm vào hồ sơ QA.
- Bản rà soát phạm vi và mọi chỉnh sửa đã thực hiện.

## 13. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Việc triển khai bắt đầu từ bộ cơ sở đã được phê duyệt.
- Trạng thái ban đầu và các lỗi có sẵn đã được ghi lại.
- Từng nhiệm vụ được triển khai và xác minh lần lượt.
- Các prompt có đủ các thành phần bắt buộc.
- Các quyết định, giả định và việc chuyển lên cấp trên đều được ghi lại.
- Các vấn đề không liên quan được ghi lại, không bị âm thầm sửa.
- Toàn bộ thay đổi đã được rà soát trước khi chuyển giao.

## 14. Kiểm tra kiến thức

1. Vì sao bạn nên chạy các bước kiểm tra và bài kiểm thử trước khi thực hiện bất kỳ thay đổi nào?
2. Những loại quyết định nào bạn nên chuyển lên cấp trên thay vì tự đưa ra?
3. Vì sao bạn nên tránh sửa các lỗi không liên quan trong khi thực hiện một thay đổi?
4. Bạn nên làm gì nếu quá trình triển khai cho thấy các hướng dẫn đã phê duyệt bị sai?
5. Vì sao các bài kiểm thử mới nên dùng nội dung đã phê duyệt thay vì phần triển khai?
