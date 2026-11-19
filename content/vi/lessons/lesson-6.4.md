# Bài 6.4: Rà soát và nộp các trang nội bộ

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- So sánh các trang nội bộ đã triển khai với danh sách trang đã được duyệt.
- Rà soát các mẫu dùng chung và yêu cầu riêng của từng trang.
- Gộp các phát hiện về nội dung, thiết kế và điều hướng vào một hồ sơ.
- Chuẩn bị một bài nộp rõ ràng để người hướng dẫn duyệt.
- Ghi lại sự chấp nhận theo một phạm vi xác định và lưu công việc đã được chấp nhận thành một mốc lưu Git.

**Điều kiện tiên quyết:** Hoàn thành Bài 6.1 đến 6.3.

**Tài liệu cần chuẩn bị:** Kiến trúc thông tin (IA) đã được duyệt, thiết kế các trang, nguồn nội dung, các nhiệm vụ triển khai, danh mục điều hướng, kết quả hành trình người dùng và các phát hiện còn tồn đọng.

## 1. Xác định những gì bạn đang nộp

Hãy bắt đầu bằng cách liệt kê các trang bạn đang nộp. Việc điều hướng chính đã có không có nghĩa là mọi trang trong IA đều đã được xây dựng.

Tạo một **sổ hoàn thành trang**:

| Trang | Route đã được duyệt | Trạng thái triển khai | Trạng thái xác minh | Mục còn tồn đọng |
|---|---|---|---|---|
| Trang danh sách đã chọn | Route đã được xác nhận | Đã triển khai | Đã hoàn tất kiểm tra | Chưa phát hiện mục nào |
| Trang chi tiết đã chọn | Route đã được xác nhận | Đã triển khai | Chưa hoàn tất kiểm tra | Rà soát hình ảnh trên màn hình hẹp |
| Trang địa điểm đã chọn | Route đã được xác nhận | Bị chặn | Chưa kiểm tra | Thiếu nội dung địa chỉ đã được duyệt |

Hãy dùng tên trang và route thực tế.

**Hãy tách riêng ba điều: trang đã được xây dựng hay chưa, đã được kiểm tra hay chưa, và người hướng dẫn đã chấp nhận hay chưa.**

Một trang có thể đã được xây dựng nhưng chưa được kiểm tra. Một trang đã được kiểm tra vẫn có thể đang chờ được chấp nhận.

## 2. So sánh bản triển khai với IA đã được duyệt

So sánh sổ trang với IA đã được duyệt, và tìm:

- Các trang bắt buộc còn thiếu.
- Các trang đã được xây dựng nhưng không nằm trong phạm vi đã thống nhất.
- Các route khác với địa chỉ đã được duyệt.
- Hai trang phục vụ cùng một mục đích.
- Các trang không có điểm vào bắt buộc.
- Các liên kết điều hướng dẫn đến trang chưa hoàn thiện.

Hãy xác định mỗi điểm khác biệt thuộc loại nào trước khi sửa.

| Điểm khác biệt | Cách xử lý |
|---|---|
| Một trang bắt buộc chưa được xây dựng | Ghi lại nhiệm vụ của nó và thứ nó đang chờ |
| Một route khác với route đã được duyệt | Xác nhận yêu cầu và tạo một nhiệm vụ sửa lỗi |
| Có một trang thừa không có mục đích đã được duyệt | Đánh dấu để được rà soát |
| Một trang đã lên kế hoạch thuộc về giai đoạn sau | Ghi lại ranh giới giai đoạn |
| Một trang đã tồn tại, nhưng thiếu liên kết vào | Thêm kết nối đã được duyệt |

Đừng xóa các route thừa hoặc sắp xếp lại IA trong lúc rà soát. Rà soát là để ghi lại vấn đề. Việc sửa chữa diễn ra sau đó, thông qua các nhiệm vụ.

## 3. Rà soát các mẫu dùng chung và từng trang riêng lẻ

Hãy rà soát ở hai cấp độ.

### Rà soát mẫu dùng chung

Kiểm tra phần triển khai chung về:

- Bố cục và khoảng cách.
- Kiểu chữ và các giá trị dùng chung.
- Các tương tác lặp lại.
- Hành vi responsive.
- Các phần bắt buộc và không bắt buộc.
- Sự đa dạng về độ dài và loại nội dung.

### Rà soát riêng từng trang

Kiểm tra mỗi trang được nộp về:

