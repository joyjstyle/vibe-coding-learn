# Bài 9.1: Xử lý an toàn thông tin xác thực, dữ liệu cá nhân và các gói phụ thuộc

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Nhận diện thông tin xác thực (credential) và giữ chúng ngoài mã nguồn, Git, ảnh chụp màn hình và prompt.
- Giải thích những giá trị cấu hình nào được gửi tới trình duyệt của khách truy cập.
- Xử lý đúng cách khi một thông tin xác thực bị lộ.
- Giới hạn việc thu thập và xử lý dữ liệu cá nhân trong phạm vi đã được phê duyệt.
- Rà soát các gói phụ thuộc (dependency) trước khi thêm hoặc cập nhật, và hiểu kết quả của `npm audit`.

**Điều kiện tiên quyết:** Hoàn thành Đơn vị 8 và có sẵn hồ sơ QA cùng quyết định duyệt của hồ sơ đó.

**Tài liệu cần chuẩn bị:** Hướng dẫn dự án, tài liệu kiến trúc, đặc tả tích hợp, đặc tả biểu mẫu từ Bài 7.1, `package.json`, tệp khóa (lock file) và mọi tài liệu cấu hình hiện có.

## 1. Hiểu ba vùng rủi ro

Bài học này đề cập ba vùng mà những sai sót nhỏ có thể gây hậu quả nghiêm trọng.

| Vùng | Ví dụ rủi ro |
|---|---|
| **Thông tin xác thực** | Một khóa truy cập được commit vào Git cho phép người khác dùng dịch vụ trả phí hoặc đọc dữ liệu riêng tư |
| **Dữ liệu cá nhân** | Yêu cầu tư vấn của một khách truy cập xuất hiện trong ảnh chụp màn hình được chia sẻ trong một cuộc trò chuyện |
| **Gói phụ thuộc** | Một gói có lỗ hổng đã biết, hoặc một gói độc hại có tên na ná, được thêm vào dự án |

**Bài học này dạy các thói quen làm việc an toàn. Đây không phải là một cuộc kiểm toán bảo mật hay một đánh giá pháp lý.** Việc kiểm thử bảo mật chuyên sâu và các quyết định về nghĩa vụ pháp lý thuộc về những người được ủy quyền.

## 2. Nhận diện thông tin xác thực

**Thông tin xác thực** (credential) là thông tin chứng minh danh tính hoặc cấp quyền truy cập.

Các ví dụ thường gặp:

- API key và access token.
- Mật khẩu.
- Chuỗi kết nối cơ sở dữ liệu.
- Khóa bí mật của dịch vụ email hoặc dịch vụ biểu mẫu.
- Khóa riêng (private key) và chứng chỉ.
- Khóa bí mật dùng để ký webhook.

**Bí mật** (secret) là một thông tin xác thực, hoặc giá trị khác, không được chia sẻ công khai.

Một số giá trị trông vô hại nhưng vẫn là bí mật, ví dụ một URL có chứa token. Nếu không chắc chắn, hãy coi giá trị đó là bí mật và hỏi lại.

### Những nơi thông tin xác thực tuyệt đối không được xuất hiện

| Vị trí | Vì sao không an toàn |
|---|---|
| Mã nguồn | Bất kỳ ai có quyền truy cập mã đều đọc được |
| Các commit Git | Git lưu lịch sử, nên việc xóa sau đó không xóa được bản sao trước |
| Ảnh chụp màn hình và bản ghi màn hình | Dễ bị chia sẻ vượt ra ngoài đối tượng dự định |
| Prompt gửi cho Claude hoặc công cụ khác | Giá trị bị đưa ra khỏi phần cấu hình được kiểm soát |
| Tin nhắn chat, ticket và tài liệu bàn giao | Bị sao chép và lưu ở những nơi bạn không kiểm soát |
| Mã được gửi tới trình duyệt | Mọi khách truy cập đều đọc được |

Khi cần nhắc đến một thông tin xác thực, hãy dùng **tên** của nó, ví dụ `FORM_SERVICE_KEY`, và tuyệt đối không dùng giá trị.

## 3. Giữ cấu hình cục bộ ngoài Git

Các dự án thường đọc thông tin xác thực từ **biến môi trường** (environment variable): các giá trị có tên được cung cấp cho ứng dụng từ bên ngoài mã nguồn.

Trong quá trình phát triển cục bộ, chúng thường được lưu trong một tệp như `.env` hoặc `.env.local`. Tên tệp chính xác phụ thuộc vào framework và hướng dẫn của dự án.

