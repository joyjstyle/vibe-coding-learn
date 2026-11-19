# Bài 2.3: Lập sơ đồ trang, hành trình người dùng và các phần của trang

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Giải thích sự khác nhau giữa sơ đồ trang, điều hướng, hành trình người truy cập và dàn ý trang.
- Gắn các nhu cầu kinh doanh đã được phê duyệt với các trang được đề xuất.
- Xác định địa chỉ trang và mối quan hệ giữa các trang để duyệt.
- Mô tả từng phần của trang theo những gì phần đó mang lại cho người truy cập.
- Xác định nội dung và quyết định còn thiếu trước khi bắt đầu thiết kế hoặc xây dựng.

**Điều kiện tiên quyết:** Hoàn thành Bài 2.1 và 2.2.

**Tài liệu cần chuẩn bị:** Bản mô tả đã được duyệt, các phát hiện từ nghiên cứu, phạm vi dự án và mọi cấu trúc trang hoặc luồng người truy cập được cung cấp.

## 1. Hiểu các tài liệu lập kế hoạch

Bốn tài liệu này cùng nhau tạo nên **kiến trúc thông tin (IA)** của website: kế hoạch về các trang, tên gọi của chúng và cách chúng kết nối với nhau. Các bài học sau gọi nó là “IA đã được phê duyệt”.

| Tài liệu | Câu hỏi mà tài liệu trả lời |
|---|---|
| **Sơ đồ trang** (sitemap) | Có những trang nào, và chúng liên quan với nhau ra sao? |
| **Đặc tả điều hướng** | Những liên kết nào xuất hiện trong mỗi menu hoặc khu vực liên kết? |
| **Hành trình người truy cập** | Một người đi qua những bước nào để đạt được mục tiêu? |
| **Dàn ý trang** | Nội dung nào xuất hiện trên một trang, và theo thứ tự nào? |

Trong một số dự án, từ “IA” chủ yếu dùng để chỉ sơ đồ trang. Hãy dùng thuật ngữ riêng của dự án.

Các tài liệu này liên kết với nhau, nhưng không thể thay thế cho nhau. Một liên kết ở chân trang không phải là một trang riêng. Một phần của trang không tự động cần có địa chỉ riêng. Một hành trình có thể chỉ dùng một phần của sơ đồ trang.

## 2. Bắt đầu từ phạm vi đã được phê duyệt

Nếu đã có một IA được phê duyệt, hãy khảo sát và ghi lại nó. Không tạo ra một cấu trúc cạnh tranh trong bài tập này.

Nếu bạn được phép đề xuất một cấu trúc, hãy bắt đầu từ các nhu cầu người truy cập trong bản mô tả và xác định những trang mà các nhu cầu đó đòi hỏi.

Mỗi trang được đề xuất nên có:

- Một mục đích rõ ràng.
- Một lý do vì sao nó phải là một trang riêng.
- Nội dung dự kiến của trang.
- Một **điểm vào** (entry point), tức liên kết mà người truy cập dùng để đến trang.
- Một bước tiếp theo hữu ích, khi phù hợp.

Đừng thêm trang chỉ vì hầu hết các website dường như đều có chúng. Mỗi trang cần có một yêu cầu thực sự đứng sau.

## 3. Chuẩn bị danh mục trang

Một **danh mục trang** (page inventory) liệt kê mọi trang cùng các thông tin chính của chúng.

| Mã trang | Tên | Mục đích | Route | Trang cha hoặc mối quan hệ | Nội dung bắt buộc | Trạng thái |
|---|---|---|---|---|---|---|
| | | | | | | |

Một **route** là đường dẫn địa chỉ của một trang, chẳng hạn `/treatments`.

Chọn tên route có ý nghĩa và nhất quán với phần còn lại của dự án. Nếu đã có các route được phê duyệt, đừng đổi tên chúng khi chưa xác định mọi liên kết bị ảnh hưởng và chưa có quyết định.

Ở những nơi route chưa được quyết định, hãy gắn nhãn **Đề xuất**. Việc viết nó trong một bảng gọn gàng không được khiến nó trông như đã được xác nhận.

## 4. Đặc tả điều hướng riêng

Ghi lại những nội dung đã được phê duyệt hoặc được đề xuất:

- Nhãn các liên kết ở đầu trang và thứ tự của chúng.
- Cách menu trên điện thoại hoạt động.
- Các nhóm liên kết ở chân trang và đích đến của chúng.
- Các liên kết trong thân trang, và liên kết đến nội dung liên quan.
- Logo dẫn đến đâu.

Một số trang được truy cập qua một trang danh sách hoặc một liên kết trong văn bản thay vì menu chính. Điều đó là bình thường.

