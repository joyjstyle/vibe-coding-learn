# Bài 5.3: Tinh chỉnh trang chủ trên các kích thước màn hình

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Kiểm tra trang chủ ở các kích thước viewport bắt buộc.
- Nhận ra các vấn đề về bố cục, nội dung và tương tác trên màn hình hẹp hơn.
- Sửa các vấn đề responsive trong phạm vi thiết kế đã được duyệt.
- Kiểm tra các thay đổi dùng chung ở mọi nơi chúng được áp dụng.
- Ghi lại bằng chứng và mọi vấn đề responsive chưa được giải quyết.

**Điều kiện tiên quyết:** Hoàn thành Bài 5.2 và có trang chủ đang chạy trên máy (local).

**Tài liệu cần chuẩn bị:** Các tham chiếu desktop và mobile đã được duyệt, yêu cầu responsive, hướng dẫn phong cách (style guide), tiêu chí chấp nhận của trang chủ và các phát hiện còn tồn đọng.

## 1. Hiểu hành vi responsive

Một website **đáp ứng** (responsive) thích ứng với khoảng không gian có sẵn trong trình duyệt mà vẫn giữ được nội dung và khả năng sử dụng.

Việc thích ứng có thể bao gồm:

- Thay đổi số cột.
- Xếp chồng nội dung theo chiều dọc.
- Điều chỉnh khoảng cách và cỡ chữ.
- Chuyển sang menu mobile.
- Đặt lại vị trí hình ảnh.
- Cho phép nút và nhãn xuống dòng thứ hai.

**Tinh chỉnh responsive giữ nguyên nội dung, thứ bậc và hành trình người dùng đã được duyệt. Đây không phải là cơ hội để thiết kế lại website cho mobile.**

## 2. Đặt các độ rộng rà soát

Bắt đầu với các kích thước viewport mà dự án quy định. Bài 4.4 đã giải thích rằng viewport là phần của cửa sổ trình duyệt hiển thị trang.

Kích thước được đo bằng **pixel CSS**, đơn vị mà các trang web dùng để bố cục. Một pixel CSS không phải lúc nào cũng bằng một pixel vật lý trên màn hình, vì vậy một chiếc điện thoại có màn hình độ phân giải rất cao vẫn chỉ có viewport rộng vài trăm pixel CSS.

Nếu dự án không quy định độ rộng rà soát, hãy đề xuất một bộ độ rộng thực tế và ghi lại trước khi kiểm tra. Ví dụ:

| Độ rộng rà soát | Mục đích |
|---|---|
| 375 pixel CSS | Bố cục điện thoại hẹp |
| 768 pixel CSS | Bố cục trung gian |
| 1280 pixel CSS | Bố cục desktop |

Các độ rộng này chỉ mang tính minh họa. Chúng không phải là kích thước thiết bị bắt buộc, và cũng không mặc nhiên là những điểm mà bố cục nên thay đổi.

Hãy kéo cửa sổ trình duyệt thật chậm giữa các độ rộng đã chọn. Một bố cục có thể trông đúng ở các kích thước chụp màn hình nhưng vẫn bị vỡ ở đâu đó ở giữa.

### Viewport và breakpoint là hai khái niệm khác nhau

Một **viewport rà soát** là kích thước mà tại đó bạn kiểm tra trang.

Một **breakpoint** (điểm ngắt) là độ rộng mà tại đó code thay đổi bố cục, chẳng hạn chuyển từ ba cột sang một cột.

Trong CSS, breakpoint thường được viết dưới dạng **media query**. Một media query chỉ áp dụng một tập kiểu (style) khi một điều kiện là đúng, chẳng hạn “viewport rộng ít nhất 768 pixel CSS”.

Hãy dùng các breakpoint hiện có của dự án ở những nơi chúng hoạt động tốt. Chỉ thêm hoặc điều chỉnh breakpoint khi nội dung và hành vi đã được duyệt cho thấy điều đó là cần thiết.

## 3. Kiểm tra trước khi thay đổi kiểu

Bắt đầu bằng cách kiểm tra:

1. Trạng thái Git hiện tại.
2. Các kiểu responsive và media query hiện có.
3. Các vùng chứa (container) và giá trị khoảng cách dùng chung.
4. Quy tắc bố cục cho từng component.
5. Các tham chiếu responsive đã được duyệt.
6. Các phát hiện còn tồn đọng từ những bài học trước.

