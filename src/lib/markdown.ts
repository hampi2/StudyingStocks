/**
 * 마크다운 테이블을 HTML 테이블로 변환
 * | 헤더1 | 헤더2 | → <table>...</table>
 */
function parseMarkdownTable(tableText: string): string {
  const rows = tableText.trim().split("\n").filter((r) => r.trim().length > 0);
  if (rows.length < 2) return tableText;

  let html =
    '<div class="overflow-x-auto my-4"><table class="w-full border-collapse text-sm">';

  // 헤더 행 (첫 번째 줄)
  const headerCells = rows[0]
    .split("|")
    .filter(Boolean)
    .map((c) => c.trim());
  html += "<thead><tr>";
  for (const cell of headerCells) {
    html += `<th class="border border-border bg-muted/50 px-3 py-2 text-left font-semibold text-xs">${processBold(cell)}</th>`;
  }
  html += "</tr></thead><tbody>";

  // 데이터 행 (구분선 줄은 건너뜀: ---로만 구성된 줄)
  for (let i = 1; i < rows.length; i++) {
    const trimmed = rows[i].replace(/\|/g, "").trim();
    // 구분선 줄 건너뛰기 (-, :, 공백으로만 구성)
    if (/^[-:\s]+$/.test(trimmed)) continue;

    const cells = rows[i]
      .split("|")
      .filter(Boolean)
      .map((c) => c.trim());
    if (cells.length === 0) continue;
    html += "<tr>";
    for (const cell of cells) {
      html += `<td class="border border-border px-3 py-2 text-xs">${processBold(cell)}</td>`;
    }
    html += "</tr>";
  }

  html += "</tbody></table></div>";
  return html;
}

/** **bold** 를 <strong>으로 변환 */
function processBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/**
 * 마크다운 콘텐츠를 HTML로 변환
 * 지원: ## 헤더, ### 서브헤더, **bold**, 리스트, 블록인용, 테이블
 */
export function markdownToHtml(content: string): string {
  // 1단계: 테이블 블록 변환 (연속된 | 줄)
  let processed = content.replace(
    /((?:^[ \t]*\|.+\|[ \t]*$\n?){2,})/gm,
    (match) => parseMarkdownTable(match)
  );

  // 2단계: 나머지 마크다운 변환
  processed = processed
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>'
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(
      /^- (.+)$/gm,
      '<li class="mb-1 ml-4 list-disc">$1</li>'
    )
    .replace(
      /^(\d+)\. (.+)$/gm,
      '<li class="mb-1 ml-4 list-decimal">$2</li>'
    )
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-muted/50 rounded-r text-sm">$1</blockquote>'
    )
    .replace(/\n\n/g, '<div class="mb-4"></div>')
    .replace(/\n/g, "<br/>");

  return processed;
}
