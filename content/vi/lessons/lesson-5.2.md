# Bài 5.2: Thêm và kiểm tra nội dung chữ, hình ảnh và lời kêu gọi hành động

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Lấp đầy trang chủ bằng nội dung và tài nguyên (asset) đã được duyệt.
- Kiểm tra câu chữ, chính tả và ngữ pháp mà không viết lại nội dung đã được duyệt.
- Chuẩn bị hình ảnh cho đúng vị trí mà chúng sẽ xuất hiện.
- Kết nối các lời kêu gọi hành động (CTA) với những đích đến đã được xác nhận.
- Theo dõi tài liệu còn thiếu và kiểm tra nội dung đã hoàn thiện.

**Điều kiện tiên quyết:** Hoàn thành Bài 5.1 và có trang chủ đã ghép hoàn chỉnh đang chạy trên máy (local).

**Tài liệu cần chuẩn bị:** Nội dung chữ trang chủ đã được duyệt, các tài nguyên hình ảnh, hướng dẫn phong cách (style guide), kiến trúc thông tin (IA), các đích đến CTA đã được xác nhận và sổ ghi nội dung tạm thời từ Bài 5.1.

## 1. Hoàn thiện nội dung trong cấu trúc đã được duyệt

Bài 5.1 đã xây dựng các phần của trang chủ. Bài học này kiểm tra những gì khách truy cập đọc, nhìn thấy và chọn bên trong các phần đó.

| Loại nội dung | Cần xác định |
|---|---|
| **Nội dung chữ** | Đúng câu chữ đã được duyệt xuất hiện ở đúng vị trí |
| **Hình ảnh** | Đúng hình ảnh dự định xuất hiện với tỷ lệ và cách cắt (crop) phù hợp |
| **Lời kêu gọi hành động** | Nhãn và đích đến khớp với hành trình người dùng đã được duyệt |
| **Tài liệu tạm thời** | Các placeholder được thay thế, hoặc vẫn được ghi lại rõ ràng |

**Nội dung chữ** (copy) là phần văn bản được viết ra của website.

Giữ nguyên thứ tự phần và thiết kế đã được duyệt.

Nếu nội dung được cung cấp không vừa với bố cục, hãy tìm hiểu nguyên nhân trước khi thay đổi câu chữ hoặc thiết kế. Cách sửa có thể nằm ở bố cục chứ không phải ở câu chữ.

## 2. Xác nhận nguồn của từng mục

Trước khi chỉnh sửa, hãy xác định nguồn đã được duyệt hiện hành cho từng phần nội dung.

Việc một tệp có sẵn không chứng minh nó là phiên bản đã được duyệt. Các thư mục thường chứa những bản nháp cũ hơn.

Tạo một **bản đồ nội dung** liên kết mỗi vị trí với nguồn của nó:

| Vị trí | Nguồn đã được duyệt | Bản triển khai hiện tại | Hành động cần làm |
|---|---|---|---|
| Tiêu đề hero | Nội dung chữ trang chủ, phiên bản đã được duyệt | Câu chữ cũ hơn | Thay bằng văn bản đã được duyệt |
| Hình hero | Sổ tài nguyên, bức ảnh đã được chọn | Hình tạm thời | Thay thế và kiểm tra cách cắt |
| Thẻ liệu trình | Các bản tóm tắt liệu trình đã được duyệt | Đã có văn bản được cung cấp | So sánh để đảm bảo chính xác |
| CTA chính | Đặc tả điều hướng đã được xác nhận | Đích đến chưa được kiểm tra | Kiểm tra và thử nghiệm |

Hãy dùng các tham chiếu thực tế của dự án trong bài nộp của bạn.

Nếu hai nguồn mâu thuẫn nhau, hãy ghi lại mâu thuẫn đó và hỏi để làm rõ mục ấy. Tiếp tục với những mục có yêu cầu rõ ràng.

## 3. Kiểm tra nội dung chữ trong hai lượt riêng biệt

