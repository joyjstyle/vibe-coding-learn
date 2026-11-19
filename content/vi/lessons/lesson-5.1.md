# Bài 5.1: Xây dựng trang chủ theo từng phần

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Chia trang chủ đã được duyệt thành các phần mà bạn có thể xây dựng lần lượt từng phần một.
- Xây dựng các phần theo một thứ tự tôn trọng những gì mỗi phần phụ thuộc vào.
- Tái sử dụng nền tảng dùng chung từ Học phần 4.
- Ghép các phần thành cấu trúc trang đúng.
- Kiểm tra từng phần trước khi chuyển sang phần tiếp theo.

**Điều kiện tiên quyết:** Hoàn thành Học phần 4 và có thiết kế cùng dàn ý trang chủ đã được duyệt.

**Tài liệu cần chuẩn bị:** Dự án khởi đầu (starter project), các tài liệu tham chiếu trang chủ đã được duyệt, hướng dẫn phong cách (style guide), kiến trúc thông tin (IA), nội dung và tài nguyên (asset) hiện có, và kế hoạch công việc.

## 1. Xem trang chủ như một trang thống nhất

Xây dựng từng phần một giúp công việc dễ kiểm tra hơn. Tuy vậy, kết quả cuối cùng vẫn phải hoạt động như một trang duy nhất, mạch lạc.

Mỗi phần cần:

- Đáp ứng một nhu cầu cụ thể của khách truy cập.
- Tuân theo thứ tự và bố cục đã được duyệt.
- Dùng hệ thống hình ảnh dùng chung từ Học phần 4.
- Kết nối đúng với phần còn lại của website.

Bài học này đề cập đến cấu trúc trang và các phần đã được duyệt. Hai bài học tiếp theo sẽ xây dựng tiếp trên nền tảng đó:

| Bài học | Trọng tâm |
|---|---|
| 5.1 | Cấu trúc và các phần |
| 5.2 | Kiểm tra và hoàn thiện nội dung chữ, hình ảnh và lời kêu gọi hành động |
| 5.3 | Tinh chỉnh trang trên các kích thước màn hình |

Trong suốt quá trình, hãy dùng tài liệu đã được cung cấp và đã được duyệt. Nếu được phép dùng nội dung tạm thời, hãy ghi chép rõ ràng để không ai nhầm nó với nội dung chính thức.

## 2. Lập bản đồ các phần đã được duyệt

Bắt đầu từ dàn ý trang chủ đã được duyệt trong giai đoạn lập kế hoạch, rồi chuyển nó thành một bản đồ triển khai.

| Trường | Cần ghi lại |
|---|---|
| Phần | Tên đã được duyệt và vị trí của nó trên trang |
| Mục đích | Câu hỏi của khách truy cập mà phần này trả lời |
| Tham chiếu | Khung thiết kế (frame) hoặc tài liệu cụ thể |
| Nội dung và tài nguyên | Những tài liệu phần này cần, và chúng đã có sẵn hay chưa |
| Component dùng chung | Các thành phần hiện có để tái sử dụng |
| Phụ thuộc | Những quyết định hoặc tài nguyên cần có trước |
| Tiêu chí chấp nhận | Các điều kiện có thể quan sát được để xác nhận hoàn thành |

Ví dụ, **chỉ khi thiết kế đã được duyệt của Saffron Wellness Clinic có các phần này**:

| Phần | Mục đích | Khả năng tái sử dụng |
|---|---|---|
| Hero | Giới thiệu doanh nghiệp và bước tiếp theo chính | Kiểu liên kết hoặc nút dùng chung |
| Tổng quan liệu trình | Giúp khách truy cập khám phá các liệu trình | Thẻ liệu trình |
| Giới thiệu lần đến đầu tiên | Giải thích nơi tìm hiểu về lần đến đầu tiên | Tiêu đề phần dùng chung |
| Tổng quan cơ sở | Giúp khách truy cập tìm một địa điểm | Mẫu trình bày địa điểm |

**Hero** là phần giới thiệu lớn ở đầu trang.

Đừng thêm các phần này chỉ vì chúng xuất hiện trong ví dụ. Chỉ xây dựng những gì có trong thiết kế đã được duyệt.

## 3. Kiểm tra những gì đã có

Trước khi xây dựng, hãy xác định xem trang chủ đã có:

- Một **route** (tuyến đường dẫn), tức là đường dẫn địa chỉ hiển thị trang, chẳng hạn `/`, cùng page component phía sau nó.
- Một **layout dùng chung**, tức là một component bao quanh mọi trang và thường cung cấp header và footer.
- Các phần hiện có.
- Các component và kiểu (style) có thể tái sử dụng.
- Nội dung tạm thời từ dự án khởi đầu.
- Các thay đổi từ những công việc trước đó.

Hãy nhờ Claude xác định những gì có thể giữ lại, điều chỉnh hoặc thay thế trong phạm vi đã được duyệt.

**Nếu layout dùng chung đã cung cấp header và footer, đừng thêm chúng vào trang chủ thêm lần nữa.** Nếu không, trang sẽ hiển thị hai header và hai footer.

