# Bài 3.1: Làm theo thiết kế, hướng dẫn phong cách và nội dung đã duyệt

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Xác định các tài liệu tham chiếu về thiết kế, phong cách và nội dung đã được duyệt cho dự án.
- Giải thích mỗi tài liệu tham chiếu quyết định điều gì, và để ngỏ điều gì.
- Biến cảm nhận về một thiết kế thành các yêu cầu mà người khác có thể kiểm tra.
- Ghi lại các mâu thuẫn và trạng thái còn thiếu mà không thiết kế lại website.
- Chuẩn bị một bộ tham chiếu gốc (reference baseline) để Claude có thể làm việc dựa trên đó.

**Điều kiện tiên quyết:** Hoàn thành Ngày 2 và đã ghi lại quyết định duyệt của ngày đó.

**Tài liệu cần chuẩn bị:** Các khung thiết kế được cung cấp, hướng dẫn phong cách, nội dung đã duyệt, IA và mọi đặc tả tương tác.

## 1. Xác định mỗi nguồn quyết định điều gì

Ngày 2 đã tạo ra kế hoạch cho website. Ngày 3 chuẩn bị các hướng dẫn để xây dựng nó. Trước khi viết những hướng dẫn đó, bạn cần biết những nguồn đã duyệt nào mô tả website hoàn chỉnh, và mỗi nguồn chịu trách nhiệm về điều gì.

| Nguồn | Thường quyết định điều gì |
|---|---|
| **IA và hành trình của khách truy cập** | Các trang, điều hướng và cách các trang liên kết với nhau |
| **Thiết kế** | Bố cục, cách nhóm nội dung và cách trình bày trực quan |
| **Hướng dẫn phong cách** | Các giá trị trực quan lặp lại, như màu sắc và cỡ chữ, cùng các quy tắc cho component dùng chung |
| **Nội dung đã duyệt** | Câu chữ chính xác và thông tin thực tế |
| **Đặc tả tương tác** | Các điều khiển, trạng thái của chúng và cách chúng nên hoạt động |

Một **khung thiết kế** (design frame) là một màn hình hoặc một trạng thái được vẽ trong công cụ thiết kế, chẳng hạn trang chủ ở độ rộng màn hình máy tính. Một **hướng dẫn phong cách** (style guide) là tài liệu ghi lại các quy tắc trực quan được lặp lại trên toàn website.

Dự án thực tế có thể sắp xếp các nguồn này theo cách khác. Hãy ghi lại mỗi nguồn được cung cấp bao quát những gì, thay vì giả định rằng mọi yêu cầu đều nằm trong một tệp thiết kế duy nhất.

Chỉ một ảnh chụp màn hình có thể không cho bạn biết một liên kết dẫn đến đâu, một điều khiển hoạt động thế nào với bàn phím, hay một thông báo lỗi nói gì. Những quyết định đó phải đến từ nơi khác, hoặc được ghi lại là còn thiếu.

## 2. Lập sổ đăng ký tham chiếu

Một **sổ đăng ký tham chiếu** (reference register) liệt kê mọi nguồn bạn sẽ dựa vào, để bạn và người hướng dẫn có thể xác nhận rằng bạn đang làm việc với đúng phiên bản.

| Nguồn | Vị trí chính xác | Phiên bản hoặc ngày | Bằng chứng phê duyệt | Áp dụng cho | Truy cập được? |
|---|---|---|---|---|---|
| | | | | | |

Một tên tệp có chứa chữ “final” tự nó không phải là bằng chứng phê duyệt. Hãy tìm một quyết định đã được ghi lại, chẳng hạn sự chấp nhận của người hướng dẫn từ Bài 2.4 hoặc ghi chú của người phê duyệt thiết kế.

Nếu bạn không mở được một liên kết được cung cấp, hãy ghi nguồn đó là còn thiếu. Đừng yêu cầu Claude tái tạo thiết kế đã duyệt từ một đoạn mô tả.

Hãy dùng phiên bản đã duyệt gần nhất có áp dụng. Nếu bạn biết nó thay thế phiên bản cũ nào, hãy ghi lại cả điều đó.

## 3. Biến cảm nhận thành yêu cầu

Một mô tả như “trang trông thoáng đãng” là một cảm nhận. Không ai có thể kiểm tra liệu mã có đáp ứng nó hay không. Hãy thay cảm nhận bằng những yêu cầu mà người khác có thể đối chiếu với tài liệu tham chiếu.

| Cảm nhận | Yêu cầu cần rút ra |
|---|---|
| Trang trông thoáng đãng | Độ rộng nội dung thực tế và khoảng cách giữa các phần |
| Tiêu đề mang phong cách tạp chí | Phông chữ, độ đậm, cỡ chữ và thứ bậc tiêu đề đã duyệt |
| Các thẻ trông nhất quán | Kích thước, khoảng đệm, nền và hành vi liên kết dùng chung |
| Bản di động nên đơn giản hơn | Cách xếp chồng, thứ tự và điều hướng được đặc tả cho màn hình hẹp |

Hãy dùng các giá trị thực tế khi nguồn có cung cấp. Nếu một nguồn không đưa ra giá trị, hãy đánh dấu đó là khoảng trống. Đừng bịa ra một con số chính xác chỉ để yêu cầu trông đầy đủ.

