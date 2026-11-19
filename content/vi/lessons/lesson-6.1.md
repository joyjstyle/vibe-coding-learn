# Bài 6.1: Lập kế hoạch và xây dựng các trang nội bộ

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Xác định các yêu cầu cho một trang nội bộ.
- Tách riêng các mẫu trang dùng chung với nội dung chỉ thuộc về một trang.
- Xây dựng một trang nội bộ từ kiến trúc thông tin (IA) và thiết kế đã được duyệt.
- Kết nối trang mới với phần còn lại của website.
- Kiểm tra trang và mọi component dùng chung mà nó ảnh hưởng.

**Điều kiện tiên quyết:** Hoàn thành Học phần 5 và đã ghi lại quyết định duyệt trang chủ.

**Tài liệu cần chuẩn bị:** IA đã được duyệt, thiết kế các trang nội bộ, nội dung trang, tài nguyên (asset), tài liệu kiến trúc, các component dùng chung và kế hoạch công việc.

## 1. Hiểu mục đích của các trang nội bộ

Một **trang nội bộ** là bất kỳ trang nào khác ngoài trang chủ. Các trang nội bộ cung cấp cho khách truy cập thông tin chi tiết hơn hoặc cho phép họ làm những việc mà trang chủ không làm được.

Tùy vào website đã được duyệt, chúng có thể bao gồm:

- Các trang liệu trình.
- Một trang giới thiệu.
- Các trang địa điểm.
- Một trang liên hệ.
- Các trang tài nguyên hoặc bài viết.

Chỉ xây dựng những trang nằm trong phạm vi đã được duyệt.

Mỗi trang cần đáp ứng một nhu cầu cụ thể của khách truy cập và kết nối với phần còn lại của website.

**Một trang nội bộ cần có yêu cầu riêng của nó. Nó không nên tự động sao chép cấu trúc phần của trang chủ.**

## 2. Tạo bản đồ triển khai trang

Dùng IA đã được duyệt để liệt kê các trang và mối quan hệ giữa chúng. Với mỗi trang, hãy ghi lại:

| Trường | Cần xác định |
|---|---|
| Tên trang | Tên và mục đích đã được duyệt của nó |
| Route | Đường dẫn địa chỉ đã được xác nhận, chẳng hạn `/treatments` |
| Loại trang | Trang danh sách, trang chi tiết, trang thông tin hoặc một loại khác đã được duyệt |
| Tham chiếu | Thiết kế, nội dung và hướng dẫn phong cách (style guide) áp dụng |
| Các phần | Nội dung bắt buộc và thứ tự của nó |
| Thành phần dùng chung | Layout và component hiện có để tái sử dụng |
| Tài nguyên | Các tệp nó cần, và chúng đã có sẵn hay chưa |
| Điều hướng | Các liên kết dẫn vào trang và dẫn ra khỏi trang |
| Phụ thuộc | Quyết định, nội dung hoặc kết nối đến dịch vụ khác còn thiếu |
| Xác minh | Tiêu chí chấp nhận và các bước kiểm tra tương ứng |

Một **trang danh sách** (listing page) hiển thị nhiều mục, chẳng hạn tất cả các liệu trình. Một **trang chi tiết** (detail page) trình bày sâu về một mục, chẳng hạn một liệu trình duy nhất.

Hãy lấy route từ IA. Đừng tự đặt chúng dựa trên tiêu đề trang.

### Ví dụ

Chỉ khi các trang này tồn tại trong dự án đã được duyệt:

| Trang | Mục đích | Thành phần dùng chung có thể có |
|---|---|---|
| Danh sách liệu trình | Giúp khách truy cập khám phá các liệu trình hiện có | Thẻ liệu trình, phần giới thiệu trang |
| Chi tiết liệu trình | Giải thích một liệu trình và bước tiếp theo của nó | Layout trang chi tiết, lời kêu gọi hành động |
| Chi tiết địa điểm | Cung cấp thông tin về cơ sở | Khối địa chỉ, liên kết địa điểm |

