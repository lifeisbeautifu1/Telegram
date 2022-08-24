import { Link } from 'react-router-dom';

interface ArticleProps {
  image: string;
  title: string;
  paragraph: string;
  date: string;
}

const Article = ({ image, title, paragraph, date }: ArticleProps) => {
  return (
    <Link to="/" className="news w-full md:w-1/2 flex flex-col py-4 px-3">
      <img
        src={image}
        className="opacity-100 block max-h-[220px] max-w-full h-auto mx-auto"
        alt={title}
      />
      <h1 className="text-[#0088cc] mt-3 mb-1 px-4 font-bold leading-[160%]">
        {title}
      </h1>
      <p className="text-[#333] leading-[160%] px-4 text-sm">{paragraph}</p>
      <span className="mt-1 px-4 text-sm text-[#888]">{date}</span>
    </Link>
  );
};

export default Article;
