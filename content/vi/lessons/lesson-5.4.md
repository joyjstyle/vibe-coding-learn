# Bài 5.4: Rà soát và nộp trang chủ

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Rà soát trang chủ đã ghép hoàn chỉnh so với các yêu cầu đã được duyệt.
- Tập hợp bằng chứng về thiết kế, nội dung, responsive và chức năng.
- Tách riêng công việc đã hoàn thành với công việc vẫn đang chờ một thứ gì đó.
- Chuẩn bị bàn giao rõ ràng để người hướng dẫn duyệt.
- Ghi lại quyết định duyệt và lưu công việc đã được chấp nhận thành một mốc lưu Git.

**Điều kiện tiên quyết:** Hoàn thành Bài 5.1 đến 5.3.

**Tài liệu cần chuẩn bị:** Trang chủ đã triển khai, các tham chiếu đã được duyệt, tiêu chí chấp nhận của các công việc, hồ sơ phát hiện, sổ ghi nội dung tạm thời và bằng chứng xác minh.

## 1. Rà soát trang chủ như một trải nghiệm thống nhất của khách truy cập

Các bài học trước đã kiểm tra riêng các phần, nội dung và kích thước màn hình. Bài học này tập hợp các bước kiểm tra đó lại và đặt câu hỏi liệu khách truy cập có thể:

- Hiểu về doanh nghiệp và các liệu trình của họ.
- Đi theo trình tự nội dung dự định.
- Khám phá thông tin có sẵn.
- Đi đến các bước tiếp theo đã thống nhất.
- Sử dụng trang ở các kích thước màn hình bắt buộc.

Hãy đánh giá những điều này so với các yêu cầu đã được duyệt. Đây không phải là lúc đưa ra một chiến lược trang chủ mới.

**Một giao diện bóng bẩy không cho thấy trang đã hoàn thành. Việc hoàn thành cần có bằng chứng đối chiếu với phạm vi đã thống nhất.**

## 2. Xác nhận những gì bạn đang nộp

Trước khi rà soát, hãy ghi lại chính xác những gì đang được rà soát.

| Trường | Cần ghi lại |
|---|---|
| Dự án | Tên website và vị trí repository |
| Phạm vi | Trang chủ và mọi component dùng chung được bao gồm |
| Phiên bản triển khai | Branch và commit hiện tại |
| Trạng thái làm việc | Mọi thay đổi liên quan chưa commit hoặc chưa được theo dõi (untracked) |
| Tham chiếu | Các phiên bản tài liệu và thiết kế đã được duyệt |
| Môi trường rà soát | Địa chỉ local, trình duyệt và các kích thước viewport bắt buộc |
| Hạn chế đã biết | Tài nguyên còn thiếu, đích đến bị chặn hoặc các bước kiểm tra chưa thực hiện |

Một **commit** là một bản chụp đã lưu của dự án trong Git, được nhận diện bằng một mã ngắn như `a1b2c3d`. Một **branch** (nhánh) là một dòng công việc riêng biệt trong Git. Bạn có thể xem commit mới nhất bằng `git log --oneline -1`.

Mã nhận diện commit không bao gồm những thay đổi được thực hiện sau commit đó. Nếu các thay đổi chưa commit là một phần của bài nộp, hãy ghi lại cả chúng.

Đừng bao giờ đưa mật khẩu, khóa truy cập hoặc các giá trị cấu hình riêng tư khác vào bài nộp.

## 3. Tập hợp các hồ sơ rà soát hiện có

Kết hợp:

- Trạng thái công việc của các phần từ Bài 5.1.
- Các bước kiểm tra nội dung chữ, hình ảnh và lời kêu gọi hành động từ Bài 5.2.
- Các phát hiện responsive từ Bài 5.3.
- Các phát hiện liên quan đến component dùng chung từ Học phần 4.
- Tài liệu tạm thời và phụ thuộc còn tồn đọng.

Loại bỏ các phát hiện trùng lặp, nhưng giữ lại bằng chứng của chúng và các phần của trang mà chúng ảnh hưởng.

### Ví dụ về hồ sơ tổng hợp

| ID | Phát hiện | Trạng thái hiện tại | Bằng chứng hoặc hành động tiếp theo |
|---|---|---|---|
| HP-01 | Thẻ liệu trình bị tràn ở độ rộng rà soát hẹp | Đã xác minh | Đã kiểm tra lại sau khi sửa lưới |
| HP-02 | Chưa có ảnh hero cuối cùng | Chờ tài nguyên | Hình tạm thời đã thống nhất vẫn đang được dùng |
| HP-03 | CTA chính dẫn đến sai trang | Đã xác minh | Đích đến đã xác nhận mở đúng |
| HP-04 | Một bước kiểm tra bắt buộc trên thiết bị thật còn tồn đọng | Chưa kiểm tra | Vẫn cần rà soát trên thiết bị |