Kiểm tra xem website có hiển thị đúng văn bản đã được duyệt hay không khác với việc kiểm tra xem bản thân văn bản đã được duyệt có đúng hay không. Hãy làm hai việc này riêng rẽ.

### Lượt A: So sánh với nội dung chữ đã được duyệt

Kiểm tra:

- Tiêu đề và đoạn văn.
- Tên liệu trình và tên sản phẩm.
- Nhãn nút và nhãn liên kết.
- Giá, thời lượng và thông tin liên hệ, ở những nơi chúng xuất hiện.
- Chữ hoa và dấu câu.
- Văn bản bị thiếu, bị lặp hoặc đã lỗi thời.

Ở những chỗ website khác với văn bản đã được duyệt, hãy khôi phục câu chữ đã được duyệt.

### Lượt B: Đánh dấu các lỗi ngôn ngữ có thể có

Bây giờ hãy kiểm tra chính nguồn đã được duyệt để tìm:

- Lỗi chính tả.
- Lỗi ngữ pháp.
- Thuật ngữ không nhất quán cho cùng một thứ.
- Từ bị lặp.
- Câu không rõ nghĩa.
- Chính tả không nhất quán theo tiếng Anh Anh (UK English).

**Một lỗi trong bản triển khai và một lỗi nghi ngờ trong nội dung chữ đã được duyệt cần được xử lý theo những cách khác nhau.**

| Phát hiện | Cách xử lý |
|---|---|
| Website khác với văn bản đã được duyệt | Khôi phục văn bản đã được duyệt trong phạm vi nhiệm vụ được cho phép |
| Nguồn đã được duyệt có vẻ chứa lỗi đánh máy | Đề xuất cách sửa và tuân theo quy trình phê duyệt biên tập của dự án |
| Nội dung chữ chính xác, nhưng bạn thích câu chữ khác hơn | Ghi lại như một gợi ý không bắt buộc |
| Một nhận định về sự thật không thể xác nhận được | Đánh dấu để người duyệt có trách nhiệm xem xét |

Đừng âm thầm viết lại nội dung đã được duyệt để nó nghe trau chuốt hơn. Ai đó đã duyệt câu chữ ấy, có thể vì những lý do mà bạn không thấy.

### Ví dụ về một phát hiện biên tập

| Trường | Ví dụ |
|---|---|
| Vị trí | Giới thiệu lần đến đầu tiên |
| Câu chữ đã được duyệt | “Your therapist will explains each step.” |
| Đề xuất sửa | “Your therapist will explain each step.” |
| Lý do | Động từ không hòa hợp với chủ ngữ |
| Trạng thái | Chờ quyết định biên tập |

### Đừng thêm các tuyên bố

Đừng thêm các tuyên bố, giá cả, bằng cấp hoặc chi tiết liệu trình mà các nguồn được cung cấp không hỗ trợ.

Nếu website quảng bá các dịch vụ liên quan đến sức khỏe hoặc liệu trình, có thể có các quy định quảng cáo áp dụng cho những gì nó được phép nói, chẳng hạn quy định về tuyên bố kết quả hoặc so sánh với đối thủ cạnh tranh. Việc quyết định câu chữ có tuân thủ hay không không phải là vai trò của bạn. Nếu một nhận định có vẻ là một tuyên bố thuộc loại này, hãy đánh dấu để người duyệt có trách nhiệm xem xét thay vì tự mình chỉnh sửa hoặc phê duyệt nó.

## 4. Đặt hình ảnh một cách có chủ đích

Một bức ảnh đúng vẫn có thể trông sai nếu nó bị cắt hoặc bị kéo giãn khác với thiết kế.

Với mỗi hình ảnh, hãy xác nhận rằng:

1. Đó là tài nguyên đã được chọn và đã được duyệt.
2. Độ phân giải đủ cao cho kích thước mà nó được hiển thị.
3. Tỷ lệ của nó phù hợp với khoảng trống mà nó lấp đầy.
4. Cách cắt giữ cho chủ thể quan trọng vẫn hiển thị.
5. Nó tải thành công.
6. Nó tuân theo cách xử lý hình ảnh thông thường của dự án.

