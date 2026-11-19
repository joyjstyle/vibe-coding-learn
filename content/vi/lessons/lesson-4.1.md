# Bài 4.1: Kiểm tra dự án và viết prompt có phạm vi rõ ràng

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Kiểm tra trạng thái hiện tại của dự án trước khi yêu cầu bất kỳ thay đổi nào.
- Tìm những tệp và component mà một tác vụ thực sự liên quan tới.
- Viết một prompt có mục tiêu, phạm vi và ranh giới rõ ràng.
- Yêu cầu Claude tách biệt những gì nó quan sát được với những gì nó giả định.
- Duyệt cách hiểu của Claude trước khi bất kỳ dòng mã nào bị thay đổi.

**Điều kiện tiên quyết:** Hoàn thành Học phần 3 và đã ghi lại bộ hướng dẫn gốc được duyệt ở Bài 3.4.

**Tài liệu cần chuẩn bị:** Dự án khởi đầu TypeScript và TSX, bộ hướng dẫn gốc đã duyệt (PRD, kiến trúc, quy tắc làm việc và kế hoạch công việc), IA, thiết kế và hướng dẫn phong cách đã duyệt, cùng quyết định về mức độ sẵn sàng từ Bài 3.4.

## 1. Bắt đầu từ dự án thực tế

Các hướng dẫn đã duyệt mô tả website mà bạn định xây dựng. Mã nguồn cho thấy những gì đang thực sự tồn tại. Hai điều này thường khác nhau.

Một tác vụ có thể ghi “Xây dựng header”, nhưng dự án có thể đã chứa:

- Một header hoàn chỉnh.
- Một header làm dở.
- Một component điều hướng tái sử dụng được.
- Một header giữ chỗ với các nhãn khác.
- Phần việc chưa xong từ một tác vụ khác.

Nếu bạn yêu cầu Claude xây dựng một thứ đã tồn tại, nó có thể tạo ra phiên bản thứ hai, ghi đè lên phần việc hữu ích hoặc giải quyết sai vấn đề.

**Hãy kiểm tra dự án trước, để yêu cầu của bạn nhắm đúng vào khoảng cách thực sự giữa những gì đang có và những gì được yêu cầu.**

## 2. Kiểm tra trạng thái làm việc

**Trạng thái làm việc** (working state) là tình trạng hiện tại của các tệp dự án, bao gồm mọi thay đổi chưa được lưu vào Git.

Chạy các lệnh này tại dấu nhắc lệnh của terminal.

Mở thư mục thực hành mà bạn đã dùng trong Bài 1.2 đến 1.4. Thay đường dẫn ví dụ bằng đường dẫn thực tế của bạn trước khi chạy:

```bash
cd "path/to/supplied/starter-website"
```

Xác nhận rằng bạn đang ở đúng thư mục:

```bash
pwd
```

`pwd` in ra đường dẫn đầy đủ của thư mục hiện tại. Kiểm tra rằng nó kết thúc bằng tên thư mục dự án.

Sau đó yêu cầu Git đưa ra bản tóm tắt ngắn về các thay đổi:

```bash
git status --short
```

| Kết quả | Điều nó cho bạn biết |
|---|---|
| Không có đầu ra | Git không thấy tệp được theo dõi nào bị thay đổi và không có tệp mới chưa được theo dõi. Các tệp được liệt kê trong `.gitignore` sẽ không hiển thị |
| Một danh sách tệp | Một số tệp đã thay đổi, hoặc có tệp mới mà Git chưa theo dõi |
| Một lỗi có nhắc tới repository | Có thể bạn đang ở sai thư mục, hoặc Git chưa được thiết lập cho dự án này |

Một **tệp được theo dõi** (tracked file) là tệp mà Git đã ghi nhận. Một **tệp chưa được theo dõi** (untracked file) là tệp mới mà Git chưa được bảo phải ghi nhận.

Nếu có thay đổi được liệt kê, hãy tìm hiểu chúng thuộc về việc gì trước khi tiếp tục. Đó có thể là phần việc chưa xong của người khác. Đừng yêu cầu Claude reset, loại bỏ hay ghi đè chúng chỉ để có một điểm bắt đầu sạch sẽ.

## 3. Chỉ kiểm tra những gì tác vụ cần

