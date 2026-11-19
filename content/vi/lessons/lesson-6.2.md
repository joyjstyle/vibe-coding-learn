# Bài 6.2: Xây dựng các trang liên quan mà không lặp lại công việc

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Xác định những trang đã được duyệt nào có chung một cấu trúc lặp lại được.
- Tách riêng phần trình bày dùng chung với nội dung chỉ thuộc về một trang.
- Mở rộng một mẫu trang hiện có mà không thêm độ phức tạp không cần thiết.
- Kiểm tra rằng mỗi trang hiển thị đúng thông tin của riêng nó.
- Kiểm tra ảnh hưởng của các thay đổi lên các trang liên quan và những nơi đang dùng.

**Điều kiện tiên quyết:** Hoàn thành Bài 6.1 và đã kiểm tra trang nội bộ đầu tiên của bài đó, kèm mọi điều kiện duyệt đã được ghi lại.

**Tài liệu cần chuẩn bị:** Kiến trúc thông tin (IA) đã được duyệt, thiết kế cho các trang liên quan, nội dung và tài nguyên (asset) riêng của từng trang, bản triển khai hiện có, tài liệu kiến trúc và kế hoạch công việc.

## 1. Xây dựng từ một ví dụ đã được kiểm tra

Trang nội bộ đầu tiên cho bạn một ví dụ hoạt động được. Trước khi tái sử dụng nó làm mẫu, hãy xác nhận những phần nào thực sự có thể tái sử dụng. Kiểm tra:

- Cấu trúc của nó có khớp với các trang liên quan hay không.
- Nội dung của nó được viết trực tiếp vào trang hay được cung cấp riêng.
- Có phát hiện tồn đọng nào của nó sẽ bị mang sang hay không.
- Những thành phần nào thuộc về layout dùng chung của trang web.
- Những thành phần nào chỉ thuộc về trang đó.

**Sao chép một mẫu vẫn còn lỗi cũng sẽ sao chép luôn lỗi đó, và nhân lên khối lượng công việc sửa chữa.**

Hãy sửa các lỗi dùng chung trước khi mở rộng mẫu. Những trang không phụ thuộc vào lỗi đó có thể tiến hành.

## 2. So sánh các trang đã được duyệt

Các trang có tên giống nhau không nhất thiết có yêu cầu giống hệt nhau. Hãy lập một bảng so sánh từ các tham chiếu thực tế.

| Thành phần | Yêu cầu dùng chung | Điểm khác biệt riêng của trang có thể có |
|---|---|---|
| Phần giới thiệu trang | Kiểu chữ và vùng chứa nhất quán | Tiêu đề, tóm tắt và hình ảnh |
| Nội dung chính | Cách trình bày đã được duyệt | Những phần nào xuất hiện, và thứ tự của chúng |
| Thông tin bổ trợ | Component dùng chung, khi phù hợp | Có xuất hiện hay không, và câu chữ của nó |
| Lời kêu gọi hành động | Cách xử lý hình ảnh đã được duyệt | Nhãn và đích đến |
| Liên kết liên quan | Cách trình bày nhất quán | Những trang nào được liên kết |

Hãy quyết định mỗi phần là:

- Một cấu trúc thực sự dùng chung.
- Một component dùng chung được dùng bên trong các cấu trúc khác nhau.
- Một yêu cầu chỉ thuộc về một trang.

Đừng ép nội dung riêng biệt vào một template không phù hợp chỉ để có ít tệp hơn.

## 3. Tách nội dung khỏi phần trình bày

Một mẫu trang lặp lại thường có ba lớp:

| Lớp | Trách nhiệm |
|---|---|
| **Trình bày dùng chung** | Bố cục, kiểu dáng và tương tác lặp lại |
| **Nội dung trang** | Tiêu đề, mô tả, hình ảnh và đích đến |
| **Route** | Đưa đúng trang ra tại địa chỉ đã được duyệt của nó |

Hãy tuân theo cách tiếp cận hiện có của dự án đối với các lớp này. Ví dụ, một dự án có thể lưu nội dung trang trong:

- Các tệp trang riêng lẻ.
- **Đối tượng dữ liệu có kiểu** (typed data object), tức là các danh sách nội dung được viết bằng TypeScript với một kiểu (type) mô tả các trường của chúng.
- **Tệp Markdown**, các tệp văn bản thuần với các ký hiệu định dạng đơn giản.
- Một hệ thống quản lý nội dung (CMS) hiện có.

Đừng chuyển nội dung sang một hệ thống khác trong nhiệm vụ này trừ khi kiến trúc đã được duyệt yêu cầu.

### Ví dụ minh họa

Một component giới thiệu dùng chung nhỏ có thể nhận nội dung riêng của từng trang thông qua props:

```tsx
type PageIntroProps = {
  title: string;
  description: string;
};

export function PageIntro({
  title,
  description,
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
```

