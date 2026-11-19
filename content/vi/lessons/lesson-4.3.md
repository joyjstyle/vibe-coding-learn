# Bài 4.3: Xây dựng style dùng chung, điều hướng và component tái sử dụng

### Mục tiêu bài học

Khi kết thúc bài học này, bạn có thể:

- Triển khai một tác vụ có phạm vi rõ ràng từ một kế hoạch đã duyệt.
- Áp dụng style dùng chung một cách nhất quán.
- Nhận ra khi nào một phần giao diện nên trở thành component tái sử dụng.
- Xây dựng điều hướng bằng các nhãn và đích đến đã duyệt.
- Duyệt các thay đổi mã và kiểm tra hành vi thu được.

**Điều kiện tiên quyết:** Hoàn thành Bài 4.2 và có một tác vụ sẵn sàng để triển khai.

**Tài liệu cần chuẩn bị:** Dự án khởi đầu TypeScript và TSX, hướng dẫn phong cách đã duyệt, đặc tả điều hướng, các tài liệu tham chiếu component và kế hoạch tác vụ đã được duyệt của bạn.

## 1. Xây dựng nền tảng dùng chung

Style và component dùng chung giúp website luôn nhất quán khi có thêm nhiều trang.

| Nền tảng | Ví dụ | Vì sao quan trọng |
|---|---|---|
| **Style dùng chung** | Màu sắc, kiểu chữ, khoảng cách và độ rộng nội dung | Mỗi quy tắc trực quan được định nghĩa một lần và áp dụng ở mọi nơi |
| **Điều hướng** | Liên kết trong header, menu di động và liên kết ở footer | Kết nối các trang và hành trình của khách truy cập |
| **Component tái sử dụng** | Nút, thẻ liệu trình và tiêu đề phần | Một đoạn mã phục vụ nhiều nơi, nên sửa ở một chỗ là sửa được tất cả |

Một **component** là một phần giao diện tái sử dụng được, viết bằng TSX, chẳng hạn một nút hoặc một thẻ.

Hãy xây dựng nền tảng thông qua các tác vụ dễ quản lý. Bài học này bao quát cả ba lĩnh vực, nhưng mỗi yêu cầu gửi tới Claude vẫn nên có phạm vi xác định.

## 2. Tuân theo cách làm hiện có của dự án

Trước khi chỉnh sửa, hãy dùng các phát hiện từ việc kiểm tra để xác nhận:

- Style dùng chung được định nghĩa ở đâu.
- Các component nhận nội dung của chúng như thế nào.
- Framework xử lý liên kết giữa các trang ra sao.
- Những component nào đã tồn tại.
- Dự án cung cấp những bước kiểm tra nào.

Sau đó yêu cầu Claude mở rộng cách làm mà dự án đang dùng.

Ví dụ, nếu dự án định nghĩa các màu dùng chung dưới dạng biến CSS, các style mới nên tái sử dụng chúng. Nếu dự án đã có component nút, hãy kiểm tra nó trước khi bất kỳ ai tạo thêm một cái khác.

**Sự nhất quán đến từ việc tuân theo hệ thống đã duyệt, chứ không phải từ việc làm cho các thành phần trông na ná nhau.**

## 3. Áp dụng các giá trị style dùng chung

Các giá trị dùng chung giúp mỗi quyết định thiết kế đã duyệt chỉ có một cách triển khai duy nhất.

Trong CSS, một **custom property**, thường được gọi là biến CSS, lưu một giá trị dưới một cái tên để có thể tái sử dụng. Tên custom property bắt đầu bằng hai dấu gạch ngang:

```css
:root {
  --colour-brand: #354536;
  --colour-surface: #f5f2e9;
  --radius-card: 16px;
}
```

Sau đó một component có thể dùng các giá trị này với `var()`:

```css
.treatment-card {
  background-color: var(--colour-surface);
  border-radius: var(--radius-card);
}
```

Các giá trị này chỉ mang tính minh họa. Hãy dùng các giá trị và quy ước đặt tên đã duyệt trong dự án thực tế. Tên thuộc tính CSS `background-color` dùng cách viết của tiếng Anh Mỹ vì CSS được viết như vậy. Tên biến của riêng bạn có thể theo quy ước của dự án.

### Kiểm tra tác động của các thay đổi dùng chung

Thay đổi một giá trị dùng chung có thể thay đổi nhiều component cùng lúc.

