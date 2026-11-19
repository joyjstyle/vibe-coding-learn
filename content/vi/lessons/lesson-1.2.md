# Bài 1.2: Cài đặt Claude Code CLI và Terminal

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Thiết lập Visual Studio Code làm nơi duy nhất để bạn đọc mã, chạy Claude Code và quản lý Git.
- Phân biệt một lệnh terminal, một prompt gửi cho Claude và một thao tác trên giao diện VS Code.
- Mở dự án thực hành trong VS Code, từ một thư mục được cung cấp hoặc bằng cách clone kho GitHub của dự án.
- Xác nhận Claude Code đã được cài đặt và bắt đầu một phiên chỉ khảo sát trong terminal tích hợp của VS Code.
- Tìm nơi VS Code hiển thị các thay đổi, commit và push, đồng thời kết nối VS Code với tài khoản GitHub đã được phê duyệt của bạn.
- Báo cáo chính xác các sự cố cài đặt thay vì đoán cách sửa.

**Điều kiện tiên quyết:** Hoàn thành Bài 1.1.

**Tài liệu cần chuẩn bị:** Máy tính đã được người hướng dẫn phê duyệt, Visual Studio Code, Git, phương thức cài đặt Claude Code đã được phê duyệt, tài khoản GitHub và quyền truy cập kho mã mà người hướng dẫn đã sắp xếp, cùng dự án thực hành, được cung cấp dưới dạng một thư mục hoặc một kho GitHub.

## 1. Hiểu không gian làm việc của bạn

**Visual Studio Code**, thường gọi là **VS Code**, là một trình soạn thảo mã: một chương trình để mở, đọc và thay đổi các tệp trong một dự án. Trong khóa học này, bạn dùng một cửa sổ VS Code cho ba việc:

| Phần của VS Code | Bạn dùng nó để làm gì |
|---|---|
| **Explorer và trình soạn thảo** | Mở tệp, đọc mã và kiểm tra những gì Claude đã thay đổi |
| **Terminal tích hợp** | Chạy lệnh và Claude Code CLI, ngay trong cùng cửa sổ |
| **Chế độ xem Source Control** | Xem các tệp đã thay đổi, so sánh các phiên bản, commit và push lên GitHub |

Giữ cả ba trong một cửa sổ mang lại lợi ích thực tế. Thư mục đang mở trong VS Code, thư mục mà terminal khởi động và kho Git là cùng một thư mục, nên bạn khó làm việc nhầm chỗ hơn nhiều.

**Terminal** là nơi bạn gõ lệnh cho máy tính. Chương trình đọc và chạy các lệnh đó là **shell**: trên macOS thường là zsh, còn trên Windows thường là PowerShell. **Terminal tích hợp** của VS Code là một bảng terminal nằm bên trong VS Code, dùng cùng shell đó.

**Claude Code CLI** là một chương trình bạn khởi động từ terminal. CLI là viết tắt của command-line interface (giao diện dòng lệnh), nghĩa là bạn sử dụng nó bằng cách gõ thay vì nhấp chuột.

Có bốn nơi bạn gõ hoặc nhấp, và mỗi nơi chờ đợi một loại thông tin khác nhau:

| Ở đâu | Bạn nhập gì |
|---|---|
| **Dấu nhắc lệnh** của shell trong terminal tích hợp | Các lệnh, chẳng hạn `pwd` |
| Một phiên Claude, chạy trong terminal đó | Các yêu cầu bằng ngôn ngữ thông thường, nhờ Claude khảo sát, lập kế hoạch hoặc thực hiện |
| Giao diện VS Code | Các cú nhấp và mục nhập ngắn, như mở một tệp hoặc gõ thông điệp commit |
| Trình duyệt | Địa chỉ website, cùng các cú nhấp và nội dung gõ trên trang |

Gõ một lệnh terminal vào cuộc trò chuyện với Claude không làm lệnh đó chạy trong shell của bạn. Đừng cho rằng một lệnh đã chạy chỉ vì bạn đã dán nó vào đâu đó.

