import { IconBrandGithub } from '@tabler/icons-react'

export default function BuildStatusBadge() {
  return (
    <aside className="sticky top-0 z-50 flex h-10 items-center justify-center overflow-hidden border-b border-[#24423e] bg-[#0d1917] px-2 text-[11px] sm:text-sm">
      <div className="flex items-center justify-center gap-x-2 sm:gap-x-3">
        <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-medium text-[#e8f4f1]">
          <span className="size-2 rounded-full bg-[#38d3b7]" aria-hidden="true" />
          Still learning, still building
        </span>
        <span className="hidden h-4 w-px bg-[#38514d] sm:block" aria-hidden="true" />
        <a
          href="https://github.com/DaniyalAsif7778"
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[#aabbb7] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#38d3b7]"
          aria-label="View DaniyalAsif7778 on GitHub"
        >
          <IconBrandGithub size={16} stroke={1.8} aria-hidden="true" />
          DaniyalAsif7778
        </a>
      </div>
    </aside>
  )
}