Trước khi thay đổi, hãy tìm hiểu:

1. Nó được dùng ở đâu.
2. Thay đổi được yêu cầu có nên áp dụng ở mọi nơi không.
3. Những trang nào sẽ cần kiểm tra sau đó.

Nếu chỉ một phần cần màu nền khác, việc thay đổi màu nền chung toàn cục có lẽ là cách làm sai, vì nó cũng sẽ thay đổi mọi phần khác.

## 4. Xây dựng component tái sử dụng dựa trên nhu cầu thực tế

Một component tái sử dụng kết hợp một cấu trúc nhất quán với các đầu vào thay đổi mỗi lần nó được dùng. Trong React và TSX, các đầu vào này được gọi là **props**, viết tắt của properties (thuộc tính). TypeScript mô tả những props mà một component chấp nhận.

### Ví dụ minh họa

```tsx
type TreatmentCardProps = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  headingLevel?: "h2" | "h3";
};

export function TreatmentCard({
  title,
  description,
  href,
  linkLabel,
  headingLevel = "h3",
}: TreatmentCardProps) {
  const Heading = headingLevel;

  return (
    <article className="treatment-card">
      <Heading>{title}</Heading>
      <p>{description}</p>
      <a href={href}>{linkLabel}</a>
    </article>
  );
}
```

Các thẻ liệu trình khác nhau có thể tái sử dụng cùng một cấu trúc:

```tsx
<TreatmentCard
  title="[Approved treatment name]"
  description="[Approved treatment summary]"
  href="[Approved treatment route]"
  linkLabel="[Approved link label]"
/>
```

Tất cả các giá trị trong ngoặc vuông là nội dung giữ chỗ. Hãy dùng nội dung đã duyệt và các đích đến đã xác nhận từ dự án thực tế.

Ví dụ này đưa ra hai lựa chọn mà bạn nên hiểu:

| Lựa chọn | Lý do |
|---|---|
| Cấp tiêu đề là một prop | Cấp đúng phụ thuộc vào nơi thẻ xuất hiện. Trên một trang mà các thẻ nằm dưới một tiêu đề phần cấp 2, tiêu đề thẻ thường là cấp 3. Bài 5.1 yêu cầu bạn kiểm tra các cấp tiêu đề trên toàn trang đã ghép |
| Văn bản liên kết là một prop lấy từ nội dung đã duyệt | Người dùng trình đọc màn hình thường liệt kê tất cả liên kết trên một trang. Nếu mọi thẻ đều ghi “View treatment”, danh sách đó rất khó dùng. Văn bản liên kết có chứa tên liệu trình, hoặc một nhãn rõ ràng theo cách khác, sẽ hữu ích. Nếu thiết kế đã duyệt dùng cùng một nhãn trên mọi thẻ, hãy ghi lại điều đó cho phần duyệt khả năng tiếp cận ở Bài 8.3 thay vì tự thay đổi câu chữ |

Ví dụ này dùng một phần tử `<a>` thuần. Nhiều framework cung cấp component liên kết riêng để di chuyển giữa các trang. Hãy dùng component liên kết đã có của dự án nếu có.

### Tránh sự linh hoạt không cần thiết

Một component không cần có tùy chọn cho mọi thiết kế có thể có trong tương lai.

Hãy bắt đầu với các trường hợp sử dụng đã duyệt. Chỉ thêm một **variant** (biến thể), tức là một phiên bản thay thế của component, khi có một yêu cầu đã duyệt cần đến nó. Nếu mọi thẻ liệu trình đã duyệt đều dùng chung một bố cục, đừng tạo năm biến thể bố cục không dùng đến.

## 5. Xây dựng điều hướng từ cấu trúc đã duyệt

Điều hướng kết hợp nội dung, đích đến, cách trình bày và hành vi. Hãy kiểm tra cả bốn.

| Lĩnh vực | Những gì cần triển khai |
|---|---|
| **Nội dung** | Chính xác các nhãn đã duyệt, theo đúng thứ tự đã duyệt |
| **Đích đến** | Đúng các trang, phần trong trang hoặc địa chỉ bên ngoài |
| **Cách trình bày** | Bố cục máy tính và di động đã duyệt |
| **Hành vi** | Các điều khiển menu, thao tác bàn phím và cách xử lý focus được đặc tả |

