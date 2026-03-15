import { Link } from '../../../i18n/navigation'
import { NavMenu } from './elements'
import { navigationData } from './navbar.constant'

export const Navbar = () => {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-7 ">
        <Link
          href="/"
          className="mr-6 flex items-center space-x-2 font-bold text-xl tracking-tight"
        >
          <span>myBLOG</span>
        </Link>
        <NavMenu navigationData={navigationData} />
      </div>
    </header>
  )
}