- Tiêu đề và nội dung chính đúng.
- Hình ảnh và văn bản thay thế đúng.
- Các phần bắt buộc của nó.
- Thông tin liên hệ hoặc địa điểm chính xác.
- Lời kêu gọi hành động (CTA) và liên kết liên quan đúng.
- Route và các điểm vào đã được duyệt của nó.

Một layout dùng chung đạt yêu cầu khi rà soát không chứng minh rằng mọi trang dùng nó đều chứa đúng thông tin.

### Sử dụng bằng chứng hiệu quả

Hãy tái sử dụng bằng chứng trước đó khi nó vẫn áp dụng cho phiên bản bạn đang nộp. Lặp lại các bước kiểm tra ở những nơi các thay đổi sau đó đã ảnh hưởng đến:

- Component dùng chung.
- Nội dung trang.
- Hình ảnh và các tài nguyên (asset) khác.
- Route hoặc đích đến.
- Các tham chiếu đã được duyệt.

Mỗi trang được nộp vẫn cần các bước kiểm tra nội dung và đích đến riêng của nó.

## 4. Gộp các phát hiện từ Học phần 6

Tập hợp:

- Các phát hiện về trang từ Bài 6.1.
- Các phát hiện về tái sử dụng và sự đa dạng nội dung từ Bài 6.2.
- Các phát hiện về điều hướng và hành trình từ Bài 6.3.
- Các phát hiện trước đó về trang chủ bị ảnh hưởng bởi thay đổi dùng chung.

Loại bỏ các mục trùng lặp, nhưng giữ lại hồ sơ về mọi trang bị ảnh hưởng và bằng chứng.

| ID | Phát hiện | Trang bị ảnh hưởng | Trạng thái | Hành động tiếp theo |
|---|---|---|---|---|
| IP-01 | Phần giới thiệu dùng chung cắt mất tiêu đề dài | Hai trang chi tiết | Đang mở | Sửa và kiểm tra lại cả hai |
| IP-02 | Một liên kết liên quan mở sai trang | Một trang chi tiết | Đã xác minh | Đã kiểm tra lại chỉnh sửa |
| IP-03 | Chưa có hình ảnh địa điểm cuối cùng | Một trang địa điểm | Chờ tài nguyên | Lấy hình ảnh đã được duyệt |

Hãy tách riêng lỗi với phụ thuộc và gợi ý không bắt buộc.

Nếu một vấn đề dùng chung ảnh hưởng đến nhiều trang, hãy ghi lại nó như một phát hiện dùng chung. Đừng vùi nó trong ghi chú của một trang.

## 5. Kiểm tra ảnh hưởng đến trang chủ

Công việc trên các trang nội bộ có thể đã thay đổi những component mà trang chủ cũng dùng, chẳng hạn:

- Thẻ dùng chung.
- Điều hướng ở header và footer.
- Vùng chứa nội dung.
- Kiểu chữ.
- Nút và liên kết.
- Cách trình bày hình ảnh.

Hãy dựa vào các tệp đã thay đổi và những nơi thực tế mỗi component được dùng để quyết định cần lặp lại những bước kiểm tra trang chủ nào.

Ví dụ, thay đổi bố cục thẻ dùng chung có nghĩa là cần rà soát các thẻ trên trang chủ đang dùng nó. Sửa một đoạn văn trên một trang chi tiết không có nghĩa là phải rà soát toàn bộ trang chủ.

Hãy ghi lại các bước kiểm tra hồi quy bạn đã chọn, cùng kết quả của chúng.

## 6. Chuẩn bị ma trận chấp nhận

Một **ma trận chấp nhận** đối chiếu mỗi tiêu chí chấp nhận với các trang mà nó áp dụng, kết quả và bằng chứng.

| Tiêu chí | Trang | Kết quả | Bằng chứng |
|---|---|---|---|
| Các phần bắt buộc theo đúng thứ tự đã được duyệt | Các trang đã liệt kê | Đạt / Không đạt / Chưa kiểm tra | So sánh với tham chiếu |
| Nội dung chữ khớp với nguồn đã được duyệt | Mỗi trang được nộp | Đạt / Không đạt / Chưa kiểm tra | Kiểm tra nội dung riêng của từng trang |
| Route tải được khi truy cập trực tiếp và sau khi tải lại | Mỗi route được nộp | Đạt / Không đạt / Chưa kiểm tra | Kết quả trên trình duyệt |
| Liên kết đến được các đích đã được xác nhận | Các trang liên quan | Đạt / Không đạt / Chưa kiểm tra | Danh mục điều hướng |
| Bố cục hoạt động ở các độ rộng bắt buộc | Các trang và mẫu đã liệt kê | Đạt / Không đạt / Chưa kiểm tra | Ảnh chụp màn hình và quan sát |
| Thay đổi dùng chung giữ cho những nơi đang dùng vẫn hoạt động | Các trang bị ảnh hưởng | Đạt / Không đạt / Chưa kiểm tra | Kết quả kiểm tra hồi quy |