Bắt đầu với hướng dẫn đầu vào của dự án và tác vụ được chọn. Sau đó lần theo các tham chiếu của chúng tới phần mã liên quan.

Với một tác vụ điều hướng, một lần kiểm tra hữu ích có thể bao gồm:

| Nguồn | Điều cần tìm hiểu |
|---|---|
| Hướng dẫn của dự án | Các quy tắc làm việc và nơi lưu từng tài liệu tham chiếu |
| Tác vụ được chọn | Kết quả mong đợi và các ranh giới của nó |
| IA đã duyệt | Các nhãn điều hướng và nơi mỗi liên kết dẫn tới |
| Thiết kế và hướng dẫn phong cách | Bố cục, các trạng thái trực quan và hành vi ở các kích thước màn hình khác nhau |
| Component điều hướng hiện có | Những gì đã được xây dựng |
| Các style và nơi sử dụng liên quan | Các quy tắc dùng chung, và những nơi khác dùng cùng đoạn mã |
| Các bước kiểm tra liên quan | Cách dự án hiện đang xác minh hành vi này |

**IA**, hay kiến trúc thông tin (information architecture), là kế hoạch đã được duyệt về các trang của website, tên của chúng và cách chúng kết nối với nhau. Bạn đã chuẩn bị nó ở Học phần 2.

Bạn không cần đọc toàn bộ dự án cho mỗi tác vụ. Đọc mọi thứ sẽ tốn thời gian và khiến bạn khó nhận ra điều gì quan trọng.

Tuy nhiên, một lần kiểm tra có trọng tâm vẫn phải bao gồm mọi thứ mà tác vụ phụ thuộc vào. Ví dụ, nếu một component header được dùng trên mọi trang, thay đổi nó sẽ ảnh hưởng tới mọi trang, ngay cả khi tác vụ chỉ nhắc tới trang chủ.

## 4. Hiểu các phát hiện trước khi yêu cầu chỉnh sửa

Một lần kiểm tra hữu ích trả lời được sáu câu hỏi:

1. Những gì đã tồn tại?
2. Nó khác với yêu cầu như thế nào?
3. Những tệp nào có khả năng cần thay đổi?
4. Những thay đổi đó còn có thể ảnh hưởng tới điều gì khác?
5. Thông tin nào còn thiếu?
6. Kết quả có thể được kiểm tra như thế nào?

### Ví dụ về một phát hiện

> Header đã tồn tại trong một component TSX dùng chung. Các nhãn của nó khớp với IA đã duyệt, nhưng menu di động chưa được xây dựng. Có sẵn một style nút dùng chung. Thiết kế di động đã được cung cấp, và có vẻ không cần thêm package mới nào.

Phát hiện này thu hẹp công việc từ “Xây dựng header” thành “Xây dựng menu di động đã duyệt bên trong header hiện có”. Yêu cầu thứ hai nhỏ hơn, rõ ràng hơn và dễ kiểm tra hơn.

Hãy cẩn trọng với những từ như “có khả năng” và “có lẽ”. Claude nên nêu tên các tệp hoặc tài liệu tham chiếu hỗ trợ cho mỗi kết luận, để bạn phân biệt được những gì nó thực sự thấy với những gì nó đang đoán.

## 5. Điều gì làm cho một prompt có phạm vi rõ ràng?

Một **prompt có phạm vi rõ ràng** (scoped prompt) mô tả một phần việc có giới hạn: làm gì, ở đâu, dùng tài liệu tham chiếu nào và dừng ở đâu.

| Thành phần | Những gì cần đưa vào |
|---|---|
| **Mục tiêu** | Kết quả bạn cần |
| **Đối tượng** | Trang, component hoặc hành vi liên quan |
| **Tài liệu tham chiếu** | Các nguồn đã duyệt mà Claude phải tuân theo |
| **Trạng thái hiện tại** | Những gì lần kiểm tra của bạn phát hiện ra |
| **Phạm vi** | Những gì tác vụ bao gồm |
| **Ranh giới** | Những gì phải được giữ nguyên, hoặc để lại cho tác vụ khác |
| **Phản hồi mong đợi** | Claude nên kiểm tra, lập kế hoạch hay triển khai |
| **Xác minh** | Bằng chứng bạn sẽ cần sau đó |