Hãy tìm ra nguyên nhân của từng vấn đề trước khi sửa.

Ví dụ, **tràn ngang** (horizontal overflow), khi nội dung rộng hơn màn hình và trang cuộn sang ngang, có thể đến từ:

- Một hình ảnh có độ rộng cố định.
- Một cột lưới (grid) không thể co lại.
- Một từ dài hoặc địa chỉ web không thể xuống dòng.
- Một thành phần trang trí quá khổ.
- Một vùng chứa rộng hơn viewport.

Ẩn phần tràn trên toàn trang có thể làm mất hiện tượng cuộn ngang nhưng đồng thời cắt mất nội dung, khiến khách truy cập không thể tiếp cận nó. Cách đó che đi triệu chứng mà không sửa nguyên nhân.

## 4. Rà soát trang theo một thứ tự nhất quán

Hãy nhìn toàn bộ trang trước khi xem chi tiết.

| Hạng mục | Cần kiểm tra |
|---|---|
| **Độ rộng trang** | Không có cuộn ngang ngoài ý muốn hoặc nội dung bị cắt |
| **Header và điều hướng** | Bố cục đúng, các điều khiển dùng được và liên kết hoạt động |
| **Cấu trúc phần** | Xếp chồng đúng như đã duyệt và thứ tự nội dung hợp lý |
| **Kiểu chữ** | Văn bản dễ đọc, xuống dòng hợp lý và thứ bậc rõ ràng |
| **Khoảng cách** | Khoảng trống giữa các phần, phần đệm (padding) và căn chỉnh nhất quán |
| **Hình ảnh** | Tỷ lệ, vị trí và điểm nhấn phù hợp |
| **Thẻ và lưới** | Số cột, cách xuống dòng và chiều cao thẻ phù hợp |
| **Lời kêu gọi hành động** | Nhãn hiển thị rõ, điều khiển dùng được và vị trí đúng |
| **Footer** | Thông tin dễ đọc và liên kết có thể truy cập |
| **Lớp phủ và phần tử cố định** | Không có gì vô tình che nội dung hoặc điều khiển |

Hãy kiểm tra các trạng thái tương tác liên quan ở mỗi bố cục, bao gồm cả menu mobile khi mở. Ảnh chụp menu đang đóng không thể cho thấy menu khi mở có hoạt động hay không.

## 5. Giữ thứ tự nội dung có ý nghĩa

Trên desktop, văn bản và hình ảnh thường nằm cạnh nhau. Trên mobile, chúng thường xếp chồng lên nhau. Hãy tuân theo thứ tự đã được duyệt.

Kiểm tra rằng:

- Tiêu đề giới thiệu nội dung theo sau nó.
- Phần mô tả vẫn đi cùng thẻ của nó.
- Lời kêu gọi hành động đứng sau thông tin liên quan đến nó.
- Hình ảnh vẫn nằm cạnh phần giải thích của chúng.
- Di chuyển qua trang bằng bàn phím đi theo một trình tự hợp lý.

Hãy cẩn thận khi dùng CSS để sắp xếp lại nội dung về mặt hiển thị. Trình đọc màn hình và người dùng bàn phím đi theo thứ tự trong code, không theo thứ tự hiển thị. Nếu hai thứ tự này khác nhau, trang có thể trở nên khó hiểu.

Nếu các tham chiếu được cung cấp mâu thuẫn với một thứ tự đọc hợp lý, hãy ghi lại vấn đề để được rà soát.

## 6. Sửa vấn đề bố cục tại gốc

Hãy dùng những cách sửa tương xứng với quy mô của vấn đề.

| Vấn đề | Cần điều tra |
|---|---|
| Thẻ tràn ra ngoài màn hình | Kích thước lưới, độ rộng tối thiểu và padding của vùng chứa |
| Một tiêu đề bị cắt | Chiều cao cố định, quy tắc tràn và cỡ chữ |
| Nhãn nút bị cắt | Độ rộng, padding, xuống dòng và giới hạn chiều cao |
| Một hình ảnh trông bị kéo giãn | Kích thước của nó và cách nó được khớp vào khoảng trống |
| Xuất hiện một khoảng trống lớn | Chiều cao cố định, lề (margin) và các phần tử bị ẩn |
| Menu mobile che mất chính nút đóng của nó | Vị trí, thứ tự xếp lớp và hành vi cuộn |