Đừng tự suy ra toàn bộ bố cục đáp ứng (responsive) từ một khung thiết kế máy tính duy nhất. Nếu cách sắp xếp cho màn hình hẹp không được cung cấp, hãy ghi đó là tài liệu tham chiếu còn thiếu.

## 4. Giữ nguyên nội dung chữ và tài nguyên đã duyệt

**Nội dung chữ** (copy) là phần văn bản trên website. Việc xây dựng website không được âm thầm viết lại tiêu đề, tên liệu trình, nhãn hay các tuyên bố.

Nếu nội dung chữ đã duyệt có vẻ chứa lỗi, hãy ghi lại đề xuất sửa và làm theo quy tắc của dự án về việc ai có quyền duyệt thay đổi câu chữ. Bài 5.2 sẽ nói chi tiết hơn về điều này.

Với hình ảnh, hãy xác nhận tệp được chọn, vị trí nó xuất hiện, cách nó được cắt và phần nào của bức ảnh phải luôn hiển thị. Một hình ảnh trông tương tự không phải là bản thay thế đã được duyệt.

Hãy ghi lại mọi nội dung giữ chỗ (placeholder) mà dự án cho phép, và mọi tài liệu còn thiếu, để không ai nhầm chúng là nội dung cuối cùng.

## 5. Giải quyết mâu thuẫn ngay tại nơi chúng xảy ra

Các nguồn đôi khi không thống nhất. Ví dụ, một thiết kế có thể hiển thị nhãn điều hướng khác với nhãn trong IA đã duyệt.

Khi điều này xảy ra:

1. Ghi lại cả hai nguồn và điểm chúng không thống nhất.
2. Hỏi yêu cầu nào áp dụng cho trường hợp này.
3. Tiếp tục với những phần việc không bị mâu thuẫn ảnh hưởng.

Đừng áp dụng một quy tắc cố định như “thiết kế luôn đúng” hay “văn bản luôn đúng”. Câu trả lời đúng phụ thuộc vào việc mỗi nguồn chịu trách nhiệm cho quyết định nào.

Những lựa chọn triển khai thông thường có thể theo các quy ước đã có, miễn là chúng không thay đổi một quyết định đã duyệt. Không phải chi tiết nhỏ nào cũng cần người hướng dẫn phán quyết.

## 6. Yêu cầu Claude rút ra các yêu cầu

Hãy yêu cầu Claude đọc các tài liệu tham chiếu và liệt kê những gì chúng yêu cầu. Giữ yêu cầu này tách biệt với mọi công việc xây dựng.

```text
Inspect the approved references for the selected page or component.

Identify:
- The design and source versions that apply.
- Structure, content and navigation requirements.
- Shared visual values and component rules.
- Required responsive and interaction states.
- Missing assets, inaccessible sources or conflicting requirements.

Cite the specific source for each finding.
Separate values the sources supply from assumptions.
Do not redesign, rewrite content or implement anything.

Scope and references:
[Insert the actual component and source locations.]
```

Hãy tự mình đối chiếu các yêu cầu được rút ra với tài liệu tham chiếu trước khi chúng trở thành hướng dẫn xây dựng. Claude có thể đọc sai một giá trị hoặc lấp một khoảng trống bằng phỏng đoán.

## 7. Bài tập thực hành

**Nhiệm vụ: Chuẩn bị bộ tham chiếu gốc cho một component được chọn.**

1. Xác định các nguồn thiết kế, phong cách, nội dung và tương tác của nó.
2. Ghi thông tin phê duyệt và phiên bản vào sổ đăng ký tham chiếu.
3. Rút ra các yêu cầu mà người khác có thể kiểm tra.
4. Kiểm tra những trạng thái nào cho máy tính và màn hình hẹp đã được cung cấp.
5. Ghi lại các mâu thuẫn và phụ thuộc.
6. Yêu cầu Claude rút ra các yêu cầu, rồi so sánh danh sách của nó với tài liệu tham chiếu.

Nếu thiếu một nguồn bắt buộc, hãy ghi lại những gì chưa thể đặc tả. Đừng tự lấp khoảng trống đó.

## 8. Sản phẩm cần nộp

Nộp:

- Sổ đăng ký tham chiếu.
- Các yêu cầu đã rút ra, mỗi yêu cầu kèm vị trí nguồn của nó.
- Phần rút ra của Claude và các chỉnh sửa của bạn, nếu có.
- Các mâu thuẫn và quyết định chưa được giải quyết.

## 9. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Bộ tham chiếu gốc có thể được xác định theo vị trí và phiên bản.
- Mỗi yêu cầu đều có thể truy về một nguồn.
- Các giả định và tài liệu tham chiếu còn thiếu vẫn được thể hiện rõ.

## 10. Kiểm tra kiến thức

1. IA có thể xác lập điều gì mà một ảnh chụp màn hình có thể không thể hiện?
2. Vì sao chữ “final” trong tên tệp không đủ làm bằng chứng phê duyệt?
3. Bạn nên xử lý thế nào khi nghi ngờ có lỗi trong nội dung chữ đã duyệt?
4. Vì sao không nên suy ra hành vi trên di động từ một khung thiết kế máy tính?
5. Điều gì nên xảy ra khi hai nguồn đã duyệt mâu thuẫn với nhau?