### Tiện ích mở rộng VS Code

Claude Code cũng cung cấp một tiện ích mở rộng (extension) cho VS Code với bảng trò chuyện dạng đồ họa. Tiện ích này đi kèm bản CLI riêng cho bảng trò chuyện đó; để chạy `claude` trong terminal tích hợp của VS Code, bạn vẫn cần cài đặt CLI độc lập. Khóa học này dùng CLI trong terminal tích hợp, để các lệnh và Claude nằm cạnh nhau và hướng dẫn trong bài học khớp với những gì bạn thấy. Chỉ dùng tiện ích mở rộng nếu người hướng dẫn phê duyệt.

## 2. Cài đặt và kiểm tra công cụ

Bạn cần ba công cụ, mỗi công cụ được cài bằng phương thức mà tổ chức của bạn đã phê duyệt:

| Công cụ | Vai trò |
|---|---|
| **VS Code** | Trình soạn thảo, terminal và chế độ xem Source Control đã mô tả ở trên |
| **Git** | Chương trình quản lý phiên bản ghi lại các commit. Chế độ xem Source Control của VS Code sử dụng Git, nên Git phải được cài đặt riêng |
| **Claude Code CLI** | Lệnh `claude` mà bạn chạy trong terminal |

Một số công cụ có thể đã được cài sẵn. Hãy kiểm tra trước, như mô tả ở Phần 4. Cài thêm một bản thứ hai có thể gây xung đột rất khó gỡ rối.

Để cài đặt, hãy làm theo hướng dẫn chính thức của từng công cụ cho đúng hệ điều hành bạn đang dùng. Phương thức cài đặt thay đổi theo thời gian, nên bài học này cố ý không chép lệnh cài đặt vào khóa học. Các trang chính thức luôn là nguồn cập nhật nhất. Trên Windows, hãy xem trang cài đặt Claude Code để biết các yêu cầu bổ sung trước khi cài.

Không bao giờ cài thêm phần mềm, thay đổi quyền hệ thống hoặc chuyển sang tài khoản của người khác để né một lỗi bạn không hiểu. Thay vào đó, hãy báo cáo lỗi.

Website khởi đầu có thể có các yêu cầu riêng, chẳng hạn một phiên bản cụ thể của Node.js, một chương trình chạy JavaScript bên ngoài trình duyệt. Cài đặt ba công cụ này không có nghĩa là các yêu cầu đó đã sẵn sàng. Bài 1.3 và 1.4 sẽ xử lý chúng.

## 3. Mở dự án thực hành trong VS Code

Người hướng dẫn sẽ cung cấp dự án thực hành theo một trong hai cách.

### Nếu đó là một kho GitHub

**GitHub** là một website lưu trữ các kho Git trực tuyến, để cả nhóm có thể chia sẻ. Một **kho mã** (repository, hay repo) là một thư mục dự án có lịch sử được Git ghi lại.

1. Trong VS Code, mở chế độ xem Source Control và chọn **Clone Repository**. Bạn cũng có thể mở Command Palette và chạy **Git: Clone**.
2. Nếu VS Code yêu cầu bạn đăng nhập GitHub, hãy dùng tài khoản đã được người hướng dẫn phê duyệt và làm theo các bước đăng nhập trong trình duyệt.
3. Chọn kho mã mà bạn đã được cấp quyền truy cập.
4. Chọn vị trí lưu nó bên trong khu vực thực hành của bạn, không phải toàn bộ thư mục cá nhân hay một thư mục dùng chung của công ty.
5. Mở thư mục vừa clone khi VS Code gợi ý.

**Clone** là sao chép kho mã từ GitHub về máy tính của bạn, kèm theo lịch sử của nó. Bản sao trên GitHub được gọi là **remote**.

### Nếu đó là một thư mục

Dùng **File > Open Folder** và chọn thư mục thực hành được cung cấp.