Đừng coi các mục chưa giải quyết là đã xong chỉ vì phần còn lại của trang đạt yêu cầu.

## 4. Hoàn thành danh sách kiểm tra rà soát cuối cùng

Kiểm tra phạm vi đã triển khai so với các yêu cầu đã được duyệt.

| Hạng mục | Rà soát cuối cùng |
|---|---|
| **Cấu trúc** | Các phần xuất hiện theo thứ tự đã được duyệt, không bị trùng lặp |
| **Thiết kế** | Bố cục, kiểu chữ, màu sắc và khoảng cách theo đúng tham chiếu |
| **Nội dung** | Câu chữ đã được duyệt có mặt và các quyết định biên tập đã được phản ánh |
| **Hình ảnh** | Đúng hình ảnh tải được, với cách cắt và văn bản thay thế phù hợp |
| **Điều hướng** | Liên kết ở header, footer và các phần đi đến đúng đích đã được xác nhận |
| **Lời kêu gọi hành động** | Nhãn, vị trí và hành vi theo đúng hành trình đã được duyệt |
| **Hành vi responsive** | Các độ rộng bắt buộc và các độ rộng ở giữa vẫn dùng được |
| **Sử dụng bàn phím** | Điều khiển có thể tiếp cận, thao tác và nhìn rõ khi được focus |
| **Tích hợp trang** | Kiểu và component dùng chung hoạt động cùng nhau, không có regression nào đã biết |
| **Tài liệu tạm thời** | Các placeholder và phụ thuộc còn lại đã được ghi lại |

Một **regression** (lỗi hồi quy) là thứ trước đây hoạt động nhưng đã bị một thay đổi sau đó làm hỏng.

Đánh dấu mỗi bước kiểm tra là **Đạt**, **Không đạt** hoặc **Chưa kiểm tra**. Nếu một bước kiểm tra không áp dụng, hãy đánh dấu **Không áp dụng** kèm một lý do ngắn.

### Tái sử dụng bằng chứng còn hợp lệ

Bạn không cần lặp lại mọi bước kiểm tra chỉ để nộp bài mới.

Hãy tái sử dụng bằng chứng trước đó khi:

- Nó liên quan đến phiên bản bạn đang nộp.
- Code, nội dung và tham chiếu liên quan không thay đổi kể từ đó.
- Các điều kiện của bước kiểm tra vẫn còn áp dụng.

Hãy lặp lại bất kỳ bước kiểm tra nào mà các thay đổi sau đó có thể đã ảnh hưởng, hoặc bước mà bạn vẫn còn nghi ngờ.

## 5. Đi qua hành trình dự định của khách truy cập

Một **hành trình người dùng** là chuỗi các bước mà khách truy cập thực hiện để đạt được điều gì đó, chẳng hạn tìm một liệu trình rồi tìm một địa điểm. Hãy đi theo hành trình trang chủ đã được duyệt trong trình duyệt.

Ví dụ, nếu hành trình đã thống nhất là khám phá một liệu trình rồi tìm một địa điểm:

1. Bắt đầu ở trang chủ.
2. Tìm phần tổng quan liệu trình.
3. Đi theo một liên kết liệu trình.
4. Xác nhận rằng trang mong đợi được mở ra.
5. Quay lại và đi theo lời kêu gọi hành động về địa điểm.
6. Xác nhận rằng có thể tiếp cận thông tin địa điểm.

Hãy dùng hành trình đã được duyệt thực tế của dự án. Đừng thêm ví dụ này nếu nó không áp dụng.

Mục đích là kiểm tra nhiều hơn các liên kết riêng lẻ. Hãy xác nhận rằng các nhãn và đích đến hợp lý khi đi cùng nhau thành một chuỗi.

### Tôn trọng giới hạn kiểm thử

Mở một đích đến đã được duyệt có thể là tất cả những gì nhiệm vụ này cần.

Gửi biểu mẫu, gửi tin nhắn, đặt lịch hoặc kích hoạt bất kỳ hành động nào khác bên ngoài website đều cần sự cho phép cụ thể và sắp xếp kiểm thử riêng. Hãy ghi lại nơi các bước kiểm tra của bạn dừng lại và lý do.

## 6. Chạy các bước kiểm tra áp dụng của dự án

Hãy dùng các lệnh được ghi trong tài liệu của dự án. Tùy vào dự án khởi đầu và các thay đổi, chúng có thể bao gồm:

| Bước kiểm tra | Tác dụng |
|---|---|
| Kiểm tra kiểu (type check) | Xác nhận code TypeScript dùng dữ liệu của nó đúng cách |
| Lint | Kiểm tra code theo các quy tắc phong cách và chất lượng của dự án |
| Kiểm thử tự động | Chạy mọi bài kiểm thử mà dự án đã có |
| Build production | Chuẩn bị phiên bản đã tối ưu của trang để deploy, và thất bại nếu có gì đó bị hỏng |