Cách này dùng chung phần trình bày mà không ép mọi trang vào một template toàn trang giống hệt nhau. Nó dùng tiêu đề cấp 1 vì phần giới thiệu đặt tên cho cả trang.

Hãy tuân theo các quy ước component thực tế của dự án.

## 4. Xác định thông tin bắt buộc và không bắt buộc

Một số trang liên quan có thể có thông tin mà các trang khác không có. Với mỗi trường hoặc phần, hãy quyết định nó là:

- Bắt buộc trên mọi trang.
- Không bắt buộc theo mẫu đã được duyệt.
- Chỉ có ở một trang.

| Tình huống | Cách xử lý mong đợi |
|---|---|
| Có sẵn nội dung bắt buộc | Hiển thị nó ở vị trí đã được duyệt |
| Thiếu nội dung bắt buộc | Ghi lại phụ thuộc. Đừng bịa ra nội dung |
| Không có một phần không bắt buộc | Bỏ nó đi một cách gọn gàng, đúng như mẫu đã được duyệt quy định |
| Cần một phần riêng biệt | Xây dựng nó mà không thay đổi các trang không liên quan |

Đừng hiển thị tiêu đề trống, ô trống hoặc các điều khiển không làm gì cả chỉ vì template chờ đợi có nội dung.

Đừng lấp chỗ trống bằng các tuyên bố giữ chỗ hoặc văn bản sao chép từ trang khác.

## 5. Chọn một nhóm nhỏ

Hãy xây dựng các trang liên quan theo từng nhóm dễ quản lý. Một nhóm phù hợp gồm những trang:

- Có chung một mẫu đã được kiểm tra.
- Có nội dung và tài nguyên đã được duyệt.
- Có route và đích đến đã được xác nhận.
- Có thể được duyệt cùng nhau mà không che lấp sự khác biệt giữa chúng.

Hãy bắt đầu chỉ với một trang nữa. Nội dung thực tế thường làm lộ ra những giả định mà trang đầu tiên đã che giấu. Ví dụ, một tiêu đề đã được duyệt dài hơn hoặc một phần không bắt buộc có thể làm vỡ một bố cục trước đó trông ổn.

Đừng tạo tất cả các trang còn lại trước khi bạn kiểm tra trang thứ hai.

## 6. Nhờ Claude mở rộng mẫu

```text
Implement the selected related page using the verified
internal-page pattern and approved references.

Before editing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect the first implemented page and its outstanding findings.
- Compare the selected page's requirements with that pattern.
- Identify shared and page-specific elements.

During implementation:
- Follow the existing routing and content architecture.
- Reuse suitable components and styles.
- Preserve each page's approved wording, assets and destinations.
- Implement approved differences explicitly.
- Omit absent optional sections cleanly.
- Report missing required content rather than inventing it.
- Avoid speculative template options or unrelated refactoring.

After implementation:
- Verify the selected page independently.
- Check that content from another page has not carried over.
- Test direct access, refresh and approved entry links.
- Recheck existing pages affected by shared changes.
- Run applicable documented project checks.
- Report results and remaining limitations.

Do not add dependencies, migrate content systems,
commit, push or deploy.

Selected task:
[Insert the page and bounded task.]

Verified pattern:
[Insert the implementation reference.]

Approved sources:
[Insert exact page-specific references.]
```

Nếu trang mới cho thấy một hạn chế thực sự trong mẫu dùng chung, hãy đánh giá thay đổi cần thiết trước khi áp dụng nó cho các trang khác.

## 7. Kiểm tra nội dung bị sao chép và chi tiết không khớp

Lỗi sao chép có thể ẩn bên trong một trang trông hoàn toàn nhất quán. Hãy kiểm tra từng trang riêng.

| Mục | Cần kiểm tra |
|---|---|
| Tiêu đề | Gọi đúng tên trang hoặc chủ đề |
| Nội dung chính | Khớp với nguồn đã được duyệt của trang đó |
| Hình ảnh | Thuộc về trang đó |
| Văn bản thay thế | Mô tả đúng hình ảnh thực tế trên trang đó |
| Lời kêu gọi hành động | Dùng đúng nhãn và đích đến của trang đó |
| Liên kết liên quan | Trỏ đến các trang đã được duyệt có liên quan |
| Thông tin liên hệ hoặc địa điểm | Khớp với đúng địa điểm kinh doanh |
| Metadata của trang, nếu nằm trong phạm vi | Mô tả trang đó, không phải trang khác |

**Metadata** (siêu dữ liệu) là thông tin về một trang nằm ở phía sau hậu trường, chẳng hạn tiêu đề hiển thị trên tab trình duyệt. Bài 9.3 đề cập chi tiết về nó.

Một bố cục đúng không bù đắp được việc thông tin của trang khác xuất hiện bên trong nó.