### Kiểm tra tệp đã được bỏ qua

Git dùng tệp `.gitignore` để quyết định những tệp nào không được theo dõi.

Tại dấu nhắc lệnh của terminal, từ thư mục dự án:

```bash
git check-ignore -v .env.local
```

Thay `.env.local` bằng tên tệp mà dự án của bạn sử dụng.

| Kết quả | Ý nghĩa |
|---|---|
| Một dòng nêu tên `.gitignore` và một quy tắc | Git bỏ qua tệp này |
| Không có kết quả | Git không bỏ qua tệp này; hãy dừng lại và báo cáo trước khi thêm bất kỳ giá trị nào |

Đồng thời kiểm tra rằng tệp chưa từng được commit:

```bash
git log --all --oneline -- .env.local
```

Không có kết quả nghĩa là không có branch nào trong kho lưu trữ cục bộ của bạn có lịch sử cho tên tệp đó. Có bất kỳ kết quả nào nghĩa là tệp đã từng được commit, và cần phải báo cáo.

### Ghi lại tên, không ghi giá trị

Nhiều dự án có một tệp mẫu, như `.env.example`, liệt kê tên các biến bắt buộc với giá trị trống hoặc giá trị giữ chỗ. Tệp này có thể commit an toàn vì không chứa bí mật.

```text
# Example only. Values are supplied separately.
FORM_SERVICE_KEY=
FORM_RECIPIENT_ID=
```

Hãy dùng tên biến được định nghĩa trong đặc tả tích hợp của dự án. Đừng tự đặt tên.

## 4. Biết những gì được gửi tới trình duyệt

Mã chạy trong trình duyệt của khách truy cập có thể được bất kỳ ai truy cập website đọc. Mọi giá trị có trong mã đó đều là công khai.

Các framework dùng quy tắc đặt tên để quyết định biến môi trường nào được đưa vào mã chạy trên trình duyệt. Ví dụ:

| Framework | Tiền tố làm lộ giá trị ra trình duyệt |
|---|---|
| Next.js | `NEXT_PUBLIC_` |
| Vite | `VITE_` |

Đây là các ví dụ lấy từ tài liệu của các framework. Hãy kiểm tra xem dự án khởi đầu (starter) dùng framework nào và đọc tài liệu hiện hành của nó.

**Một bí mật tuyệt đối không được dùng tiền tố làm lộ ra trình duyệt.** Nếu một tính năng dường như cần bí mật trên trình duyệt, thì thiết kế đó sai. Bí mật thuộc về mã phía máy chủ hoặc cấu hình của dịch vụ nhận dữ liệu. Hãy nêu nó thành một phát hiện thay vì tìm cách lách.

Một số khóa được thiết kế để công khai, ví dụ một số site key cho chống spam hoặc dịch vụ bản đồ. Tài liệu của dịch vụ và đặc tả tích hợp cần nêu rõ điều này. Đừng cho rằng một khóa an toàn để công khai chỉ vì nó hoạt động.

## 5. Xử lý thông tin xác thực bị lộ

Một thông tin xác thực bị coi là **bị lộ** nếu nó xuất hiện ở bất kỳ nơi nào không được phép, kể cả một commit chưa từng được push, một ảnh chụp màn hình hay một prompt.

Nếu bạn phát hiện thông tin bị lộ:

1. Dừng công việc trên nhiệm vụ bị ảnh hưởng.
2. Không sao chép hoặc chia sẻ giá trị đó thêm, kể cả để giải thích vấn đề.
3. Báo cáo ngay cho người hướng dẫn, nêu rõ nó xuất hiện ở đâu và khi nào.
4. Để người có thẩm quyền **xoay vòng** (rotate) hoặc thu hồi thông tin xác thực, nghĩa là thay nó bằng một giá trị mới để giá trị cũ không còn hoạt động.
5. Ghi lại sự cố và các hành động đã thực hiện.

Xóa giá trị trong một commit mới không xóa được nó khỏi lịch sử Git. Viết lại lịch sử Git là một thao tác chuyên biệt có thể làm gián đoạn công việc của người khác. Đừng thử làm việc này trừ khi người hướng dẫn yêu cầu.

**Xoay vòng là cách khắc phục đáng tin cậy duy nhất cho một bí mật bị lộ.** Việc gỡ nó khỏi tầm nhìn không ngăn được người đã sao chép nó.