Xác nhận rằng dự án vẫn khớp với những gì đã được ghi lại ở cuối Học phần 4.

## 4. Chọn thứ tự triển khai

Hãy đi theo các phụ thuộc thay vì xây dựng mọi thứ cùng lúc.

Một trình tự điển hình là:

1. Xác nhận route của trang chủ và layout dùng chung.
2. Thiết lập vùng chứa nội dung (content container) và cấu trúc phần đã được duyệt.
3. Xây dựng phần đầu tiên.
4. Kiểm tra tiêu chí chấp nhận của phần đó.
5. Xây dựng phần tiếp theo.
6. Rà soát trang đã ghép hoàn chỉnh.

Thứ tự bạn xây dựng không nhất thiết phải trùng với thứ tự trên trang. Ví dụ, một component dùng chung có thể cần được hoàn thiện trước phần sử dụng nó.

Giữ nguyên thứ tự hiển thị đã được duyệt trên trang, trừ khi có một bản sửa đổi được cho phép.

### Xử lý rõ ràng các phần bị chặn

Một phần bị **chặn** khi thiếu thứ gì đó mà nó cần.

Nếu thiếu một hình ảnh:

- Kiểm tra xem có được phép dùng hình giữ chỗ (placeholder) đã được duyệt hay không.
- Chỉ xây dựng cấu trúc xung quanh nếu việc đó hữu ích.
- Ghi lại rằng phần này chưa hoàn chỉnh về mặt hình ảnh.

Nếu thiếu một quyết định bố cục thiết yếu, hãy tạm dừng phần đó và làm một công việc khác có thể tiến hành được.

## 5. Giao cho mỗi phần một nhiệm vụ có giới hạn rõ ràng

### Ví dụ về nhiệm vụ cho một phần

**Nhiệm vụ: Xây dựng phần tổng quan liệu trình đã được duyệt.**

| Hạng mục | Yêu cầu |
|---|---|
| Kết quả | Khách truy cập có thể xem các liệu trình được liệt kê và đi đến các trang đã thống nhất của chúng |
| Tham chiếu | Phần trang chủ đã được duyệt, hướng dẫn phong cách, IA và nội dung liệu trình |
| Phạm vi | Tiêu đề, đoạn giới thiệu, cách sắp xếp thẻ và các thẻ cụ thể đã được cung cấp |
| Tái sử dụng | Thẻ liệu trình hiện có và các kiểu khoảng cách dùng chung |
| Giới hạn | Giữ nguyên câu chữ, thứ tự và đích liên kết đã được duyệt |
| Xác minh | So sánh bố cục, kiểm tra nội dung, thử các liên kết và chạy các bước kiểm tra liên quan của dự án |

Đừng yêu cầu Claude thiết kế lại các phần lân cận để phần đang chọn “khớp hơn”.

Nếu thẻ dùng chung thiếu thứ gì đó mà thiết kế cần, hãy xác định thay đổi hỗ trợ cần làm và kiểm tra những nơi khác đang dùng thẻ đó trước khi thực hiện.

## 6. Xây dựng một phần

Dùng ID công việc và tham chiếu thực tế trong prompt này:

```text
Implement the selected homepage section using the approved task.

Before editing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect the homepage route, shared layout and existing components.
- Confirm the section's prerequisites.

Implementation:
- Follow the approved section order and design.
- Use the existing TypeScript, TSX and styling conventions.
- Reuse shared components and styles where appropriate.
- Use supplied approved content and assets.
- Apply only the agreed treatment for missing materials.
- Preserve unrelated sections and existing work.

After implementation:
- Run applicable documented checks.
- Explain files changed and any shared effects.
- Report which acceptance criteria were verified.
- List browser checks or dependencies still outstanding.

Do not add sections, invent content, install dependencies,
commit, push or deploy without the relevant authorisation.

Selected task:
[Insert task.]

References:
[Insert exact references.]
```

Rà soát kết quả trước khi yêu cầu phần tiếp theo.

## 7. Kiểm tra từng phần

Dùng phương pháp rà soát từ Bài 4.4.

| Hạng mục | Câu hỏi |
|---|---|
| Cấu trúc | Tất cả thành phần bắt buộc đã có mặt và được nhóm đúng chưa? |
| Bố cục | Độ rộng, căn chỉnh và khoảng cách có theo đúng tham chiếu không? |
| Kiểu dùng chung | Kiểu chữ, màu sắc và kiểu component có được dùng đúng không? |
| Nội dung | Nội dung chữ được cung cấp có được giữ nguyên không? Các placeholder có được ghi lại không? |
| Liên kết | Các liên kết đã triển khai có dẫn đến đúng trang đã thống nhất không? |
| Tích hợp | Phần này có nằm đúng chỗ bên trong layout dùng chung không? |
| Độ bền cơ bản | Nội dung có còn dùng được khi cửa sổ trình duyệt bị thu hẹp không? |

Bài 5.3 đề cập đầy đủ việc tinh chỉnh responsive. Dù vậy, hãy sửa ngay những lỗi rõ ràng, chẳng hạn nội dung tràn ra ngoài màn hình hoặc trở nên không dùng được.

