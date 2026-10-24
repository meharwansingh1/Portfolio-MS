import Link from "next/link"

/** Pages on this site go through Next's router; full URLs open in a new tab. */
export function SmartLink({ href, className, children, ...rest }: { href: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (/^https?:\/\//.test(href))
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className} {...rest}>
        {children}
      </a>
    )
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}
