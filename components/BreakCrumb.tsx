import Link from "next/link";
import { useRouter } from "next/router";
interface IProps {
  image: string;
  title: string;
}
const BreakCrumb = ({ image, title }: IProps) => {
  const router = useRouter();
  const { asPath } = router;
  const paths = asPath.split("/").filter((path) => path);

  return (
    <div className="flex flex-col relative justify-center items-start">
      <img src={image} alt={image} />
      <div className="flex flex-col absolute px-5">
        <h1 className="breakcrumb_title">{title}</h1>

        <ul className="breakcrumb_list">
          <li>
            <Link href="/" legacyBehavior>
              Home
            </Link>
          </li>
          {paths.map((path, index) => {
            const linkPath = `/${paths.slice(0, index + 1).join("/")}`;
            return (
              <li key={linkPath + index} className="capitalize">
                {" / "}
                <Link href={linkPath} legacyBehavior>
                  {path}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BreakCrumb;
