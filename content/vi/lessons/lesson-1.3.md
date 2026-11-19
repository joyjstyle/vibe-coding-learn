# Bài 1.3: Hiểu các tệp dự án, TypeScript và TSX

### Mục tiêu bài học

Kết thúc bài học này, bạn có thể:

- Nhận biết các loại tệp chính trong dự án khởi đầu được cung cấp.
- Giải thích sự khác nhau giữa tệp `.ts` và tệp `.tsx`.
- Đọc một component nhỏ có khai báo kiểu và xác định các đầu vào mà nó nhận.
- Tìm các lệnh của dự án mà không tự bịa ra chúng.
- Phân biệt tệp mã nguồn, tệp cấu hình và tệp được tạo tự động.

**Điều kiện tiên quyết:** Hoàn thành Bài 1.2.

**Tài liệu cần chuẩn bị:** Dự án khởi đầu TypeScript và TSX được cung cấp, mở trong không gian làm việc VS Code mà bạn đã thiết lập ở Bài 1.2, và quyền truy cập Claude chỉ để khảo sát.

## 1. Khảo sát dự án khởi đầu thực tế

Một **dự án khởi đầu** (starter project) là một bộ tệp được làm sẵn, cung cấp cho bạn một website chạy được để phát triển tiếp.

Không phải dự án nào cũng dùng cùng các thư mục hay cùng một **framework**, bộ công cụ quyết định cách các tệp trở thành trang web. Một cấu trúc bạn từng thấy trong hướng dẫn khác có thể không khớp với dự án này. Hãy tìm hiểu những tệp nào tồn tại và chúng làm gì trước khi giả định bất cứ điều gì.

| Loại tệp | Mục đích thường gặp |
|---|---|
| **Mã nguồn** | Các trang, component và mã giúp website hoạt động |
| **Style** | Các quy tắc về giao diện |
| **Tài nguyên** | Hình ảnh, phông chữ và các phương tiện khác |
| **Cấu hình** | Thiết lập cho framework và các công cụ khác |
| **Hướng dẫn** | Yêu cầu và quy tắc làm việc, thường nằm trong các tệp Markdown |
| **Đầu ra được tạo tự động** | Các tệp do quá trình build hoặc công cụ tự động tạo ra |

Đầu ra được tạo tự động sẽ được tạo lại mỗi khi công cụ chạy, nên sửa chúng bằng tay là vô ích. Lần build tiếp theo sẽ ghi đè thay đổi của bạn.

Dùng Explorer của VS Code, cây thư mục ở bên trái, để xem các thư mục và tệp thực tế của dự án. Chọn một tệp sẽ mở nó trong trình soạn thảo.

Những tên tệp phổ biến bạn thấy trong các ví dụ chỉ là ví dụ. Chúng không chứng minh rằng dự án khởi đầu của bạn có các tệp đó.

## 2. Hiểu TypeScript

**JavaScript** là ngôn ngữ lập trình mà trình duyệt chạy. **TypeScript** là JavaScript có thêm hệ thống kiểu. Một **kiểu** (type) mô tả hình dạng của giá trị mà mã chờ đợi, để các công cụ TypeScript có thể cảnh báo bạn khi có gì đó không khớp.

```ts
type Treatment = {
  title: string;
  href: string;
};

const treatment: Treatment = {
  title: "Example treatment",
  href: "/example-treatment",
};
```

Ở đây, kiểu `Treatment` quy định cả `title` và `href` đều phải là **chuỗi** (string), tức văn bản. Nếu ai đó điền một con số cho `title`, các công cụ TypeScript sẽ báo lỗi.

Câu chữ và đường dẫn trên chỉ mang tính minh họa. Chúng không phải là nội dung đã được phê duyệt của Saffron Wellness Clinic.

Một lượt **kiểm tra kiểu** (type check) phát hiện được một số lỗi trong mã. Nó không thể chứng minh rằng một địa chỉ trang tồn tại, rằng câu chữ đã được phê duyệt hoặc rằng thông tin đến từ bên ngoài website là hợp lệ. Bài 7.2 sẽ quay lại điểm cuối cùng này.

## 3. Hiểu TSX

**JSX** là một cách viết các phần tử giao diện, như liên kết và tiêu đề, ngay bên trong mã. Nó trông giống HTML. **TSX** là TypeScript kết hợp với JSX.

```tsx
type TreatmentLinkProps = {
  title: string;
  href: string;
};

export function TreatmentLink({ title, href }: TreatmentLinkProps) {
  return <a href={href}>{title}</a>;
}
```

Đây là một **component**: một phần giao diện có thể tái sử dụng. Nó nhận hai đầu vào, `title` và `href`. Các đầu vào của một component được gọi là **props**, viết tắt của properties (thuộc tính). Component dùng chúng để tạo ra một liên kết.

Trong một dự án TypeScript, tệp chứa JSX dùng phần mở rộng `.tsx`. Các tệp chỉ có TypeScript, không có JSX, thường dùng `.ts`.

Cấu hình của dự án cũng phải hỗ trợ JSX. Không thay đổi cấu hình đó trong bài học này.

## 4. Nhận biết import và component dùng chung