Các ví dụ này cho thấy các trang liên quan với nhau như thế nào. Chúng không thêm trang nào vào dự án.

## 3. Kiểm tra những gì đã có

Trước khi tạo một trang, hãy tìm hiểu xem nó đã tồn tại chưa. Kiểm tra:

1. Cấu trúc route.
2. Các layout dùng chung.
3. Các trang liên quan.
4. Các component có thể tái sử dụng.
5. Nơi lưu trữ nội dung.
6. Các bước kiểm tra liên quan của dự án.
7. Các thay đổi Git hiện tại.

Một route có thể đã chứa một placeholder hoặc một trang được xây dựng dở dang. Hãy mở rộng hoặc thay thế nó trong phạm vi được cho phép. Đừng tạo một route thứ hai cạnh tranh cho cùng một trang.

### Xác nhận các quy ước của framework

Một **framework** là bộ công cụ mà dự án khởi đầu được xây dựng trên đó. Nó quyết định cách các tệp trở thành trang và cách route hoạt động. Các dự án TypeScript và TSX khác nhau tổ chức trang theo những cách khác nhau, vì vậy đừng phỏng đoán.

Trước khi xây dựng, hãy nhờ Claude xác định các tệp liên quan và giải thích cách route đã chọn được biến thành một trang trong dự án này.

## 4. Nhận diện các mẫu trang dùng chung

Nhiều trang có thể có chung một cấu trúc nhưng hiển thị thông tin khác nhau.

Ví dụ, các trang chi tiết liệu trình đã được duyệt có thể đều bao gồm:

- Phần giới thiệu trang.
- Phần giải thích về liệu trình.
- Những điều khách hàng có thể mong đợi.
- Một bước tiếp theo phù hợp.

Hãy tái sử dụng cấu trúc đó ở những nơi thiết kế đã được duyệt hỗ trợ. Một cấu trúc trang có thể tái sử dụng như thế này thường được gọi là **template** (khuôn mẫu).

Chỉ trông giống nhau thôi chưa đủ lý do để ép các trang vào cùng một template.

| Tình huống | Cách làm phù hợp |
|---|---|
| Nhiều trang có chung một cấu trúc đã được duyệt | Tái sử dụng một layout hoặc mẫu trang |
| Một component xuất hiện trên các loại trang khác nhau | Tái sử dụng component đó |
| Một trang có cấu trúc riêng đã được duyệt | Xây dựng layout riêng của nó |
| Các trang tương lai chưa được xác định | Đừng thêm tùy chọn template cho chúng |

Đừng đưa vào một **hệ thống quản lý nội dung (CMS)**, tức là công cụ để chỉnh sửa nội dung website bên ngoài code, hay bất kỳ cách tạo route mới nào, chỉ vì có nhiều trang được lên kế hoạch. Hãy tuân theo kiến trúc đã được duyệt.

## 5. Chọn trang đầu tiên để xây dựng

Hãy chọn một trang mà mọi điều kiện tiên quyết đều đã sẵn sàng.

Một trang đầu tiên tốt:

- Có nội dung và thiết kế đã được duyệt.
- Dùng các component dùng chung hiện có.
- Có các đích liên kết đã được xác nhận.
- Đại diện cho một mẫu mà các trang khác sẽ cần.
- Có thể được duyệt riêng.

Đừng bắt đầu với một trang đang bị chặn bởi một kết nối chưa được giải quyết đến dịch vụ khác khi có một trang đã được duyệt khác có thể tiến hành.

### Ví dụ về nhiệm vụ

**Nhiệm vụ: Xây dựng trang chi tiết liệu trình đã được duyệt.**

