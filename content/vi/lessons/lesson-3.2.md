# Bài 3.2: Hiểu các tệp Markdown của dự án và thứ bậc hướng dẫn

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Đọc và chỉnh sửa Markdown cơ bản.
- Giải thích vai trò khác nhau của các tài liệu hướng dẫn trong dự án.
- Phân biệt giữa các tệp mà Claude Code nạp và thứ tự mà dự án tin cậy các nguồn của mình.
- Giải quyết mâu thuẫn giữa các tài liệu thông qua những quyết định đã được ghi lại.
- Cung cấp cho Claude các nguồn nó cần mà không nạp những tài liệu không liên quan.

**Điều kiện tiên quyết:** Hoàn thành Bài 3.1.

**Tài liệu cần chuẩn bị:** Hướng dẫn đầu vào của dự án, các tệp Markdown hiện có và sổ đăng ký tham chiếu từ Bài 3.1.

## 1. Đọc Markdown cơ bản

**Markdown** là một định dạng văn bản thuần dùng để viết tài liệu dễ đọc. Chỉ vài ký hiệu là thêm được tiêu đề, danh sách và phần nhấn mạnh. Các tệp hướng dẫn của dự án, và cả những bài học này, đều được viết bằng Markdown.

| Cú pháp | Mục đích |
|---|---|
| `# Title` | Tiêu đề chính |
| `## Section` | Tiêu đề phần |
| `- Item` | Gạch đầu dòng |
| `1. Step` | Bước được đánh số |
| `**Important**` | Nhấn mạnh in đậm |
| `[Label](destination)` | Liên kết |
| Văn bản được bọc trong dấu backtick | Lệnh, tên tệp và mã |

Hãy dùng tiêu đề để người đọc có thể tìm thấy từng phần của tài liệu. Dùng danh sách đánh số cho các bước, và dùng bảng khi bạn cần đối ứng chính xác một thứ với một thứ khác.

Một tệp được định dạng đẹp vẫn có thể chứa những hướng dẫn mâu thuẫn nhau. Định dạng giúp tài liệu dễ đọc hơn. Nó không làm cho nội dung trở nên đúng.

## 2. Hiểu mỗi tài liệu dùng để làm gì

Dự án lưu các hướng dẫn của mình trong nhiều tài liệu, mỗi tài liệu trả lời một câu hỏi khác nhau. Tên tệp chính xác nên theo quy ước của dự án. Một cách phân chia hữu ích là:

| Tài liệu | Câu hỏi chính mà nó trả lời |
|---|---|
| **Hướng dẫn đầu vào** | Claude nên đọc gì trước tiên, và nên làm việc như thế nào? |
| **Tài liệu yêu cầu sản phẩm (PRD)** | Website phải làm được những gì? |
| **Kiến trúc** | Dự án đã được kiểm tra được tổ chức như thế nào? |
| **Quy tắc làm việc** | Những quy ước nào áp dụng khi xây dựng và duyệt? |
| **Kế hoạch công việc** | Việc gì làm tiếp theo, và kiểm tra hoàn thành bằng cách nào? |
| **Tài liệu tham chiếu đã duyệt** | Những quyết định nào về IA, thiết kế, nội dung và tương tác được áp dụng? |

Bài 3.3 hướng dẫn cách viết PRD, kiến trúc, quy tắc làm việc và kế hoạch công việc.

Tránh sao chép cùng một yêu cầu vào mọi tài liệu. Các bản sao sẽ dần lệch nhau khi một bản được cập nhật còn các bản khác thì không. Hãy giữ mỗi yêu cầu trong tài liệu chịu trách nhiệm về nó, và trỏ tới nó từ những nơi khác.

## 3. Biết Claude Code nạp những tệp nào

Claude Code tự động đọc một số tệp hướng dẫn nhất định khi một phiên làm việc bắt đầu. Tệp chính là `CLAUDE.md`. Vào ngày 13 tháng 11 năm 2026, tài liệu chính thức nêu rằng:

- Các tệp `CLAUDE.md` trong thư mục nơi bạn khởi động Claude Code, và trong các thư mục cấp trên nó, được nạp khi phiên bắt đầu. Tệp của dự án có thể nằm ở `./CLAUDE.md` hoặc `./.claude/CLAUDE.md`.
- Các tệp `CLAUDE.md` trong thư mục con được nạp sau, khi Claude đọc các tệp trong những thư mục con đó.
- Một `CLAUDE.md` có thể **import** (nhập) một tệp khác bằng cách viết `@` theo sau là đường dẫn của tệp đó, ví dụ `@docs/prd.md`. Các tệp được import sẽ được nạp khi bắt đầu phiên cùng với tệp import chúng. Một đường dẫn nằm trong dấu backtick sẽ không được import.
- Claude coi các tệp này là ngữ cảnh, không phải là các thiết lập mà nó buộc phải tuân theo. Nếu hai hướng dẫn mâu thuẫn nhau, Claude có thể làm theo bất kỳ cái nào.

Các tệp Markdown khác, như `PRD.md` hay `Task.md`, không được nạp chỉ vì chúng tồn tại trong dự án. Claude đọc chúng khi chúng được import, khi một prompt nêu tên chúng, hoặc khi Claude quyết định mở chúng trong lúc làm việc.

Điều này cho bạn hai cách để đảm bảo Claude dùng một tài liệu:

| Cách làm | Tác dụng | Khi nào phù hợp |
|---|---|---|
| Import nó từ `CLAUDE.md` | Được nạp trong mọi phiên | Tài liệu ngắn cần cho hầu hết mọi tác vụ |
| Nêu tên nó trong prompt của tác vụ | Được đọc khi tác vụ đó cần | Tài liệu dài hơn, hoặc chỉ liên quan đến một số tác vụ |

Import không giúp tiết kiệm dung lượng. Mọi thứ được import đều được nạp mỗi lần, nên một chuỗi import dài có thể lấn át chính tác vụ.

Để xác nhận những gì đã được nạp, hãy chạy `/context` trong một phiên Claude Code và kiểm tra danh sách memory file. Bạn cũng có thể hỏi Claude nó thực sự đã đọc những nguồn nào trước khi dựa vào câu trả lời của nó.

Cách nạp tệp có thể thay đổi giữa các phiên bản. Hãy kiểm tra tài liệu chính thức hiện hành khi bạn thiết lập một dự án thật.

## 4. Đặt thứ tự tham chiếu của dự án

Việc nạp tệp quyết định Claude nhìn thấy gì. Nó không quyết định nguồn nào thắng khi hai nguồn không thống nhất. Đó là một quyết định riêng của dự án, được ghi lại thành **thứ tự tham chiếu** (reference order).

Trong phạm vi cách làm việc được cho phép của dự án, hãy ghi lại:

1. Tác vụ hiện tại và phạm vi nó được phép bao quát.
2. Các phiên bản đã duyệt của những nguồn liên quan đến tác vụ đó.
3. Tài liệu nào sở hữu từng loại quyết định.
4. Cách giải quyết các thay đổi và mâu thuẫn.

Thứ tự tham chiếu của dự án hoạt động bên trong các quy tắc và quyền hạn riêng của Claude Code. Nó không thể ghi đè chúng.

Đừng viết một quy tắc chung chung như “mọi tin nhắn chat mới đều thay thế mọi nguồn đã duyệt”. Nếu người hướng dẫn thay đổi một yêu cầu một cách rõ ràng, hãy xác định những tài liệu nào bị ảnh hưởng và cập nhật chúng theo sự cho phép. Một thay đổi chỉ được đưa ra trong tin nhắn chat rất dễ bị thất lạc.

## 5. Coi mâu thuẫn là phát hiện

Ví dụ, PRD có thể mô tả một cách để khách truy cập liên hệ trong khi kế hoạch công việc lại nêu một cách khác.

Hãy ghi lại mâu thuẫn như một phát hiện:

- Vị trí của hai nguồn.
- Phiên bản và bằng chứng phê duyệt của chúng.
- Tác vụ bị ảnh hưởng.
- Quyết định cần đưa ra.

Đừng âm thầm chọn phương án dễ hơn, và đừng khẳng định có thể đáp ứng cả hai nếu chúng mâu thuẫn nhau. Hãy nhớ rằng Claude có thể làm theo bất kỳ hướng dẫn nào khi các tệp của nó không thống nhất, nên một mâu thuẫn chưa được giải quyết có thể tạo ra kết quả khó lường.