### Chỉ tin cậy dự án thực hành

VS Code có thể hỏi bạn có tin cậy tác giả của các tệp trong thư mục hay không. Chỉ tin cậy dự án thực hành được cung cấp. Nếu bạn không chắc một thư mục đến từ đâu, hãy chọn không tin cậy và hỏi người hướng dẫn.

Giới hạn thư mục đang mở trong phạm vi dự án thực hành. Claude có thể đọc các tệp bên trong thư mục mà bạn khởi động nó, nên một thư mục quá rộng sẽ để lộ nhiều hơn rất nhiều so với những gì nhiệm vụ cần.

## 4. Mở terminal tích hợp và kiểm tra

Mở terminal tích hợp bằng **Terminal > New Terminal**. Menu cũng hiển thị phím tắt dành cho hệ thống của bạn.

Terminal mở ra trong thư mục mà VS Code đang mở. Hãy xác nhận điều đó. `pwd`, viết tắt của “print working directory” (in thư mục làm việc), hiển thị đường dẫn đầy đủ của thư mục hiện tại:

```bash
pwd
```

Kiểm tra rằng đường dẫn kết thúc bằng thư mục dự án thực hành. Nếu không, hãy đóng terminal, kiểm tra xem VS Code đang mở thư mục nào, rồi mở một terminal mới.

Sau đó kiểm tra rằng Git và Claude Code có sẵn trong terminal này:

```bash
git --version
```

```bash
claude --version
```

Ghi lại kết quả mà mỗi lệnh in ra. Một số phiên bản cho thấy lệnh có sẵn trong shell này. Nó không chứng minh rằng tài khoản của bạn hoạt động hoặc dự án đã sẵn sàng.

Nếu bạn cần chẩn đoán sâu hơn một sự cố cài đặt Claude Code, tài liệu chính thức cung cấp một lệnh chẩn đoán:

```bash
claude doctor
```

Nếu không tìm thấy `claude` hoặc `git`, hãy ghi lại chính xác thông báo lỗi và xem lại hướng dẫn cài đặt đã được phê duyệt. Đừng liên tục cài lại bằng các phương thức khác nhau. Mỗi lần cài thêm lại khiến sự cố khó chẩn đoán hơn.

## 5. Khởi động Claude trong terminal tích hợp

Tại dấu nhắc lệnh của shell, trong thư mục thực hành:

```bash
claude
```

Nếu được yêu cầu, hãy hoàn tất quy trình đăng nhập đã được tổ chức phê duyệt. Không bao giờ dán mật khẩu hoặc thông tin xác thực khác vào bài nộp.

Khi chạy từ terminal tích hợp của VS Code, CLI tự động kết nối với VS Code để dùng các tính năng như xem các thay đổi được đề xuất dưới dạng diff trong trình soạn thảo. Một **diff** hiển thị những gì một thay đổi xóa đi và thêm vào, đặt cạnh nhau. Các chế độ xem này giúp bạn duyệt sản phẩm của Claude. Chúng không thay thế việc duyệt của bạn.

Một bố cục hiệu quả: các tệp trong trình soạn thảo ở phía trên, terminal chạy Claude ở phía dưới, và nền tảng học tập trong trình duyệt đặt cạnh VS Code.

## 6. Chạy một yêu cầu chỉ khảo sát

Khi Claude đã sẵn sàng, hãy nhập prompt này:

```text
Confirm the current project folder and identify its entry instructions.
Read only the introductory project information needed for this check.
Explain what starter was supplied and what setup information is missing.

Do not edit files, install dependencies, start services, commit,
push or deploy. Do not print credentials or environment values.
```

Kiểm tra thư mục và các nguồn mà Claude báo cáo. Mở một trong các tệp nó nêu tên trong trình soạn thảo và xác nhận rằng tệp đó đúng như Claude mô tả. Nếu Claude không thể truy cập các nguồn, hãy ghi lại điều đó như một hạn chế.