Tránh thu nhỏ toàn bộ văn bản chỉ để sửa một phần bị chật chội.

Tránh xóa nội dung đã được duyệt chỉ vì khó sắp xếp cho vừa.

### Ví dụ

Nếu ba thẻ liệu trình không còn vừa thoải mái trên một hàng, hãy tuân theo cách sắp xếp responsive đã được duyệt. Điều đó có thể có nghĩa là ít cột hơn hoặc một cột duy nhất xếp chồng.

Đừng đưa vào một carousel, tức là một bảng thẻ trượt, trừ khi nó là một phần của thiết kế đã thống nhất.

## 7. Kiểm tra cả tương tác lẫn giao diện

Một lượt rà soát responsive bao gồm cả hành vi.

Kiểm tra rằng:

- Các điều khiển điều hướng có thể tiếp cận và thao tác được.
- Menu mobile mở và đóng như đặc tả.
- Tiêu điểm bàn phím (keyboard focus) vẫn hiển thị rõ.
- Liên kết và nút không bị các phần tử khác che khuất.
- Vùng tương tác đáp ứng yêu cầu về khả năng tiếp cận của dự án.
- Nội dung vẫn có thể tiếp cận khi một lớp phủ đang mở.
- Các phần tử **sticky** (dính), tức là các phần tử giữ cố định vị trí khi trang cuộn, không che mất nội dung quan trọng.

Hãy dùng các bước kiểm tra bằng bàn phím khi phù hợp, bên cạnh tương tác bằng chuột hoặc kiểu chạm.

Công cụ dành cho nhà phát triển của trình duyệt có thể **giả lập** (emulate) các kích thước màn hình khác nhau. Điều này hữu ích, nhưng không giống với việc dùng một chiếc điện thoại thật. Hãy ghi lại liệu còn bước kiểm tra nào trên thiết bị thật đang tồn đọng hay không.

## 8. Kiểm tra phóng to chữ và không gian bị thu hẹp

Một số khách truy cập phóng to chữ hoặc phóng to trình duyệt để đọc thoải mái. Trang vẫn phải hoạt động khi họ làm vậy.

Hãy dùng các yêu cầu về khả năng tiếp cận của dự án cho việc phóng to (zoom) và phóng to chữ.

Hãy tìm:

- Văn bản chồng lên nhau.
- Nội dung bị mất.
- Điều khiển bị đẩy ra ngoài vùng chứa của chúng.
- Phần tử cố định che phần lớn trang.
- Thông tin không còn có thể tiếp cận.

Ghi lại trình duyệt, viewport và mức zoom đã dùng.

Phóng to làm giảm số pixel CSS có sẵn, vì vậy một trang desktop ở mức zoom cao có thể chuyển sang bố cục mobile. Nếu điều đó xảy ra, hãy kiểm tra rằng bố cục mobile vẫn hoạt động trong những điều kiện đó.

Đừng bao giờ tắt tính năng zoom của trình duyệt để bảo vệ thiết kế. Bài 8.3 đề cập chi tiết hơn đến các bước kiểm tra chính thức về zoom và reflow (dàn lại nội dung).

## 9. Nhờ Claude rà soát responsive có trọng tâm

```text
Inspect the homepage's responsive behaviour against the
approved references and requirements.

Before reviewing:
- Read the relevant project instructions.
- Confirm the current Git status.
- Inspect existing responsive styles and shared components.

Review:
- The required viewport widths.
- Intermediate widths where layouts change.
- Relevant navigation and interaction states.
- Text wrapping, image cropping and content order.
- Overflow, clipping and obstructed controls.
- Applicable zoom and keyboard behaviour.

For each finding, report:
1. Location and reproduction conditions.
2. Expected behaviour and supporting reference.
3. Actual behaviour.
4. Evidence.
5. Likely cause and affected usages.
6. Suggested correction.

Separate implementation defects from missing specifications
and optional preferences.

Do not edit files during this review.
Do not claim checks that were not performed.

Scope and references:
[Insert the homepage scope, review widths and exact references.]
```

Hãy tự mình kiểm tra các phát hiện trước khi yêu cầu sửa.

### Prompt sửa lỗi