## 6. Giữ tệp đầu vào tập trung

Tệp đầu vào là tài liệu Claude đọc đầu tiên. Trong một dự án Claude Code, đó thường là `CLAUDE.md`. Một tệp đầu vào hữu ích:

- Giải thích dự án và phạm vi công việc.
- Trỏ tới các tài liệu nắm giữ từng loại quyết định.
- Nêu rõ các ranh giới và quy ước quan trọng.
- Giải thích cách chọn tác vụ tiếp theo.
- Yêu cầu báo cáo chính xác các bước kiểm tra đã thực hiện và giới hạn của chúng.

Nó không nên trở thành bản sao của toàn bộ repository hay của mọi bài học. Tài liệu chính thức khuyến nghị giữ mỗi `CLAUDE.md` dưới khoảng 200 dòng, vì các tệp dài hơn chiếm nhiều ngữ cảnh hơn và được tuân theo kém nhất quán hơn.

Hãy đưa thêm tài liệu vào khi một tác vụ cần đến chúng.

## 7. Yêu cầu Claude lập bản đồ hướng dẫn

```text
Inspect the project's entry instructions and the documents they refer to.

Return a table with: document, actual path, purpose,
version or approval status, and the decisions it owns.

Identify repeated requirements, conflicts, missing references
and files that are named but cannot be opened.
State which files you actually read and which were loaded automatically.
Do not assume every Markdown file in the project is loaded.

Review only. Do not edit documents or build the website.
```

Hãy tự mình so sánh bản đồ của Claude với các tệp. Kiểm tra một hoặc hai đường dẫn bằng cách mở chúng.

## 8. Bài tập thực hành

**Nhiệm vụ: Tạo bản đồ hướng dẫn của dự án.**

1. Tìm tệp đầu vào và các tài liệu mà nó tham chiếu tới.
2. Ghi lại mỗi tài liệu chịu trách nhiệm về điều gì.
3. Ghi lại cách Claude tiếp cận từng tài liệu: được nạp khi bắt đầu, được import, hay được nêu tên trong prompt.
4. Chạy `/context` và so sánh các tệp được nạp với bản đồ của bạn.
5. Truy một yêu cầu về tài liệu sở hữu nó.
6. Xác định một mâu thuẫn, hoặc nêu rõ là không tìm thấy mâu thuẫn nào.
7. Xác nhận với người hướng dẫn cách giải quyết các mâu thuẫn trong tương lai.

Đừng bịa ra vấn đề chỉ để hoàn thành bài tập.

## 9. Sản phẩm cần nộp

Nộp:

- Bản đồ tài liệu.
- Một yêu cầu đã được truy về tài liệu sở hữu nó.
- Cách nạp tệp mà bạn đã kiểm tra, và bạn đã kiểm tra nó như thế nào.
- Các mâu thuẫn tìm thấy, hoặc một xác nhận rằng không tìm thấy mâu thuẫn nào.
- Các câu hỏi chưa được giải đáp.

## 10. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Vai trò của mỗi tài liệu đều rõ ràng.
- Mọi tài liệu được tham chiếu đều có thể truy cập được.
- Những gì Claude nạp được ghi lại tách biệt với việc nguồn nào có thẩm quyền.

## 11. Kiểm tra kiến thức

1. Vì sao mỗi tài liệu nên có một vai trò riêng biệt?
2. Đặt tên một tệp là `PRD.md` có nghĩa là Claude sẽ tự động đọc nó không?
3. Tập hợp các tệp mà Claude Code nạp khác với thứ tự tham chiếu của dự án như thế nào?
4. Một phát hiện về mâu thuẫn nên bao gồm những gì?
5. Vì sao tệp đầu vào nên được giữ tập trung?

## 12. Tài liệu tham khảo chính thức

- [How Claude remembers your project (tài liệu Claude Code)](https://code.claude.com/docs/en/memory), kiểm tra ngày 13 tháng 11 năm 2026. Hãy kiểm tra các chi tiết về cách nạp tệp theo từng phiên bản trước khi thiết lập một dự án thật.