Đừng bịa ra script hoặc thêm một công cụ kiểm thử mới chỉ để hoàn thành danh sách kiểm tra này.

| Bước kiểm tra | Kết quả | Bằng chứng |
|---|---|---|
| Kiểm tra kiểu đã được ghi trong tài liệu | Đạt / Không đạt / Chưa kiểm tra | Lệnh và kết quả đầu ra liên quan |
| Kiểm tra lint đã được ghi trong tài liệu | Đạt / Không đạt / Chưa kiểm tra | Lệnh và kết quả đầu ra liên quan |
| Các bài kiểm thử tự động liên quan | Đạt / Không đạt / Chưa kiểm tra | Các bài kiểm thử đã chạy và kết quả |
| Build production, nếu bắt buộc | Đạt / Không đạt / Chưa kiểm tra | Lệnh và kết quả |

Nếu một bước kiểm tra thất bại, hãy tìm hiểu xem lỗi đó có liên quan đến công việc của bạn hay không. Hãy báo cáo cả những lỗi đã tồn tại trước khi bạn làm. Chúng vẫn ảnh hưởng đến mức độ tin cậy mà bất kỳ ai có thể đặt vào bài nộp.

Một lần build thành công không chứng minh rằng trang trông đúng hay các hành trình hoạt động.

## 7. Nhờ Claude rà soát lần cuối

```text
Review the homepage submission against the approved scope.

Inspect:
- The relevant project instructions.
- Approved homepage, content and responsive references.
- Task acceptance criteria.
- Current implementation and Git working state.
- Existing findings and verification evidence.

Assess:
1. Whether the approved homepage scope is implemented.
2. Whether the evidence supports each acceptance criterion.
3. Whether later changes invalidate earlier checks.
4. Whether temporary materials or dependencies remain.
5. Whether shared changes have unresolved effects.
6. What still requires supervisor review.

Return:
- Sources and implementation state actually inspected.
- Acceptance criteria with evidence and status.
- New or unresolved findings.
- Checks not performed and their limitations.
- A readiness recommendation for the defined scope.

Review only. Do not edit files, install dependencies,
commit, push, deploy or trigger external transactions.

Do not treat your recommendation as supervisor approval.
Do not claim browser inspection or test execution unless performed.

Scope and references:
[Insert exact references and submission scope.]
```

Hãy tự mình xem xét các phát hiện của Claude. Xác nhận mọi vấn đề mới trước khi biến nó thành một nhiệm vụ sửa lỗi.

## 8. Chuẩn bị bàn giao

Một bản **bàn giao** cho người hướng dẫn biết những gì đã sẵn sàng, cách kiểm tra và những gì vẫn cần chú ý.

| Mục bàn giao | Thông tin bắt buộc |
|---|---|
| **Phạm vi đã triển khai** | Các phần và thay đổi dùng chung được bao gồm |
| **Tham chiếu gốc** | Các nguồn đã được duyệt đã tuân theo |
| **Trạng thái triển khai** | Branch, commit và mọi thay đổi liên quan chưa commit |
| **Cách truy cập để duyệt** | Cách chạy hoặc mở trang, dùng hướng dẫn hiện có của dự án |
| **Xác minh** | Các bước kiểm tra đã thực hiện, kết quả và bằng chứng hỗ trợ |
| **Mục còn tồn đọng** | Các phát hiện, phụ thuộc và bước kiểm tra chưa thực hiện |
| **Quyết định được yêu cầu** | Phạm vi chính xác mà bạn đang nộp để được chấp nhận |

### Ví dụ về tuyên bố sẵn sàng

> Trang chủ đã sẵn sàng để duyệt theo cấu trúc, nội dung và yêu cầu responsive đã được duyệt. Ảnh hero cuối cùng vẫn còn tồn đọng, và hình tạm thời đã thống nhất được ghi lại trong sổ ghi nội dung tạm thời. Các bước kiểm tra trên trình duyệt và kiểm tra của dự án theo yêu cầu đều được ghi lại trong bài nộp này.

Chỉ dùng câu chữ như thế này khi bằng chứng hỗ trợ điều đó.

Tránh những tuyên bố như “Mọi thứ đều hoạt động” hoặc “Website đã hoàn thành” khi chỉ có trang chủ được rà soát.

## 9. Ghi lại quyết định của người hướng dẫn

Hãy tách riêng trạng thái triển khai với quyết định duyệt.

| Quyết định | Ý nghĩa |
|---|---|
| Chờ duyệt | Chưa có quyết định nào |
| Cần chỉnh sửa | Cần những chỉnh sửa cụ thể |
| Đã chấp nhận cho phạm vi đã nêu | Người hướng dẫn chấp nhận phạm vi đã xác định |
| Đã chấp nhận kèm việc cần làm tiếp đã ghi lại | Đã chấp nhận, kèm danh sách công việc tồn đọng cụ thể |

