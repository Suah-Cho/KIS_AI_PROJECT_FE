export interface CategoryOption {
    id: string;
    name: string;
}

export const categories: CategoryOption[] = [
    { id: 'auto', name: '자동선택' },
    { id: 'acc', name: '회계 규정' },
    { id: 'aud', name: '감사 규정' },
    { id: 'hr', name: '인사 규정' },
    { id: 'it', name: 'IT/보안 규정' },
    { id: 'org', name: '회사 조직 규정' },
    { id: 'work', name: '업무메뉴얼' },
    { id: 'etc', name: '기타' },
]

export function normalizeCategory(id: string | null | undefined) {
    if (!id || id === 'auto') return null;
    return id;
  }