Mã được chia thành nhiều tệp gọi là **module**. Một module có thể **export** (xuất) một giá trị hoặc component để nơi khác sử dụng. Một module khác sau đó **import** (nhập) nó:

```tsx
import { TreatmentLink } from "./TreatmentLink";
```

Phần văn bản trong dấu ngoặc kép là đường dẫn đến tệp được import. Hãy dùng các đường dẫn mà dự án thực tế của bạn sử dụng.

Khi nhiều trang cùng import một component dùng chung, việc thay đổi component đó sẽ thay đổi tất cả các trang ấy. Trước khi yêu cầu một thay đổi, hãy tìm hiểu:

- Component được định nghĩa ở đâu.
- Nó còn được dùng ở những đâu khác.

Trong VS Code, nhấp chuột phải vào tên component và chọn **Find All References** để liệt kê những nơi nó được dùng. Bạn cũng có thể tìm kiếm trong toàn bộ dự án bằng **Edit > Find in Files**.

Đừng sao chép một component dùng chung sang tệp mới chỉ vì bạn không tìm thấy bản gốc. Hai bản sao sẽ dần khác nhau, và những bản sửa lỗi ở bản này sẽ không bao giờ đến được bản kia.

## 5. Tìm các lệnh và gói của dự án

Hầu hết các dự án TypeScript có một tệp tên `package.json` trong thư mục chính. Nếu dự án khởi đầu của bạn có tệp này, hãy khảo sát nó.

| Thông tin | Điều cần tìm hiểu |
|---|---|
| **Scripts** | Các lệnh thực tế để chạy và kiểm tra website |
| **Dependencies** | Các gói mã của người khác mà dự án sử dụng |
| **Trình quản lý gói** và **lock file** | Công cụ nào cài đặt các gói (như npm, pnpm hoặc Yarn), và tệp ghi lại phiên bản chính xác của các gói |
| **Tài liệu về môi trường chạy** | Phiên bản nào của các công cụ như Node.js là bắt buộc |

Một script là một lệnh có tên được lưu trong `package.json`. Bạn chạy nó thông qua trình quản lý gói, ví dụ `npm run` kèm theo tên script.

Đừng cho rằng `npm run dev`, hay bất kỳ lệnh nào bạn từng thấy ở nơi khác, có tồn tại trong dự án này. Hãy ghi lại tên các script thực tế và trình quản lý gói mà dự án sử dụng.

Không chỉnh sửa lock file hoặc cài đặt gói trong bài học này.

## 6. Nhờ Claude giải thích các tệp được chọn

```text
Inspect the supplied TypeScript/TSX starter without editing it.

Identify:
1. Its framework and evidence for that conclusion.
2. Relevant source, style, asset and configuration locations.
3. One .ts file and one .tsx file, if present, and their roles.
4. One existing component's props and usages.
5. Actual documented development and verification commands.
6. Generated files that should not be edited directly.

Explain unfamiliar terms for a beginner. Do not invent absent files.
Do not install dependencies, start services, commit, push or deploy.
```

Tự đối chiếu câu trả lời của Claude với các tệp. Nếu nó nêu tên một tệp, hãy mở tệp đó trong trình soạn thảo VS Code.

## 7. Bài tập thực hành

**Nhiệm vụ: Lập bản đồ tệp của dự án khởi đầu.**

1. Ghi lại các loại tệp liên quan và đường dẫn thực tế của chúng.
2. Giải thích một kiểu có sẵn và một component TSX, bao gồm props của nó.
3. Xác định một câu lệnh import, và cho biết nó đến từ tệp nào.
4. Ghi lại các script thực tế và chức năng của từng script.
5. Liệt kê mọi thông tin cài đặt còn thiếu.

Không thay đổi dự án khởi đầu. Khi kết thúc, hãy xác nhận rằng không có gì thay đổi: chế độ xem Source Control không được liệt kê thay đổi nào, và `git status --short` trong terminal tích hợp không in ra gì.

## 8. Sản phẩm cần nộp

Nộp:

- Bản đồ tệp của bạn.
- Phần giải thích của bạn về component.
- Danh sách các script.
- Xác nhận về việc có tệp nào thay đổi hay không.

## 9. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Bản đồ tệp của bạn phản ánh đúng dự án khởi đầu thực tế.
- Bạn có thể giải thích sự khác nhau giữa tệp `.ts` và tệp `.tsx`.
- Bạn có thể tìm các lệnh của dự án mà không cần đoán.

## 10. Kiểm tra kiến thức

1. Tệp `.tsx` khác tệp `.ts` như thế nào?
2. Props của component là gì?
3. Vì sao thay đổi một component có thể ảnh hưởng đến nhiều trang?
4. Kiểu `string` có chứng minh được rằng một địa chỉ web là đúng không?
5. Bạn nên tìm ở đâu để biết các script có sẵn của dự án?

## 11. Tài liệu tham khảo chính thức

- [TypeScript JSX documentation](https://www.typescriptlang.org/docs/handbook/jsx.html), được tác giả tải lên kiểm tra ngày 13 tháng 11 năm 2026 về những kiến thức cơ bản khi cấu hình TSX và JSX.