Đừng đưa mọi trang lên đầu trang để né việc quyết định các trang liên quan với nhau thế nào. Một đầu trang quá đông đúc khiến mọi trang đều khó tìm hơn.

## 5. Vẽ hành trình người truy cập

Chọn những hành trình mà bản mô tả hỗ trợ. Với mỗi hành trình, ghi lại mục tiêu của người truy cập, điểm họ bắt đầu, các bước họ thực hiện và nơi họ nên đến cuối cùng.

| Bước | Trang hoặc trạng thái | Hành động của người truy cập | Kết quả mong đợi |
|---|---|---|---|
| | | | |

Đưa vào những thông tin người truy cập cần trước khi đưa ra quyết định. Đừng bỏ đi phần giải thích cần thiết chỉ để giảm số lần nhấp chuột.

Nếu bước cuối dùng một dịch vụ bên ngoài, chẳng hạn hệ thống đặt lịch, hãy ghi lại đích đến và phần phụ thuộc đó. Việc lập kế hoạch một hành trình không cho phép bạn thực hiện một lượt đặt lịch hay gửi thông tin thật.

## 6. Lập dàn ý các phần của trang

Với mỗi trang, liệt kê các phần theo thứ tự:

| Vị trí | Phần | Câu hỏi của người truy cập mà phần này trả lời | Nội dung và tài nguyên bắt buộc | Liên kết hoặc hành động | Phụ thuộc |
|---|---|---|---|---|---|
| | | | | | |

Mô tả mỗi phần theo câu hỏi của người truy cập giúp trang tập trung vào những gì người truy cập cần, thay vì vào những gì trông quen thuộc.

Sử dụng nội dung và các ràng buộc thiết kế được cung cấp. Nếu một thiết kế đã được phê duyệt, hãy giữ nguyên cấu trúc của nó và ghi lại mọi thiếu sót thay vì sắp xếp lại.

Ghi chú những khuôn mẫu lặp lại giữa các trang, chẳng hạn một thẻ được dùng trên nhiều trang danh sách. Sau này chúng có thể trở thành các component tái sử dụng, như Bài 4.3 giải thích. Đừng quyết định kiến trúc kỹ thuật chỉ vì các thứ trông giống nhau.

## 7. Kiểm tra các mối liên kết

Lần theo một nhu cầu của người truy cập qua các tài liệu:

1. Trang của nhu cầu đó trong danh mục trang.
2. Liên kết mà người truy cập dùng để đến trang.
3. Thông tin mà trang phải cung cấp.
4. Bước tiếp theo mà trang đưa ra.
5. Mọi nội dung hoặc tích hợp mà trang phụ thuộc vào.

Tìm những trường hợp hai trang phục vụ cùng một mục đích, liên kết có đích đến không rõ ràng và trang không có cách nào để truy cập.

## 8. Nhờ Claude duyệt cấu trúc

```text
Review the supplied sitemap, navigation, visitor journeys and page outlines
against the business brief and authorised scope.

Identify unsupported pages, missing required content, duplicate purposes,
unclear labels, unreachable destinations and unresolved decisions.
Trace one visitor need through its page, entry point and next action.

Separate defects in the proposal from optional suggestions.
Do not invent approval, add business offerings or implement routes.

References:
[Insert exact brief, structure and content locations.]
```

Tự kiểm tra từng phát hiện trước khi thay đổi kế hoạch.

## 9. Bài tập thực hành

**Nhiệm vụ: Chuẩn bị cấu trúc của website thực hành để duyệt.**

1. Xây dựng hoặc khảo sát danh mục trang, tùy theo phạm vi được cho phép.
2. Ghi lại từng khu vực điều hướng và các đích đến của nó.
3. Vẽ các hành trình người truy cập bắt buộc.
4. Lập dàn ý cho các trang được chọn.
5. Xác định các phần phụ thuộc và những điểm không nhất quán.
6. Duyệt các phát hiện của Claude và sửa những vấn đề hợp lệ.

## 10. Sản phẩm cần nộp

Nộp:

- Danh mục trang.
- Đặc tả điều hướng.
- Các bản đồ hành trình người truy cập.
- Các dàn ý trang.
- Các câu hỏi mở.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các tài liệu lập kế hoạch thống nhất với nhau.
- Mọi trang được đề xuất đều có mục đích có căn cứ.
- Các quyết định chưa được giải quyết được gắn nhãn rõ ràng để duyệt.

## 12. Kiểm tra kiến thức

1. Sơ đồ trang khác điều hướng như thế nào?
2. Một trang có thể tồn tại mà không xuất hiện trong menu đầu trang không?
3. Điều gì khiến một phần của trang trở nên hữu ích với người truy cập?
4. Vì sao các route được đề xuất nên được gắn nhãn là đề xuất?
5. Bạn nên kiểm tra điều gì ở cuối một hành trình người truy cập?