## 7. Làm quen với chế độ xem Source Control

Mở chế độ xem Source Control từ biểu tượng của nó trên Activity Bar bên trái, hoặc bằng Ctrl+Shift+G trên Windows và Linux (⌃⇧G trên macOS). Trong bài học này bạn chỉ quan sát. Bạn sẽ thực hiện commit đầu tiên ở Bài 1.4.

| Những gì bạn thấy | Công dụng |
|---|---|
| Danh sách **Changes** | Các tệp khác với commit gần nhất. Chọn một tệp sẽ mở diff của tệp đó |
| **Ô thông điệp** và nút **Commit** | Ghi lại một commit: một mốc lưu của dự án trên máy tính của bạn |
| **More Actions (...) > Push** | Tải các commit của bạn lên kho remote trên GitHub |
| Mũi tên cạnh **Commit** | Các tùy chọn khác, bao gồm **Commit & Push**, thực hiện cả hai trong một bước |
| Thanh trạng thái, góc dưới bên trái | Branch hiện tại và, khi đã kết nối với GitHub, trạng thái đồng bộ |

Một **commit** nằm lại trên máy tính của bạn. Một **push** gửi các commit lên GitHub, nơi người khác, và đôi khi cả các lượt deploy tự động (Bài 9.4), có thể thấy chúng. Sự khác biệt đó là lý do khóa học coi push là một bước riêng, cần được cho phép.

Các nút này chạy Git thay cho bạn. Mỗi nút tương ứng với một lệnh bạn có thể gõ trong terminal:

| Chế độ xem Source Control | Lệnh tương đương trong terminal |
|---|---|
| Danh sách Changes | `git status` |
| Chọn một tệp đã thay đổi | `git diff` |
| Commit | `git commit` |
| Push | `git push` |

Cả hai cách đều thay đổi cùng một kho mã. Một quy tắc như “không commit” áp dụng dù bạn nhấp chuột, gõ lệnh hay nhờ Claude.

Quy tắc của khóa học này:

- Chỉ commit khi bài học hoặc nhiệm vụ yêu cầu.
- Chỉ push khi nhiệm vụ và quy tắc dự án cho phép, và chỉ lên branch mà dự án chỉ định.
- Không bao giờ force push.
- Nếu push thất bại, đừng tiếp tục nhấn Sync hoặc Push. Ghi lại thông báo và hỏi người hướng dẫn.

## 8. Xử lý các sự cố cài đặt thường gặp

| Những gì bạn thấy | Việc cần làm tiếp theo |
|---|---|
| `command not found` với `claude` hoặc `git` | Kiểm tra việc cài đặt theo hướng dẫn chính thức. Nếu bạn cài công cụ trong lúc VS Code đang mở, hãy đóng hẳn VS Code rồi mở lại, sau đó mở một terminal mới |
| Đăng nhập GitHub thất bại | Làm theo quy trình cấp quyền truy cập tài khoản đã được tổ chức phê duyệt |
| Clone thất bại với lỗi truy cập hoặc lỗi quyền | Nhờ người hướng dẫn xác nhận quyền truy cập kho mã của bạn |
| Source Control báo không có kho mã | Có thể bạn đang mở nhầm thư mục, hoặc thư mục đó không phải là kho Git. Hãy ghi lại. Không tạo kho mã mới trừ khi người hướng dẫn yêu cầu |
| Terminal đang ở sai thư mục | Mở đúng thư mục trong VS Code, rồi mở một terminal mới |
| Đăng nhập Claude thất bại | Làm theo quy trình cấp quyền truy cập tài khoản đã được tổ chức phê duyệt |
| Claude xin phép làm một việc không mong đợi | Đối chiếu việc nó muốn làm với nhiệm vụ hiện tại trước khi trả lời |

Claude Code có thể xin phép bạn trước khi chạy lệnh hoặc thay đổi tệp. Những yêu cầu này bảo vệ bài làm của bạn. Không bao giờ tắt các cơ chế bảo vệ như vậy chỉ để vượt qua một bài tập nhập môn.

