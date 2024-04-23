import Link from "next/link";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
interface BreadcrumbProps {
  pageName: string;
  isVisible?: boolean;
}
const Breadcrumb = ({ pageName, isVisible = true }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">


      {isVisible ? <nav>
        <ol className="flex items-center gap-2">
          <HomeOutlinedIcon fontSize="small" />
          <li>
            <Link className="font-medium" href="/dashboard">
              Dashboard
            </Link>
          </li>
          <ArrowRightOutlinedIcon fontSize="small" />
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav> : <></>}
    </div>
  );
};

export default Breadcrumb;