Để tìm những phần còn sót lại, hãy tìm kiếm trong các tệp liên quan những đoạn văn bản đặc trưng của trang đầu tiên, rồi so sánh các trang đã hiển thị. Hãy coi kết quả tìm kiếm là những chỗ cần xem, không phải bằng chứng có lỗi.

## 8. Kiểm tra sự đa dạng của nội dung

Hãy thử mẫu dùng chung với các biến thể thực tế trong nội dung được cung cấp, chẳng hạn:

- Tiêu đề ngắn và dài.
- Đoạn văn có độ dài khác nhau.
- Trang có và không có một phần không bắt buộc.
- Hình ảnh có điểm nhấn khác nhau.
- Nhãn lời kêu gọi hành động dài hơn.
- Số lượng liên kết liên quan khác nhau.

Hãy dùng nội dung đã được duyệt thực tế.

Đừng rút ngắn nội dung chữ đã được duyệt chỉ để vừa với một component dùng chung. Nếu mẫu thất bại với nội dung hợp lệ, hãy sửa component hoặc ghi lại quyết định thiết kế cần có.

## 9. Kiểm tra lại các trang mà một thay đổi ảnh hưởng đến

Một thay đổi dùng chung có thể cải thiện một trang nhưng làm hỏng trang khác. Việc kiểm tra rằng công việc trước đó vẫn hoạt động sau một thay đổi được gọi là **kiểm tra hồi quy** (regression checking).

Sau khi thay đổi một mẫu dùng chung:

1. Tìm những nơi nó thực sự được dùng.
2. Lặp lại các bước kiểm tra mà thay đổi đó có thể ảnh hưởng.
3. So sánh các bố cục desktop và mobile tiêu biểu.
4. Xác nhận rằng nội dung riêng của từng trang vẫn đúng.
5. Ghi lại kết quả.

Hãy chọn các bước kiểm tra hồi quy tương ứng với thay đổi. Thay đổi bố cục phần giới thiệu có nghĩa là kiểm tra các trang dùng nó. Không có nghĩa là kiểm tra lại một biểu mẫu không liên quan.

## 10. Bài tập thực hành

**Nhiệm vụ: Mở rộng mẫu đã được kiểm tra sang một trang nội bộ đã được duyệt khác.**

1. So sánh yêu cầu của hai trang.
2. Xác định các thành phần dùng chung và riêng biệt.
3. Xác nhận các điều kiện tiên quyết của trang thứ hai.
4. Xây dựng trang đó thông qua một nhiệm vụ có giới hạn rõ ràng.
5. Kiểm tra nội dung bị sao chép và đích đến sai.
6. Kiểm tra sự đa dạng của nội dung ở các độ rộng bắt buộc.
7. Kiểm tra lại các trang hiện có mà thay đổi ảnh hưởng đến.
8. Ghi lại liệu mẫu đã sẵn sàng để tái sử dụng tiếp hay chưa.

Nếu không có trang thứ hai nào có chung cấu trúc, hãy giải thích lý do. Tái sử dụng các component phù hợp mà không bịa ra một template toàn trang.

## 11. Sản phẩm cần nộp

Nộp:

- Bảng so sánh các trang.
- Nhiệm vụ đã chọn và prompt triển khai.
- Bản tóm tắt các thay đổi dùng chung và riêng của từng trang.
- Các route đã triển khai.
- Kết quả kiểm tra nội dung và đích đến cho từng trang.
- Ảnh chụp màn hình cho thấy các biến thể nội dung liên quan.
- Kết quả kiểm tra hồi quy và kiểm tra của dự án.
- Các phát hiện và phụ thuộc còn tồn đọng.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Việc tái sử dụng tuân theo các yêu cầu trang đã được duyệt.
- Phần trình bày dùng chung và nội dung riêng của trang được xử lý nhất quán.
- Nội dung bắt buộc có mặt hoặc được ghi lại là còn thiếu.
- Các phần không bắt buộc không để lại thành phần giao diện trống.
- Mỗi trang hiển thị đúng thông tin của riêng nó.
- Mẫu hoạt động với các biến thể nội dung đã được duyệt.
- Các trang hiện có bị ảnh hưởng đã được kiểm tra lại.
- Các vấn đề còn lại đã sẵn sàng để người hướng dẫn duyệt.

## 13. Kiểm tra kiến thức

1. Vì sao trang đầu tiên cần được kiểm tra trước khi tái sử dụng mẫu của nó?
2. Khi nào tái sử dụng một component phù hợp hơn một template toàn trang?
3. Nội dung bắt buộc bị thiếu cần được xử lý khác với một phần không bắt buộc vắng mặt như thế nào?
4. Vì sao bạn nên kiểm tra trang thứ hai trước khi xây dựng một nhóm lớn?
5. Điều gì quyết định những trang hiện có nào cần kiểm tra hồi quy?