| Hạng mục | Yêu cầu |
|---|---|
| Kết quả | Khách truy cập có thể đọc thông tin liệu trình đã được duyệt và đi theo bước tiếp theo đã được xác nhận của nó |
| Phạm vi | Route đã chọn, các phần bắt buộc, tài nguyên được cung cấp và các liên kết của trang |
| Tái sử dụng | Layout hiện có của trang web, kiểu chữ và các component phù hợp |
| Giới hạn | Giữ nguyên câu chữ, cấu trúc đã được duyệt và mọi trang không liên quan |
| Phụ thuộc | Nội dung đã được duyệt, một hình ảnh đã được chọn và một đích đến CTA đã được xác nhận |
| Xác minh | Mở route trực tiếp, so sánh với thiết kế, kiểm tra nội dung, thử liên kết và rà soát responsive |

Hãy dùng ID công việc và tham chiếu thực tế.

## 6. Xây dựng trang trong khuôn khổ trang web hiện có

Tuân theo thứ tự phần đã được duyệt và hệ thống hình ảnh dùng chung. Kiểm tra rằng:

- Header và footer dùng chung chỉ xuất hiện một lần.
- Trang có một tiêu đề chính rõ ràng ở cấp 1.
- Cấp tiêu đề phản ánh cấu trúc nội dung của trang.
- Văn bản và tài nguyên đã được duyệt xuất hiện ở đúng phần.
- Liên kết dùng các đích đến đã được xác nhận.
- Bố cục hoạt động ở các độ rộng bắt buộc.

Đừng sao chép toàn bộ trang chủ vào một route mới rồi xóa dần các phần cho đến khi trông đúng. Cách đó để lại những phần thừa bị ẩn và khiến trang khó bảo trì. Hãy tái sử dụng những phần của nền tảng mà bạn thực sự cần.

### Prompt triển khai

```text
Implement the selected internal page using the approved task
and project references.

Before editing:
- Read the relevant project instructions.
- Confirm the project location and current Git status.
- Inspect the existing route, shared layout and related pages.
- Confirm that required content, assets and decisions are available.

During implementation:
- Follow the existing routing and content architecture.
- Use the approved page structure and exact supplied copy.
- Reuse applicable layouts, components and shared styles.
- Preserve the shared header and footer without duplication.
- Connect links to confirmed destinations.
- Follow approved responsive requirements.
- Preserve unrelated pages and existing work.

Do not introduce a CMS, new dependencies or a broader
page-template system unless required by the approved task.

After implementation:
- Check direct access to the route and browser refresh.
- Compare the page with the approved references.
- Verify content, images, links and responsive behaviour.
- Check shared usages affected by changes.
- Run applicable documented project checks.
- Report changes, evidence and remaining limitations.

Do not commit, push or deploy.

Selected task:
[Insert task ID and specification.]

Approved references:
[Insert exact paths or reference locations.]
```

## 7. Kết nối trang với hành trình người dùng

Một trang mở được ở địa chỉ của nó chưa hẳn đã là một phần của website. Khách truy cập cũng cần có cách để tìm thấy nó.

Kiểm tra các **điểm vào** (entry point) đã được duyệt, tức là các liên kết mà khách truy cập dùng để đến trang, chẳng hạn:

- Liên kết ở header hoặc footer.
- Thẻ liệu trình trên trang chủ.
- Một trang danh sách.
- Liên kết nội dung liên quan.

Sau đó kiểm tra các liên kết đi ra của chính trang đó.

| Bước kiểm tra | Kết quả mong đợi |
|---|---|
| Đi theo một liên kết vào đã được duyệt | Trang dự định được mở ra |
| Gõ route vào thanh địa chỉ | Trang tải được mà không cần truy cập trước đó |
| Tải lại trang | Trang tải lại đúng |
| Đi theo lời kêu gọi hành động của trang | Đích đến đã được xác nhận được mở ra |
| Đi theo các liên kết liên quan | Mỗi đích đến khớp với nhãn của nó |

Việc mở route trực tiếp và tải lại trang rất quan trọng vì một số thiết lập chỉ hoạt động khi bạn đến bằng cách nhấp vào một liên kết.