## 9. Bài tập thực hành

**Nhiệm vụ: Thiết lập không gian làm việc VS Code và bắt đầu một phiên khảo sát có kiểm tra.**

1. Mở dự án thực hành trong VS Code, bằng cách clone kho mã được cung cấp hoặc mở thư mục được cung cấp. Chỉ tin cậy dự án đó.
2. Mở terminal tích hợp và xác nhận thư mục bằng `pwd`.
3. Kiểm tra `git --version` và `claude --version`.
4. Khởi động Claude và hoàn tất đăng nhập đã được phê duyệt nếu cần.
5. Chạy prompt chỉ khảo sát.
6. Mở một tệp mà Claude nêu tên trong trình soạn thảo và kiểm tra mô tả của Claude về tệp đó.
7. Mở chế độ xem Source Control. Xác nhận rằng nó không liệt kê thay đổi nào, và ghi chú branch hiển thị trên thanh trạng thái.
8. Ghi lại các nguồn Claude đã khảo sát và mọi thiếu sót trong cài đặt.

## 10. Sản phẩm cần nộp

Nộp:

- Phiên bản VS Code (từ cửa sổ About của VS Code), phiên bản Git và phiên bản Claude Code.
- Cách bạn mở dự án (clone hoặc mở dưới dạng thư mục) và, nếu đã clone, tên kho mã.
- Tóm tắt đường dẫn dự án. Bạn có thể rút gọn các phần mang tính cá nhân của đường dẫn.
- Phản hồi khảo sát của Claude, và tệp bạn đã dùng để đối chiếu.
- Ảnh chụp màn hình chế độ xem Source Control cho thấy không có thay đổi, với branch hiển thị rõ.
- Mọi thông báo lỗi, đã loại bỏ thông tin cá nhân hoặc thông tin tài khoản.

Không đưa vào mật khẩu, token hay các bí mật tài khoản khác.

## 11. Tiêu chí hoàn thành

Bài học hoàn thành khi đạt một trong các điều sau:

- Trình soạn thảo, terminal, phiên Claude và chế độ xem Source Control đều hoạt động trên đúng dự án trong một cửa sổ VS Code, và chưa có gì bị thay đổi, commit hoặc push, hoặc
- Một trở ngại cài đặt cụ thể đã được ghi lại chính xác để có thể giải quyết.

Một trở ngại chưa được giải quyết không được tính là cài đặt thành công. Nó được tính là một báo cáo chính xác.

## 12. Kiểm tra kiến thức

1. Bạn nên gõ `claude --version` ở đâu, và vì sao không gõ bên trong một phiên Claude?
2. Vì sao dự án nên được mở trong VS Code trước khi bạn khởi động Claude trong terminal của nó?
3. Commit khác push như thế nào?
4. VS Code có thể push chỉ với một cú nhấp. Vì sao khóa học này vẫn coi push là một bước riêng, cần được cho phép?
5. Những thông tin nào phải được loại khỏi bằng chứng cài đặt của bạn?

## 13. Tài liệu tham khảo chính thức

- [Claude Code setup](https://code.claude.com/docs/en/setup), được kiểm tra ngày 13 tháng 11 năm 2026 về các lệnh cài đặt và xác minh.
- [Use Claude Code in VS Code](https://code.claude.com/docs/en/vs-code), được kiểm tra ngày 15 tháng 11 năm 2026 về việc chạy CLI trong terminal tích hợp của VS Code và điểm khác biệt so với tiện ích mở rộng.
- [Source control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview) và [Working with repositories and remotes](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes), được kiểm tra ngày 15 tháng 11 năm 2026 về chế độ xem Source Control, commit và push.
- [Claude Code first-day guide](https://support.claude.com/en/articles/14552382-your-first-day-in-claude-code), được tác giả tải lên kiểm tra về cách khởi động Claude Code từ một dự án.
