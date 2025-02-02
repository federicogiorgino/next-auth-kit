import Link from 'next/link'

type AuthFormFooterProps = {
  text: string
  link: string
  linkText: string
}

function AuthFormFooter({ text, link, linkText }: AuthFormFooterProps) {
  return (
    <div className="text-center text-sm">
      {text}{' '}
      <Link href={link} className="font-medium text-primary underline">
        {linkText}
      </Link>
    </div>
  )
}

export { AuthFormFooter }