Hãy dùng component liên kết đã có của framework khi phù hợp.

Đừng làm cho phần điều hướng chưa xong trông như đã hoàn chỉnh bằng cách trỏ mọi liên kết tới `#` hoặc đưa các liên kết không liên quan về trang chủ. Khách truy cập sẽ đến sai chỗ, và người duyệt sẽ nghĩ rằng các liên kết đã hoạt động.

Nếu một đích đến chưa sẵn sàng, hãy dùng cách xử lý tạm thời đã thống nhất cho tác vụ và ghi lại hạn chế đó.

### Chọn phần tử phù hợp với mục đích

- Dùng **liên kết** (link) để đưa khách truy cập tới một trang hoặc vị trí khác.
- Dùng **nút** (button) để thực hiện một hành động trên trang hiện tại, chẳng hạn mở menu.
- Giữ cho các nhãn có ý nghĩa.
- Tuân theo đặc tả tương tác đã duyệt.

Trình duyệt và công nghệ hỗ trợ xử lý liên kết và nút theo cách khác nhau, nên việc chọn đúng phần tử là quan trọng ngay cả khi chúng trông giống nhau.

Một menu trông đúng vẫn cần được kiểm tra hành vi.

## 6. Hướng dẫn Claude triển khai tác vụ được chọn

Dùng tác vụ và kế hoạch đã duyệt từ Bài 4.2.

### Prompt triển khai

```text
Implement the selected task according to the reviewed plan
and approved project references.

Before editing:
- Confirm the project location and current Git status.
- Check for changes made since the inspection.
- Confirm that the task's prerequisites are satisfied.

During implementation:
- Follow the existing TypeScript, TSX and styling conventions.
- Reuse existing components and shared values where appropriate.
- Preserve approved wording, labels, destinations and layouts.
- Keep changes within the task and necessary supporting files.
- Pause if an unresolved decision materially affects the result.

After implementation:
- Run the applicable documented project checks.
- Review the changed files for unrelated edits.
- Report the changes, checks performed, results and limitations.
- Identify any browser checks still requiring my review.

Do not commit, push or deploy as part of this task.

Task and reviewed plan:
[Paste or reference the task.]

Approved references:
[Provide the exact references.]
```

Nếu quy tắc của dự án yêu cầu thêm một quyết định trước một hành động cụ thể, hãy tuân theo chúng.

## 7. Tự mình duyệt các thay đổi

Báo cáo hoàn thành của Claude cho bạn biết những gì Claude tin rằng nó đã làm. Hãy tự kiểm tra các thay đổi thực tế.

Chạy các lệnh này tại dấu nhắc lệnh của terminal, trong thư mục dự án.

Xem những tệp nào đã thay đổi:

```bash
git status --short
```

Xem các thay đổi bên trong những tệp mà Git đã theo dõi:

```bash
git diff
```

`git diff` không hiển thị nội dung của các tệp mới, chưa được theo dõi. Hãy mở riêng những tệp đó để đọc.

Nếu các thay đổi đã được **staged**, nghĩa là đã được chọn cho commit tiếp theo, hãy xem chúng bằng:

```bash
git diff --staged
```

Bạn cũng có thể thấy lệnh này được viết là `git diff --cached`. Cả hai làm cùng một việc.

Hãy yêu cầu Claude giải thích bằng ngôn ngữ dễ hiểu bất kỳ thay đổi nào bạn không hiểu.

Hãy tìm:

- Các tệp không liên quan đến tác vụ.
- Các thay đổi bất ngờ về cấu hình hoặc package.
- Câu chữ đã duyệt bị viết lại.
- Component bị trùng lặp.
- Nội dung giữ chỗ tạm thời.
- Thay đổi ở style dùng chung ảnh hưởng tới các trang khác.

## 8. Kiểm tra kết quả trên trình duyệt

Khởi động website bằng lệnh đã được ghi lại, sau đó kiểm tra kết quả theo từng tiêu chí chấp nhận.