Hãy dùng image component hoặc phương pháp tối ưu hóa của framework nếu dự án có.

Đừng kéo giãn hình ảnh để lấp đầy một khoảng trống. Việc kéo giãn làm méo khuôn mặt và đồ vật.

### Kiểm tra điểm nhấn

**Điểm nhấn** (focal point) là phần của hình ảnh buộc phải luôn hiển thị.

Một bức ảnh rộng có thể trông ổn trên màn hình máy tính nhưng mất đi hoạt động liệu trình khi bị cắt cho màn hình điện thoại hẹp.

Kiểm tra từng hình ảnh ở các độ rộng cần thiết. Điều chỉnh vị trí của nó trong phạm vi thiết kế đã được duyệt khi cần.

Nếu không có cách cắt nào phù hợp, hãy đánh dấu sự không khớp đó thay vì tự ý đổi sang một hình ảnh khác khi chưa được phép.

### Giữ lại các tệp gốc

Giữ lại các tệp hình ảnh gốc. Tạo các phiên bản nhỏ hơn, đã được tối ưu hóa thông qua quy trình tài nguyên đã thống nhất.

Đừng thay đổi khuôn mặt, logo, sản phẩm hoặc các chi tiết có ý nghĩa khác như một phần của việc đặt hình thông thường.

## 5. Viết văn bản thay thế phù hợp

**Văn bản thay thế** (alternative text), thường được gọi là alt text, là một mô tả ngắn bằng chữ cho một hình ảnh. Trình đọc màn hình đọc to nó lên, và trình duyệt hiển thị nó nếu hình ảnh không tải được.

Văn bản thay thế tốt phụ thuộc vào lý do hình ảnh có mặt ở đó.

| Mục đích của hình ảnh | Cách làm |
|---|---|
| Ảnh mang thông tin | Mô tả ngắn gọn chủ thể hoặc hoạt động liên quan |
| Ảnh trang trí | Dùng giá trị văn bản thay thế rỗng, `alt=""`, để trình đọc màn hình bỏ qua |
| Ảnh dùng làm liên kết | Đảm bảo liên kết có tên truy cập được (accessible name) cho biết nó dẫn đến đâu |
| Ảnh chứa văn bản thiết yếu | Cung cấp cùng thông tin đó dưới dạng văn bản thật, thay vì dựa vào hình ảnh |

**Tên truy cập được** (accessible name) là tên mà công nghệ hỗ trợ đọc lên cho một phần tử, chẳng hạn liên kết hoặc nút. Với liên kết dạng chữ, đó thường là chữ của liên kết. Với liên kết dạng hình ảnh, nó thường lấy từ văn bản thay thế của hình ảnh.

Ví dụ:

> Chuyên viên trị liệu đang kiểm tra da đầu của khách hàng trong buổi tư vấn.

Chỉ dùng câu này nếu nó mô tả chính xác bức ảnh thực tế.

Tránh:

- Danh sách từ khóa.
- Những diễn giải mà hình ảnh không thể hiện.
- Lặp lại chú thích đã có sẵn ngay cạnh hình ảnh.
- Bắt đầu mọi mô tả bằng “Hình ảnh của”. Trình đọc màn hình đã thông báo rằng đó là một hình ảnh.

Hãy tuân theo mọi mô tả tài nguyên và yêu cầu về khả năng tiếp cận đã được duyệt.

## 6. Kết nối lời kêu gọi hành động với hành trình người dùng

Một **lời kêu gọi hành động**, hay CTA, đề nghị khách truy cập thực hiện một bước tiếp theo, chẳng hạn:

- Xem các liệu trình.
- Tìm một cơ sở.
- Yêu cầu đặt lịch hẹn.

Với mỗi lời kêu gọi hành động, hãy kiểm tra:

| Hạng mục | Cần xác minh |
|---|---|
| **Nhãn** | Khớp với câu chữ đã được duyệt |
| **Mục đích** | Làm rõ bước tiếp theo |
| **Đích đến** | Đi đến đúng trang, phần trang hoặc dịch vụ bên ngoài đã được xác nhận |
| **Phần tử** | Dùng liên kết để đi đến đâu đó, hoặc dùng nút để thực hiện một hành động |
| **Hành vi** | Làm đúng những gì đặc tả quy định |
| **Tính khả dụng** | Không gợi ý rằng một hành động chưa hoàn thiện đã hoạt động |

Hãy thử đích đến thực tế trong trình duyệt. Chỉ thấy đúng địa chỉ trong code là chưa đủ, vì route đó có thể chưa tồn tại hoặc có thể hiển thị sai nội dung.

Với một **liên kết neo** (anchor link), tức là liên kết nhảy đến một phần trên cùng trang, hãy xác nhận rằng phần đích có tồn tại và hiển thị sau khi nhảy đến.

Với dịch vụ đặt lịch hoặc nhắn tin bên ngoài, hãy kiểm tra rằng đích đến đã được duyệt có mở ra. Đừng thực hiện đặt lịch hoặc gửi tin nhắn.

Nếu một lời kêu gọi hành động mở ra một biểu mẫu, chỉ kiểm tra hành vi được cho phép trong nhiệm vụ này. Đừng thêm kết nối biểu mẫu mới như một phần của lượt hoàn thiện nội dung.

## 7. Theo dõi tài liệu tạm thời và tài liệu còn thiếu

Cập nhật sổ ghi nội dung tạm thời mà bạn đã bắt đầu trong Bài 5.1.

| Mục | Vị trí | Cách xử lý hiện tại | Đang chờ | Trạng thái |
|---|---|---|---|---|
| Ảnh hero | Hero trang chủ | Hình tạm thời đã được duyệt | Lựa chọn hình ảnh cuối cùng | Chờ tài nguyên |
| Đích đến đặt lịch hẹn | CTA chính | Cách xử lý tạm thời đã thống nhất | Địa chỉ đặt lịch đã được xác nhận | Bị chặn |
| Tóm tắt liệu trình | Thẻ thứ hai | Nội dung chữ cuối cùng đã được duyệt | Không có | Đã thay thế và đã xác minh |

Tài liệu tạm thời phải được giữ trong sổ cho đến khi được thay thế, ngay cả khi trang trông như đã hoàn thiện.

Để tìm những thứ còn sót lại, hãy tìm kiếm trong các tệp nguồn liên quan những câu chữ placeholder đã biết, đồng thời xem qua trang đã hiển thị (rendered). Một từ khóa tìm kiếm sẽ không tìm ra mọi placeholder.

## 8. Giao cho Claude một nhiệm vụ nội dung có giới hạn rõ ràng

```text
Complete the homepage copy, image and CTA pass within the
approved page structure.

Before editing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect the homepage and its content sources.
- Identify the approved copy, assets and CTA destinations.
- Check the temporary content register.

During implementation:
- Restore exact approved wording where implementation differs.
- Use UK English for any authorised new editorial text.
- Report suspected errors in approved copy separately.
- Replace temporary images only with selected approved assets.
- Preserve image proportions and check relevant focal points.
- Apply appropriate alternative text.
- Connect CTAs to confirmed destinations.
- Preserve the approved layout and unrelated work.

Do not invent claims, rewrite approved content, select
unapproved assets or add integrations.

After implementation:
- Compare rendered copy with the approved source.
- Check image loading and cropping.
- Test CTA destinations without submitting forms,
  making bookings or sending messages.
- Run applicable documented project checks.
- Update the temporary content register.
- Report changes, evidence and remaining limitations.

Do not commit, push or deploy.

Scope and references:
[Insert the selected sections and exact approved references.]
```