Chỉ dùng **Không áp dụng** khi một tiêu chí thực sự không áp dụng, và giải thích lý do.

Đừng viết một câu duy nhất “Tất cả các trang đều đạt” trừ khi bằng chứng cho thấy nó bao gồm những trang và bước kiểm tra nào.

## 7. Chạy các bước kiểm tra còn tồn đọng của dự án

Chạy các bước kiểm tra đã được ghi trong tài liệu áp dụng cho các thay đổi cuối cùng, chẳng hạn type check, lint, mọi bài kiểm thử tự động và build production. Bài 5.4 đã giải thích tác dụng của từng bước.

Hãy tái sử dụng kết quả trước đó nếu từ đó đến nay không có gì thay đổi có thể ảnh hưởng đến chúng. Lặp lại các bước kiểm tra sau khi sửa lỗi khi cần.

Ghi lại mọi lỗi và cho biết chúng có liên quan đến công việc được nộp hay không.

Các bước kiểm tra tự động không thay thế được việc kiểm tra nội dung, thiết kế hay các trang trên trình duyệt.

## 8. Nhờ Claude rà soát lần cuối các trang nội bộ

```text
Review the selected internal pages for submission.

Read:
- Relevant project instructions.
- Approved IA and page inventory.
- Applicable designs, content and responsive requirements.
- Selected task acceptance criteria.
- Current implementation and Git working state.
- Findings, navigation records and verification evidence.

Assess:
1. Whether the submitted pages match the approved scope.
2. Whether routes and required entry points are correct.
3. Whether shared patterns support the approved variations.
4. Whether each page contains its own correct content and assets.
5. Whether selected visitor journeys have adequate evidence.
6. Whether shared changes have unresolved effects elsewhere.
7. Which dependencies or checks remain outstanding.

Return:
- Sources and implementation state actually inspected.
- Page-by-page readiness.
- Acceptance criteria with evidence and results.
- New or unresolved findings.
- Evidence invalidated by later changes.
- A readiness recommendation for the defined submission scope.

Review only. Do not edit files, install dependencies,
commit, push or deploy.

Do not trigger external transactions.
Do not treat your recommendation as supervisor acceptance.
State any access or verification limitations.

Submission scope and references:
[Insert pages, routes and exact references.]
```

Hãy tự mình xác nhận mọi phát hiện mới trước khi cho phép sửa.

## 9. Chuẩn bị bàn giao

Người hướng dẫn cần biết chính xác phiên bản nào đang được nộp và còn những khoảng trống nào.

| Mục | Thông tin bắt buộc |
|---|---|
| Phạm vi được nộp | Các trang, route và thay đổi dùng chung được bao gồm |
| Tham chiếu gốc | Các phiên bản đã được duyệt đã tuân theo |
| Trạng thái triển khai | Branch, commit và mọi thay đổi liên quan chưa commit |
| Cách truy cập để duyệt | Hướng dẫn hiện có của dự án để chạy và mở các trang |
| Xác minh | Ma trận chấp nhận và bằng chứng hỗ trợ |
| Tích hợp | Kết quả điều hướng, hành trình và kiểm tra hồi quy |
| Công việc còn tồn đọng | Các phát hiện, phụ thuộc và bước kiểm tra chưa thực hiện |
| Quyết định được yêu cầu | Phạm vi chính xác được nộp để chấp nhận |

### Ví dụ về tuyên bố sẵn sàng

> Trang danh sách liệu trình và hai trang chi tiết liệu trình đã sẵn sàng để duyệt theo các tham chiếu đã xác định. Nội dung, route và các hành trình người dùng đã chọn của chúng đã được kiểm tra. Trang địa điểm không nằm trong bài nộp này vì nội dung đã được duyệt của nó vẫn còn tồn đọng.

Hãy dùng tên trang và bằng chứng thực tế.

Khi bạn chỉ nộp một số trang, hãy nói rõ ranh giới nằm ở đâu. Đừng ngụ ý rằng toàn bộ website đã hoàn thành.

## 10. Ghi lại quyết định duyệt

Để quyết định ở trạng thái **Chờ duyệt** cho đến khi người hướng dẫn phản hồi. Sau đó ghi lại:

- Người duyệt và ngày ra quyết định.
- Phiên bản triển khai đã được duyệt.
- Các trang và thay đổi dùng chung được chấp nhận.
- Các chỉnh sửa bắt buộc.
- Các nhiệm vụ cần làm tiếp và phụ thuộc.
- Mọi điều kiện đi kèm việc chấp nhận.

Nếu được yêu cầu chỉnh sửa:

1. Biến các phát hiện thành những nhiệm vụ sửa lỗi có giới hạn rõ ràng.
2. Thực hiện các chỉnh sửa được cho phép.
3. Kiểm tra lại các trang và hành trình bị ảnh hưởng.
4. Cập nhật bằng chứng của bài nộp.
5. Nộp lại phạm vi đã thay đổi.

Việc chấp nhận các trang nội bộ không cho phép deploy.

## 11. Lưu mốc lưu Git sau khi được chấp nhận

Khi người hướng dẫn chấp nhận các trang nội bộ, hãy lưu công việc đã được chấp nhận thành một mốc lưu Git, theo các bước trong Bài 4.4 và quy tắc Git của dự án:

1. Chạy `git status` để xem mọi thay đổi.
2. Chỉ stage những tệp thuộc các trang đã được chấp nhận, dùng `git add` với đường dẫn của từng tệp.
3. Kiểm tra các thay đổi đã stage bằng `git diff --staged`.
4. Commit với một thông điệp rõ ràng theo quy ước của dự án.
5. Thêm mã nhận diện commit vào hồ sơ quyết định.

Nếu chỉ một số trang được chấp nhận, hãy chỉ commit các tệp của những trang đó và mọi thay đổi dùng chung mà chúng cần. Loại trừ các thay đổi không liên quan, tệp môi trường và tệp tạm thời.

## 12. Bài tập thực hành

**Nhiệm vụ: Nộp các trang nội bộ đã triển khai để người hướng dẫn duyệt.**

1. Hoàn thành sổ hoàn thành trang.
2. So sánh nó với IA đã được duyệt.
3. Gộp các phát hiện từ Học phần 6.
4. Hoàn thành ma trận chấp nhận.
5. Kiểm tra những nơi trên trang chủ bị ảnh hưởng bởi thay đổi dùng chung.
6. Chạy các bước kiểm tra còn tồn đọng của dự án.
7. Nhờ Claude rà soát lần cuối.
8. Chuẩn bị bàn giao.
9. Ghi lại quyết định của người hướng dẫn khi nhận được.
10. Sau khi được chấp nhận, lưu một mốc lưu Git và ghi lại mã nhận diện của nó.

Đừng bịa ra các trang còn thiếu, quyết định chấp nhận hoặc các bước kiểm tra thành công để hoàn thành bài tập.

## 13. Sản phẩm cần nộp

Nộp:

- Sổ hoàn thành trang.
- Kết quả so sánh với IA.
- Ma trận chấp nhận.
- Các phát hiện đã gộp.
- Bằng chứng desktop và mobile tiêu biểu.
- Kết quả điều hướng và hành trình người dùng.
- Kết quả kiểm tra hồi quy và kiểm tra của dự án.
- Bản bàn giao và quyết định của người hướng dẫn.
- Mã nhận diện commit của mốc lưu, khi công việc đã được chấp nhận.

## 14. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các trang được nộp đã được so sánh với phạm vi đã được duyệt.
- Các yêu cầu dùng chung và yêu cầu riêng của từng trang đã được rà soát.
- Bằng chứng hỗ trợ các kết quả đã báo cáo.
- Các lỗi hồi quy liên quan trên trang chủ đã được kiểm tra.
- Công việc còn tồn đọng và các hành trình chưa hoàn chỉnh vẫn được thể hiện rõ.
- Bản bàn giao xác định chính xác phiên bản đang được duyệt.
- Quyết định của người hướng dẫn và công việc cần làm tiếp bắt buộc được ghi lại chính xác.
- Công việc đã được chấp nhận được lưu thành một mốc lưu Git, nếu quy tắc của dự án cho phép.

## 15. Kiểm tra kiến thức

1. Vì sao triển khai, xác minh và chấp nhận nên có các trạng thái riêng biệt?
2. Vì sao một template dùng chung đã được kiểm tra không chứng minh rằng mọi trang đều đúng?
3. Điều gì quyết định việc có cần lặp lại các bước kiểm tra trang chủ hay không?
4. Bạn nên mô tả thế nào về một bài nộp chỉ bao gồm một số trang?
5. Điều gì phải xảy ra sau khi có yêu cầu chỉnh sửa và trước khi bạn nộp lại?