```text
Correct the verified responsive findings listed below.

Follow the approved responsive references and existing
project conventions.

- Preserve approved copy, assets, section order and destinations.
- Correct the underlying layout causes.
- Reuse existing breakpoints and shared values where suitable.
- Explain any necessary change to shared styles.
- Avoid unrelated refactoring or new dependencies.

After editing:
- Repeat the checks that originally failed.
- Check intermediate widths.
- Check affected shared usages.
- Repeat relevant desktop checks.
- Run applicable documented project checks.
- Report results and remaining limitations.

Do not commit, push or deploy.

Verified findings:
[Insert findings and their supporting references.]
```

## 10. Kiểm tra lại các thay đổi dùng chung

Một chỉnh sửa đối với vùng chứa, kiểu tiêu đề hoặc thẻ dùng chung có thể thay đổi nhiều phần cùng lúc.

Sau khi thay đổi kiểu dùng chung:

1. Kiểm tra lại vấn đề ban đầu.
2. Kiểm tra những nơi khác đang dùng kiểu đã thay đổi.
3. Kiểm tra lại các bố cục desktop liên quan.
4. Kiểm tra với cả nội dung đã được duyệt dài lẫn ngắn.
5. Cập nhật hồ sơ phát hiện.

Việc thêm một media query không chứng minh rằng vấn đề đã được sửa. Chỉ có trang đã hiển thị, được kiểm tra trong đúng điều kiện ban đầu, mới cho thấy vấn đề đã được giải quyết hay chưa.

## 11. Bài tập thực hành

**Nhiệm vụ: Hoàn thành lượt tinh chỉnh responsive cho trang chủ.**

1. Ghi lại các độ rộng rà soát và các trạng thái bắt buộc.
2. Kiểm tra trang ở các độ rộng đó và ở giữa chúng.
3. Ghi lại các phát hiện kèm điều kiện cần thiết để tái hiện chúng.
4. Tách riêng lỗi với những chỗ đặc tả còn thiếu.
5. Nhờ Claude sửa các lỗi đã xác minh theo từng nhóm dễ quản lý.
6. Kiểm tra lại từng chỉnh sửa và những nơi nó ảnh hưởng.
7. Hoàn thành các bước kiểm tra bàn phím và zoom bắt buộc.
8. Nộp hồ sơ rà soát responsive.

Nếu thiếu một tham chiếu bắt buộc, hãy xác định quyết định mà nó ảnh hưởng. Tiếp tục với những bước kiểm tra mà hành vi mong đợi đã rõ ràng.

## 12. Sản phẩm cần nộp

Nộp:

- Các tham chiếu responsive và phiên bản đã dùng.
- Kích thước viewport, trình duyệt và điều kiện zoom.
- Danh sách kiểm tra responsive đã hoàn thành.
- Các phát hiện kèm trạng thái hiện tại.
- Bản tóm tắt các tệp đã thay đổi và ảnh hưởng dùng chung.
- Bằng chứng trước và sau cho các vấn đề đã sửa.
- Kết quả kiểm tra của dự án.
- Mọi bước kiểm tra trên thiết bị thật hoặc quyết định đặc tả còn tồn đọng.

## 13. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các bố cục và trạng thái tương tác bắt buộc đã được kiểm tra.
- Các độ rộng nằm giữa các kích thước rà soát đã được kiểm tra.
- Các lỗi đã xác minh đã được sửa và kiểm tra lại.
- Nội dung và hành trình người dùng đã được duyệt được giữ nguyên.
- Các thay đổi dùng chung đã được kiểm tra ở mọi nơi chúng được áp dụng.
- Các bước kiểm tra bàn phím và zoom đã được ghi lại.
- Các hạn chế còn lại được xác định rõ ràng.
- Trang chủ đã sẵn sàng để người hướng dẫn duyệt.

## 14. Kiểm tra kiến thức

1. Viewport rà soát khác với breakpoint như thế nào?
2. Vì sao bạn nên kiểm tra các độ rộng nằm giữa các tham chiếu thiết kế được cung cấp?
3. Vì sao việc ẩn phần tràn có thể không giải quyết được vấn đề thực sự?
4. Việc sắp xếp lại nội dung bằng CSS có thể ảnh hưởng đến người dùng bàn phím và trình đọc màn hình như thế nào?
5. Cần kiểm tra những gì sau khi thay đổi một kiểu responsive dùng chung?