| Lĩnh vực | Ví dụ bước kiểm tra |
|---|---|
| Style dùng chung | Kiểu chữ, màu sắc và khoảng cách khớp với các giá trị đã duyệt |
| Tái sử dụng component | Nhiều thể hiện của component hiển thị đúng nội dung được cung cấp cho từng cái |
| Biến đổi nội dung | Văn bản đã duyệt dài hơn vẫn vừa mà không bị cắt |
| Điều hướng | Nhãn và đích đến khớp với IA |
| Tương tác | Các điều khiển menu làm đúng như đặc tả |
| Thao tác bàn phím | Liên kết và điều khiển có thể được tiếp cận và thao tác bằng bàn phím |
| Bố cục đáp ứng (responsive) | Các component vẫn dùng được ở các độ rộng đã thống nhất |
| Hành vi hiện có | Bố cục máy tính và những nơi dùng chung khác vẫn hoạt động |

Hãy chạy cả các bước kiểm tra liên quan của dự án.

Nếu bạn chưa thực hiện một bước kiểm tra, hãy ghi nó là **Chưa kiểm tra**, kèm lý do. Tuyệt đối không tính nó là đã đạt.

## 9. Những lỗi thường gặp

| Lỗi | Cách sửa |
|---|---|
| Tạo một nút mới cho mỗi phần | Kiểm tra và tái sử dụng nút dùng chung |
| Gán cứng các màu hơi khác nhau ở nhiều nơi | Dùng các giá trị dùng chung đã duyệt của dự án |
| Thay đổi một style toàn cục để sửa một vấn đề cục bộ | Giới hạn thay đổi trong phạm vi dự định |
| Thêm nhiều biến thể component không dùng đến | Chỉ xây dựng các biến thể mà thiết kế đã duyệt cần |
| Coi một menu trông đúng là đã hoàn chỉnh | Kiểm tra các đích đến và tương tác |
| Chấp nhận báo cáo của Claude mà không kiểm tra | Tự mình duyệt các tệp và kết quả trên trình duyệt |

## 10. Bài tập thực hành

**Nhiệm vụ: Triển khai và xác minh một component dùng chung.**

Dùng tác vụ đã sẵn sàng triển khai của bạn từ Bài 4.2. Với tác vụ thẻ liệu trình:

1. Xác nhận các tài liệu tham chiếu đã duyệt và trạng thái hiện tại của dự án.
2. Yêu cầu Claude triển khai kế hoạch đã duyệt.
3. Đọc phần TSX và style thu được.
4. Hiển thị ít nhất hai thể hiện bằng nội dung được cung cấp.
5. Kiểm tra nội dung, liên kết, cấp tiêu đề, giao diện và hành vi trên màn hình hẹp.
6. Chạy các bước kiểm tra liên quan của dự án.
7. Ghi lại mọi vấn đề còn tồn tại.

Sau đó kiểm tra phần điều hướng hiện có và ghi lại liệu nó đã đáp ứng các yêu cầu đã duyệt hay chưa. Hãy tạo một tác vụ tiếp nối riêng cho mọi khoảng trống, thay vì mở rộng tác vụ component.

## 11. Sản phẩm cần nộp

Nộp:

- ID tác vụ và prompt triển khai.
- Bản tóm tắt các tệp đã thay đổi và lý do.
- Ảnh chụp màn hình ở các độ rộng duyệt đã thống nhất.
- Mỗi tiêu chí chấp nhận được đánh dấu **Đạt**, **Không đạt** hoặc **Chưa kiểm tra**.
- Kết quả các bước kiểm tra của dự án.
- Các vấn đề còn lại và các tác vụ tiếp nối được đề xuất.

## 12. Tiêu chí hoàn thành

Bài học hoàn thành khi:

- Component tuân theo tác vụ đã duyệt.
- Các quy ước hiện có của dự án được dùng nhất quán.
- Nội dung và đích đến đã duyệt được giữ nguyên.
- Việc tái sử dụng hoạt động trên các thể hiện bắt buộc.
- Các bước kiểm tra liên quan đã được thực hiện và ghi lại.
- Các thay đổi không liên quan và vấn đề chưa giải quyết đã được xác định.
- Công việc đã sẵn sàng cho phần đối chiếu thiết kế ở Bài 4.4.

## 13. Kiểm tra kiến thức

1. Vì sao một thay đổi ở style dùng chung nên được kiểm tra ở mọi nơi nó được dùng?
2. Khi nào một component nên có thêm một biến thể mới?
3. Vì sao các đích đến liên kết giữ chỗ như `#` là chưa đủ tốt?
4. `git diff` có hiển thị nội dung của các tệp mới, chưa được theo dõi không?
5. Bạn nên ghi lại điều gì khi chưa thực hiện một bước kiểm tra?