Hãy dùng nhãn quyết định riêng của dự án nếu dự án có.

Ghi lại:

- Người duyệt.
- Ngày ra quyết định.
- Phiên bản triển khai đã được duyệt.
- Phạm vi được chấp nhận.
- Các chỉnh sửa bắt buộc hoặc công việc cần làm tiếp.
- Mọi điều kiện đi kèm việc chấp nhận.

Việc chấp nhận trang chủ không cho phép deploy, và cũng không có nghĩa là bất kỳ trang nào khác đã hoàn thành.

## 10. Lưu mốc lưu Git sau khi được chấp nhận

Khi người hướng dẫn chấp nhận trang chủ, hãy lưu công việc đã được chấp nhận thành một mốc lưu Git, theo các bước trong Bài 4.4 và quy tắc Git của dự án:

1. Chạy `git status` để xem mọi thay đổi.
2. Chỉ stage những tệp thuộc công việc đã được chấp nhận, dùng `git add` với đường dẫn của từng tệp.
3. Kiểm tra các thay đổi đã stage bằng `git diff --staged`.
4. Commit với một thông điệp rõ ràng theo quy ước của dự án.
5. Thêm mã nhận diện commit vào hồ sơ quyết định.

Chỉ commit công việc đã được chấp nhận. Loại trừ các thay đổi không liên quan, tệp môi trường và tệp tạm thời.

Nếu thay vào đó là yêu cầu chỉnh sửa, hãy thực hiện các chỉnh sửa trước. Chỉ lưu mốc lưu sau khi công việc đã chỉnh sửa được chấp nhận.

## 11. Bài tập thực hành

**Nhiệm vụ: Nộp trang chủ để người hướng dẫn duyệt.**

1. Xác nhận phạm vi bài nộp và trạng thái triển khai.
2. Tập hợp các phát hiện và bằng chứng trước đó.
3. Hoàn thành danh sách kiểm tra cuối cùng.
4. Đi qua hành trình người dùng đã được duyệt.
5. Chạy mọi bước kiểm tra còn tồn đọng của dự án.
6. Nhờ Claude rà soát lần cuối.
7. Giải quyết các lỗi đã xác minh trong phạm vi được cho phép.
8. Chuẩn bị bàn giao.
9. Để quyết định ở trạng thái **Chờ duyệt** cho đến khi người hướng dẫn phản hồi.
10. Sau khi được chấp nhận, lưu một mốc lưu Git và ghi lại mã nhận diện của nó.

Nếu được yêu cầu chỉnh sửa, hãy tạo các nhiệm vụ sửa lỗi có giới hạn rõ ràng và kiểm tra lại các phần bị ảnh hưởng trước khi nộp lại.

## 12. Sản phẩm cần nộp

Nộp:

- Bản bàn giao trang chủ.
- Các phiên bản tham chiếu đã được duyệt và trạng thái triển khai.
- Tiêu chí chấp nhận cuối cùng kèm trạng thái và bằng chứng.
- Ảnh chụp màn hình desktop và mobile tiêu biểu.
- Kết quả kiểm tra hành trình người dùng.
- Kết quả kiểm tra của dự án.
- Hồ sơ phát hiện tổng hợp và sổ ghi nội dung tạm thời.
- Quyết định của người hướng dẫn khi đã nhận được.
- Mã nhận diện commit của mốc lưu, khi công việc đã được chấp nhận.

## 13. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Trang chủ đã ghép hoàn chỉnh đã được rà soát so với phạm vi đã được duyệt.
- Bằng chứng hỗ trợ các kết quả đã báo cáo.
- Các mục còn tồn đọng và giới hạn của các bước kiểm tra vẫn được thể hiện rõ.
- Bản bàn giao xác định chính xác phiên bản đang được duyệt.
- Quyết định của người hướng dẫn được ghi lại chính xác.
- Các chỉnh sửa bắt buộc đã được giải quyết hoặc được giao thành công việc cần làm tiếp.
- Công việc đã được chấp nhận được lưu thành một mốc lưu Git, nếu quy tắc của dự án cho phép.

## 14. Kiểm tra kiến thức

1. Vì sao bản bàn giao phải xác định cả các thay đổi chưa commit lẫn một commit?
2. Khi nào có thể tái sử dụng bằng chứng xác minh trước đó?
3. Kiểm tra hành trình người dùng khác với kiểm tra từng liên kết riêng lẻ như thế nào?
4. Vì sao khuyến nghị sẵn sàng của Claude khác với sự chấp nhận của người hướng dẫn?
5. Việc chấp nhận trang chủ có cho phép deploy không?