Hãy xem xét mọi lỗi nghi ngờ trong nguồn đã được duyệt trước khi cho phép sửa chúng, trừ khi quy định của dự án đã cho phép những thay đổi biên tập đó.

## 9. Rà soát kết quả hiển thị

Kiểm tra nội dung trong trình duyệt cũng như trong các tệp nguồn, vì trình duyệt cho thấy những gì khách truy cập thực sự nhìn thấy.

Hãy tìm:

- Văn bản bị thiếu hoặc bị lặp.
- Ngắt dòng bất thường.
- Tiêu đề hoặc nhãn nút bị cắt cụt.
- Ký tự sai, chẳng hạn dấu nháy đơn bị lỗi.
- Hình ảnh không tải được.
- Cách cắt làm che mất chi tiết quan trọng.
- Lời kêu gọi hành động dẫn đến nơi không mong đợi.
- Nội dung tạm thời còn sót lại.

Nội dung chữ đã được duyệt dài hơn có thể làm lộ ra các vấn đề bố cục. Hãy ghi lại chúng cho bước tinh chỉnh responsive trong Bài 5.3, nhưng hãy sửa ngay bất cứ thứ gì đang khiến trang không dùng được.

## 10. Bài tập thực hành

**Nhiệm vụ: Hoàn thành lượt hoàn thiện nội dung cho trang chủ đã được duyệt.**

1. Tạo bản đồ nội dung.
2. So sánh câu chữ hiển thị với nguồn đã được duyệt.
3. Ghi lại riêng các lỗi biên tập nghi ngờ và các tuyên bố có thể có.
4. Thay thế các tài nguyên tạm thời hiện đã có sẵn.
5. Kiểm tra văn bản thay thế và cách cắt hình ảnh.
6. Thử từng lời kêu gọi hành động đã triển khai.
7. Cập nhật sổ ghi nội dung tạm thời.
8. Ghi lại kết quả xác minh và các phụ thuộc chưa được giải quyết.

Đừng bịa ra phát hiện chỉ để đủ số lượng.

## 11. Sản phẩm cần nộp

Nộp:

- Bản đồ nội dung và các phiên bản nguồn đã dùng.
- Bản tóm tắt các tệp đã thay đổi.
- Kết quả so sánh nội dung chữ.
- Các đề xuất sửa biên tập và các tuyên bố đã đánh dấu, kèm trạng thái quyết định.
- Kết quả kiểm tra hình ảnh và văn bản thay thế.
- Nhãn, đích đến và kết quả thử nghiệm của các lời kêu gọi hành động.
- Sổ ghi nội dung tạm thời đã cập nhật.
- Ảnh chụp màn hình các phần đã được rà soát.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Nội dung chữ của website khớp với nguồn đã được duyệt.
- Các lỗi nghi ngờ trong nguồn và các tuyên bố có thể có đã được ghi lại và được xử lý bởi đúng người.
- Các hình ảnh đã được duyệt hiện có đã được đặt đúng chỗ và đã được kiểm tra.
- Văn bản thay thế phản ánh đúng mục đích của từng hình ảnh.
- Đích đến của các lời kêu gọi hành động đã được kiểm tra trong phạm vi được cho phép.
- Tài liệu tạm thời và các mục bị chặn vẫn được thể hiện rõ.
- Trang chủ đã sẵn sàng cho bước tinh chỉnh responsive.

## 13. Kiểm tra kiến thức

1. Một lỗi nội dung chữ trong bản triển khai khác với một lỗi trong nguồn đã được duyệt như thế nào?
2. Vì sao cần kiểm tra cách cắt hình ảnh ở các độ rộng khác nhau?
3. Khi nào văn bản thay thế rỗng là phù hợp?
4. Vì sao chỉ kiểm tra địa chỉ của một lời kêu gọi hành động trong code là chưa đủ?
5. Điều gì nên xảy ra khi một hình ảnh hoặc đích đến cuối cùng vẫn chưa có sẵn?