Hãy báo cáo việc bị lộ ngay lập tức, kể cả khi chính bạn gây ra. Chậm trễ sẽ làm tăng thiệt hại.

## 6. Xử lý dữ liệu cá nhân cẩn thận

**Dữ liệu cá nhân** là thông tin về một người có thể nhận diện được, như họ tên, địa chỉ email, số điện thoại hoặc nội dung một yêu cầu tư vấn.

Việc một khách truy cập quan tâm đến một liệu trình cụ thể có thể tiết lộ thông tin nhạy cảm về họ. Hãy xử lý mọi thông tin yêu cầu tư vấn một cách cẩn trọng.

### Chỉ thu thập những gì đã được phê duyệt

Đặc tả biểu mẫu từ Bài 7.1 xác định những trường nào được thu thập. Đừng thêm trường chỉ vì thông tin đó có thể hữu ích về sau.

### Dùng dữ liệu giả lập khi kiểm thử

Tiếp tục dùng thông tin rõ ràng là hư cấu, như `test.visitor@example.com`. Tên miền `example.com` được dành riêng cho tài liệu và kiểm thử, nên nó không thuộc về một người thật.

### Giữ dữ liệu cá nhân ngoài các hồ sơ làm việc

Kiểm tra để đảm bảo dữ liệu cá nhân không xuất hiện trong:

| Vị trí | Cần kiểm tra gì |
|---|---|
| Console của trình duyệt | Các câu lệnh `console.log` in ra giá trị biểu mẫu |
| Log của máy chủ hoặc dịch vụ | Giá trị được gửi bị ghi vào log |
| Thông báo lỗi | Lỗi lặp lại nội dung khách truy cập đã nhập |
| Ảnh chụp màn hình | Họ tên, email hoặc tin nhắn hiển thị |
| Prompt | Nội dung yêu cầu tư vấn thật được dán vào để gỡ lỗi |
| Dữ liệu kiểm thử (test fixture) | Thông tin khách hàng thật được dùng lại làm dữ liệu kiểm thử |

Hãy xóa các câu lệnh gỡ lỗi in giá trị biểu mẫu trước khi nộp. Làm sạch ảnh chụp màn hình trước khi chia sẻ.

### Để các quyết định chính sách cho người phụ trách

Một số quyết định ảnh hưởng đến dữ liệu cá nhân nhưng không phải là lựa chọn triển khai:

- Có cần thông báo quyền riêng tư hoặc nội dung xin đồng ý hay không, và nội dung đó viết gì.
- Thông tin được gửi sẽ được lưu giữ trong bao lâu.
- Những dịch vụ nào được phép nhận dữ liệu cá nhân.
- Có được thêm script phân tích (analytics) hoặc theo dõi hay không.

Luật bảo vệ dữ liệu áp dụng phụ thuộc vào nơi doanh nghiệp hoạt động và đối tượng họ phục vụ. Ví dụ, một doanh nghiệp ở Singapore cần xem xét Đạo luật Bảo vệ Dữ liệu Cá nhân (Personal Data Protection Act). Việc xác định nghĩa vụ là quyết định của người hướng dẫn hoặc chuyên gia.

Nếu phạm vi đã phê duyệt không trả lời một trong các câu hỏi này, hãy ghi nhận nó là một lỗ hổng đặc tả. Đừng thêm script theo dõi, nội dung nhúng từ bên thứ ba hoặc bên nhận dữ liệu mới khi chưa được phê duyệt.

## 7. Hiểu về các gói phụ thuộc

**Gói phụ thuộc** (dependency) là một gói mã do người khác viết mà dự án sử dụng.

| Tệp | Mục đích |
|---|---|
| `package.json` | Liệt kê các gói mà dự án phụ thuộc và khoảng phiên bản được phép |
| Tệp khóa, như `package-lock.json` | Ghi lại chính xác các phiên bản đã cài, bao gồm cả các phụ thuộc gián tiếp |

Các gói liệt kê trong `dependencies` thường được chính website sử dụng. Các gói trong `devDependencies` được dùng trong quá trình phát triển và kiểm thử, như Playwright.

Mỗi gói phụ thuộc là mã mà dự án tin tưởng. Nó có thể mang theo lỗ hổng, nghĩa vụ giấy phép, dung lượng tải xuống tăng thêm và công việc bảo trì.

## 8. Rà soát một gói phụ thuộc trước khi thêm

Thêm một gói là một quyết định của dự án, như Bài 8.4 đã giải thích đối với Playwright.