Một prompt dài không tự động là một prompt rõ ràng. Hãy đưa vào những chi tiết giúp Claude đưa ra quyết định đúng, và bỏ phần còn lại.

## 6. So sánh một prompt mơ hồ với một prompt có phạm vi rõ ràng

### Prompt mơ hồ

> Sửa header và làm nó tốt hơn trên di động.

Prompt này để lại những câu hỏi quan trọng chưa được trả lời:

- Header nào?
- Nó có vấn đề gì?
- Thiết kế đã duyệt nào được áp dụng?
- “Tốt hơn” có cho phép thiết kế lại không?
- Claude nên xem xét trước, hay bắt đầu chỉnh sửa ngay?

Claude sẽ lấp những khoảng trống này bằng các giả định của riêng nó. Một số có thể sai.

### Prompt kiểm tra có phạm vi rõ ràng

```text
Inspect the existing shared header for the Saffron Wellness Clinic website.

Goal:
Understand the gap between the current mobile navigation
and the approved mobile reference.

Read:
- The project entry instructions and working rules.
- The selected navigation task.
- The approved IA and mobile navigation design.
- The existing header, related styles and relevant usages.

Report:
1. What is already implemented.
2. What differs from the approved requirements.
3. The likely files affected and why.
4. Existing components or styles that can be reused.
5. Missing decisions or dependencies.
6. Suitable verification checks.

Inspect only. Do not edit files, install dependencies,
start services, commit, push or deploy.

Preserve existing work. Identify assumptions explicitly.
```

Trước khi dùng prompt này, hãy thay các tên chung chung như “the approved IA” bằng đường dẫn tệp hoặc vị trí thiết kế thực tế trong dự án của bạn.

## 7. Tách biệt kiểm tra, lập kế hoạch và triển khai

Đây là ba yêu cầu khác nhau, với ba kết quả khác nhau.

| Yêu cầu | Kết quả mong đợi |
|---|---|
| **Kiểm tra** | Một lời giải thích về trạng thái hiện tại và các khoảng trống |
| **Lập kế hoạch** | Các bước đề xuất và những bước kiểm tra cần thiết |
| **Triển khai** | Các thay đổi đã được đặc tả, được thực hiện và xác minh |

Yêu cầu Claude kiểm tra không có nghĩa là cho phép nó chỉnh sửa. Quy tắc làm việc của dự án quyết định khi nào được bắt đầu triển khai.

Tách biệt các bước này đặc biệt hữu ích khi bạn đang học. Nó giúp bạn phát hiện một sự hiểu lầm trước khi bất kỳ dòng mã nào thay đổi, khi việc sửa còn nhanh và ít tốn kém.

### Cảnh giác với việc mở rộng phạm vi

**Mở rộng phạm vi** (scope expansion) xảy ra khi một tác vụ âm thầm lớn dần vượt quá những gì được yêu cầu.

Giả sử Claude đề xuất thay thế toàn bộ thư viện điều hướng chỉ để thêm một menu di động. Trước khi chấp nhận, hãy hỏi:

- Yêu cầu nào khiến việc thay thế là cần thiết?
- Mã hiện có có thể hỗ trợ tác vụ không?
- Những component nào khác sẽ bị ảnh hưởng?
- Việc này có thêm một package mới hay một quyết định cần được duyệt không?

Một đề xuất từ Claude không tự động trở thành một phần của tác vụ.

## 8. Viết hướng dẫn có thể quan sát được

Một hướng dẫn **có thể quan sát được** (observable) mô tả một kết quả mà người khác có thể kiểm tra. Nó tránh các ý kiến chủ quan như “đẹp hơn” hay “tốt hơn”.

| Hướng dẫn không rõ ràng | Hướng dẫn có thể quan sát được |
|---|---|
| Làm khoảng cách đẹp hơn | Áp dụng khoảng cách giữa các phần được đặc tả trong hướng dẫn phong cách đã duyệt |
| Sửa cái nút | Trỏ liên kết đặt lịch hẹn tới đích đến đã được xác nhận |
| Làm cho bản di động hoạt động | Xây dựng menu di động được cung cấp, bao gồm mở, đóng và đi theo các liên kết |
| Dọn dẹp component | Xóa phần markup trùng lặp đã xác định trong khi vẫn giữ hành vi đã được ghi lại của nó |