Chỉ thêm **breadcrumb** (đường dẫn phân cấp), tức là một chuỗi liên kết cho thấy vị trí của trang trong trang web, hoặc các hình thức điều hướng khác khi thiết kế đã được duyệt hoặc quy tắc của dự án yêu cầu.

Nếu một đích đến chưa được xây dựng, hãy dùng cách xử lý tạm thời đã thống nhất và ghi lại phụ thuộc đó.

## 8. Kiểm tra trang và các ảnh hưởng dùng chung

Dùng các phương pháp rà soát từ Học phần 4 và 5. Kiểm tra:

- Cấu trúc và mức độ khớp với thiết kế.
- Nội dung chữ chính xác.
- Việc tải hình ảnh, cách cắt và văn bản thay thế.
- Cấu trúc tiêu đề.
- Điều hướng và đích đến của lời kêu gọi hành động.
- Sử dụng bàn phím.
- Các kích thước viewport bắt buộc và các độ rộng ở giữa.
- Các bước kiểm tra liên quan của dự án.

Nếu bạn đã thay đổi một component dùng chung cho trang này, hãy kiểm tra lại những nơi trang chủ đang dùng nó. Ví dụ, thêm một biến thể thẻ đã được duyệt không được vô tình làm thay đổi các thẻ hiện có trên trang chủ.

Ghi lại mọi bước kiểm tra bạn chưa thực hiện là **Chưa kiểm tra**, kèm lý do.

## 9. Bài tập thực hành

**Nhiệm vụ: Xây dựng và kiểm tra một trang nội bộ đã được duyệt.**

1. Tạo bản đồ triển khai trang.
2. Chọn một trang mà các điều kiện tiên quyết đã sẵn sàng.
3. Kiểm tra route và các component có thể tái sử dụng của nó.
4. Viết một nhiệm vụ triển khai có giới hạn rõ ràng.
5. Nhờ Claude xây dựng trang.
6. Rà soát các tệp đã thay đổi.
7. Thử truy cập trực tiếp, tải lại trang và các liên kết vào đã được duyệt.
8. Kiểm tra giao diện, nội dung và hành vi responsive.
9. Ghi lại các phát hiện và ảnh hưởng dùng chung.

Nếu trang bị chặn, hãy xác định điều kiện tiên quyết còn thiếu và chọn một nhiệm vụ được cho phép khác nếu có.

## 10. Sản phẩm cần nộp

Nộp:

- Bản đồ triển khai trang.
- Nhiệm vụ đã chọn và prompt triển khai.
- Bản tóm tắt các tệp đã thay đổi.
- Route đã triển khai và các điểm vào đã được duyệt của nó.
- Ảnh chụp màn hình desktop và mobile.
- Tiêu chí chấp nhận kèm trạng thái và bằng chứng.
- Kết quả kiểm tra của dự án.
- Các phát hiện và phụ thuộc còn tồn đọng.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Trang tuân theo IA, thiết kế và nội dung đã được duyệt.
- Kiến trúc hiện có và các component dùng chung được sử dụng hợp lý.
- Trang tải được khi truy cập trực tiếp và qua các điểm vào đã được duyệt.
- Các liên kết của trang dẫn đến đúng đích.
- Các bước kiểm tra hình ảnh, responsive và chức năng bắt buộc đã được ghi lại.
- Những nơi dùng chung bị ảnh hưởng đã được kiểm tra.
- Các hạn chế còn lại được thể hiện rõ để người hướng dẫn duyệt.

## 12. Kiểm tra kiến thức

1. Vì sao một trang nội bộ nên có yêu cầu riêng của nó?
2. Khi nào một mẫu trang dùng chung là phù hợp?
3. Vì sao bạn nên kiểm tra cách framework xử lý route trước khi tạo một trang?
4. Mở một route trực tiếp khác với đi theo một liên kết đến nó như thế nào?
5. Cần kiểm tra lại những gì sau khi thay đổi một component dùng chung?