Trước khi xin phê duyệt, hãy trả lời:

| Câu hỏi | Vì sao quan trọng |
|---|---|
| Có thực sự cần không? | Dự án hiện tại có thể đã có sẵn khả năng đó |
| Có đúng gói không? | Các tên na ná có thể là gói độc hại |
| Có được bảo trì không? | Các gói bị bỏ rơi không nhận được bản vá bảo mật |
| Dùng giấy phép gì? | Giấy phép có thể đặt ra nghĩa vụ cho doanh nghiệp |
| Dung lượng bao nhiêu? | Các gói lớn có thể làm website chậm đi |
| Có được dùng trên trình duyệt không? | Phụ thuộc chạy trên trình duyệt ảnh hưởng đến mọi khách truy cập |

### Xác minh tên gói

Kẻ tấn công phát hành các gói có tên giống với gói phổ biến, mong ai đó gõ nhầm tên. Hình thức này gọi là **typosquatting**.

Claude và các công cụ AI khác có thể gợi ý tên gói sai hoặc không tồn tại. Trước khi cài bất kỳ gói nào được gợi ý, hãy xác nhận tên chính xác trên tài liệu chính thức hoặc trang registry của gói đó.

## 9. Kiểm tra các gói phụ thuộc để tìm lỗ hổng đã biết

`npm audit` so sánh các gói phụ thuộc đã cài trong dự án với một cơ sở dữ liệu các lỗ hổng đã biết. Lệnh này cần có `package.json` và một tệp khóa.

Tại dấu nhắc lệnh của terminal, từ thư mục dự án:

```bash
npm audit
```

Báo cáo liệt kê các gói bị ảnh hưởng, mức độ nghiêm trọng của từng vấn đề, đường dẫn phụ thuộc và, nếu có, bản sửa được khuyến nghị.

| Mức độ nghiêm trọng | Ý nghĩa thường gặp |
|---|---|
| Critical hoặc high | Cần xem xét sớm |
| Moderate | Xem xét theo bối cảnh |
| Low hoặc info | Thường ưu tiên thấp hơn |

Riêng mức độ nghiêm trọng không quyết định mức khẩn cấp. Một vấn đề mức high trong công cụ chỉ dùng khi phát triển và không bao giờ chạy trên website có thể ít quan trọng hơn một vấn đề mức moderate trong mã chạy trên trình duyệt. Bản khuyến cáo (advisory) được liên kết trong báo cáo giải thích khi nào lỗ hổng có tác động.

### Cẩn trọng với các bản sửa tự động

`npm audit fix` cài các bản cập nhật tương thích cho các gói phụ thuộc có lỗ hổng. `npm audit fix --force` có thể cài các bản cập nhật phiên bản lớn (major), vốn có thể thay đổi cách một gói hoạt động và làm hỏng website.

Cập nhật gói phụ thuộc là thay đổi dự án. Hãy coi đó là một nhiệm vụ có giới hạn rõ ràng:

1. Ghi lại các phát hiện của audit.
2. Đề xuất bản cập nhật để được phê duyệt nếu quy tắc dự án yêu cầu.
3. Thực hiện thay đổi một cách riêng biệt, không lẫn với công việc khác.
4. Sau đó chạy các bước kiểm tra của dự án, các bài kiểm thử Playwright và các bước kiểm tra thủ công liên quan.

Đừng chạy `npm audit fix --force` khi chưa được cho phép.

Không có lỗ hổng nào được báo cáo nghĩa là hiện chưa có lỗ hổng nào được biết đến cho các phiên bản đã cài. Điều đó không có nghĩa là dự án an toàn.

## 10. Nhờ Claude rà soát an toàn

```text
Review the project for credential, personal data and
dependency risks within the scope below.

Before reviewing:
- Read the relevant project instructions, architecture
  and integration specification.
- Confirm the current Git status.

Check:
- Whether local environment files are ignored by Git and
  absent from Git history.
- Whether any credential-like values appear in source
  files, configuration, tests or documentation.
- Which environment variables are exposed to browser code,
  and whether any appear to be secrets.
- Whether form handling logs, prints or echoes submitted
  values.
- Whether any analytics, tracking or third-party scripts
  are present, and whether they are in the approved scope.
- The output of npm audit, with each issue's severity,
  dependency path and whether it affects browser code.
- Any dependencies that appear unused or outside the
  approved architecture.

Report variable NAMES and file locations only.
Never print, quote or summarise a secret value.
If you find an apparent exposed secret, report its
location and stop reviewing that file.

Review only. Do not edit files, install, update or
remove dependencies, run npm audit fix, rewrite Git
history, commit, push or deploy.

Scope and references:
[Insert the project scope and exact references.]
```