## 8. Rà soát trang chủ đã ghép hoàn chỉnh

Khi tất cả các phần theo kế hoạch đã vào đúng vị trí, hãy nhìn trang như một tổng thể.

Hãy tìm:

- Các phần sai thứ tự.
- Header, footer hoặc vùng nội dung chính bị trùng lặp.
- Độ rộng nội dung không nhất quán.
- Khoảng trống bất thường giữa các phần.
- Nội dung bị lặp lại hoặc bị thiếu.
- Cấp tiêu đề không khớp với cấu trúc trang.
- Liên kết hỏng giữa các phần hoặc giữa các trang.
- Thay đổi dùng chung làm ảnh hưởng đến công việc trước đó.

### Kiểm tra cấp tiêu đề trên toàn trang

Các tiêu đề tạo thành dàn ý của trang. Người dùng trình đọc màn hình thường di chuyển từ tiêu đề này sang tiêu đề khác để tìm thứ họ cần.

Một trang chủ điển hình có một tiêu đề cấp 1. Tiêu đề các phần thường là cấp 2. Tiêu đề bên trong một phần, chẳng hạn tên các thẻ liệu trình, thường là cấp 3. Thẻ liệu trình từ Bài 4.3 cho phép bạn đặt cấp tiêu đề để phù hợp với phần mà nó xuất hiện.

Hãy chọn cấp tiêu đề dựa trên vị trí của nó trong dàn ý, không phải dựa trên việc nó trông lớn đến đâu. Kích thước do kiểu (style) quyết định.

Một phần có thể đạt yêu cầu khi đứng riêng nhưng vẫn gây ra vấn đề khi đặt cạnh các phần lân cận.

### Ghi lại tiến độ một cách trung thực

| Trạng thái | Ý nghĩa |
|---|---|
| Chưa bắt đầu | Công việc chưa được bắt đầu |
| Đang làm | Công việc đang được thực hiện |
| Bị chặn | Một phụ thuộc cụ thể đang cản trở tiến độ |
| Đã triển khai, chờ xác minh | Code đã có, nhưng vẫn còn các bước kiểm tra |
| Sẵn sàng để duyệt | Các bước kiểm tra bắt buộc đã hoàn tất và đã có bằng chứng |

Hãy dùng nhãn trạng thái riêng của dự án nếu dự án đã có sẵn.

## 9. Bài tập thực hành

**Nhiệm vụ: Ghép trang chủ đã được duyệt thông qua các nhiệm vụ riêng cho từng phần.**

1. Tạo bản đồ triển khai các phần.
2. Xác nhận route và layout dùng chung.
3. Xác định các phụ thuộc và chọn thứ tự xây dựng.
4. Xây dựng từng phần bằng một prompt có giới hạn rõ ràng.
5. Kiểm tra từng kết quả trước khi tiếp tục.
6. Rà soát trang đã ghép, bao gồm cả cấp tiêu đề.
7. Ghi lại các tài liệu còn thiếu và những phát hiện chưa được giải quyết.

Hãy bắt đầu một **sổ ghi nội dung tạm thời**, là một bảng đơn giản liệt kê mọi placeholder hoặc tài nguyên tạm thời, nơi nó được dùng và nó đang chờ thứ gì. Bài 5.2 sẽ dùng đến sổ này.

Nếu một phần bị chặn, hãy nộp những phần đã hoàn thành và giải thích chính xác những gì vẫn đang bị chặn.

## 10. Sản phẩm cần nộp

Nộp:

- Bản đồ các phần của trang chủ.
- Thứ tự xây dựng và các phụ thuộc.
- ID công việc và trạng thái hiện tại của chúng.
- Bản tóm tắt các tệp đã thay đổi.
- Ảnh chụp màn hình trang đã ghép hoàn chỉnh.
- Kết quả xác minh và các phát hiện còn tồn đọng.
- Sổ ghi nội dung tạm thời, nếu được phép dùng nội dung tạm thời.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Trang chủ tuân theo cấu trúc phần đã được duyệt.
- Layout, component và kiểu dùng chung được tái sử dụng hợp lý.
- Mỗi phần đã triển khai đều đã được kiểm tra.
- Trang đã ghép đã được rà soát các vấn đề tích hợp, bao gồm cả cấp tiêu đề.
- Các tài liệu còn thiếu và các bước kiểm tra chưa hoàn tất vẫn được thể hiện rõ.
- Công việc đã sẵn sàng cho lượt hoàn thiện nội dung, hình ảnh và lời kêu gọi hành động trong Bài 5.2.

## 12. Kiểm tra kiến thức

1. Vì sao trang chủ cần được rà soát như một tổng thể sau khi đã kiểm tra từng phần riêng lẻ?
2. Thứ tự xây dựng có thể khác với thứ tự trên trang không?
3. Điều gì nên xảy ra khi hình ảnh bắt buộc của một phần chưa có sẵn?
4. Vì sao bạn phải kiểm tra layout dùng chung trước khi thêm header hoặc footer?
5. “Đã triển khai” có nghĩa giống “đã xác minh” không?