Nếu bạn chưa thể mô tả chính xác điều gì đang sai, hãy yêu cầu Claude điều tra trước. Đừng yêu cầu nó sửa một thứ mà bạn không thể mô tả.

## 9. Hướng dẫn từng bước

### Bước 1: Chọn một tác vụ

Chọn một tác vụ chưa bắt đầu và được quyết định về mức độ sẵn sàng ở Bài 3.4 cho phép tiến hành.

Chọn một đối tượng nhỏ, chẳng hạn header dùng chung hoặc thẻ liệu trình.

### Bước 2: Kiểm tra trạng thái làm việc

Xác nhận thư mục bằng `pwd` và các thay đổi bằng `git status --short`.

Ghi lại mọi thay đổi hiện có liên quan tới tác vụ của bạn.

### Bước 3: Viết prompt kiểm tra

Bao gồm:

- ID của tác vụ được chọn.
- Các tài liệu tham chiếu chính xác.
- Component hoặc hành vi cần kiểm tra.
- Những phát hiện mà bạn mong Claude báo cáo.
- Một tuyên bố rõ ràng rằng đây chỉ là kiểm tra.

### Bước 4: Duyệt phản hồi của Claude

Kiểm tra rằng Claude:

- Nêu tên các tệp và tài liệu tham chiếu có thật.
- Mô tả chính xác mã hiện tại.
- Chỉ ra phần mã hiện có có thể tái sử dụng.
- Giải thích các tác động rộng hơn, chẳng hạn với component dùng chung.
- Báo cáo thông tin còn thiếu.
- Không thực hiện thay đổi nào.

Để xác nhận điểm cuối cùng, hãy chạy lại `git status --short` và so sánh với Bước 2.

Nếu Claude hiểu sai đối tượng, hãy sửa sự hiểu lầm đó trước khi chuyển sang lập kế hoạch.

## 10. Bài tập thực hành

**Nhiệm vụ: Biến một yêu cầu chung chung thành một prompt kiểm tra có phạm vi rõ ràng.**

Dùng yêu cầu sau:

> Làm cho các thẻ liệu trình khớp với thiết kế.

Chuẩn bị:

1. Danh sách thông tin bạn cần để hiểu yêu cầu.
2. Một prompt kiểm tra có phạm vi rõ ràng, sử dụng các tài liệu tham chiếu thực tế của dự án.
3. Một bản tóm tắt ngắn các phát hiện của Claude.
4. Mọi câu hỏi cần được trả lời trước khi lập kế hoạch.

Nếu dự án khởi đầu không có thẻ liệu trình, hãy báo cáo rằng chúng không tồn tại. Đừng tạo chúng trong bài tập kiểm tra này.

## 11. Sản phẩm cần nộp

Nộp:

- Tác vụ hoặc yêu cầu được chọn.
- Bản tóm tắt `git status --short` lúc bắt đầu của bạn.
- Prompt kiểm tra có phạm vi rõ ràng của bạn.
- Các phát hiện của Claude, và các chỉnh sửa của bạn nếu cần.
- Các câu hỏi còn lại, hoặc một xác nhận rằng không còn câu hỏi nào.
- Xác nhận về việc có tệp nào bị thay đổi hay không.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi bạn có thể:

- Xác lập trạng thái hiện tại của dự án.
- Chọn các hướng dẫn và phần mã liên quan tới một tác vụ.
- Viết một prompt kiểm tra có ranh giới rõ ràng.
- Phân biệt các phát hiện đã được xác minh với các giả định.
- Nhận ra việc mở rộng phạm vi không cần thiết.
- Giải thích những gì phải được giải quyết trước khi triển khai.

## 13. Kiểm tra kiến thức

1. Vì sao bạn nên kiểm tra mã ngay cả khi các yêu cầu đã được duyệt?
2. Bạn nên làm gì nếu Git hiển thị những thay đổi mà bạn không nhận ra?
3. Một yêu cầu kiểm tra khác với một yêu cầu triển khai như thế nào?
4. Vì sao thay đổi một component dùng chung có thể cần kiểm tra các trang khác?
5. Vì sao “làm nó tốt hơn” lại khó xác minh?