Hãy tự kiểm tra báo cáo của Claude. Nếu báo cáo nêu một bí mật bị lộ, hãy làm theo Phần 5 ngay lập tức.

## 11. Ghi lại phát hiện và sự cố

Thêm các phát hiện vào hồ sơ QA hiện có, dùng danh mục bảo mật hoặc dữ liệu.

| Loại phát hiện | Ghi vào đâu |
|---|---|
| Thiếu quy tắc `.gitignore` | Hồ sơ QA, dưới dạng lỗi |
| Câu lệnh gỡ lỗi in giá trị biểu mẫu | Hồ sơ QA, dưới dạng lỗi |
| Gói phụ thuộc có lỗ hổng | Hồ sơ QA, kèm mức độ nghiêm trọng và đường dẫn bị ảnh hưởng |
| Yêu cầu về lưu giữ dữ liệu hoặc xin đồng ý chưa được xác định | Hồ sơ QA, dưới dạng lỗ hổng đặc tả |
| Thông tin xác thực bị lộ | Báo cáo ngay cho người hướng dẫn, sau đó ghi lại sự cố |

Không đưa giá trị bí mật hoặc dữ liệu cá nhân thật vào bất kỳ phát hiện nào.

## 12. Bài tập thực hành

**Nhiệm vụ: Hoàn thành một đợt rà soát an toàn cho dự án.**

1. Xác định các biến môi trường mà dự án sử dụng, theo tên.
2. Xác nhận các tệp môi trường cục bộ đã được bỏ qua và không có lịch sử Git.
3. Kiểm tra những biến nào được đưa vào mã chạy trên trình duyệt.
4. Tìm các đầu ra gỡ lỗi in giá trị biểu mẫu.
5. Kiểm tra các script theo dõi hoặc script bên thứ ba nằm ngoài phạm vi đã phê duyệt.
6. Chạy `npm audit` và đánh giá từng vấn đề được báo cáo.
7. Nhờ Claude thực hiện một đợt rà soát an toàn độc lập.
8. Ghi lại các phát hiện đã xác minh và chuẩn bị các nhiệm vụ sửa lỗi có giới hạn rõ ràng.

Nếu bạn phát hiện một thông tin xác thực bị lộ, hãy dừng lại và báo cáo trước khi tiếp tục.

## 13. Sản phẩm cần nộp

Nộp:

- Danh sách tên các biến môi trường và nơi sử dụng từng biến.
- Kết quả kiểm tra Git ignore và lịch sử.
- Kết quả rà soát những gì lộ ra trình duyệt.
- Các phát hiện về việc xử lý dữ liệu cá nhân.
- Tóm tắt `npm audit` kèm đánh giá của bạn cho từng vấn đề.
- Bản rà soát an toàn của Claude và phần xác minh của bạn.
- Các phát hiện mới trong hồ sơ QA và mọi hồ sơ sự cố.
- Các lỗ hổng đặc tả liên quan đến quyết định xử lý dữ liệu.

Không đưa vào bất kỳ giá trị bí mật hay dữ liệu cá nhân thật nào.

## 14. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Các thông tin xác thực được xác định theo tên và không có trong các tệp được theo dõi.
- Cấu hình lộ ra trình duyệt không chứa bí mật.
- Mọi trường hợp bị lộ đều đã được báo cáo và ghi lại.
- Việc xử lý dữ liệu cá nhân tuân theo phạm vi đã phê duyệt.
- Rủi ro của các gói phụ thuộc được đánh giá theo bối cảnh.
- Không có thay đổi nào về gói phụ thuộc được thực hiện khi chưa được cho phép.
- Các câu hỏi chính sách được ghi nhận là quyết định dành cho người phụ trách.

## 15. Kiểm tra kiến thức

1. Vì sao xóa một bí mật đã commit bằng một commit mới không khắc phục được việc bị lộ?
2. Điều gì xảy ra với một biến môi trường có tiền tố làm lộ ra trình duyệt?
3. Bạn nên làm gì đầu tiên nếu phát hiện một thông tin xác thực trong ảnh chụp màn hình?
4. Vì sao bạn nên xác minh tên gói do một công cụ AI gợi ý?
5. Vì sao `npm audit fix --force` có thể làm hỏng một website đang hoạt động?
